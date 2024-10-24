'use client';

import { ActualStock as ActualStockProps, APPCRUD } from '@/api';
import { StatusChips } from '@/components/Chips';

type Params = { VendorLocationID: number };

const ActualStock = () => {
    const UI = new APPCRUD<ActualStockProps, void, void, Params>({
        grid: {
            hasLocationsFilters: true,
            fetchUrl: 'getActualStock',
            actions: ['options'],
            params: { VendorLocationID: 0 },
            columns: [
                { field: 'StockNO', headerName: 'Stock No.', width: 150 },
                { field: 'AddedByName', headerName: 'Added By', width: 150 },
                { field: 'DateAdded', headerName: 'Date Added', width: 180 },
                { field: 'SourceVendorLocationName', headerName: 'Source Location', width: 150 },
                { field: 'DestinationVendorLocationName', headerName: 'Destination Location', width: 170 },
                { field: 'StockMovementTypeName', headerName: 'Movement Type', width: 150 },
                {
                    field: 'Status',
                    headerName: 'Status',
                    width: 150,
                    renderCell: ({ row: { StockMovementStatusID, StockMovementStatusName } }) => (
                        <StatusChips statusID={StockMovementStatusID} name={StockMovementStatusName} />
                    ),
                },
            ],
        },
    });

    return UI.render();
};

export default ActualStock;
