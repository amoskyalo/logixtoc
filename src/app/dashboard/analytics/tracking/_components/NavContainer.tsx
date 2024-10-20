import { useEffect, useState } from 'react';
import { Box, Typography, Divider, IconButton, OutlinedInput, Badge, InputAdornment, MenuItem } from '@mui/material';
import { useResponsiveness } from '@/hooks';
import { Popover } from '@/components/Popover';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';

type Props = {
    title: string;
    setSearchValue: any;
    setFilterValue: any;
    searchValue: string;
    filterValue: string;
    filterOptions: Array<{ name: string; icon: any }>;
    children: React.ReactNode;
};
const NavContainer = ({ title, setSearchValue, searchValue, filterValue, filterOptions, setFilterValue, children }: Props) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);
    const { isMobile } = useResponsiveness();

    return (
        <Box
            sx={{
                width: isMobile ? '100%' : 600,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: isMobile ? 0 : 2,
                    paddingY: 1,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, opacity: '80%' }}>
                    {title}
                </Typography>

                {!isMobile && (
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>

            {!isMobile && <Divider />}

            <Box
                sx={{
                    display: 'flex',
                    paddingY: 2,
                    paddingX: isMobile ? 0 : 2,
                    columnGap: 1,
                    alignItems: 'center',
                    top: 0,
                    zIndex: 99,
                }}
            >
                <OutlinedInput
                    sx={{ flex: 1 }}
                    size="small"
                    placeholder="Search..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue || ''}
                    endAdornment={
                        searchValue && (
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={() => setSearchValue(null)} edge="end">
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                />
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                    <Badge color="secondary" variant="dot" invisible={filterValue === 'All'}>
                        <TuneIcon />
                    </Badge>
                </IconButton>

                <Popover anchorEl={anchorEl} open={open} handleClose={() => setAnchorEl(null)}>
                    {filterOptions.map(({ icon, name }) => (
                        <MenuItem
                            key={name}
                            onClick={() => {
                                setAnchorEl(null);
                                setFilterValue(name);
                            }}
                            dense={isMobile}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Popover>
            </Box>

            <Divider />

            <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
    );
};

export default NavContainer;
