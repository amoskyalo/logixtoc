'use client';

import { APPCRUD, VendorCustomerUOMStatement } from '@/api';
import { TablessContainer } from '@/components/Containers';
import { useSearchParams, useRouter } from 'next/navigation';

type Params = { VendorCustomerID: number };

const UOMStatement = () => {
    const VendorCustomerID = useSearchParams().get('VendorCustomerID') as unknown as number;
    const router = useRouter();

    const UI = new APPCRUD<VendorCustomerUOMStatement, void, void, Params>({
        grid: {
            fetchUrl: 'getVendorCustomerProductSummary',
            actions: ['options'],
            options: [
                {
                    name: 'Stament',
                    onClick: (activeRecord) => {
                        const url = `/dashboard/customers/uom-statement/product-statement?VendorCustomerID=${VendorCustomerID}&VendorProductUOMID=${activeRecord.VendorProductUOMID}`;
                        router.push(url);
                    },
                },
            ],
            params: { VendorCustomerID },
            columns: [
                { field: 'VendorProductUOMName', headerName: 'Unit of Measure', mobileWidth: 180 },
                { field: 'SalesQuantity', headerName: 'Sold Quantity', type: 'number', mobileWidth: 150 },
                { field: 'SalesReturnQuantity', headerName: 'Return Quantity', type: 'number', mobileWidth: 180 },
                { field: 'NewOpeningQuantity', headerName: 'Current Balance', type: 'number', mobileWidth: 180 },
            ],
        },
    });

    return (
        <TablessContainer headerName="Product Summary" backURL="/dashboard/customers">
            {UI.render()}
        </TablessContainer>
    );
};

export default UOMStatement;
