'use client';

import { VendorAccount, GetUserAccountsParams, APPCRUD, useFetch, VendorAccountType } from '@/api';
import { useResponsiveness } from '@/hooks';
import { useRouter } from 'next/navigation';

type Delete = { vendorAccountID: number };

const singleSelect = {
    getOptionValue: (option: any) => option.value,
    getOptionLabel: (option: any) => option.label,
    valueOptions: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
    ],
};

const Accounts = () => {
    const { data: vendorAccountTypes } = useFetch<VendorAccountType, void>('getVendorAccountTypes');
    const { isMobile } = useResponsiveness();
    const router = useRouter();

    const UI = new APPCRUD<VendorAccount, any, Delete, GetUserAccountsParams>({
        grid: {
            fetchUrl: 'getVendorAccounts',
            deleteUrl: 'removeVendorAccount',
            actions: ['options'],
            params: { VendorAccountTypeID: 0 },
            initialDeleteParams: { vendorAccountID: '' as unknown as number },
            options: [
                {
                    name: 'Statements',
                    onClick: (activeRecord) => router.push(`/dashboard/finance/accounts/statement?VendorAccountID=${activeRecord.VendorAccountID}`),
                },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete' },
            ],
            filters: [
                {
                    title: 'Account type',
                    valueKey: 'VendorAccountTypeID',
                    labelKey: 'VendorAccountTypeName',
                    filterOptions: vendorAccountTypes?.Data || [],
                }
            ],
            columns: [
                { field: 'VendorAccountTypeName', headerName: 'Account Type', mobileWidth: 150 },
                { field: 'VendorAccountName', headerName: 'Account Name', mobileWidth: 170 },
                { field: 'VendorAccountNO', headerName: 'Account No.', type: 'number', mobileWidth: 150 },
                { field: 'isShared', headerName: 'Shared', type: 'boolean', valueGetter: (__, row) => row.isShared === 1, mobileWidth: 150 },
                {
                    field: 'isAdminOnly',
                    headerName: 'Admin Only',
                    type: 'boolean',
                    valueGetter: (__, row) => row.isAdminOnly === 1,
                    mobileWidth: 150,
                },
                {
                    field: 'isIntegrated',
                    headerName: 'Integrated',
                    type: 'boolean',
                    valueGetter: (__, row) => row.isIntegrated === 1,
                    mobileWidth: 150,
                },
            ],
        },
        form: {
            title: 'Add New Account',
            type: 'stepperForm',
            submitKey: 'postVendorAccount',
            stepsLabels: ['Select Account Type', 'Add Accounts'],
            initialValues: { vendorAccountTypeID: '' },
            stepBasedDialogSize: (step) => (step === 0 ? 'xs' : 'md'),
            modifyData: ({ gridValues, ...rest }: any) => ({
                accountsArray: [...gridValues],
                ...rest,
            }),
            steps: [
                {
                    type: 'normal',
                    inputs: [
                        {
                            type: 'select',
                            label: 'Account Type',
                            key: 'vendorAccountTypeID',
                            lookupDisplayName: 'VendorAccountTypeName',
                            lookupDisplayValue: 'VendorAccountTypeID',
                            lookups: vendorAccountTypes?.Data || [],
                            validate: true,
                        },
                    ],
                },
                {
                    type: 'gridForm',
                    focusField: 'vendorAccountName',
                    newRow: { vendorAccountName: '', vendorAccountNO: '', description: '', isAdminOnly: '', isShared: '' },
                    columns: [
                        { field: 'vendorAccountName', headerName: 'Account Name', ...(isMobile ? { width: 150 } : { flex: 1 }) },
                        { field: 'vendorAccountNO', headerName: 'Account No.', ...(isMobile ? { width: 130 } : { flex: 1 }) },
                        { field: 'description', headerName: 'Description', ...(isMobile ? { width: 170 } : { flex: 1 }) },
                        { field: 'isAdminOnly', headerName: 'Admin Only', width: isMobile ? 140 : 120, type: 'singleSelect', ...singleSelect },
                        { field: 'isShared', headerName: 'Shared', width: 100, type: 'singleSelect', ...singleSelect },
                    ],
                },
            ],
        },
    });

    return UI.render();
};

export default Accounts;
