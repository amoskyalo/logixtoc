'use client';

import { useSearchParams } from 'next/navigation';
import { VendorAccount, APPCRUD } from '@/api';
import { AccountsColumns } from '@/app/dashboard/finance/accounts/page';
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
            columns: AccountsColumns,
        },
    });
    return (
        <TablessContainer headerName="Accounts Details" backURL="/dashboard/finance/accounts/account-types">
            {UI.render()}
        </TablessContainer>
    );
};

export default AccountTypeDetails;
