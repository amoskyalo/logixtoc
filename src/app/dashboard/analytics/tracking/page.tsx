'use client';

import { useCallback, useState } from 'react';
import { SwipeableDialog } from '@/components/Dialogs';
import { AssetsTracking, CustomerDistribution, VehiclesNav, CustomersNav } from './_components';
import { Box, Stack, Chip } from '@mui/material';
import { useResponsiveness } from '@/hooks';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import NavigationIcon from '@mui/icons-material/Navigation';
import PeopleIcon from '@mui/icons-material/People';

const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 99,
    top: 4,
    margin: 'auto',
    width: 'max-content',
    padding: 2,
    borderRadius: 16,
    columnGap: 16,
    backgroundColor: '#f1f5f7',
    marginLeft: '50%',
    marginRight: '50%',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[800],
    }),
}));

const Tracking = () => {
    const [active, setActive] = useState(0);
    const { isMobile } = useResponsiveness();

    const NavigationItems = useCallback(() => {
        return (
            <Stack direction="row" spacing={1}>
                {['Asset Tracking', 'Customer HeatMap'].map((item, index) => (
                    <Chip
                        key={item}
                        icon={index === 0 ? <NavigationIcon fontSize="small" /> : <PeopleIcon fontSize="small" />}
                        label={item}
                        variant={index === active ? 'filled' : 'outlined'}
                        color={index === active ? 'primary' : 'default'}
                        onClick={() => setActive(index)}
                    />
                ))}
            </Stack>
        );
    }, [active]);

    return (
        <Box sx={{ height: '100%', flex: 1, position: 'relative' }}>
            {!isMobile && (
                <StyledBox>
                    <NavigationItems />
                </StyledBox>
            )}

            <Box sx={{ display: 'flex', height: '100%' }}>
                {active === 0 && (
                    <>
                        {!isMobile && <VehiclesNav />}
                        <AssetsTracking />
                    </>
                )}
                {active === 1 && (
                    <>
                        {!isMobile && <CustomersNav />}
                        <CustomerDistribution />
                    </>
                )}
            </Box>

            {isMobile && (
                <SwipeableDialog
                    renderHeader={() => (
                        <Box sx={{ px: 2, py: 2.5 }}>
                            <NavigationItems />
                        </Box>
                    )}
                >
                    {active == 0 && <VehiclesNav />}
                    {active === 1 && <CustomersNav />}
                </SwipeableDialog>
            )}
        </Box>
    );
};

export default Tracking;
