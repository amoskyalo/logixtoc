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
import { routes } from "@/Constants";
import { usePathname, useRouter } from "next/navigation";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const NavList = ({
  open,
  setExpanded,
  isMobile,
}: Readonly<{
  isMobile: boolean;
  open: boolean;
  setExpanded: (arg: boolean) => void;
}>) => {
  const pathname = usePathname();
  const router = useRouter();

  const [openSubTabs, setOpenSubTabs] = useState<string[]>([]);

  function isActiveTab(path: string, isSubTab?: boolean) {
    if (isSubTab || path === "/dashboard") {
      return pathname === path;
    }

    if (path !== "/dashboard" && pathname.includes(path)) {
      return true;
    }
  }

  function additionalStyles(tab: string, isSubTab?: boolean) {
    return {
      transition: "color 0.5s ease",
      color: isActiveTab(tab, isSubTab)
        ? "rgba(255, 255, 255,0.8)"
        : "rgba(255, 255, 255, 0.4)",
    };
  }

  function handleNavigate(
    name: string,
    path: string,
    subTabs?: Array<{ name: string }>
  ) {
    if (!subTabs) {
      router.push(path);
    }

    if (openSubTabs.includes(name)) {
      setOpenSubTabs((prev) => prev.filter((t) => t != name));
    } else {
      setOpenSubTabs((prev) => [...prev, name]);
    }

    if (isMobile && !subTabs) {
      setExpanded(false);
    }
  }

  return (
    <List>
      {routes.map(({ name, Icon, subTabs, path }) => (
        <Box key={name}>
          <ListItem
            onClick={() => handleNavigate(name, path, subTabs)}
            disablePadding
            sx={{
              display: "flex",
              transition: "background-color 0.9s ease",
              borderRadius: 1,
              pr: open ? 1 : 0,
              ...(isActiveTab(path)
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
                onClick={() => handleNavigate(name, path, subTabs)}
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
                {subTabs.map(({ name, path }) => (
                  <ListItemButton
                    key={name}
                    sx={{
                      minHeight: 16,
                      justifyContent: open ? "initial" : "center",
                    }}
                    onClick={() => handleNavigate(name, path)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        columnGap: 2,
                        mr: 1,
                      }}
                    >
                      <FiberSmartRecordIcon
                        sx={{ fontSize: 14, ...additionalStyles(path) }}
                      />
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={name}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 14,
                            ...additionalStyles(path),
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
