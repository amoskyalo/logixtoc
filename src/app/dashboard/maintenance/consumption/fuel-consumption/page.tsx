'use client';

import { APPCRUD } from '@/api';

type Params = {VendorLocationID: number};

const FuelConsumption = () => {
    const UI = new APPCRUD<any, void, void, Params>({
        grid: {
            fetchUrl: 'getVendorLocationFuelConsumption',
            params: {VendorLocationID: 0},
            columns: [
                { field: 'VendorLocationName', headerName: 'Vehicle', width: 150 },
                { field: 'VendorLocationFuelSetUpName', headerName: 'Type', width: 150 },
                { field: 'FuelConsumption', headerName: 'Expected Consumption(KM/h)', width: 250, type: 'number' },
                { field: 'FirstRequestMileage', headerName: 'Initial Mileage', width: 180, type: 'number' },
                { field: 'LatestRequestMileage', headerName: 'Latest Mileage', width: 170, type: 'number' },
                { field: 'TotalFueledQuantity', headerName: 'Total Fuel', width: 150, type: 'number' },
                { field: 'AveragePerKM', headerName: 'Average Consumption KM/h', width: 250, type: 'number' },
            ],
        },
    });

    return UI.render();
};

export default FuelConsumption;
