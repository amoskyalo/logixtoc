'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorUserStatement } from '@/api';
import { useSearchParams } from 'next/navigation';

type Params = { UserID: number };

const Statement = () => {
    const UserID = useSearchParams().get('UserID') as unknown as number;

    const UI = new APPCRUD<VendorUserStatement, void, void, Params>({
        grid: {
            showActions: false,
            fetchUrl: 'getVendorUserWalletStatement',
            params: { UserID },
            columns: [
                { field: 'ReferenceNO', headerName: 'Reference No.', mobileWidth: 150 },
                { field: 'Description', headerName: 'Description', mobileWidth: 150 },
                { field: 'Debit', type: 'number', valueGetter: (__, { Type, Amount }) => (Type === 'DB' ? Amount : '0.00'), mobileWidth: 150 },
                { field: 'Credit', type: 'number', valueGetter: (__, { Type, Amount }) => (Type === 'CR' ? Amount : '0.00'), mobileWidth: 150 },
                { field: 'AccountBalance', headerName: 'Account Balance', type: 'number', mobileWidth: 170 },
                { field: 'TransactionDate', headerName: 'Trans Date', mobileWidth: 150 },
            ],
        },
    });

    return (
        <TablessContainer headerName="Statement" backURL="/dashboard/human-resource/user-wallet">
            {UI.render()}
        </TablessContainer>
    );
};

export default Statement;
