'use client';

import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getIndexedRows } from '@/utils';
import { AssignedAccount } from '@/api';
import { DeleteDialog } from '@/components/Dialogs';
import { useGridDelete } from '@/hooks';

const AssignedAccountsTable = ({ rows, isLoading, refetch, onAdd }: GridProps<AssignedAccount>) => {
    const { handleDelete, open, loading, onClose, setOpen, setDeleteParams } = useGridDelete<{
        vendorAccountID: string | number;
        vendorLocationID: string | number;
    }>({
        deleteKey: 'deleteAssignedAccount',
        initialDeleteParams: { vendorAccountID: '', vendorLocationID: '' },
        refetch,
    });

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'No.',
            width: 50,
            sortable: false,
        },
        {
            field: 'VendorLocationName',
            headerName: 'Location',
            width: 150,
        },
        {
            field: 'VendorAccountTypeName',
            headerName: 'Account Type',
            width: 150,
        },
        {
            field: 'VendorAccountName',
            headerName: 'Account Name',
            width: 150,
        },
        {
            field: 'VendorAccountNO',
            headerName: 'Account Number',
            width: 150,
        },
        {
            field: 'Description',
            headerName: 'Description',
            width: 150,
        },
        {
            field: 'isShared',
            headerName: 'Shared',
            width: 150,
            type: 'boolean',
            valueGetter: (__, row) => row.isShared === 1,
        },
        {
            field: 'isIntegrated',
            headerName: 'Integrated',
            width: 150,
            type: 'boolean',
            valueGetter: (__, row) => row.isIntegrated === 1,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            getActions: ({ row: { VendorAccountID, VendorLocationID } }) => {
                return [
                    <DataGridActions
                        key="delete"
                        actions={['delete']}
                        onDelete={() => {
                            setOpen(true);
                            setDeleteParams({
                                vendorAccountID: VendorAccountID,
                                vendorLocationID: VendorLocationID,
                            });
                        }}
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <DataGrid columns={columns} rows={getIndexedRows(rows)} loading={isLoading} onAdd={onAdd} />

            <DeleteDialog open={open} onCancel={onClose} onOkay={handleDelete} loading={loading} />
        </>
    );
};

export default AssignedAccountsTable;
