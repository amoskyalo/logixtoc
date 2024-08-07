import { styled, Theme, CSSObject } from '@mui/material/styles';
import { useResponsiveness, useThemeMode } from '@/hooks';
import { useState } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NavList from './NavList';
import Image from 'next/image';
import AppBar from './AppBar';

const drawerWidth = 310;

const openedMixin = (theme: Theme): CSSObject => ({
   width: drawerWidth,
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
   },
});

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   padding: theme.spacing(0, 1),
   ...theme.mixins.toolbar,
}));

const NavBarContainer = styled(Box)<BoxProps & { isMobile: boolean }>(({ theme, isMobile }) => ({
   height: '100%',
   overflow: 'hidden',
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: theme.palette.mode === 'dark' ? '#131a22' : '#f3f4f6',
   width: drawerWidth,
}));

const DesktopDrawer = styled(Drawer, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: 'nowrap',
   boxSizing: 'border-box',
   ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
   }),
}));

const flexStyles = {
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
};

export default function MainBar({ children }: Readonly<{ children: React.ReactNode }>) {
   const { isMobile, isTablet } = useResponsiveness();
   const { isDarkMode } = useThemeMode();
   const [open] = useState(true);
   const [expand, setExpand] = useState(false);

   const SideBar = () => (
      <NavBarContainer isMobile={isMobile || isTablet}>
         <DrawerHeader>
            <Box
               sx={{
                  width: '100%',
                  ...flexStyles,
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                  }}
               >
                  <Image
                     src={isDarkMode ? '/lighticon.png' : '/darkicon.png'}
                     alt="logo"
                     height={40}
                     width={40}
                  />
                  <Image
                     src={isDarkMode ? '/darklogo.png' : '/lightlogo.png'}
                     alt="logo"
                     height={60}
                     width={90}
                  />
               </Box>
               <IconButton onClick={() => setExpand(false)}>
                  <CloseIcon sx={{ color: '#a5acb2' }} />
               </IconButton>
            </Box>
         </DrawerHeader>

         <Divider />
         <Box
            sx={{
               flex: 1,
               overflowY: 'auto',
               px: 1,
               '&::-webkit-scrollbar': {
                  backgroundColor: 'transparent',
                  width: '8px',
               },
               '&::-webkit-scrollbar-thumb': {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
               },
            }}
         >
            <NavList open={open} setExpanded={setExpand} isMobile={isMobile || isTablet} />
         </Box>
      </NavBarContainer>
   );

   return (
      <Box sx={{ display: 'flex', minHeight: '100%' }}>
         <CssBaseline />

         {isMobile || isTablet ? (
            <Drawer open={expand}>
               <SideBar />
            </Drawer>
         ) : (
            <DesktopDrawer variant="permanent" open={open}>
               <SideBar />
            </DesktopDrawer>
         )}

         <Box component="main" sx={{ flexGrow: 1, width: `calc(100% - ${drawerWidth}px)` }}>
            <AppBar open={open} expand={expand} setExpand={setExpand} />
            <Box
               sx={{
                  flexGrow: 1,
                  px: 2,
                  pt: 2,
                  pb: 2,
               }}
            >
               {children}
            </Box>
         </Box>
      </Box>
   );
}
