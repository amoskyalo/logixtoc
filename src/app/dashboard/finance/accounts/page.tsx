'use client';

import { VendorAccount, GetUserAccountsParams, APPCRUD, useFetch, VendorAccountType } from '@/api';
import { useResponsiveness } from '@/hooks';
import { GridColDef } from '@mui/x-data-grid';

type Columns = GridColDef & { mobileWidth: number };
type Delete = { vendorAccountID: number };

export const AccountsColumns: Columns[] = [
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
];

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

    const UI = new APPCRUD<VendorAccount, any, Delete, GetUserAccountsParams>({
        grid: {
            fetchUrl: 'getVendorAccounts',
            deleteUrl: 'removeVendorAccount',
            actions: ['options'],
            params: { VendorAccountTypeID: 0 },
            initialDeleteParams: { vendorAccountID: '' as unknown as number },
            options: [{ name: 'Statements', onClick: () => null }, { name: 'Edit', onClick: () => null }, { name: 'Delete' }],
            columns: AccountsColumns,
        },
        form: {
            title: 'Add New Account',
            type: 'stepperForm',
            submitKey: 'postVendorAccount',
            stepsLabels: ['Select Account Type', 'Add Accounts'],
            stepBasedDialogSize: (step) => (step === 0 ? 'xs' : 'md'),
            modifyData: ({ gridValues, ...rest }: any) => ({
                accountsArray: [...gridValues],
                ...rest,
            }),
            steps: [
                {
                    type: 'normal',
                    initialValues: { vendorAccountTypeID: '' },
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
