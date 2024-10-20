'use client';

import { useState, useContext, useEffect } from 'react';
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
    Stack,
    Divider,
    Chip,
} from '@mui/material';
import { Popover } from '../Popover';
import { countries, profileOptions } from '@/Constants';
import { useGetUser, useResponsiveness, useConnectivityStatus } from '@/hooks';
import { ThemeContext } from '@/Context';
import { DeleteDialog, SearchDialog } from '../Dialogs';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
// import ke from '../../Assets/kenya.jpg';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';

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
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
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

const AppBar = ({ open, setExpand, expand }: Readonly<{ open: boolean; setExpand: (arg: boolean) => void; expand: boolean }>) => {
    const { isMobile, isTablet } = useResponsiveness();
    const { status } = useConnectivityStatus();
    const { mode, setMode } = useContext(ThemeContext);
    const user = useGetUser();
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [menuType, setMenuType] = useState<'countries' | 'profile' | null>(null);
    const [activeProfileOption, setActiveProfileOption] = useState<string | null>(null);
    const [routeSearch, setRouteSearch] = useState(false);

    const handleToggleTheme = () => {
        const setModeTo = mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('userTheme', setModeTo);
        setMode(setModeTo);
    };

    const handlePopover = (event: React.MouseEvent<HTMLElement>, type: 'countries' | 'profile') => {
        if (anchorEl) {
            setAnchorEl(null);
            setMenuType(null);
        } else {
            setAnchorEl(event.currentTarget);
            setMenuType(type);
        }
    };

    const handleProfileOptions = () => {
        setAnchorEl(null);
        setMenuType(null);

        if (activeProfileOption === 'Logout') {
            localStorage.removeItem('user');
            window.location.reload();
        }
    };

    useEffect(() => {
        const cb = (event: KeyboardEvent) => {
            const { key, ctrlKey } = event;

            if (key === 'k' && ctrlKey) {
                event.preventDefault();
                setRouteSearch(true);
            }

            if (key === 'Escape' && !ctrlKey) {
                setRouteSearch(false);
            }
        };

        document.addEventListener('keydown', cb);

        return () => document.removeEventListener('keydown', cb);
    }, []);

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
                            <Typography variant="caption">Hello {`${user?.FirstName} ${user?.LastName}`}👋</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                Esque Energy
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ cursor: 'pointer', ...flexStyles }}>
                        {/* <IconButton sx={{ height: 40, width: 40 }} onClick={(event) => handlePopover(event, 'countries')}>
                            <Image src={ke} height={24} width={24} alt={user?.CountryFlag} className="country" />
                        </IconButton> */}

                        <Tooltip title={`Turn ${mode === 'light' ? 'off' : 'on'} the light`}>
                            <IconButton onClick={handleToggleTheme}>{mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />}</IconButton>
                        </Tooltip>

                        <Stack
                            direction="row"
                            alignItems={'center'}
                            spacing={1}
                            onClick={() => setRouteSearch(true)}
                            sx={{
                                backgroundColor: mode === 'dark' ? '#1d242c' : 'rgba(0, 0, 0, 0.1)',
                                px: 1,
                                py: 0.7,
                                borderRadius: 2,
                                marginRight: 1,
                                marginLeft: 1,
                            }}
                        >
                            <FiSearch />
                            <Stack
                                alignItems={'center'}
                                direction="row"
                                sx={{ backgroundColor: 'white', borderRadius: 1, py: 0.3, px: 0.5, color: 'black' }}
                            >
                                <KeyboardCommandKeyIcon sx={{ fontWeight: 800, fontSize: 12 }} />
                                <Typography sx={{ fontWeight: 800, fontSize: 12 }}>K</Typography>
                            </Stack>
                        </Stack>

                        <StyledBadge
                            variant="dot"
                            color="success"
                            invisible={status === 'offline'}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            onClick={(event) => handlePopover(event, 'profile')}
                        >
                            <Avatar sx={{ width: 32, height: 32, ml: 1 }} src={user?.ImageURL} className="profile" />
                        </StyledBadge>
                    </Box>
                </Box>
            </Toolbar>

            <Popover anchorEl={anchorEl} open={Boolean(anchorEl)} handleClose={() => setAnchorEl(null)}>
                <MenuList>
                    {menuType === 'profile' ? (
                        <>
                            <Box sx={{ width: '100%', paddingX: 2 }}>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <Avatar sx={{ width: 32, height: 32 }} src={user?.ImageURL} className="profile" />
                                    <Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="body2">{`${user?.FirstName} ${user?.LastName}`}</Typography>
                                            <Chip label="Admin" variant="outlined" color="primary" size="small" sx={{ fontSize: '10px' }} />
                                        </Stack>
                                        <Typography variant="caption">{user?.Email}</Typography>
                                    </Stack>
                                </Stack>

                                <Divider sx={{ mt: 2, mb: 1 }} />
                            </Box>
                            {profileOptions.slice(0, 2).map(({ Icon, name }) => (
                                <MenuItem
                                    key={name}
                                    dense={isMobile}
                                    onClick={() => {
                                        setAnchorEl(null);
                                        name  === 'Settings' ? router.push('/dashboard/settings') :  setActiveProfileOption(name);
                                    }}
                                    sx={{ py: 1 }}
                                >
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText>{name}</ListItemText>
                                </MenuItem>
                            ))}

                            <Box sx={{ px: 2, py: 1 }}>
                                <Divider />
                            </Box>

                            {profileOptions.slice(-1).map(({ Icon, name }) => (
                                <MenuItem
                                    key={name}
                                    dense={isMobile}
                                    onClick={() => {
                                        setAnchorEl(null);
                                        setActiveProfileOption(name);
                                    }}
                                    sx={{ color: 'red !important', py: 1 }}
                                >
                                    <ListItemIcon>
                                        <Icon sx={{ color: 'red !important' }} />
                                    </ListItemIcon>
                                    <ListItemText>{name}</ListItemText>
                                </MenuItem>
                            ))}
                        </>
                    ) : (
                        countries.map(({ name, flag }) => (
                            <MenuItem key={name} dense={isMobile}>
                                <ListItemIcon>
                                    <Image src={flag} height={16} width={24} alt={user?.CountryFlag} />
                                </ListItemIcon>
                                <ListItemText>{name}</ListItemText>
                            </MenuItem>
                        ))
                    )}
                </MenuList>
            </Popover>

            <DeleteDialog
                open={Boolean(activeProfileOption)}
                loading={false}
                onOkay={handleProfileOptions}
                onCancel={() => setActiveProfileOption(null)}
                contentText="Are you sure you want to log out? You will be returned to login screen"
                dialogTitle="Log Out"
                onOkayButtonText="Log out"
            />

            <SearchDialog open={routeSearch} onCancel={() => setRouteSearch(false)} />
        </Bar>
    );
};

export default AppBar;
