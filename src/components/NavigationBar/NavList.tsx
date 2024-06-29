import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { routes } from "@/Constants";

const tabs = [
  {
    name: "Dashboard",
  },
  {
    name: "Users",
  },
  {
    name: "Customers",
    subTabs: [
      {
        name: "MSQ Customers",
      },
      {
        name: "KYC Customers",
      },
    ],
  },
];

const NavList = ({ open }: Readonly<{ open: boolean }>) => {
  const [openSubTabs, setOpenSubTabs] = useState<string[]>([]);
  const [active, setActive] = useState<{
    mainTab: string;
    subTab: string | null;
  }>({
    mainTab: "Dashboard",
    subTab: null,
  });

  function isActiveTab(tab: string) {
    return tab === active.mainTab || tab === active.subTab;
  }

  function additionalStyles(tab: string) {
    return {
      transition: "color 0.5s ease",
      color: isActiveTab(tab)
        ? "rgba(255, 255, 255,0.8)"
        : "rgba(255, 255, 255, 0.4)",
    };
  }

  function handleNavigate(name: string, subTabs?: Array<{ name: string }>) {
    if (!subTabs) {
      return setActive((prev) => ({ ...prev, mainTab: name }));
    }

    setActive((prev) => ({ ...prev, mainTab: name }));

    if (openSubTabs.includes(name)) {
      setOpenSubTabs((prev) => prev.filter((t) => t != name));
    } else {
      setOpenSubTabs((prev) => [...prev, name]);
    }
  }

  return (
    <List>
      {routes.map(({ name, Icon, subTabs }) => (
        <Box key={name}>
          <ListItem
            onClick={() => handleNavigate(name, subTabs)}
            disablePadding
            sx={{
              display: "flex",
              transition: "background-color 0.9s ease",
              borderRadius: 1,
              pr: open ? 1 : 0,
              ...(isActiveTab(name)
                ? { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                : {}),
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                ...additionalStyles(name),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1.5 : "auto",
                  justifyContent: "center",
                }}
              >
                <Icon sx={additionalStyles(name)} />
              </ListItemIcon>
              {open && <ListItemText primary={name} />}
            </ListItemButton>

            {open && subTabs && (
              <KeyboardArrowDownIcon
                onClick={() => handleNavigate(name, subTabs)}
                sx={{
                  ...additionalStyles(name),
                  transform:
                    isActiveTab(name) && openSubTabs.includes(name)
                      ? "rotate(180deg)"
                      : "none",
                }}
              />
            )}
          </ListItem>

          {open && subTabs && (
            <Collapse
              in={openSubTabs.includes(name)}
              timeout="auto"
              unmountOnExit
            >
              <Box key={name} sx={{ ml: 6 }}>
                {subTabs.map(({ name }) => (
                  <ListItemButton
                    key={name}
                    sx={{
                      minHeight: 16,
                      justifyContent: open ? "initial" : "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        columnGap: 2,
                        mr: 1,
                      }}
                    >
                      <FiberSmartRecordIcon
                        sx={{ fontSize: 14, ...additionalStyles(name) }}
                      />
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={name}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 14,
                            ...additionalStyles(name),
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                ))}
              </Box>
            </Collapse>
          )}
        </Box>
      ))}
    </List>
  );
};

export default NavList;
