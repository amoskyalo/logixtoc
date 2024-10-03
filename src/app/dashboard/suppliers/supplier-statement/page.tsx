'use client';

import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorSupplierStatement } from '@/api';
import { useSearchParams } from 'next/navigation';

const SupplierStatement = () => {
    const VendorSupplierID = useSearchParams().get('VendorSupplierID') as unknown as number;

    const UI = new APPCRUD<VendorSupplierStatement, void, void, { VendorSupplierID: number }>({
        grid: {
            showActions: false,
            fetchUrl: 'getVendorSupplierStatement',
            params: { VendorSupplierID },
            columns: [
                { field: 'TransactionDate', headerName: 'Transaction Date' },
                { field: 'ReferenceNO', headerName: 'Reference NO' },
                { field: 'Description', headerName: 'Description' },
                { field: 'Debit', headerName: 'Debit', type: 'number', valueGetter: (__, row) => (row.Type === 'DB' ? row.Amount : '0.00') },
                { field: 'Credit', headerName: 'Credit', type: 'number', valueGetter: (__, row) => (row.Type === 'CR' ? row.Amount : '0.00') },
                { field: 'AccountBalance', headerName: 'Account Balance', type: 'number' },
            ],
        },
    });
    
    return (
        <TablessContainer headerName="Supplier Statement" backURL="/dashboard/suppliers">
            {UI.render()}
        </TablessContainer>
    );
};

export default SupplierStatement;
