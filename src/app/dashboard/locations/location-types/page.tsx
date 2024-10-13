'use client';

import { SystemLocationType, VendorLocationType, useFetch, APPCRUD } from '@/api';
import { StatusChips } from '@/components/Chips';
import { TablessContainer } from '@/components/Containers';

type Values = {
    locationTypeID: number;
    vendorLocationTypeName: string;
};

type Delete = { vendorLocationTypeID: number };

const LocationTypes = () => {
    const { data: systemLocationTypes } = useFetch<SystemLocationType, void>('getSystemLocationType');

    const UI = new APPCRUD<VendorLocationType, Values, Delete, void>({
        grid: {
            showDates: false,
            pagination: false,
            fetchUrl: 'getVendorLocationType',
            deleteUrl: 'deleteVendorLocationType',
            initialDeleteParams: { vendorLocationTypeID: '' as unknown as number },
            columns: [
                { field: 'VendorLocationTypeName', headerName: 'Location Type', mobileWidth: 150 },
                {
                    field: 'LocationsArray',
                    headerName: 'Count',
                    type: 'number',
                    valueGetter: (__, row) => row.LocationArray.length,
                    mobileWidth: 150,
                },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
                {
                    field: 'StatusID',
                    headerName: 'Status',
                    mobileWidth: 100,
                    renderCell: ({ row: { StatusID } }) => <StatusChips statusID={StatusID} name="Active" />,
                },
            ],
        },
        form: {
            type: 'normal',
            submitKey: 'postVendorLocationType',
            title: 'Add new location type',
            initialValues: { locationTypeID: '' as unknown as number, vendorLocationTypeName: '' },
            inputs: [
                {
                    label: 'System Location Type',
                    key: 'locationTypeID',
                    type: 'select',
                    lookups: systemLocationTypes?.Data || [],
                    lookupDisplayName: 'LocationTypeName',
                    lookupDisplayValue: 'LocationTypeID',
                    validate: true,
                },
                { label: 'Location Type Name', key: 'vendorLocationTypeName', type: 'text', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName="Location Types" subTitle="Manage vendor locations, and location assignments.">
            {UI.render()}
        </TablessContainer>
    );
};

export default LocationTypes;
