'use client';

import { AssignedLocationObject, APPCRUD } from '@/api';

type Params = { VendorLocationID: number };

type Delete = { vendorLocationAssignmentID: number };

type Values = {
    vendorLocationID: number;
    locationsArray: Array<{
        locationID: number;
        locationName: string;
    }>;
};

const AssignedLocations = () => {
    const UI = new APPCRUD<AssignedLocationObject, Values, Delete, Params>({
        grid: {
            showDates: false,
            actions: ['delete'],
            fetchUrl: 'getVendorLocationAssignedLocation',
            deleteUrl: 'deleteAssignedLocation',
            initialDeleteParams: { vendorLocationAssignmentID: '' as unknown as number },
            params: { VendorLocationID: 0 },
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', mobileWidth: 150 },
                { field: 'AssignedVendorLocationName', headerName: 'Location Assigned', mobileWidth: 200 },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add New Assigned Location',
            submitKey: 'postAssignedLocations',
            initialValues: { locationsArray: [], vendorLocationID: '' as unknown as number },
            modifyData(data) {
                return {
                    locationsArray: data.locationsArray.map(({ locationID }) => ({
                        assignedVendorLocationID: locationID,
                    })),
                    vendorLocationID: data.vendorLocationID,
                };
            },
            inputs: [
                { label: 'Locations', key: 'vendorLocationID', type: 'singleLocation', validate: true },
                { label: 'Assigned Locations', key: 'locationsArray', type: 'mulipleLocation', validate: true },
            ],
        },
    });

    return UI.render();
};

export default AssignedLocations;
