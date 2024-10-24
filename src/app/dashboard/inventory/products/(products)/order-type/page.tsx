'use client';

import { APPCRUD, OrderType as SaleOrderTypeInterface, useFetch, VendorOrderType } from '@/api';

type Values = { SaleOrderTypeID: string };
type Delete = { VendorSaleOrderTypeID: number };

const OrderType = () => {
    const { data: saleOrderType } = useFetch<SaleOrderTypeInterface, void>('getSaleOrderType');

    const UI = new APPCRUD<VendorOrderType, Values, Delete, void>({
        grid: {
            fetchUrl: 'getVendorSaleOrderType',
            deleteUrl: 'removeVendorSaleOrderType',
            actions: ["delete"],
            initialDeleteParams: { VendorSaleOrderTypeID: 0 },
            columns: [
                { field: 'SaleOrderTypeName', headerName: 'UOM Type Name', flex: 1 },
                { field: 'DateAdded', headerName: 'Date Added', flex: 1 },
            ],
        },
        form: {
            submitKey: 'postVendorSaleOrderType',
            title: 'Add Order Type',
            type: 'normal',
            initialValues: { SaleOrderTypeID: '' },
            inputs: [
                {
                    label: 'Select Order Type',
                    key: 'SaleOrderTypeID',
                    validate: true,
                    type: 'select',
                    lookups: saleOrderType?.Data || [],
                    lookupDisplayName: 'SaleOrderTypeName',
                    lookupDisplayValue: 'SaleOrderTypeID',
                },
            ],
        },
    });

    return UI.render();
};

export default OrderType;
