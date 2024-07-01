import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useResponsiveness, useGetUser } from "@/hooks";
import { useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NavList from "./NavList";
import Image from "next/image";

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  isMobile?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  color: "#5F6165",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)",
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MainBar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isMobile } = useResponsiveness();
  const { FirstName, LastName } = useGetUser();
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);

  const handleDrawerOpen = () => {
    isMobile ? setExpand(!expand) : setOpen(true);
  };

  const handleDrawerClose = () => {
    isMobile ? setExpand(!expand) : setOpen(false);
  };

  const SideBar = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#10333f",
          height: "100%",
          color: "white",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHeader>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image src="/iconlogo.png" alt="logo" height={40} width={40} />
              <Image src="/mainlogo.png" alt="logo" height={60} width={90} />
            </Box>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon sx={{ color: "rgba(255, 255, 255, .7)" }} />
            </IconButton>
          </Box>
        </DrawerHeader>

        <Divider />

        <Box sx={{ flex: 1, overflowY: "auto", px: 1 }} id="side_bar">
          <NavList open={open} />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open && !isMobile}>
        <Toolbar>
          {(!open || isMobile) && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box>
            <Typography variant="caption">
              Hello {`${FirstName} ${LastName}`}👋
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              ESQUE ENERGY
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Box
          sx={{
            position: "fixed",
            left: expand ? 0 : -1000,
            top: 0,
            width: drawerWidth,
            zIndex: 999999,
            height: "100vh",
            transition: "left 0.9s ease-in-out",
          }}
        >
          <SideBar />
        </Box>
      ) : (
        <Drawer variant="permanent" open={open}>
          <SideBar />
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "hidden" }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
