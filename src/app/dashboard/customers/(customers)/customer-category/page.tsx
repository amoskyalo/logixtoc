'use client';

import { APPCRUD, VendorCustomerCategory } from '@/api';

type Values = { vendorCustomerCategoryName: string };
type Delete = { vendorCustomerCategoryID: number };

const CustomerCategory = () => {
    const UI = new APPCRUD<VendorCustomerCategory, Values, Delete, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorCustomerCategory',
            deleteUrl: 'removeVendorCustomerCategory',
            initialDeleteParams: { vendorCustomerCategoryID: '' as unknown as number },
            columns: [
                { field: 'VendorCustomerCategoryName', headerName: 'Category', mobileWidth: 150 },
                { field: 'Status', headerName: 'Status', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
            ],
        },
        form: {
            type: "normal",
            submitKey: 'postVendorCustomerCategory',
            title: 'Add Customer Category',
            initialValues: { vendorCustomerCategoryName: '' },
            inputs: [{ label: 'Category Name', key: 'vendorCustomerCategoryName', type: 'text', validate: true }],
        },
    });

    return UI.render();
};

export default CustomerCategory;
