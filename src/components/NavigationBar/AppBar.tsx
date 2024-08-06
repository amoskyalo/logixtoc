'use client';

import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
   MenuList,
   MenuItem,
   ListItemIcon,
   ListItemText,
   Avatar,
   Tooltip,
   Box,
   Toolbar,
   Typography,
   IconButton,
   Badge,
   BoxProps,
} from '@mui/material';
import { Popover } from '../Popover';
import { countries } from '@/Constants';
import { useGetUser, useResponsiveness, useConnectivityStatus } from '@/hooks';
import { ThemeContext } from '@/Context';
import Image from 'next/image';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

const flexStyles = {
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
};

const Bar = styled(Box)<BoxProps & { isSmallScreen: boolean }>(({ theme, isSmallScreen }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#131a22' : '',
   position: 'sticky',
   top: 0,
   width: '100%',
   boxShadow:
      theme.palette.mode === 'dark' && isSmallScreen
         ? '0px 0px 24px rgba(0, 0, 0, 1)'
         : '0px 0px 4px rgba(0, 0, 0, 0.3)',
   backdropFilter: 'blur(24px)',
   WebkitBackdropFilter: 'blur(24px)',
   zIndex: 99,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
   '& .MuiBadge-badge': {
      color: '#44b700',
      margin: 6,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         borderRadius: '50%',
         animation: 'ripple 1.2s infinite ease-in-out',
         border: '1px solid currentColor',
         content: '""',
      },
   },
   '@keyframes ripple': {
      '0%': {
         transform: 'scale(.8)',
         opacity: 1,
      },
      '100%': {
         transform: 'scale(2.4)',
         opacity: 0,
      },
   },
}));

const AppBar = ({
   open,
   setExpand,
   expand,
}: Readonly<{ open: boolean; setExpand: (arg: boolean) => void; expand: boolean }>) => {
   const { isMobile, isTablet } = useResponsiveness();
   const { status } = useConnectivityStatus();
   const { mode, setMode } = useContext(ThemeContext);
   const user = useGetUser();

   const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

   const handleToggleTheme = () => {
      const setModeTo = mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('userTheme', setModeTo);
      setMode(setModeTo);
   };

   return (
      <Bar isSmallScreen={isMobile || isTablet}>
         <Toolbar>
            <Box sx={{ width: '100%', py: isMobile || isTablet ? 1 : 0, ...flexStyles }}>
               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {(!open || isMobile || isTablet) && (
                     <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ marginRight: 1 }}
                        onClick={() => setExpand(!expand)}
                     >
                        <MenuIcon />
                     </IconButton>
                  )}
                  <Box>
                     <Typography variant="caption">
                        Hello {`${user?.FirstName} ${user?.LastName}`}👋
                     </Typography>
                     <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Esque Energy
                     </Typography>
                  </Box>
               </Box>

               <Box sx={{ cursor: 'pointer', ...flexStyles }}>
                  <Box
                     sx={flexStyles}
                     onClick={(event) => {
                        if (anchorEl) {
                           setAnchorEl(null);
                        } else {
                           setAnchorEl(event.currentTarget);
                        }
                     }}
                  >
                     <Image src="/kenya.jpg" height={16} width={24} alt={user?.CountryFlag} />
                     <Typography variant="body1">
                        {user?.CountryFlag?.toLocaleUpperCase()}
                     </Typography>
                     <KeyboardArrowDownIcon />
                  </Box>
                  <Tooltip title={`Turn ${mode === 'light' ? 'off' : 'on'} the light`}>
                     <IconButton onClick={handleToggleTheme}>
                        {mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />}
                     </IconButton>
                  </Tooltip>
                  <StyledBadge
                     variant="dot"
                     color="success"
                     invisible={status === 'offline'}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                     }}
                  >
                     <Avatar
                        sx={{ width: 32, height: 32, ml: 1 }}
                        src={user?.ImageURL}
                        className="profile"
                     />
                  </StyledBadge>
               </Box>

               <Popover
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  handleClose={() => setAnchorEl(null)}
               >
                  <MenuList>
                     {countries.map(({ name, flag }) => (
                        <MenuItem sx={{ minHeight: 10, height: 16, py: 2 }} key={name}>
                           <ListItemIcon>
                              <Image src={flag} height={16} width={24} alt={user?.CountryFlag} />
                           </ListItemIcon>
                           <ListItemText>{name}</ListItemText>
                        </MenuItem>
                     ))}
                  </MenuList>
               </Popover>
            </Box>
         </Toolbar>
      </Bar>
   );
};

export default AppBar;
