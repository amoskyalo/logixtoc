'use client';

import { useState } from 'react';
import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { DeleteDialog } from '@/components/Dialogs';
import { GridColDef } from '@mui/x-data-grid';
import { VendorLocationUserAssignmentRow, useMutate } from '@/api';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { useResponsiveness } from '@/hooks';

const AssignedUsersTable = ({ isLoading, rows, refetch, ...otherParams }: GridProps<VendorLocationUserAssignmentRow>) => {
    const [activeParam, setActiveParam] = useState<string | number>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { isMobile } = useResponsiveness();
    const { mutate } = useMutate<{ vendorLocationUserAssignmentID: number | string }>('deleteVendorLocationUserAssignmentTX');

    const onClose = () => {
        setActiveParam('');
    };

    const handleDelete = () => {
        setLoading(true);
        mutate({ vendorLocationUserAssignmentID: activeParam }, mutateOptions({ refetch, onClose, setLoading }));
    };

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
                return [<DataGridActions key="action" onDelete={() => setActiveParam(VendorLocationUserAssignmentID)} actions={['delete']} />];
            },
        },
    ];

    return (
        <>
            <DataGrid rows={getIndexedRows(rows)} columns={columns} loading={isLoading} {...otherParams} />

            <DeleteDialog open={Number.isInteger(activeParam)} onCancel={onClose} loading={loading} onOkay={handleDelete} />
        </>
    );
};

export default AssignedUsersTable;
