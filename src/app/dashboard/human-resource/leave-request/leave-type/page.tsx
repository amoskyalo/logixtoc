'use client';

import { APPCRUD, LeaveRequestType } from '@/api';
import { Chip } from '@mui/material';

type Delete = { vendorLeaveTypeID: number };
type Values = { vendorLeaveTypeName: string };

const LeaveType = () => {
    const UI = new APPCRUD<LeaveRequestType, Values, Delete, void>({
        grid: {
            showDates: false,
            fetchUrl: 'getVendorLeaveType',
            deleteUrl: 'removeVendorLeaveType',
            actions: ['delete'],
            initialDeleteParams: { vendorLeaveTypeID: 0 },
            columns: [
                { field: 'VendorLeaveTypeName', headerName: 'Leave Type', mobileWidth: 150 },
                { field: 'DateAdded',headerName: 'Date Added', mobileWidth: 150 },
                {
                    field: 'StatusID',
                    headerName: 'Status',
                    mobileWidth: 100,
                    renderCell: () => <Chip color="primary" label="Active" variant="outlined" />,
                },
            ],
        },
        form: {
            type: 'normal',
            title: 'Add New Leave Type',
            submitKey: 'postVendorLeaveType',
            initialValues: { vendorLeaveTypeName: '' },
            inputs: [{ label: 'Leave Type Name', type: 'text', key: 'vendorLeaveTypeName', validate: true }],
        },
    });

    return UI.render();
};

export default LeaveType;
