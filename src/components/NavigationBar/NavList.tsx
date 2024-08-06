import { useState } from 'react';
import {
   Box,
   List,
   ListItem,
   Collapse,
   ListItemIcon,
   ListItemText,
   ListItemButton,
   Stack,
} from '@mui/material';
import { routes } from '@/Constants';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeMode } from '@/hooks';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
   const { isDarkMode } = useThemeMode();

   const [openSubTabs, setOpenSubTabs] = useState<string[]>([]);

   const color = isDarkMode ? '#31c886' : '#10333f';
   const backgroundColor = isDarkMode ? '#122627' : 'rgba(16, 51, 63, 0.2)';

   function isActiveTab(path: string, isSubTab?: boolean) {
      if (isSubTab || path === '/dashboard') {
         return pathname === path;
      }

      if (path !== '/dashboard' && pathname.includes(path)) {
         return true;
      }
   }

   function additionalStyles(tab: string, isSubTab?: boolean) {
      return {
         transition: 'color 0.5s ease',
         color: isActiveTab(tab, isSubTab) ? color : '#a5acb2',
      };
   }

   function handleNavigate(name: string, path: string, subTabs?: Array<{ name: string }>) {
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
                     display: 'flex',
                     transition: 'background-color 0.3s ease',
                     borderRadius: 1,
                     ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 1,
                     },
                     marginBottom: 1,
                     ...(isActiveTab(path) ? { backgroundColor } : {}),
                  }}
               >
                  <ListItemButton
                     sx={{
                        minHeight: 44,
                        height: 44,
                        justifyContent: open ? 'initial' : 'center',
                        ...additionalStyles(path),
                     }}
                  >
                     <ListItemIcon
                        sx={{
                           minWidth: 0,
                           mr: open ? 1.5 : 'auto',
                           justifyContent: 'center',
                        }}
                     >
                        <Icon sx={{ fontSize: 20, ...additionalStyles(path) }} />
                     </ListItemIcon>
                     {open && (
                        <ListItemText
                           primary={name}
                           sx={{
                              '& .MuiTypography-root': {
                                 fontWeight: 600,
                                 ...additionalStyles(path),
                              },
                           }}
                        />
                     )}

                     {open && subTabs && (
                        <KeyboardArrowRightIcon
                           onClick={() => handleNavigate(name, path, subTabs)}
                           sx={{
                              ...additionalStyles(name),
                              transform:
                                 isActiveTab(name) && openSubTabs.includes(name)
                                    ? 'rotate(180deg)'
                                    : 'none',
                           }}
                        />
                     )}
                  </ListItemButton>
               </ListItem>

               {open && subTabs && (
                  <Collapse in={openSubTabs.includes(name)} timeout="auto" unmountOnExit>
                     <Stack
                        key={name}
                        direction="row"
                        sx={{
                           borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
                           ml: 4,
                           mt: 0.5,
                        }}
                     >
                        <Stack sx={{ width: '100%' }}>
                           {subTabs.map(({ name, path }) => (
                              <ListItemButton
                                 key={name}
                                 sx={{
                                    minHeight: 16,
                                    height: 42,
                                    justifyContent: open ? 'initial' : 'center',
                                    width: '100%',
                                    borderRadius: 2,
                                    ':hover': {
                                       backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                 }}
                                 onClick={() => handleNavigate(name, path)}
                              >
                                 {open && (
                                    <ListItemText
                                       primary={name}
                                       sx={{
                                          '& .MuiTypography-root': {
                                             fontSize: 16,
                                             ...additionalStyles(path),
                                          },
                                       }}
                                    />
                                 )}
                              </ListItemButton>
                           ))}
                        </Stack>
                     </Stack>
                  </Collapse>
               )}
            </Box>
         ))}
      </List>
   );
};

export default NavList;
