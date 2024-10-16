import React from 'react';
import { Box, Typography, Divider, Badge, CircularProgress, Chip, Avatar, BadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import NearMeIcon from '@mui/icons-material/NearMe';
import Icon from '../../../../Assets/Icons/carIcon.png';

type Props = {
    vehicles: any;
    vehicle: any;
    setActiveVehicle: any;
    activeVehicle: any;
    loading: boolean;
    getDirections: any;
};

type Badge = BadgeProps & { vehicle: any };

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        color: '#44b700',
        backgroundColor: status === 'driving' ? '#44b700' : status === 'garaged' ? 'red' : '#10333f',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: status === 'driving' ? '1px solid currentColor' : '',
            content: '""',
        },
    },
    // ...(status === 'driving'
    //     ? {
    //           '@keyframes ripple': {
    //               '0%': {
    //                   transform: 'scale(.8)',
    //                   opacity: 1,
    //               },
    //               '100%': {
    //                   transform: 'scale(2.4)',
    //                   opacity: 0,
    //               },
    //           },
    //       }
    //     : {}),
    backgroundColor: '#e7edf4',
    borderRadius: '50%',
    padding: 2,
}));

const VehicleCard = ({ vehicles, vehicle, setActiveVehicle, activeVehicle, loading, getDirections }: Props) => {
    return (
        <Box onClick={() => setActiveVehicle(vehicle)}>
            <Box
                sx={{
                    display: 'flex',
                    columnGap: 2,
                    paddingX: 2,
                    paddingTop: 2,
                    cursor: 'pointer',
                    paddingBottom: 2,
                    backgroundColor: activeVehicle?.name === vehicle?.name ? '#e7edf4' : 'transparent',
                    ':hover': {
                        backgroundColor: '#e7edf4',
                    },
                }}
            >
                <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'left' }} variant="dot">
                    {/* <Avatar alt="Car" src={Icon} /> */}
                </StyledBadge>
                <Box display={'flex'} flex={1} justifyContent={'space-between'}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16, color: '#10333f' }}>
                            {vehicle.VendorLocationName}
                        </Typography>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="h6" sx={{ fontSize: 14 }}>
                                {new Date(vehicle.TrackerTime).toDateString()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* {loading && activeVehicle?.name === vehicle?.name ? <CircularProgress color='inherit' size={18} /> :
                        <Chip
                            label="Trip"
                            size="small"
                            onClick={() => getDirections(vehicle?.currentLocation, vehicle?.destination)}
                            avatar={
                                <Avatar sx={{ backgroundColor: "transparent" }}>
                                    <NearMeIcon sx={{ cursor: "pointer", opacity: "80%", fontSize: 20 }} />
                                </Avatar>
                            }
                        />} */}

                    <Chip
                        label="Trip"
                        size="small"
                        onClick={() => getDirections(vehicle?.currentLocation, vehicle?.destination)}
                        avatar={
                            <Avatar sx={{ backgroundColor: 'transparent' }}>
                                <NearMeIcon sx={{ cursor: 'pointer', opacity: '80%', fontSize: 20 }} />
                            </Avatar>
                        }
                    />
                </Box>
            </Box>

            {vehicles.indexOf(vehicle) !== vehicles.length - 1 && <Divider />}
        </Box>
    );
};

export default VehicleCard;
