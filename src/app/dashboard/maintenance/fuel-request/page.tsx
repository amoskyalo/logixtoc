'use client';

import { APPCRUD } from '@/api';
import { StatusChips } from '@/components/Chips';

const FuelRequest = () => {
    const UI = new APPCRUD({
        grid: {
            fetchUrl: 'getVendorLocationFuelRequest',
            columns: [
                { field: 'RequestNO', headerName: 'Request Number', width: 200 },
                { field: 'VendorLocationName', headerName: 'Location', width: 150, type: "number" },
                { field: 'VendorFuelStationName', headerName: 'Station', width: 150, type: "number" },
                { field: 'RequestMileage', headerName: 'Mileage', width: 150, type: "number" },
                { field: 'RequestedQuantity', headerName: 'Requested', width: 150, type: "number" },
                { field: 'ApprovedQuantity', headerName: 'Approved', width: 150, type: "number" },
                { field: 'PreviousMileage', headerName: 'Previous Mileage', width: 170, type: "number" },
                { field: 'FuelingMileage', headerName: 'Fueling Mileage', width: 170, type: "number" },
                {
                    field: 'FuelRequestStatusName',
                    headerName: 'Status',
                    width: 120,
                    renderCell: ({ row: { StatusID, FuelRequestStatusName } }) => <StatusChips statusID={StatusID} name={FuelRequestStatusName} />,
                },
            ],
        },
    });

    return UI.render();
};

export default FuelRequest;
