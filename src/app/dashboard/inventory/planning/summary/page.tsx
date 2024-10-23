'use client';
import { APPCRUD } from '@/api';
import { TablessContainer } from '@/components/Containers';
import { useSearchParams } from 'next/navigation';

const Summary = () => {
    const StockNO = useSearchParams().get('StockNO');

    const UI = new APPCRUD({
        grid: {
            showActions: false,
            showDates: false,
            fetchUrl: 'getStockMovementStockNOSummary',
            params: { StockNO },
            columns: [
                { field: 'VendorProductBrandName', headerName: 'Brand', flex: 1 },
                { field: 'VendorProductTypeName', headerName: 'Type', flex: 2 },
                { field: 'VendorProductUOMName', headerName: 'UOM', flex: 1 },
                { field: 'LoadedQuantity', headerName: 'Loaded', flex: 1 },
                { field: 'SoldQuantity', headerName: 'Sold', flex: 1 },
                { field: 'SaleReturnQuantity', headerName: 'Sale Return', flex: 1 },
                { field: 'DeliveryQuantity', headerName: 'Delivered', flex: 1 },
                { field: 'DeliveryReturnQuantity', headerName: 'Delivery Return', flex: 1 },
                {
                    field: 'Variance',
                    headerName: 'Variance',
                    flex: 1,
                    renderCell: (param) => (
                        <p className={`${param?.row?.Variance?.toString()?.includes('-') ? 'text-red-700' : null}`}>{param.row.Variance}</p>
                    ),
                },
            ],
        },
    });

    return (
        <TablessContainer headerName="Movement Summary" backURL="/dashboard/inventory/planning">
            {UI.render()}
        </TablessContainer>
    );
};

export default Summary;
