'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useFetch, ProductUOM, VendorProductCategoryType, APPCRUD } from '@/api';
import { TablessContainer } from '@/components/Containers';

type Values = {
    isAdminSaleOnly: number;
    vendorProductCategoryTypeName: string;
    vendorProductUOMID: number;
};

type Params = {
    VendorProductCategoryID: number;
};

const SaleCategoryType = () => {
    const router = useRouter();
    const VendorProductCategoryID = useSearchParams().get('VendorProductCategoryID') as unknown as number;
    const { data: uomList } = useFetch<ProductUOM, void>('getProductUOM');

    const UI = new APPCRUD<VendorProductCategoryType, Values, void, Params>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorProductCategoryType',
            actions: ['options'],
            params: { VendorProductCategoryID },
            options: [
                {
                    name: 'Category Type Detail',
                    onClick: (activeRecord) => {
                        const url = `/dashboard/inventory/products/product-category/sale-category-type/category-type-detail?VendorProductCategoryID=${activeRecord.VendorProductCategoryID}$VendorProductCategoryTypeID=${activeRecord.VendorProductCategoryTypeID}`;
                        router.push(url);
                    },
                },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete', onClick: () => null },
            ],
            columns: [
                { field: 'VendorProductCategoryTypeName', headerName: 'Category Type Name', width: 200 },
                { field: 'VendorProductCategoryName', headerName: 'Category Name', width: 170 },
                { field: 'VendorProductUOMName', headerName: 'Product UOM Name', width: 200 },
                { field: 'UOMTypeName', headerName: 'UOM Type Name', width: 170 },
                { field: 'UOMSize', headerName: 'UOM Size', type: 'number', width: 170 },
                {
                    field: 'isAdminSaleOnly',
                    headerName: 'Admin Sale Only',
                    type: 'boolean',
                    valueGetter: (__, row) => row.isAdminSaleOnly === 1,
                    width: 170,
                },
                {
                    field: 'VendorProductCategoryTypeDetailArray',
                    headerName: 'Detail Count',
                    type: 'number',
                    valueGetter: (__, row) => row.VendorProductCategoryTypeDetailArray.length,
                    width: 140,
                },
            ],
        },
        form: {
            title: 'Add New Product Category Type',
            submitKey: 'addVendorProductCategoryType',
            initialValues: {
                isAdminSaleOnly: '' as unknown as number,
                vendorProductCategoryTypeName: '',
                vendorProductUOMID: '' as unknown as number,
            },
            modifyData: (data) => {
                return {
                    vendorProductCategoryID: VendorProductCategoryID,
                    ...data,
                };
            },
            inputs: [
                { label: 'Product Category Type', key: 'vendorProductCategoryTypeName', type: 'text', validate: true },
                {
                    label: 'Product UOM',
                    key: 'vendorProductUOMID',
                    type: 'select',
                    lookups: uomList?.Data || [],
                    lookupDisplayName: 'VendorProductUOMName',
                    lookupDisplayValue: 'VendorProductUOMID',
                    validate: true,
                },
                { label: 'Is Admin Sale Only', key: 'isAdminSaleOnly', type: 'boolean', validate: true },
            ],
        },
    });

    return (
        <TablessContainer headerName="Sale Category Type" backURL="/dashboard/inventory/products/product-category">
            {UI.render()}
        </TablessContainer>
    );
};

export default SaleCategoryType;
