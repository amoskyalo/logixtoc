'use client';

import { VendorAccount, GetUserAccountsParams, APPCRUD } from '@/api';
import { GridColDef } from '@mui/x-data-grid';

type Columns = GridColDef & { mobileWidth: number };

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

const Accounts = () => {
    const UI = new APPCRUD<VendorAccount, void, void, GetUserAccountsParams>({
        grid: {
            fetchUrl: 'getVendorAccounts',
            actions: ['options'],
            params: { VendorAccountTypeID: 0 },
            options: [
                { name: 'Statements', onClick: () => null },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete', onClick: () => null },
            ],
            columns: AccountsColumns,
        },
    });

    return UI.render();
};

export default Accounts;
