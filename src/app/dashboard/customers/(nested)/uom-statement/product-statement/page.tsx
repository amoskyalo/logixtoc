'use client';

import { TablessContainer } from '@/components/Containers';
import { useSearchParams } from 'next/navigation';
import { APPCRUD, Statement } from '@/api';

type Params = { VendorCustomerID: number; VendorProductUOMID: number };

const ProductStatement = () => {
    const VendorProductUOMID = useSearchParams().get('VendorProductUOMID') as unknown as number;
    const VendorCustomerID = useSearchParams().get('VendorCustomerID') as unknown as number;

    const UI = new APPCRUD<Statement, void, void, Params>({
        grid: {
            showActions: false,
            fetchUrl: 'getVendorCustomerProductStatement',
            params: { VendorCustomerID, VendorProductUOMID },
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
        <TablessContainer headerName="Product Statement" backURL={`/dashboard/customers/uom-statement?VendorCustomerID=${VendorCustomerID}`}>
            {UI.render()}
        </TablessContainer>
    );
};

export default ProductStatement;
