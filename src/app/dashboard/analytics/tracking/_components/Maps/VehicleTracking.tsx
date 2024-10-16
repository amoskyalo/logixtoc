import { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, InfoWindowF, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { customMarker } from '@/Constants';
import { MapComponent } from '@/components/Map';
// import InfoCard from './Cards/InfoCard';

const VehicleTracking = () => {
    // const [active, setActive] = useState(activeVehicle);

    // useEffect(() => {
    //     setActive(activeVehicle)
    // }, [activeVehicle]);

    return (
        <MapComponent zoom={8.5}>
            {/* {vehicles.map((vehicle) => (
                    <MarkerF
                        position={{ lat: parseFloat(vehicle.CurrentLatitude), lng: parseFloat(vehicle.CurrentLongitude) }}
                        onClick={() => { setActive(vehicle); setActiveVehicle(vehicle) }}
                        icon={customMarker()}
                        key={vehicle}
                    >
                        {active?.VendorLocationName === vehicle.VendorLocationName &&
                            <InfoWindowF position={{ lat: parseFloat(vehicle.CurrentLatitude), lng: parseFloat(vehicle.CurrentLongitude) }}>
                                <InfoCard loading={loading} vehicle={active} getDirections={getDirections} />
                            </InfoWindowF>
                        }
                    </MarkerF>
                ))}

                {directions && <DirectionsRenderer directions={directions} />} */}
        </MapComponent>
    );
};

export default VehicleTracking;
