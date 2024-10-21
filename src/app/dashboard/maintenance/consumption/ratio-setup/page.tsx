'use client';

import { APPCRUD } from '@/api';

type Values = {
    acceptedDeviation: string;
    fuelConsumption: string;
    vendorLocationFuelSetUpName: string;
    locationsArray: any[];
};

const RatioSetup = () => {
    const UI = new APPCRUD<any, Values, void, void>({
        grid: {
            fetchUrl: 'getVendorLocationFuelSetup',
            actions: ['delete'],
            columns: [
                { field: 'VendorLocationFuelSetupName', headerName: 'Vehicle Class', mobileWidth: 150 },
                { field: 'FuelConsumption', headerName: 'Fuel Consumption', mobileWidth: 180 },
                { field: 'AcceptedDeviation', headerName: 'Accepted Deviation', mobileWidth: 180 },
                { field: 'VehicleCount', headerName: 'Vehicle Count', mobileWidth: 150, type: "number", valueGetter: (__, { LocationArray }) => LocationArray.length },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 150},
            ],
        },
        form: {
            type: 'normal',
            title: 'Add Ne Vehicle Category',
            submitKey: 'postVendorLocationFuelSetup',
            initialValues: {
                acceptedDeviation: '',
                fuelConsumption: '',
                vendorLocationFuelSetUpName: '',
                locationsArray: [],
            },
            modifyData: ({ locationsArray, ...rest }) => ({ ...rest, vendorLocationArray: locationsArray }),
            inputs: [
                { label: 'Truck Type', type: 'text', key: 'vendorLocationFuelSetUpName', validate: true },
                { label: 'Consumption Per Litre', type: 'number', key: 'fuelConsumption', validate: true },
                { label: 'Accepted Mileage Deviation', type: 'number', key: 'acceptedDeviation', validate: true },
                { label: 'Vehicles', type: 'mulipleLocation', key: 'locationsArray', validate: true },
            ],
        },
    });

    return UI.render();
};

export default RatioSetup;
