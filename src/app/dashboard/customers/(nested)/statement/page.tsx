'use client';

import { Statement, APPCRUD } from '@/api';
import { useSearchParams } from 'next/navigation';
import { TablessContainer } from '@/components/Containers';

type Params = { VendorCustomerID: number };

const CustomerStatement = () => {
    const VendorCustomerID = useSearchParams().get('VendorCustomerID') as unknown as number;

    const UI = new APPCRUD<Statement, void, void, Params>({
        grid: {
            fetchUrl: 'getVendorCustomerStatement',
            showActions: false,
            params: { VendorCustomerID },
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
        <TablessContainer headerName="Customer Shops" backURL="/dashboard/customers">
            {UI.render()}
        </TablessContainer>
    );
};

export default CustomerStatement;
