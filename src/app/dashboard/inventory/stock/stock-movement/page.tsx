'use client';

import { StockMovement, APPCRUD, useFetch, StockMovementType, StockMovementStatus } from '@/api';
import { StatusChips } from '@/components/Chips';

type Params = {
    StockMovementTypeID: number;
    StockMovementStatusID: number;
    VendorLocationID: number;
};

const Stock = () => {
    const { data: movementType } = useFetch<StockMovementType, void>('getStockMovementType');
    const { data: movementStatus } = useFetch<StockMovementStatus, void>('getStockMovementStatus')

    const UI = new APPCRUD<StockMovement, void, void, Params>({
        grid: {
            hasLocationsFilters: true,
            fetchUrl: 'getStockMovementHistory',
            params: {
                StockMovementTypeID: 0,
                StockMovementStatusID: 99,
                VendorLocationID: 0,
            },
            filters: [
                {
                    title: 'Movement Type',
                    valueKey: 'StockMovementTypeID',
                    labelKey: 'StockMovementTypeName',
                    filterOptions: movementType?.Data || [],
                },
                {
                    title: 'Movement Status',
                    valueKey: 'StockMovementStatusID',
                    labelKey: 'StockMovementStatusName',
                    filterOptions: movementStatus?.Data || [],
                },
            ],
            columns: [
                { field: 'StockNO', headerName: 'Stock NO', width: 150 },
                { field: 'SourceVendorLocationName', headerName: 'Source Location Name', width: 200 },
                { field: 'DestinationVendorLocationName', headerName: 'Destination Location Name', width: 220 },
                { field: 'StockMovementTypeName', headerName: 'Stock Movement Type', width: 200 },
                { field: 'AddedByName', headerName: 'Added By', width: 150 },
                { field: 'DateAdded', headerName: 'Date Added', width: 200 },
                {
                    field: 'Status',
                    headerName: 'Status',
                    width: 150,
                    renderCell: ({ row: { StockMovementStatusName, StockMovementStatusID } }) => (
                        <StatusChips name={StockMovementStatusName} statusID={StockMovementStatusID} />
                    ),
                },
            ],
        },
    });

    return UI.render();
};

export default Stock;
