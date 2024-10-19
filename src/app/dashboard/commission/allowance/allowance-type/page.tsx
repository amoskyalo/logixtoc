'use client';

import { APPCRUD, VendorAllowanceType } from '@/api';

type Values = { vendorAllowanceTypeName: string };
type Delete = { VendorAllowanceTypeID: string | number };

const AllowanceType = () => {
    const UI = new APPCRUD<VendorAllowanceType, Values, Delete, void>({
        grid: {
            showDates: false,
            actions: ['delete'],
            fetchUrl: 'getVendorAllowanceType',
            deleteUrl: 'removeVendorAllowanceType',
            initialDeleteParams: { VendorAllowanceTypeID: '' },
            columns: [
                { field: 'VendorAllowanceTypeName', headerName: 'Allowance Type', mobileWidth: 170 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 150 },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add Allowance Type',
            submitKey: 'postVendorAllowanceType',
            initialValues: { vendorAllowanceTypeName: '' },
            inputs: [{ label: 'Allowance Type', type: 'text', key: 'vendorAllowanceTypeName', validate: true }],
        },
    });

    return UI.render();
};

export default AllowanceType;
