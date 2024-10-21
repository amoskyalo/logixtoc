'use client';

import { StatusChips } from '@/components/Chips';
import { APPCRUD } from '@/api';

const LeaveRequest = () => {
    const UI = new APPCRUD({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorLeaveRequest',
            columns: [
                { field: 'VendorLeaveTypeName', headerName: "Leave Type Name", mobileWidth: 200 },
                { field: 'UserName', headerName: 'Employee', mobileWidth: 150 },
                { field: 'LeaveDescription', headerName: 'Description', mobileWidth: 150 },
                { field: 'ActionedByName', headerName: 'Actioned By', mobileWidth: 150 },
                {
                    field: 'StatusID',
                    headerName: 'Status',
                    mobileWidth: 150,
                    renderCell: (param) => <StatusChips statusID={param.row.StatusID} name={param.row.StatusName} />,
                },
            ],
        },
    });

    return UI.render()
};

export default LeaveRequest;
