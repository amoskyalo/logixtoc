'use client';

import { useSearchParams } from 'next/navigation';
import { VendorAccount, APPCRUD } from '@/api';
import { AccountsColumns } from '@/app/dashboard/finance/accounts/page';
import { PageHeader } from '@/components/Headers';
import { Box } from '@mui/material';

type Params = {
    VendorAccountTypeID: number;
};

const AccountTypeDetails = () => {
    const VendorAccountTypeID = useSearchParams().get('VendorAccountTypeID') as unknown as number;

    const UI = new APPCRUD<VendorAccount, void, void, Params>({
        grid: {
            showDates: false,
            showActions: false,
            fetchUrl: 'getVendorAccounts',
            params: { VendorAccountTypeID },
            columns: AccountsColumns,
        },
    });
    return (
        <Box sx={{ mt: 2 }}>
            <PageHeader headerName="Accounts Details" backURL="/dashboard/finance/accounts/account-types" />
            <Box sx={{ mb: 4 }} />
            {UI.render()}
        </Box>
    );
};

export default AccountTypeDetails;
