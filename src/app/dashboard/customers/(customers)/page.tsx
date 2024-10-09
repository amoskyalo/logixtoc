'use client';

import { APPCRUD, VendorCustomer, GetCustomer } from '@/api';
import { useRouter } from 'next/navigation';
import { useResponsiveness } from '@/hooks';

const Customers = () => {
    const router = useRouter();
    const { isMobile } = useResponsiveness();

    const mobileLabels = ['Customer Details', 'Customer Settings', 'Customer Locations'];
    const desktopLabels = ['Details', 'Settings', 'Locations'];

    const handleNavigate = (activeRecord: any, route: string) => {
        router.push(`/dashboard/customers/${route}?VendorCustomerID=${activeRecord.VendorCustomerID}`);
    };

    const UI = new APPCRUD<VendorCustomer, any, void, GetCustomer>({
        grid: {
            fetchUrl: 'getVendorCustomer',
            actions: ['options'],
            params: {
                VendorCustomerCategoryID: 0,
                CustomerTypeID: 0,
            },
            options: [
                { name: 'Shops', onClick: (activeRecord) => handleNavigate(activeRecord, 'shops') },
                { name: 'Sales', onClick: (activeRecord) => handleNavigate(activeRecord, 'sales') },
                { name: 'Payment', onClick: (activeRecord) => handleNavigate(activeRecord, 'payment') },
                { name: 'Debit Note', onClick: (activeRecord) => handleNavigate(activeRecord, 'debit-note') },
                { name: 'Credit Note', onClick: (activeRecord) => handleNavigate(activeRecord, 'credit-note') },
                { name: 'Statement', onClick: (activeRecord) => handleNavigate(activeRecord, 'statement') },
                { name: 'UOM Statement', onClick: (activeRecord) => handleNavigate(activeRecord, 'uom-statement') },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete', onClick: () => null },
            ],
            columns: [
                { field: 'CustomerName', headerName: 'Customer Name', width: isMobile ? 170 : 150 },
                { field: 'CustomerPhone', headerName: 'Customer Phone', width: isMobile ? 170 : 150 },
                { field: 'PaymentTerms', headerName: 'Payments Terms', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'BalanceForward', headerName: 'Balance Forward', width: isMobile ? 180 : 150, type: 'number' },
                { field: 'Consumption', headerName: 'Consumption', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'Payments', headerName: 'Payments', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'CurrentBalance', headerName: 'Current Balance', width: isMobile ? 170 : 150, type: 'number' },
                { field: 'CustomerTypeName', headerName: 'Customer Type', width: isMobile ? 170 : 150 },
                { field: 'VendorCustomerCategoryName', headerName: 'Customer Category', width: isMobile ? 200 : 170 },
            ],
        },
        form: {
            type: 'stepperForm',
            submitKey: 'getVendorCustomer',
            title: 'Add Customer Form',
            stepsLabels: isMobile ? mobileLabels : desktopLabels,
            initialValues: {},
            stepBasedDialogSize: (step) => (step === 2 ? 'md' : 'xs'),
            steps: [
                {
                    type: 'normal',
                    inputs: [
                        {
                            label: 'Customer Type',
                            key: 'customerType',
                            type: 'select',
                            lookups: [],
                            lookupDisplayName: '',
                            lookupDisplayValue: '',
                            validate: true,
                        },
                        {
                            label: 'Customer Category',
                            key: 'customerCategory',
                            type: 'select',
                            lookups: [],
                            lookupDisplayName: '',
                            lookupDisplayValue: '',
                            validate: true,
                        },
                        { label: 'Customer Name', key: 'customerName', type: 'text', validate: true },
                        { label: 'Customer Phone', key: 'customerPhone', type: 'text', validate: true },
                        { label: 'Customer Pin Number', key: 'customerPinNumber', type: 'text', validate: true },
                        { label: 'Customer Email', key: 'customerEmail', type: 'text', validate: true },
                    ],
                },
                {
                    type: 'normal',
                    inputs: [
                        { label: 'Opening Balance', key: 'openingBalance', type: 'number', validate: true },
                        { label: 'Credit Limit', key: 'creditLimit', type: 'number', validate: true },
                        { label: 'Payment Terms (days)', key: 'paymentTerms', type: 'number', validate: true },
                        {
                            label: 'Opening Balance Type',
                            key: 'openingBalanceType',
                            type: 'checkbox',
                            validate: true,
                            options: [
                                { name: 'Advance Amount', value: 'advanceAmount' },
                                { name: 'Due Amount', value: 'dueAmount' },
                            ],
                        },
                        {
                            label: 'Sale Notification',
                            key: 'saleNotification',
                            type: 'checkbox',
                            validate: true,
                            options: [
                                { name: 'Yes', value: 'yes' },
                                { name: 'No', value: 'no' },
                            ],
                        },
                    ],
                },
                {
                    type: 'gridForm',
                    focusField: 'shopName',
                    newRow: { shopName: '', region: '', regionBranch: '', contactPerson: '', shopPhone: '' },
                    columns: [
                        { field: 'shopName', headerName: 'Shop Name', ...(isMobile ? { width: 120 } : { flex: 1 }) },
                        { field: 'region', headerName: 'Region', ...(isMobile ? { width: 120 } : { flex: 1 }) },
                        { field: 'regionBranch', headerName: 'Region Branch', ...(isMobile ? { width: 120 } : { flex: 1 }) },
                        { field: 'contactPerson', headerName: 'Contact Person', ...(isMobile ? { width: 130 } : { flex: 1 }) },
                        { field: 'shopPhone', headerName: 'Shop Phone', ...(isMobile ? { width: 120 } : { flex: 1 }) },
                    ],
                },
            ],
        },
    });

    return UI.render();
};

export default Customers;
