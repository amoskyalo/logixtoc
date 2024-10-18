import { Box, Avatar, Typography, Divider, CircularProgress, Tooltip, Chip, Button } from '@mui/material';
import { MarkerF, InfoWindowF, DirectionsRenderer } from '@react-google-maps/api';
import { customMarker } from '@/Constants';
import { MapComponent } from '@/components/Map';
import { VehicleTracker } from '@/api';
import { styled } from '@mui/styles';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NearMeIcon from '@mui/icons-material/NearMe';

type Props = {
    vehicles: VehicleTracker[];
    activeVehicle: any;
    setActiveVehicle: any;
    directions: any;
    getDirections: any;
    loading: boolean;
};

const StyledContainer = styled(Box)(() => ({
    height: 32,
    width: 32,
    borderRadius: '50%',
    backgroundColor: '#d2f7ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const AssetsTracking = ({ vehicles, activeVehicle, setActiveVehicle, directions, getDirections, loading }: Props) => {
    const { VendorLocationName, DriverName, AverageSpeed, CurrentSpeed, DeliveryPlanStatusName, TrackerTime } = activeVehicle || {};

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <MapComponent zoom={8.5}>
                {vehicles.map((vehicle) => (
                    <MarkerF
                        position={{ lat: parseFloat(vehicle.CurrentLatitude), lng: parseFloat(vehicle.CurrentLongitude) }}
                        onClick={() => {
                            setActiveVehicle(vehicle);
                        }}
                        icon={customMarker()}
                        key={vehicle.DriverName}
                    >
                        {activeVehicle?.VendorLocationName === vehicle.VendorLocationName && (
                            <InfoWindowF position={{ lat: parseFloat(vehicle.CurrentLatitude), lng: parseFloat(vehicle.CurrentLongitude) }}>
                                <Box display={'flex'} flexDirection={'column'} rowGap={1} className="card">
                                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Avatar src="https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" />
                                        <Typography>
                                            {DriverName}
                                            <span className="text-xs text-primaryColor"> ( Driver )</span>
                                        </Typography>
                                    </Box>

                                    <Box display={'flex'} alignItems={'center'} columnGap={2}>
                                        <StyledContainer>
                                            <LocalShippingIcon fontSize="small" />
                                        </StyledContainer>
                                        <Box flex={1}>
                                            <Box display={'flex'} justifyContent={'space-between'}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 14 }}>
                                                        {VendorLocationName}
                                                    </Typography>
                                                    <Chip
                                                        size="small"
                                                        label={DeliveryPlanStatusName}
                                                        sx={{ color: 'green', backgroundColor: '#d2f7ff', borderRadius: 1 }}
                                                    />
                                                </Box>

                                                <Tooltip title="View trip">
                                                    {loading ? (
                                                        <CircularProgress color="inherit" size={18} />
                                                    ) : (
                                                        <NearMeIcon sx={{ cursor: 'pointer' }} onClick={getDirections} />
                                                    )}
                                                </Tooltip>
                                            </Box>
                                            <Divider sx={{ mt: 1 }} />
                                        </Box>
                                    </Box>

                                    <Box display={'flex'} columnGap={2}>
                                        <StyledContainer>
                                            <DeliveryDiningIcon fontSize="small" />
                                        </StyledContainer>
                                        <Box flex={1}>
                                            <Box display={'flex'} columnGap={4}>
                                                {[
                                                    { name: 'Curr. Speed', value: CurrentSpeed },
                                                    { name: 'Avg. Speed', value: AverageSpeed },
                                                ].map(({ name, value }) => (
                                                    <Box key={name}>
                                                        <Typography variant="h6" sx={{ fontSize: 12, opacity: '80%' }}>
                                                            {name}
                                                        </Typography>
                                                        <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600 }}>
                                                            {value}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Divider sx={{ mt: 1 }} />
                                        </Box>
                                    </Box>

                                    <Box display={'flex'} columnGap={2}>
                                        <StyledContainer>
                                            <MobileScreenShareIcon fontSize="small" />
                                        </StyledContainer>
                                        <Box flex={1}>
                                            <Box display={'flex'} columnGap={4}>
                                                {[
                                                    { name: 'Trip Tracking', value: 'ON' },
                                                    { name: 'Last Updated', value: new Date(TrackerTime).toLocaleTimeString() },
                                                ].map(({ name, value }) => (
                                                    <Box key={name}>
                                                        <Typography variant="h6" sx={{ fontSize: 12, opacity: '80%' }}>
                                                            {name}
                                                        </Typography>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontSize: 14,
                                                                fontWeight: 600,
                                                                color: name === 'Trip Tracking' ? 'green' : 'default',
                                                            }}
                                                        >
                                                            {value}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                            <Divider sx={{ mt: 1 }} />
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Button size="small" variant="contained" sx={{ width: '100%', textTransform: 'capitalize' }}>
                                            View Delivery
                                        </Button>
                                    </Box>
                                </Box>
                            </InfoWindowF>
                        )}
                    </MarkerF>
                ))}

                {directions && <DirectionsRenderer directions={directions} />}
            </MapComponent>
        </Box>
    );
};

export default AssetsTracking;
