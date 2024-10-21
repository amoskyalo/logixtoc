'use client';

import { APPCRUD, VendorFuelStation } from '@/api';

type Delete = { VendorFuelStationID: number };
type Values = {
    vendorFuelStationName: string;
    contactPerson: string;
    contactMail: string;
};

const FuelStation = () => {
    const UI = new APPCRUD<VendorFuelStation, Values, Delete, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorFuelStation',
            deleteUrl: 'removeVendorFuelStation',
            actions: ['delete'],
            initialDeleteParams: { VendorFuelStationID: 0 },
            columns: [
                { field: 'VendorFuelStationName', headerName: 'Station Name', mobileWidth: 150 },
                { field: 'ContactPerson', headerName: 'Contact Person', mobileWidth: 170 },
                { field: 'ContactMail', headerName: 'Contact Mail', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 150 },
                { field: 'AddedByName', headerName: 'Added By', mobileWidth: 150 },
            ],
        },
        form: {
            type: 'normal',
            submitKey: 'postVendorFuelStation',
            title: 'Add New Station',
            initialValues: {
                vendorFuelStationName: '',
                contactPerson: '',
                contactMail: '',
            },
            inputs: [
                { label: 'Station Name', key: 'vendorFuelStationName', type: 'text', validate: true },
                { label: 'Station Contact', key: 'contactPerson', type: 'text', validate: true },
                { label: 'Staion Email', key: 'contactMail', type: 'text', validate: true },
            ],
        },
    });

    return UI.render();
};

export default FuelStation;
