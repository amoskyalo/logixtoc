'use client';

import { useSearchParams } from 'next/navigation';
import { TablessContainer } from '@/components/Containers';
import { APPCRUD, VendorProductCategoryTypeDetail } from '@/api';

const CategoryTypeDetail = () => {
    const VendorProductCategoryTypeID = useSearchParams().get('VendorProductCategoryTypeID') as unknown as number;
    const VendorProductCategoryID = useSearchParams().get('VendorProductCategoryID');

    const UI = new APPCRUD<VendorProductCategoryTypeDetail, void, void, { VendorProductCategoryTypeID: number }>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorProductCategoryTypeDetail',
            params: { VendorProductCategoryTypeID },
            columns: [
                { field: 'VendorProductCategoryTypeName', headerName: 'Category Type', width: 150 },
                { field: 'VendorProductCategoryName', headerName: 'Category Name', width: 150 },
                { field: 'VendorProductTypeName', headerName: 'Product Type Name', width: 180 },
                { field: 'VendorProductUOMName', headerName: 'Product UOM Name', width: 180 },
                { field: 'UOMTypeName', headerName: 'UOM Type Name', width: 180 },
                { field: 'UOMSize', headerName: 'UOM Size', width: 150 },
                { field: 'VendorProductTypeCount', headerName: 'Product Type Count', width: 180 },
                { field: 'IsReturn', headerName: 'Is Return', type: 'boolean', width: 150, valueGetter: (__, row) => row.IsReturn === 1 },
            ],
        },
    });

    return (
        <TablessContainer
            headerName="Category Type Details"
            backURL={`/dashboard/inventory/products/product-category/sale-category-type?VendorProductCategoryID=${VendorProductCategoryID}`}
        >
            {UI.render()}
        </TablessContainer>
    );
};

export default CategoryTypeDetail;
