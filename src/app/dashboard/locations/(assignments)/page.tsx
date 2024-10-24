'use client';

import { LocationsArrayInterface, APPCRUD, useFetch, VendorLocationType } from '@/api';
import { useGetUser } from '@/hooks';

type Delete = { vendorLocationID: number };
type Params = { VendorLocationTypeID: number };

const Locations = () => {
    const { VendorID } = useGetUser();
    const { data: locationTypes } = useFetch<VendorLocationType, void>('getVendorLocationType');

    const UI = new APPCRUD<LocationsArrayInterface, any, Delete, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorLocation',
            deleteUrl: 'deleteVendorLocation',
            params: { VendorLocationTypeID: 0 },
            initialDeleteParams: { vendorLocationID: '' as unknown as number },
            filters: [
                {
                    title: 'Location types',
                    valueKey: 'VendorLocationTypeID',
                    labelKey: 'VendorLocationTypeName',
                    filterOptions: locationTypes?.Data || []
                }
            ],
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', mobileWidth: 150 },
                { field: 'VendorLocationTypeName', headerName: 'Type', mobileWidth: 150 },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 175 },
            ],
        },
        form: {
            type: 'stepperForm',
            title: 'Add New Location',
            submitKey: 'postVendorLocationTx',
            stepsLabels: ['Select Location Type', 'Add Locations'],
            initialValues: { vendorLocationTypeID: '' },
            modifyData(arg) {
                return { locationsArray: arg.gridValues, vendorLocationTypeID: arg.vendorLocationTypeID, vendorID: VendorID };
            },
            steps: [
                {
                    type: 'normal',
                    inputs: [
                        {
                            label: 'Location Type',
                            type: 'select',
                            key: 'vendorLocationTypeID',
                            lookups: locationTypes?.Data || [],
                            lookupDisplayName: 'VendorLocationTypeName',
                            lookupDisplayValue: 'VendorLocationTypeID',
                            validate: true,
                        },
                    ],
                },
                {
                    type: 'gridForm',
                    focusField: 'vendorLocationName',
                    newRow: { vendorLocationName: '' },
                    columns: [{ field: 'vendorLocationName', headerName: 'Location Name', flex: 1 }],
                },
            ],
        },
    });

    return UI.render();
};

export default Locations;
