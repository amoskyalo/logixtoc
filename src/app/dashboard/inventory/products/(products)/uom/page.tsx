'use client';

import { ProductUOMType, ProductUOM } from '@/api';
import { useFetch } from '@/hooks';
import { UIConstructor } from '@/UIModel';

type Delete = { vendorProductUOMID: number };
type Values = {
    uomSize: number;
    vendorProductUOMName: string;
    productUOMTypeID: number;
};

const UOM = () => {
    const { data: productUOMTypes } = useFetch<ProductUOMType, void>('getProductUOMType');

    const UI = new UIConstructor<ProductUOM, Values, Delete, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getProductUOM',
            deleteUrl: 'deleteProductUOM',
            initialDeleteParams: { vendorProductUOMID: '' as unknown as number },
            columns: [
                { field: 'VendorProductUOMName', headerName: 'Product UOM', mobileWidth: 150 },
                { field: 'UOMTypeName', headerName: 'UOM Type', mobileWidth: 150 },
                { field: 'UOMSize', headerName: 'UOM Size', type: 'number', mobileWidth: 150 },
                { field: 'DateAdded', headerName: 'Date Added', mobileWidth: 200 },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add Product UOM',
            submitKey: 'postProductUOM',
            initialValues: { uomSize: '' as unknown as number, vendorProductUOMName: '', productUOMTypeID: '' as unknown as number },
            inputs: [
                { label: 'UOM Name', key: 'vendorProductUOMName', type: 'text', validate: true },
                { label: 'UOM Size', key: 'uomSize', type: 'number', validate: true },
                {
                    label: 'Product UOM Type',
                    key: 'productUOMTypeID',
                    validate: true,
                    type: 'select',
                    lookups: productUOMTypes?.Data ?? [],
                    lookupDisplayName: 'UOMTypeName',
                    lookupDisplayValue: 'ProductUOMTypeID',
                },
            ],
        },
    });

    return UI.render();
};

export default UOM;
