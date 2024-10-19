'use client';

import { APPCRUD } from '@/api';
import { StatusChips } from '@/components/Chips';

const CommisionRange = () => {
    const UI = new APPCRUD({
        grid: {
            showDates: false,
            fetchUrl: 'GetVendorCommissionTypeRange',
            columns: [
                { field: 'RangeNO', headerName: 'Range Number', width: 150 },
                { field: 'SystemCommissionTypeName', headerName: 'Commission Type', width: 170 },
                { field: 'SystemCommissionUserTypeName', headerName: 'Commission User', width: 170 },
                { field: 'AddedByName', headerName: 'Added By', width: 150 },
                { field: 'DateStarted', headerName: 'Date Started', width: 150 },
                { field: 'DateClosed', headerName: 'Date Closed', width: 150 },

                {
                    field: 'IsProductCommission',
                    headerName: 'Is Product',
                    type: 'boolean',
                    valueGetter: (__, row) => row.IsProductCommission,
                    width: 150
                },

                {
                    field: 'StatusID',
                    headerName: 'Status',
                    width: 150,
                    renderCell: ({ row: { StatusID } }) =>
                        StatusID === '1' ? (
                            <StatusChips statusID={StatusID} name={'Active'} />
                        ) : (
                            <StatusChips statusID={StatusID} name={'Disabled'} />
                        ),
                },
            ],
        },
    });

    return UI.render();
};

export default CommisionRange;
