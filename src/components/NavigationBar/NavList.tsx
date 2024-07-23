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

   const [openSubTabs, setOpenSubTabs] = useState<string[]>([]);

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
         color: isActiveTab(tab, isSubTab) ? 'rgba(255, 255, 255,0.8)' : 'rgba(255, 255, 255, 0.4)',
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
                     borderRadius: 2,
                     ':hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                     },
                     ...(isActiveTab(path) ? { backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}),
                  }}
               >
                  <ListItemButton
                     sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        ...additionalStyles(name),
                     }}
                  >
                     <ListItemIcon
                        sx={{
                           minWidth: 0,
                           mr: open ? 1.5 : 'auto',
                           justifyContent: 'center',
                        }}
                     >
                        <Icon sx={additionalStyles(name)} />
                     </ListItemIcon>
                     {open && <ListItemText primary={name} />}

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
