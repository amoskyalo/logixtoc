'use client';

import { APPCRUD, VendorAccountType, AccountType, useFetch } from '@/api';
import { useRouter } from 'next/navigation';

type Values = {
    accountTypeID: number;
    vendorAccountTypeName: string;
};

type Delete = { vendorAccountTypeID: number | string };

const AccountTypes = () => {
    const router = useRouter();

    const { data: accountType } = useFetch<AccountType, void>('getAccountType');

    const UI = new APPCRUD<VendorAccountType, Values, Delete, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorAccountTypes',
            deleteUrl: 'deleteVendorAccountType',
            actions: ['options'],
            initialDeleteParams: { vendorAccountTypeID: '' },
            options: [
                {
                    name: 'Accounts',
                    onClick: (activeRecord) =>
                        router.push(
                            `/dashboard/finance/accounts/account-types/account-details?VendorAccountTypeID=${activeRecord.VendorAccountTypeID}`,
                        ),
                },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete' },
            ],
            columns: [
                { field: 'VendorAccountTypeName', headerName: 'Account', mobileWidth: 150 },
                { field: 'AccountTypeName', headerName: 'Account Type', mobileWidth: 200 },
                {
                    field: 'AccountsArray',
                    headerName: 'Total Accounts',
                    type: 'number',
                    mobileWidth: 170,
                    valueGetter: (__, row) => row.AccountsArray.length,
                },
                { field: 'DateAdded', headerName: 'DateAdded', mobileWidth: 170 },
            ],
        },
        form: {
            type: 'normal',
            submitKey: 'postVendorAccountType',
            title: 'Add Account Type',
            initialValues: { accountTypeID: '', vendorAccountTypeName: '' },
            inputs: [
                {
                    label: 'Account Type',
                    key: 'accountTypeID',
                    validate: true,
                    type: 'select',
                    lookups: accountType?.Data ?? [],
                    lookupDisplayValue: 'AccountTypeID',
                    lookupDisplayName: 'AccountTypeName',
                },
                { label: 'Account Name', key: 'vendorAccountTypeName', type: 'text', validate: true },
            ],
        },
    });

    return UI.render();
};

export default AccountTypes;
