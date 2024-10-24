'use client';

import { GetVendorStockParams, VendorStock, APPCRUD, useFetch, ProductType, ProductBrand, ProductUOM } from '@/api';

const StockLevel = () => {
    const { data: vendorProducts } = useFetch<ProductType, void>('getVendorProductTypes');
    const { data: vendorBrand } = useFetch<ProductBrand, void>('getProductBrands');
    const { data: vendorUOM } = useFetch<ProductUOM, void>('getProductUOM');

    const UI = new APPCRUD<VendorStock, void, void, GetVendorStockParams>({
        grid: {
            hasLocationsFilters: true,
            fetchUrl: 'getStockLevel',
            params: {
                VendorLocationID: 0,
                VendorProductBrandID: 0,
                VendorProductTypeID: 0,
                VendorProductUOMID: 0,
            },
            filters: [
                {
                    title: 'Product types',
                    valueKey: 'VendorProductTypeID',
                    labelKey: 'VendorProductTypeName',
                    filterOptions: vendorProducts?.Data || [],
                },
                {
                    title: 'Product brand',
                    valueKey: 'VendorProductBrandID',
                    labelKey: 'VendorProductBrandName',
                    filterOptions: vendorBrand?.Data || [],
                },
                {
                    title: 'Product UOM',
                    valueKey: 'VendorProductUOMID',
                    labelKey: 'VendorProductUOMName',
                    filterOptions: vendorUOM?.Data || [],
                },
            ],
            columns: [
                { field: 'VendorLocationName', headerName: 'Location', width: 150 },
                { field: 'VendorProductBrandName', headerName: 'Product Brand', width: 150 },
                { field: 'VendorProductTypeName', headerName: 'Product Type', width: 150 },
                { field: 'VendorProductUOMName', headerName: 'Product UOM', width: 150 },
                { field: 'OpeningStock', headerName: 'Opening Stock', type: 'number', width: 150 },
                { field: 'ReceivedStock', headerName: 'Received Stock', type: 'number', width: 150 },
                { field: 'SoldStock', headerName: 'Sold Stock', type: 'number', width: 150 },
                { field: 'IssuedStock', headerName: 'Issued Stock', type: 'number', width: 150 },
                { field: 'CurrentStock', headerName: 'Current Stock', type: 'number', width: 150 },
            ],
        },
    });

    return UI.render();
};

export default StockLevel;
