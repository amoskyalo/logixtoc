import { useState, useCallback } from 'react';
import { Box, List, ListItem, Collapse, ListItemIcon, ListItemText, ListItemButton, Stack } from '@mui/material';
import { routes } from '@/Constants';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeMode } from '@/hooks';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {
    isMobile: boolean;
    open: boolean;
    setExpanded: (arg: boolean) => void;
};
const NavList = ({ open, setExpanded, isMobile }: Readonly<Props>) => {
    const pathname = usePathname();
    const router = useRouter();
    const { isDarkMode } = useThemeMode();

    const [openSubTabs, setOpenSubTabs] = useState<string[]>([]);

    const color = isDarkMode ? '#31c886' : '#10333f';
    const backgroundColor = isDarkMode ? '#122627' : 'rgba(16, 51, 63, 0.2)';

    const isActiveTab = useCallback(
        (path: string, isSubTab?: boolean) => {
            if (isSubTab || path === '/dashboard') {
                return pathname === path;
            }
            if (path !== '/dashboard' && pathname.includes(path)) {
                return true;
            }
        },
        [pathname],
    );

    const additionalStyles = useCallback(
        (tab: string, isSubTab?: boolean) => ({
            transition: 'color 0.5s ease',
            color: isActiveTab(tab, isSubTab) ? color : '#a5acb2',
        }),
        [isActiveTab, color],
    );

    const handleNavigate = useCallback(
        (name: string, path: string, subTabs?: Array<{ name: string }>) => {
            if (!subTabs) {
                router.push(path);
            }

            if (openSubTabs.includes(name)) {
                setOpenSubTabs((prev) => prev.filter((t) => t !== name));
            } else {
                setOpenSubTabs((prev) => [...prev, name]);
            }

            if (isMobile && !subTabs) {
                setExpanded(false);
            }
        },
        [openSubTabs, isMobile, router, setExpanded],
    );

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
                            marginBottom: 1,
                            backgroundColor: isActiveTab(path) ? backgroundColor : 'transparent',
                            ...(isMobile
                                ? {}
                                : {
                                      ':hover': {
                                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(16, 51, 63, 0.1)',
                                          borderRadius: 1,
                                      },
                                  }),
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
                                        transform: openSubTabs.includes(name) ? 'rotate(90deg)' : 'none',
                                        transition: 'transform 0.3s ease-in-out',
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
                                    borderLeft: isDarkMode ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid rgba(16, 51, 63, 0.2)',
                                    ml: 4,
                                    mt: 0.5,
                                }}
                            >
                                <Stack sx={{ width: '100%' }}>
                                    {subTabs.map(({ name, path }) => (
                                        <Stack direction="row" key={name}>
                                            <Box
                                                sx={{
                                                    width: '20px',
                                                    height: '22px',
                                                    borderBottomLeftRadius: '10px',
                                                    borderBottom: isDarkMode
                                                        ? '2px solid rgba(255, 255, 255, 0.2)'
                                                        : '2px solid rgba(16, 51, 63, 0.2)',
                                                }}
                                            />

                                            <ListItemButton
                                                sx={{
                                                    minHeight: 14,
                                                    height: 40,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    width: '100%',
                                                    borderRadius: 2,
                                                    ':hover': {
                                                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(16, 51, 63, 0.1)',
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
                                                                fontWeight: 600,
                                                                ...additionalStyles(path),
                                                            },
                                                        }}
                                                    />
                                                )}
                                            </ListItemButton>
                                        </Stack>
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
