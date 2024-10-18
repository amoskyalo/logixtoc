import { useState } from 'react';
import { MarkerF, HeatmapLayerF } from '@react-google-maps/api';
import { customMarker } from '@/Constants';
import { axiosPrivate, urls, HeatmapData, VehicleTracker } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';
import { MapComponent } from '@/components/Map';
import { snackbarToast } from '@/components/Snackbar';

type Response = {
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
    Data: {
        VendorLocationArray: VehicleTracker[];
        VendorCustomerHeatMapArray: HeatmapData[];
    };
};

const CustomerDistribution = () => {
    const [map, setMap] = useState<any>(null);

    const { data: customerHeatMapData } = useQuery<Response>({
        queryKey: ['customerHeatMap'],
        queryFn: async () => {
            try {
                const response = await axiosPrivate.get(urls['getVendorCustomerHeatMap'], {
                    params: {
                        VendorLocationID: 0,
                        VendorRegionID: 0,
                    },
                });

                return response.data;
            } catch (error: any) {
                if (error?.message === 'Network Error') {
                    snackbarToast.error('Ooops! No internet connection.');
                } else {
                    snackbarToast.error(error?.message);
                }
            }
        },
    });

    const google = window.google;

    function markerData() {
        let arr: any[] = [];

        customerHeatMapData?.Data?.VendorLocationArray?.forEach((data: any) => {
            const { CurrentLatitude, CurrentLongitude } = data;
            arr.push({ lat: parseFloat(CurrentLatitude), lng: parseFloat(CurrentLongitude) });
        });

        return arr;
    }

    const heatmapData = customerHeatMapData?.Data.VendorCustomerHeatMapArray?.map((data: any) => {
        const { Latitude, Longitude, Density } = data;
        return { location: new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude)), weight: Density };
    });

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <MapComponent onLoad={(map) => setMap(map)} zoom={10}>
                {map && heatmapData && (
                    <>
                        <HeatmapLayerF
                            options={{
                                radius: 50,
                            }}
                            data={heatmapData}
                        />
                        {markerData().map(({ lat, lng }) => (
                            <MarkerF position={{ lat, lng }} icon={customMarker()} key={lat} />
                        ))}
                    </>
                )}
            </MapComponent>
        </Box>
    );
};

export default CustomerDistribution;
