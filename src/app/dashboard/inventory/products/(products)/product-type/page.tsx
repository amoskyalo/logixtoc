'use client';

import { useState } from 'react';
import { ProductType as ProductTypeInterface, useFetch, ProductClass, ProductBrand, ProductUOM, APPCRUD } from '@/api';
import { useGetUser } from '@/hooks';
import { BrandsList, UOMList, ClassList } from './_components';
import { getMappedObjectArray } from '@/utils';

type Values = {
    vendorProductTypeName: string;
    vendorProductTypeBrandArray: Array<{
        vendorProductBrandID: number;
        label: string;
    }>;
    vendorProductTypeClassArray: Array<{
        productClassID: number;
        label: string;
    }>;
    vendorProductTypeUOMArray: Array<{
        vendorProductUOMID: number;
        label: string;
    }>;
};

type Delete = { vendorProductTypeID: string | number };

const ProductType = () => {
    const [activeRecord, setActiveRecord] = useState<{ type: string; row: ProductTypeInterface | null }>({
        type: '',
        row: null,
    });

    const { VendorTypeID } = useGetUser();

    const { data: productsClass } = useFetch<ProductClass, { VendorTypeID: number }>('getProductClass', { VendorTypeID });
    const { data: productUOMTypes } = useFetch<ProductUOM, void>('getProductUOM');
    const { data: productBrands } = useFetch<ProductBrand, void>('getProductBrands');

    const onClose = () => {
        setActiveRecord({ type: '', row: null });
    };

    const UI = new APPCRUD<ProductTypeInterface, Values, Delete, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorProductTypes',
            deleteUrl: 'deleteVendorProductTypes',
            actions: ['options'],
            initialDeleteParams: { vendorProductTypeID: '' },
            options: [
                { name: 'UOM List', onClick: (record) => setActiveRecord({ row: record, type: 'uom list' }) },
                { name: 'Class List', onClick: (record) => setActiveRecord({ row: record, type: 'class list' }) },
                { name: 'Brands List', onClick: (record) => setActiveRecord({ row: record, type: 'brands list' }) },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete' },
            ],
            columns: [
                { field: 'VendorProductTypeName', headerName: 'Product Type Name', mobileWidth: 200 },
                {
                    field: 'VendorProductTypeUOM',
                    headerName: 'Product UOM Count',
                    type: 'number',
                    valueGetter: (__, row) => row.VendorProductTypeUOM.length,
                    mobileWidth: 200,
                },
                {
                    field: 'VendorProductTypeClass',
                    headerName: 'Product Class Count',
                    type: 'number',
                    valueGetter: (__, row) => row.VendorProductTypeClass.length,
                    mobileWidth: 200,
                },
                {
                    field: 'VendorProductTypeBrand',
                    headerName: 'Product Brand Count',
                    type: 'number',
                    valueGetter: (__, row) => row.VendorProductTypeBrand.length,
                    mobileWidth: 200,
                },
                { field: 'DateAdded', headerName: 'DateAdded', mobileWidth: 200 },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add Product Type',
            submitKey: 'addVendorProductTypes',
            initialValues: {
                vendorProductTypeName: '',
                vendorProductTypeBrandArray: [],
                vendorProductTypeClassArray: [],
                vendorProductTypeUOMArray: [],
            },
            modifyData: (data) => {
                return {
                    vendorProductTypeBrandArray: getMappedObjectArray('vendorProductBrandID', data.vendorProductTypeBrandArray),
                    vendorProductTypeClassArray: getMappedObjectArray('productClassID', data.vendorProductTypeClassArray),
                    vendorProductTypeUOMArray: getMappedObjectArray('vendorProductUOMID', data.vendorProductTypeUOMArray),
                    vendorProductTypeName: data.vendorProductTypeName,
                };
            },
            inputs: [
                { label: 'Product Type Name', key: 'vendorProductTypeName', type: 'text', validate: true },
                {
                    label: 'Product Type Class',
                    key: 'vendorProductTypeClassArray',
                    type: 'multiple',
                    validate: true,
                    lookups: productsClass?.Data ?? [],
                    optionKey: 'productClassID',
                    optionValueKey: 'ProductClassID',
                    optionLabelKey: 'ProductClassName',
                },
                {
                    label: 'Product Type UOM',
                    key: 'vendorProductTypeUOMArray',
                    type: 'multiple',
                    validate: true,
                    lookups: productUOMTypes?.Data ?? [],
                    optionKey: 'vendorProductUOMID',
                    optionValueKey: 'VendorProductUOMID',
                    optionLabelKey: 'VendorProductUOMName',
                },
                {
                    label: 'Product Type Brand',
                    key: 'vendorProductTypeBrandArray',
                    type: 'multiple',
                    validate: true,
                    lookups: productBrands?.Data ?? [],
                    optionKey: 'vendorProductBrandID',
                    optionValueKey: 'VendorProductBrandID',
                    optionLabelKey: 'VendorProductBrandName',
                },
            ],
        },
    });

    return (
        <>
            {UI.render()}
            <UOMList rows={activeRecord?.row?.VendorProductTypeUOM || []} open={activeRecord.type === 'uom list'} onClose={onClose} />
            <ClassList rows={activeRecord?.row?.VendorProductTypeClass || []} open={activeRecord.type === 'class list'} onClose={onClose} />
            <BrandsList rows={activeRecord?.row?.VendorProductTypeBrand || []} open={activeRecord.type === 'brands list'} onClose={onClose} />
        </>
    );
};

export default ProductType;
