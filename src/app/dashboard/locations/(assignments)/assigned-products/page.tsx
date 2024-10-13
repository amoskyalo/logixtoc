'use client';

import { useFetch, AssignedProductInterface, ProductType, APPCRUD } from '@/api';

type Values = {
    vendorLocationID: number;
    productTypeArray: Array<{
        vendorProductTypeID: number;
    }>;
};

type Delete = { vendorLocationProductTypeID: number };

type Params = { VendorLocationID: number };

const AssignedProducts = () => {
    const { data: vendorProducts } = useFetch<ProductType, void>('getVendorProductTypes');

    const UI = new APPCRUD<AssignedProductInterface, Values, Delete, Params>({
        grid: {
            showDates: false,
            actions: ['delete'],
            fetchUrl: 'getAssignedProducts',
            deleteUrl: 'deleteAssignedProducts',
            initialDeleteParams: { vendorLocationProductTypeID: '' as unknown as number },
            params: { VendorLocationID: 0 },
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', mobileWidth: 150 },
                { field: 'VendorProductTypeName', headerName: 'Product Type', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
            ],
        },
        form: {
            type: 'normal',
            submitKey: 'postAssignedProducts',
            title: 'Add New Location Product Type',
            initialValues: { vendorLocationID: '' as unknown as number, productTypeArray: [] },
            modifyData: (data) => ({
                productTypeArray: data.productTypeArray.map((product: any) => ({
                    vendorProductTypeID: product.vendorProductTypeID,
                })),
                vendorLocationID: data.vendorLocationID,
            }),
            inputs: [
                { label: 'Locations', key: 'vendorLocationID', type: 'singleLocation', validate: true },
                {
                    label: 'Products',
                    key: 'productTypeArray',
                    type: 'multiple',
                    validate: true,
                    optionKey: 'vendorProductTypeID',
                    optionValueKey: 'VendorProductTypeID',
                    optionLabelKey: 'VendorProductTypeName',
                    lookups: vendorProducts?.Data ?? [],
                },
            ],
        },
    });

    return UI.render();
};

export default AssignedProducts;
