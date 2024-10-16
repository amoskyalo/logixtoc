import { useState } from 'react';
import { MarkerF, HeatmapLayerF } from '@react-google-maps/api';
import { customMarker } from '@/Constants';
import { MapComponent } from '@/components/Map';

const CustomerHeatMap = ({ heatData }: { heatData: any }) => {
    const [map, setMap] = useState<any>(null);

    const google = window.google;

    function markerData() {
        let arr: any[] = [];

        heatData?.VendorLocationArray?.forEach((data: any) => {
            const { CurrentLatitude, CurrentLongitude } = data;
            arr.push({ lat: parseFloat(CurrentLatitude), lng: parseFloat(CurrentLongitude) });
        });

        return arr;
    }

    const heatmapData = heatData?.VendorCustomerHeatMapArray?.map((data: any) => {
        const { Latitude, Longitude, Density } = data;
        return { location: new google.maps.LatLng(parseFloat(Latitude), parseFloat(Longitude)), weight: Density };
    });

    return (
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
    );
};

export default CustomerHeatMap;
