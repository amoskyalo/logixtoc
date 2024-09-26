'use client';

import { LocationsArrayInterface, APPCRUD } from '@/api';

type Delete = {
    vendorLocationID: number;
};

type Params = {
    VendorLocationTypeID: number;
};

const Locations = () => {
    const UI = new APPCRUD<LocationsArrayInterface, void, Delete, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorLocation',
            deleteUrl: 'deleteVendorLocation',
            params: { VendorLocationTypeID: 0 },
            initialDeleteParams: { vendorLocationID: '' as unknown as number },
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', mobileWidth: 150 },
                { field: 'VendorLocationTypeName', headerName: 'Type', mobileWidth: 150 },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 175 },
            ],
        },
    });

    return UI.render();
};

export default Locations;
