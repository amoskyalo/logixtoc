'use client';

import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { DeleteDialog } from '@/components/Dialogs';
import { GridColDef } from '@mui/x-data-grid';
import { VendorLocationUserAssignmentRow } from '@/api';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { useResponsiveness, useGridDelete } from '@/hooks';

const AssignedUsersTable = ({ isLoading, rows, refetch, ...otherParams }: GridProps<VendorLocationUserAssignmentRow>) => {
    const { isMobile } = useResponsiveness();

    const { handleDelete, loading, deleteParams, setDeleteParams, onClose } = useGridDelete<{ vendorLocationUserAssignmentID: number | string }>({
        deleteKey: 'deleteVendorLocationUserAssignmentTX',
        initialDeleteParams: { vendorLocationUserAssignmentID: '' },
        refetch,
    });

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'No.',
            width: 60,
            sortable: false,
        },
        {
            field: 'VendorLocationName',
            headerName: 'Location',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'UserName',
            headerName: 'Operator',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'DateAdded',
            headerName: 'Date Added',
            ...getColumnWidth(200, isMobile),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: ({ row: { VendorLocationUserAssignmentID } }) => {
                return [
                    <DataGridActions
                        key="action"
                        onDelete={() => setDeleteParams({ vendorLocationUserAssignmentID: VendorLocationUserAssignmentID })}
                        actions={['delete']}
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <DataGrid rows={getIndexedRows(rows)} columns={columns} loading={isLoading} {...otherParams} />

            <DeleteDialog
                open={Number.isInteger(deleteParams.vendorLocationUserAssignmentID)}
                onCancel={onClose}
                loading={loading}
                onOkay={handleDelete}
            />
        </>
    );
};

export default AssignedUsersTable;
