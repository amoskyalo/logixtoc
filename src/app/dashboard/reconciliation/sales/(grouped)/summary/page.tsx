'use client';

import { APPCRUD, SummaryDeliveryPlan } from '@/api';
import { StatusChips } from '@/components/Chips';
import { useRouter } from 'next/navigation';

type Params = { VendorLocationID: number };

const Summary = () => {
    const router = useRouter();

    const handleNavigate = (activeRecord: any, route: string) => {
        router.push(`/dashboard/reconciliation/sales/summary/${route}?DeliveryPlanNO=${activeRecord.DeliveryPlanNO}&stockNO=${activeRecord.StockNO}`);
    };

    const UI = new APPCRUD<SummaryDeliveryPlan, void, void, Params>({
        grid: {
            hasLocationsFilters: true,
            fetchUrl: 'getVendorLocationStockSaleSummary',
            actions: ['options'],
            options: [
                { name: 'Sales', onClick: (activeRecord) => handleNavigate(activeRecord, 'sales') },
                { name: 'Collection', onClick: (activeRecord) => handleNavigate(activeRecord, 'collection') },
            ],
            params: { VendorLocationID: 0 },
            columns: [
                { field: 'DeliveryPlanNO', headerName: 'Delivery Plan No.', width: 170 },
                { field: 'VendorLocationName', headerName: 'Vendor Location Name', width: 180 },
                { field: 'TotalOrderAmount', headerName: 'Expected Amount', type: 'number', width: 170 },
                {
                    field: 'Delivered',
                    type: 'number',
                    width: 120,
                    valueGetter: (__, { CreditSaleAmount, OnlineSaleAmount }) => CreditSaleAmount + OnlineSaleAmount,
                },
                { field: 'PendingSaleAmount', headerName: 'Pending', type: 'number', width: 120 },
                { field: 'CollectedAmount', headerName: 'Collected', type: 'number', width: 120 },
                { field: 'VarianceAmount', headerName: 'Variance', type: 'number', width: 120 },
                {
                    field: 'DeliveryPlanStatusName',
                    headerName: 'Plan Status',
                    width: 150,
                    renderCell: ({ row: { DeliveryPlanStatusID, DeliveryPlanStatusName } }) => (
                        <StatusChips statusID={DeliveryPlanStatusID} name={DeliveryPlanStatusName} />
                    ),
                },
            ],
        },
    });

    return UI.render();
};

export default Summary;
