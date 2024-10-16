import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { VehicleCard } from './Cards';
import { useFetch } from '@/api';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GarageIcon from '@mui/icons-material/Garage';
import ChecklistIcon from '@mui/icons-material/Checklist';
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

const filters = [
    { name: 'All', icon: ChecklistIcon },
    { name: 'Parked', icon: LocalParkingIcon },
    { name: 'Driving', icon: LocalShippingIcon },
    { name: 'Garaged', icon: GarageIcon },
];

const VehiclesNav = () => {
    const { data: vehicles } = useFetch('getVendorTrackerLocation');

    const [searchValue, setSearchValue] = useState('');
    const [filterValue, setFilterValue] = useState('All');
    const [activeVehicle, setActiveVehicle] = useState(null);
    const [routeData, setRouteData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    function applyFilters() {
        return filterValue && filterValue !== 'All'
            ? (vehicles?.Data || []).filter((vehicle: any) => vehicle.DeliveryPlanStatusName.toLowerCase() === filterValue.toLowerCase())
            : vehicles?.Data || [];
    }

    function applySearch() {
        return searchValue
            ? applyFilters()?.filter((vehicle: any) => vehicle.VendorLocationName.toLowerCase().includes(searchValue.toLowerCase()))
            : applyFilters();
    }

    async function getDirections(origin: any, destination: any, waypoints: any) {
        setRouteData(null);
        setLoading(true);

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
                setRouteData(results);

                // if (results.status === google.maps.DirectionsStatus.OK) {
                //     setRouteData(results);
                // } else {
                //     throw new Error(results.status);
                // }

                setLoading(false);
            } catch (error) {
                console.error('An error occurred during route calculation:', error);
            }
        }
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
                {applySearch()!.length > 0 ? (
                    applySearch()!.map((vehicle: any) => (
                        <VehicleCard
                            key={vehicle}
                            vehicle={vehicle}
                            setActiveVehicle={setActiveVehicle}
                            activeVehicle={activeVehicle}
                            loading={loading}
                            vehicles={applySearch()}
                            getDirections={getDirections}
                        />
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
