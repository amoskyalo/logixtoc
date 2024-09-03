'use client';

import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getIndexedRows, mutateOptions } from '@/utils';
import { AssignedAccount, useMutate } from '@/api';
import { useState } from 'react';
import { DeleteDialog } from '@/components/Dialogs';

const AssignedAccountsTable = ({ rows, isLoading, refetch, onAdd }: GridProps<AssignedAccount>) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeParams, setActiveParams] = useState({
        vendorAccountID: '',
        vendorLocationID: '',
    });

    const { mutate } = useMutate<{ vendorAccountID: string | number; vendorLocationID: string | number }>('deleteAssignedAccount');

    const onClose = () => {
        setOpen(false);
        setActiveParams({
            vendorAccountID: '',
            vendorLocationID: '',
        });
    };

    const handleDelete = () => {
        setLoading(true);

        mutate(activeParams, mutateOptions({ refetch, setLoading, onClose }));
    };

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
                            setActiveParams({
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
