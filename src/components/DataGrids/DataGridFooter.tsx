import { Pagination, Box, Divider, Stack, Typography, MenuList, MenuItem } from '@mui/material';
import { useResponsiveness, useSetSearchParams } from '@/hooks';
import { useState } from 'react';
import { Popover } from '../Popover';
import { DataGridFooterProps } from './types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DataGridFooter = (props: DataGridFooterProps) => {
    const { loading, pageSize, ...otherProps } = props;
    const { isMobile } = useResponsiveness();
    const setParams = useSetSearchParams();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    return (
        <Box>
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={5} sx={{ p: 2 }}>
                {!isMobile && (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="body1">Rows per page:</Typography>
                        <Stack direction="row" alignItems="center" onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ cursor: 'pointer' }}>
                            <Typography variant="body1">{pageSize}</Typography>
                            <ArrowDropDownIcon fontSize="medium" />
                        </Stack>
                    </Stack>
                )}

                <Pagination variant="outlined" shape="rounded" disabled={loading} {...otherProps} />
            </Stack>

            <Popover anchorEl={anchorEl} open={Boolean(anchorEl)} handleClose={() => setAnchorEl(null)}>
                <MenuList>
                    {[10, 25, 50, 75, 100].map((size) => (
                        <MenuItem onClick={() => setParams({'PageSize': size})} key={size}>
                            {size}
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </Box>
    );
};

export default DataGridFooter;
