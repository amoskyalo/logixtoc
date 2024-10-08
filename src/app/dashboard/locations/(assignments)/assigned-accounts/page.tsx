'use client';

import { useFetch, AssignedAccount, GetUserAccountsParams, VendorAccount, APPCRUD } from '@/api';

type Params = {
    VendorAccountTypeID: number;
    VendorLocationID: number;
};

type Delete = {
    vendorAccountID: number;
    vendorLocationID: number;
};

type Values = {
    vendorLocationID: number;
    vendorAccountArray: Array<{
        vendorAccountID: number;
    }>;
};

const AssignedAccounts = () => {
    const { data: vendorAccounts } = useFetch<VendorAccount, GetUserAccountsParams>('getVendorAccounts', {
        VendorAccountTypeID: 0,
    });

    const UI = new APPCRUD<AssignedAccount, Values, Delete, Params>({
        grid: {
            showDates: false,
            pagination: false,
            actions: ['delete'],
            fetchUrl: 'getAssignedAccounts',
            deleteUrl: 'deleteAssignedAccount',
            initialDeleteParams: { vendorAccountID: '' as unknown as number, vendorLocationID: '' as unknown as number },
            params: { VendorAccountTypeID: 0, VendorLocationID: 0 },
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', width: 150 },
                { field: 'VendorAccountTypeName', headerName: 'Account Type', width: 150 },
                { field: 'VendorAccountName', headerName: 'Account Name', width: 150 },
                { field: 'VendorAccountNO', headerName: 'Account Number', width: 150 },
                { field: 'Description', headerName: 'Description', width: 150 },
                { field: 'isShared', headerName: 'Shared', width: 150, type: 'boolean', valueGetter: (__, row) => row.isShared === 1 },
                { field: 'isIntegrated', headerName: 'Integrated', width: 150, type: 'boolean', valueGetter: (__, row) => row.isIntegrated === 1 },
            ],
        },
        form: {
            type: "normal",
            title: 'Add New Assigned Accounts',
            submitKey: 'postAssignedAccount',
            initialValues: { vendorAccountArray: [], vendorLocationID: '' as unknown as number },
            modifyData(data) {
                return {
                    vendorLocationID: data.vendorLocationID,
                    vendorAccountArray: data.vendorAccountArray.map((v: any) => ({
                        vendorAccountID: v.value,
                    })),
                };
            },
            inputs: [
                { label: 'Locations', key: 'vendorLocationID', type: 'singleLocation', validate: true },
                {
                    label: 'Accounts',
                    key: 'vendorAccountArray',
                    type: 'multiple',
                    validate: true,
                    lookups: vendorAccounts?.Data ?? [],
                    optionKey: 'value',
                    optionValueKey: 'VendorAccountID',
                    optionLabelKey: 'VendorAccountName',
                },
            ],
        },
    });

    return UI.render();
};

export default AssignedAccounts;
