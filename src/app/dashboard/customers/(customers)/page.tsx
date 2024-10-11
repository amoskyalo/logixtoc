'use client';

import { APPCRUD, VendorCustomer, GetCustomer, CustomerType, useFetch, VendorCustomerCategory, VendorRegion } from '@/api';
import { useRouter } from 'next/navigation';
import { useGetUser, useResponsiveness } from '@/hooks';
import { useState } from 'react';

const Customers = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const { UserID, VendorID } = useGetUser();
    const { isMobile } = useResponsiveness();
    const router = useRouter();

    const { data: customerType } = useFetch<CustomerType, void>('getCustomerType');
    const { data: customerCategory } = useFetch<VendorCustomerCategory, void>('getVendorCustomerCategory');
    const { data: regions } = useFetch<VendorRegion, void>('getVendorRegions');

    const mobileLabels = ['Customer Details', 'Customer Settings', 'Customer Locations'];
    const desktopLabels = ['Details', 'Settings', 'Locations'];

    const handleNavigate = (activeRecord: any, route: string) => {
        router.push(`/dashboard/customers/${route}?VendorCustomerID=${activeRecord.VendorCustomerID}`);
    };

    const formWidth = isMobile ? { width: 120 } : { flex: 1 };
    const commonWidth = isMobile ? 170 : 150;

    const UI = new APPCRUD<VendorCustomer, any, void, GetCustomer>({
        grid: {
            fetchUrl: 'getVendorCustomer',
            actions: ['options'],
            params: { VendorCustomerCategoryID: 0, CustomerTypeID: 0 },
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
                { field: 'CustomerName', headerName: 'Customer Name', width: commonWidth },
                { field: 'CustomerPhone', headerName: 'Customer Phone', width: commonWidth },
                { field: 'PaymentTerms', headerName: 'Payments Terms', width: commonWidth, type: 'number' },
                { field: 'BalanceForward', headerName: 'Balance Forward', width: isMobile ? 180 : 150, type: 'number' },
                { field: 'Consumption', headerName: 'Consumption', width: commonWidth, type: 'number' },
                { field: 'Payments', headerName: 'Payments', width: commonWidth, type: 'number' },
                { field: 'CurrentBalance', headerName: 'Current Balance', width: commonWidth, type: 'number' },
                { field: 'CustomerTypeName', headerName: 'Customer Type', width: 200 },
                { field: 'VendorCustomerCategoryName', headerName: 'Customer Category', width: isMobile ? 200 : 170 },
            ],
        },
        form: {
            type: 'stepperForm',
            submitKey: 'postVendorCustomerTx',
            title: 'Add Customer Form',
            stepsLabels: isMobile ? mobileLabels : desktopLabels,
            initialValues: {
                customerTypeID: '',
                vendorCustomerCategoryID: '',
                customerName: '',
                customerPhone: '',
                customerPinNO: '',
                customerMail: '',
                openingBalance: '',
                creditLimit: '',
                paymentTerms: '',
                saleNotification: '',
                isAdvance: '',
            },
            stepBasedDialogSize: (step) => (step === 2 ? 'md' : 'xs'),
            modifyData: ({ gridValues, isAdvance, openingBalance, ...rest }) => {
                const vendorCustomerLocationArray = gridValues.map((item: any) => ({
                    ...item,
                    longitude: '',
                    latitude: '',
                    vendorID: VendorID,
                    addedBy: UserID,
                }));

                const newOpeningBalance = isAdvance === 1 ? -openingBalance : openingBalance;

                return { vendorCustomerLocationArray, openingBalance: newOpeningBalance, isAdvance, ...rest };
            },
            steps: [
                {
                    type: 'normal',
                    inputs: [
                        {
                            label: 'Customer Type',
                            key: 'customerTypeID',
                            type: 'select',
                            lookups: customerType?.Data || [],
                            lookupDisplayName: 'CustomerTypeName',
                            lookupDisplayValue: 'CustomerTypeID',
                            validate: true,
                        },
                        {
                            label: 'Customer Category',
                            key: 'vendorCustomerCategoryID',
                            type: 'select',
                            lookups: customerCategory?.Data || [],
                            lookupDisplayName: 'VendorCustomerCategoryName',
                            lookupDisplayValue: 'VendorCustomerCategoryID',
                            validate: true,
                        },
                        { label: 'Customer Name', key: 'customerName', type: 'text', validate: true },
                        { label: 'Customer Phone', key: 'customerPhone', type: 'text', validate: true },
                        { label: 'Customer Email', key: 'customerMail', type: 'text', validate: true },
                        { label: 'Customer Pin Number', key: 'customerPinNO', type: 'text', validate: true },
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
                            key: 'isAdvance',
                            type: 'checkbox',
                            validate: true,
                            options: [
                                { name: 'Advance Amount', value: 1 },
                                { name: 'Due Amount', value: 0 },
                            ],
                        },
                        {
                            label: 'Sale Notification',
                            key: 'saleNotification',
                            type: 'checkbox',
                            validate: true,
                            options: [
                                { name: 'Yes', value: 1 },
                                { name: 'No', value: 0 },
                            ],
                        },
                    ],
                },
                {
                    type: 'gridForm',
                    focusField: 'locationName',
                    newRow: { locationName: '', vendorRegionID: '', vendorRegionBranchID: '', contactPerson: '', locationPhone: '' },
                    columns: [
                        { field: 'locationName', headerName: 'Shop Name', ...formWidth },
                        {
                            field: 'vendorRegionID',
                            headerName: 'Region',
                            type: 'singleSelect',
                            valueOptions: regions?.Data || [],
                            getOptionLabel: (option: any) => option.VendorRegionName,
                            getOptionValue: (option: any) => option.VendorRegionID,
                            preProcessEditCellProps: async (params) => {
                                const { props } = params;
                                const { value } = props;

                                setSelectedRegion(value);

                                return { ...props, value, error: false };
                            },
                            ...formWidth,
                        },
                        {
                            field: 'vendorRegionBranchID',
                            headerName: 'Region Branch',
                            type: 'singleSelect',
                            valueOptions: selectedRegion ? regions?.Data.find((region) => region.VendorRegionID === selectedRegion)?.BranchArray : [],
                            getOptionLabel: (option: any) => option.VendorRegionBranchName,
                            getOptionValue: (option: any) => option.VendorRegionBranchID,
                            ...formWidth,
                        },
                        { field: 'contactPerson', headerName: 'Contact Person', ...(isMobile ? { width: 130 } : { flex: 1 }) },
                        { field: 'locationPhone', headerName: 'Shop Phone', ...formWidth },
                    ],
                },
            ],
        },
    });

    return UI.render();
};

export default Customers;
