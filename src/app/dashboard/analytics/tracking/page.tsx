'use client';

import { useCallback, useState } from 'react';
import { SwipeableDialog } from '@/components/Dialogs';
import { AssetsTracking, CustomerDistribution, VehiclesNav, CustomersNav } from './_components';
import { Box, Stack, Chip } from '@mui/material';
import { useResponsiveness } from '@/hooks';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { useFetch, VehicleTracker } from '@/api';
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
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const [activeVehicle, setActiveVehicle] = useState<null | VehicleTracker>(null);
    const [directions, setDirections] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const { isMobile } = useResponsiveness();
    const { data: vehicles } = useFetch<VehicleTracker, void>('getVendorTrackerLocation');

    const handleSetActiveVehicle = (arg: VehicleTracker) => {
        setDirections(null);
        setActiveVehicle(arg);
        setOpen(false);
    };

    async function getDirections() {
        if (activeVehicle) {
            setDirections(null);
            setLoading(true);

            const { CurrentLatitude, CurrentLongitude, WaypointsArray } = activeVehicle;

            const origin = { lat: parseFloat(CurrentLatitude), lng: parseFloat(CurrentLongitude) };
            const destination = {
                lat: parseFloat(WaypointsArray[0].GPSLatitude),
                lng: parseFloat(WaypointsArray[0].GPSLongitude),
            };
            const waypoints = WaypointsArray;

            const google = window.google;
            let arr = new Set();

            for (let waypoint of waypoints) {
                arr.add({ location: { lat: parseFloat(waypoint.GPSLatitude), lng: parseFloat(waypoint.GPSLongitude) } });
            }

            const obj = {
                origin: { location: origin },
                destination: { location: destination },
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: Array.from(arr) as any,
            };

            if (google && origin && destination) {
                const directionsService = new google.maps.DirectionsService();

                try {
                    const results = await directionsService.route(obj);
                    setDirections(results);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.error('An error occurred during route calculation:', error);
                }
            }
        }
    }

    const NavigationItems = useCallback(() => {
        return (
            <Stack direction="row" spacing={1}>
                {['Asset Tracking', 'Customer HeatMap'].map((item, index) => (
                    <Chip
                        key={item}
                        icon={index === 0 ? <NavigationIcon fontSize="small" /> : <PeopleIcon fontSize="small" />}
                        label={item}
                        variant={index === active ? 'filled' : 'outlined'}
                        color="primary"
                        onClick={() => {
                            setActive(index);
                            setActiveVehicle(null);
                            setDirections(null);
                        }}
                    />
                ))}
            </Stack>
        );
    }, [active]);

    const props = {
        vehicles: vehicles?.Data || [],
        setActiveVehicle: handleSetActiveVehicle,
        getDirections,
        loading,
    };

    return (
        <Box sx={{ height: '100%', position: 'relative' }}>
            {!isMobile && (
                <StyledBox>
                    <NavigationItems />
                </StyledBox>
            )}

            <Box sx={{ display: 'flex', height: '100%' }}>
                {active === 0 && (
                    <>
                        {!isMobile && <VehiclesNav {...props} />}
                        <AssetsTracking directions={directions} activeVehicle={activeVehicle} {...props} />
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
                    open={open}
                    setOpen={setOpen}
                    renderHeader={() => (
                        <Box sx={{ px: 2, py: 2.5 }}>
                            <NavigationItems />
                        </Box>
                    )}
                >
                    {active == 0 && <VehiclesNav {...props} />}
                    {active === 1 && <CustomersNav />}
                </SwipeableDialog>
            )}
        </Box>
    );
};

export default Tracking;
