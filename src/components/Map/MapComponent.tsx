import { useMemo } from 'react';
import { GoogleMap, useLoadScript, GoogleMapProps } from '@react-google-maps/api';
import { Box } from '@mui/material';
import { useThemeMode } from '@/hooks';
import { mapColors } from '@/Constants';

const libraries: any = ['visualization']

const MapComponent = ({ children, ...rest }: { children?: React.ReactNode } & GoogleMapProps) => {
    const { isDarkMode } = useThemeMode();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries,
    });

    const center = useMemo(() => ({ lat: -1.2921, lng: 36.8219 }), []);

    const mapStyles = useMemo(() => mapColors, []);

    const mapOptions = useMemo(
        () => ({
            mapTypeControl: false,
            styles: isDarkMode ? mapStyles : [],
        }),
        [isDarkMode, mapStyles],
    );

    return (
        isLoaded && (
            <Box sx={{ flex: 1, height: '100%' }}>
                <GoogleMap mapContainerClassName="map-container" center={center} options={mapOptions} {...rest}>
                    {children}
                </GoogleMap>
            </Box>
        )
    );
};

export default MapComponent;
