'use client';

import { APPCRUD, useFetch, VendorUserObjectInterface, VendorAllowanceType } from '@/api';
import { StatusChips } from '@/components/Chips';

type Params = { VendorAllowanceTypeID: number; UserID: number };

const AllowanceRequest = () => {
    const { data: VendorUsers } = useFetch<VendorUserObjectInterface, void>('getVendorUsers');
    const { data: allowanceType } = useFetch<VendorAllowanceType, void>('getVendorAllowanceType');

    const users = VendorUsers?.Data.map((user) => ({ userName: `${user.FirstName} ${user.LastName}`, UserID: user.UserID }));

    const UI = new APPCRUD<any, void, void, Params>({
        grid: {
            fetchUrl: 'getVendorAllowanceRequest',
            params: { VendorAllowanceTypeID: 0, UserID: 0 },
            filters: [
                {
                    title: 'Users',
                    valueKey: 'UserID',
                    labelKey: 'userName',
                    filterOptions: users ?? [],
                },
                {
                    title: 'Allowance type',
                    valueKey: 'VendorAllowanceTypeID',
                    labelKey: 'VendorAllowanceTypeName',
                    filterOptions: allowanceType?.Data || [],
                },
            ],
            columns: [
                { field: 'RequestNO', headerName: 'Request Number', mobileWidth: 170 },
                { field: 'VendorAllowanceTypeName', headerName: 'Allowance Type', mobileWidth: 170 },
                { field: 'RequestedAmount', headerName: 'Requested Amount', mobileWidth: 200 },
                { field: 'ApprovedAmount', headerName: 'Approved Amount', mobileWidth: 200 },
                { field: 'RequestedByName', headerName: 'Added By', mobileWidth: 180 },
                { field: 'ApprovedBy', headerName: 'Approved By', mobileWidth: 180 },
                { field: 'DateApproved', headerName: 'Approval Date', mobileWidth: 200 },
                { field: 'DateAdded', headerName: 'Request Date', mobileWidth: 170 },
                {
                    field: 'VendorAllowanceRequestStatusName',
                    headerName: 'Status',
                    mobileWidth: 170,
                    renderCell: ({ row: { StatusID, VendorAllowanceRequestStatusName } }) => (
                        <StatusChips statusID={StatusID} name={VendorAllowanceRequestStatusName} />
                    ),
                },
            ],
        },
    });

    return UI.render();
};

export default AllowanceRequest;
