'use client';

import { APPCRUD } from '@/api';
import { StatusChips } from '@/components/Chips';
import { useResponsiveness } from '@/hooks';

const MaintenanceRequest = () => {
    const { isMobile } = useResponsiveness();

    const UI = new APPCRUD({
        grid: {
            fetchUrl: 'getVendorMaintenanceRequest',
            columns: [
                { field: 'RequestNO', headerName: 'Request Number', width: isMobile ? 170 : 150 },
                { field: 'VendorLocationName', headerName: 'Location', width: 150 },
                { field: 'VendorMaintenanceStationName', headerName: 'Station', width: 150 },
                { field: 'RequestMileage', headerName: 'Mileage', width: 150, type: 'number' },
                { field: 'RequestedQuantity', headerName: 'Requested Quantity', width: isMobile ? 200 : 170, type: 'number' },
                { field: 'ApprovedQuantity', headerName: 'Approved Quantity', width: isMobile ? 180 : 150, type: 'number' },
                { field: 'PreviousMileage', headerName: 'Previous Mileage', width: isMobile ? 170 : 150, type: 'number' },
                {
                    field: 'MaintenanceRequestStatusName',
                    headerName: 'Status',
                    width: 150,
                    renderCell: ({ row: { StatusID, MaintenanceRequestStatusName } }) => (
                        <StatusChips statusID={StatusID} name={MaintenanceRequestStatusName} />
                    ),
                },
            ],
        },
    });

    return UI.render();
};

export default MaintenanceRequest;
