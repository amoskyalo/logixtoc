import { Dialog, DialogTitle, TextField, Box, Divider, Typography } from '@mui/material';
import { routes } from '@/Constants';
import { useCallback, useState } from 'react';
import { useThemeMode, useResponsiveness } from '@/hooks';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const SearchDialog = ({ open, onCancel }: { open: boolean; onCancel: any }) => {
    const { isDarkMode } = useThemeMode();
    const { isMobile } = useResponsiveness();

    const [search, setSearch] = useState('');

    const routesList = useCallback(() => {
        const r = new Set();

        routes.forEach((route) => {
            if (route.subTabs) {
                route.subTabs.forEach((subTab) => r.add(subTab));
            } else {
                r.add(route);
            }
        });

        const list: any[] = Array.from(r);

        return list.filter((route: any) => route.name.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="sm"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                <TextField
                    fullWidth
                    placeholder="Search..."
                    variant="standard"
                    onChange={(event) => setSearch(event.target.value)}
                    value={search || ''}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <Box sx={{ pr: 0.5 }}>
                                <SearchIcon />
                            </Box>
                        ),
                        endAdornment: (
                            <Box sx={{ backgroundColor: isDarkMode ? '' : '#ecedef', paddingX: 0.5, paddingY: 0.2, borderRadius: 1 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Esc</Typography>
                            </Box>
                        ),
                    }}
                />
            </DialogTitle>

            <Divider />

            <Box sx={{ height: '400px', overflowY: isMobile ? 'scroll' : 'hidden', p: 2, ':hover': { overflowY: 'scroll' } }} id="side_bar">
                {routesList().map(({ name, path }) => (
                    <Box
                        key={name}
                        sx={{
                            borderBottom: isDarkMode ? '1px dotted rgba(255, 255, 255, 0.1)' : '1px dotted rgba(0, 0, 0, 0.1)',
                            px: 3,
                            py: 1,
                            overflow: 'hidden',
                            width: '100%',
                            cursor: 'pointer',
                            ':hover': {
                                border: '1px dotted #31c886',
                                backgroundColor: 'rgba(47, 194, 131, 0.1)',
                                borderRadius: '5px',
                            },
                        }}
                    >
                        <Link href={path} onClick={onCancel}>
                            <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    opacity: '60%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: 'block',
                                    maxWidth: '100%',
                                }}
                            >
                                {path}
                            </Typography>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Dialog>
    );
};

export default SearchDialog;
