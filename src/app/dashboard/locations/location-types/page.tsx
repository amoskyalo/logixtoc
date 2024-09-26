'use client';

import { SystemLocationType, VendorLocationType, useFetch, APPCRUD } from '@/api';
import { PageHeader } from '@/components/Headers';
import { Stack } from '@mui/material';
import { StatusChips } from '@/components/Chips';

type Values = {
    ocationTypeID: number;
    vendorLocationTypeName: string;
};

type Delete = {
    vendorLocationTypeID: number;
};

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
        <Stack spacing={3}>
            <PageHeader headerName="Location Types" subTitle="Manage vendor locations, and location assignments." />
            {UI.render()}
        </Stack>
    );
};

export default LocationTypes;
