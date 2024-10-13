'use client';

import { useSearchParams } from 'next/navigation';
import { VendorAccount, APPCRUD } from '@/api';
import { TablessContainer } from '@/components/Containers';

type Params = { VendorAccountTypeID: number };

const AccountTypeDetails = () => {
    const VendorAccountTypeID = useSearchParams().get('VendorAccountTypeID') as unknown as number;

    const UI = new APPCRUD<VendorAccount, void, void, Params>({
        grid: {
            showDates: false,
            showActions: false,
            fetchUrl: 'getVendorAccounts',
            params: { VendorAccountTypeID },
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
    });
    
    return (
        <TablessContainer headerName="Accounts Details" backURL="/dashboard/finance/accounts/account-types">
            {UI.render()}
        </TablessContainer>
    );
};

export default AccountTypeDetails;
