'use client';

import { GetVendorStockParams, VendorStock, APPCRUD } from '@/api';

const StockLevel = () => {
    const UI = new APPCRUD<VendorStock, void, void, GetVendorStockParams>({
        grid: {
            fetchUrl: 'getStockLevel',
            params: {
                VendorLocationID: 0,
                VendorProductBrandID: 0,
                VendorProductTypeID: 0,
                VendorProductUOMID: 0,
            },
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
