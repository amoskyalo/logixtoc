import { useState } from 'react';
import { Box, Stack, Typography, Divider, Chip } from '@mui/material';
import { VehicleTracker } from '@/api';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GarageIcon from '@mui/icons-material/Garage';
import ChecklistIcon from '@mui/icons-material/Checklist';
import NearMeIcon from '@mui/icons-material/NearMe';
import NavContainer from './NavContainer';
import Lottie from 'react-lottie';
import * as truck from '../../../../../Assets/Gifs/truck.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: truck,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

type Props = {
    vehicles: VehicleTracker[];
    setActiveVehicle: any;
    getDirections: any;
    loading: boolean;
};

const filters = [
    { name: 'All', icon: ChecklistIcon },
    { name: 'Parked', icon: LocalParkingIcon },
    { name: 'Driving', icon: LocalShippingIcon },
    { name: 'Garaged', icon: GarageIcon },
];

const VehiclesNav = ({ vehicles, setActiveVehicle, getDirections, loading }: Props) => {
    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('All');

    function applyFilters() {
        return filterValue && filterValue !== 'All'
            ? vehicles.filter((vehicle: any) => vehicle.DeliveryPlanStatusName.toLowerCase() === filterValue.toLowerCase())
            : vehicles;
    }

    function applySearch() {
        return searchValue
            ? applyFilters()?.filter((vehicle: any) => vehicle.VendorLocationName.toLowerCase().includes(searchValue.toLowerCase()))
            : applyFilters();
    }

    return (
        <NavContainer
            setSearchValue={setSearchValue}
            setFilterValue={setFilterValue}
            searchValue={searchValue}
            filterValue={filterValue}
            filterOptions={filters}
            title="Active Vehicles"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    height: '100%',
                }}
            >
                {applySearch().length > 0 ? (
                    applySearch().map((vehicle) => (
                        <Stack key={vehicle.DriverName} onClick={() => setActiveVehicle(vehicle)} direction="column">
                            <Box
                                sx={{
                                    columnGap: 2,
                                    paddingX: 2,
                                    paddingTop: 2,
                                    cursor: 'pointer',
                                    paddingBottom: 2,
                                    ':hover': {
                                        backgroundColor: '#e7edf4',
                                    },
                                }}
                            >
                                <Box display={'flex'} flex={1} justifyContent={'space-between'}>
                                    <Box>
                                        <Typography variant="h4">{vehicle.VendorLocationName}</Typography>
                                        <Typography variant="caption">{new Date(vehicle.TrackerTime).toDateString()}</Typography>
                                    </Box>

                                    <Chip
                                        label="Trip"
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        disabled={loading}
                                        onClick={() => {
                                            setActiveVehicle(vehicle);
                                            getDirections();
                                        }}
                                        icon={<NearMeIcon fontSize="small" />}
                                    />
                                </Box>
                            </Box>

                            {vehicles.indexOf(vehicle) !== vehicles.length - 1 && <Divider />}
                        </Stack>
                    ))
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <Box>
                            <Lottie options={defaultOptions} height={300} width={300} />
                            {/* <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                                No vehicles to found!
                            </Typography> */}
                        </Box>
                    </Box>
                )}
            </Box>
        </NavContainer>
    );
};

export default VehiclesNav;
