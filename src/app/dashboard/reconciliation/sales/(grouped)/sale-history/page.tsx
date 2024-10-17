'use client';

import { APPCRUD } from '@/api';
import { StatusChips } from '@/components/Chips';

const SaleHistory = () => {
    const UI = new APPCRUD({
        grid: {
            fetchUrl: 'getVendorSaleHistory',
            actions: ['options'],
            options: [
                { name: 'Approve Sale', onClick: () => null },
                { name: 'Reverse Sale', onClick: () => null },
                { name: 'Sales Details', onClick: () => null },
            ],
            columns: [
                { field: 'SaleID', headerName: 'Sale ID', mobileWidth: 150 },
                { field: 'VendorLocationName', headerName: 'Vehicle', mobileWidth: 150 },
                { field: 'CustomerName', headerName: 'Customer', mobileWidth: 150 },
                { field: 'LocationName', headerName: 'Shop', mobileWidth: 150 },
                { field: 'AddedByName', headerName: 'Generator', mobileWidth: 150 },
                { field: 'OrderAmount', mobileWidth: 150, headerName: 'Order Amount', type: 'number' },
                { field: 'DateAdded', mobileWidth: 150, headerName: 'Date' },
                {
                    field: 'SaleOrderStatusName',
                    headerName: 'Status',
                    mobileWidth: 150,
                    renderCell: ({ row: { SaleOrderStatusID, SaleOrderStatusName } }) => (
                        <StatusChips statusID={SaleOrderStatusID} name={SaleOrderStatusName} />
                    ),
                },
            ],
        },
    });

    return UI.render();
};

export default SaleHistory;
