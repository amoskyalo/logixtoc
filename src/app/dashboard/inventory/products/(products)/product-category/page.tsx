'use client';

import { APPCRUD, VendorProductCategory, useFetch, ProductUOM } from '@/api';
import { useRouter } from 'next/navigation';

const ProductCategory = () => {
    const router = useRouter();
    const { data: UOM } = useFetch<ProductUOM, void>('getProductUOM');

    const UI = new APPCRUD<VendorProductCategory, any, any, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorProductCategory',
            actions: ['options'],
            options: [
                {
                    name: 'Sale Category Type',
                    onClick: (activeRecord) =>
                        router.push(
                            `/dashboard/inventory/products/product-category/sale-category-type?VendorProductCategoryID=${activeRecord.VendorProductCategoryID}`,
                        ),
                },
                { name: 'Edit', onClick: () => null },
                { name: 'Delete', onClick: () => null },
            ],
            columns: [
                { field: 'VendorProductCategoryName', headerName: 'Product Category Name', mobileWidth: 220 },
                { field: 'HasReturn', headerName: 'Has Return', type: 'boolean', valueGetter: (__, row) => row.HasReturn !== '0', mobileWidth: 170 },
                {
                    field: 'VendorProductCategoryTypeArray',
                    headerName: 'Sale Category Count',
                    type: 'number',
                    valueGetter: (__, row) => row.VendorProductCategoryTypeArray.length,
                    mobileWidth: 200,
                },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 170 },
            ],
        },
        form: {
            type: 'stepperForm',
            title: 'Add Sale Product',
            submitKey: 'addVendorProductCategory',
            stepsLabels: ['Add Product', 'Add Product Category Type'],
            stepBasedDialogSize: (step) => (step === 0 ? 'xs' : 'sm'),
            modifyData: ({ gridValues, ...rest }) => ({
                vendorProductCategoryTypeArray: gridValues,
                ...rest,
            }),
            steps: [
                {
                    type: 'normal',
                    initialValues: { vendorProductCategoryName: '', hasReturn: '' },
                    inputs: [
                        { label: 'Product Category Name', key: 'vendorProductCategoryName', type: 'text', validate: true },
                        { label: 'Has Return', key: 'hasReturn', type: 'boolean', validate: true },
                    ],
                },
                {
                    type: 'gridForm',
                    focusField: 'vendorProductCategoryTypeName',
                    newRow: { vendorProductCategoryTypeName: '', isAdminSaleOnly: '', vendorProductUOMID: '' },
                    columns: [
                        { field: 'vendorProductCategoryTypeName', headerName: 'Category Type Name', width: 170 },
                        {
                            field: 'vendorProductUOMID',
                            type: 'singleSelect',
                            headerName: 'Product UOM',
                            width: 130,
                            valueOptions: UOM?.Data || [],
                            getOptionLabel: (option: any) => option.VendorProductUOMName,
                            getOptionValue: (option: any) => option.VendorProductUOMID,
                        },
                        {
                            field: 'isAdminSaleOnly',
                            headerName: 'Admin Sale Only',
                            type: 'singleSelect',
                            width: 150,
                            getOptionLabel: (option: any) => option.label,
                            getOptionValue: (option: any) => option.value,
                            valueOptions: [
                                { label: 'Yes', value: 1 },
                                { label: 'No', value: 0 },
                            ],
                        },
                    ],
                },
            ],
        },
    });

    return UI.render();
};

export default ProductCategory;
