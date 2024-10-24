'use client';

import { VendorRegion, useFetch, AssignedRegionObjInterface, APPCRUD } from '@/api';

type Params = { VendorLocationID: number; VendorRegionID: number };
type Delete = { vendorLocationID: number; vendorRegionID: number };

const AssignedRegions = () => {
    const { data: vendorRegions } = useFetch<VendorRegion, void>('getVendorRegions');

    const UI = new APPCRUD<AssignedRegionObjInterface, any, Delete, Params>({
        grid: {
            showDates: false,
            hasLocationsFilters: true,
            actions: ['delete'],
            fetchUrl: 'getAssignedRegions',
            deleteUrl: 'deleteAssignedRegions',
            initialDeleteParams: { vendorLocationID: '' as unknown as number, vendorRegionID: '' as unknown as number },
            params: { VendorRegionID: 0, VendorLocationID: 0 },
            filters: [
                {
                    title: 'Regions',
                    valueKey: 'VendorRegionID',
                    labelKey: 'VendorRegionName',
                    filterOptions: vendorRegions?.Data || [],
                },
            ],
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', mobileWidth: 150 },
                { field: 'VendorRegionName', headerName: 'Region', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
            ],
        },
        form: {
            type: 'normal',
            submitKey: 'postAssignedRegions',
            title: 'Add Assigned Regions',
            initialValues: { vendorRegionID: '' as unknown as number, locationsArray: [] },
            modifyData: (data: any) => ({
                vendorRegionID: data.vendorRegionID,
                vendorLocationArrays: data.locationsArray.map((v: any) => ({
                    vendorLocationID: v.locationID,
                })),
            }),
            inputs: [
                {
                    label: 'Region',
                    key: 'vendorRegionID',
                    type: 'select',
                    validate: true,
                    lookups: vendorRegions?.Data ?? [],
                    lookupDisplayName: 'VendorRegionName',
                    lookupDisplayValue: 'VendorRegionID',
                },
                { label: 'Locations', key: 'locationsArray', type: 'mulipleLocation', validate: true },
            ],
        },
    });

    return UI.render();
};

export default AssignedRegions;
