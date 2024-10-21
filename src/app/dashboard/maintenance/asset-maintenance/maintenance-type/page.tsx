'use client';

import { APPCRUD, VendorMaintenanceRequestType } from '@/api';

type Values = { vendorMaintenanceRequestTypeName: string };
type Delete = { vendorMaintenanceRequestTypeID: number };

const MaintenanceType = () => {
    const UI = new APPCRUD<VendorMaintenanceRequestType, Values, Delete, void>({
        grid: {
            showDates: false,
            actions: ['delete'],
            fetchUrl: 'getMaintenanceRequestType',
            deleteUrl: 'removeMaintenanceRequestType',
            initialDeleteParams: { vendorMaintenanceRequestTypeID: '' as unknown as number },
            columns: [
                { field: 'VendorMaintenanceRequestTypeName', headerName: 'Maintenance Type', flex: 1 },
                { field: 'DateAdded', headerName: 'Date Added', flex: 1 },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add New Maintenance Type',
            submitKey: 'addMaintenanceRequestType',
            initialValues: { vendorMaintenanceRequestTypeName: '' },
            inputs: [{ label: 'Maintenance Type Name', type: 'text', key: 'vendorMaintenanceRequestTypeName', validate: true }],
        },
    });

    return UI.render();
};

export default MaintenanceType;
