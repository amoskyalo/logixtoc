'use client';

import { useSearchParams } from 'next/navigation';
import { TablessContainer } from '@/components/Containers';
import { APPCRUD } from '@/api';

const AccountsStatement = () => {
    const VendorAccountID = useSearchParams().get('VendorAccountTypeID') as unknown as number;

    const UI = new APPCRUD({
        grid: {
            showActions: false,
            fetchUrl: 'getVendorAccountStatement',
            params: { VendorAccountID },
            columns: [
                { field: 'TransactionDate', headerName: 'Transaction Date', mobileWidth: 180 },
                { field: 'ReferenceNO', headerName: 'Reference No.', mobileWidth: 180 },
                { field: 'Description', headerName: 'Description', mobileWidth: 150 },
                {
                    field: 'Debit',
                    headerName: 'Debit',
                    type: 'number',
                    mobileWidth: 150,
                    valueGetter: (__, row) => (row.Type === 'DB' ? row.Amount : '0.00'),
                },
                {
                    field: 'Credit',
                    headerName: 'Credit',
                    type: 'number',
                    mobileWidth: 150,
                    valueGetter: (__, row) => (row.Type === 'CR' ? row.Amount : '0.00'),
                },
                { field: 'AccountBalance', headerName: 'Acocunt Balance', type: 'number', mobileWidth: 180 },
            ],
        },
    });

    return (
        <TablessContainer headerName="Accounts Statement" backURL="/dashboard/finance/accounts">
            {UI.render()}
        </TablessContainer>
    );
};

export default AccountsStatement;
