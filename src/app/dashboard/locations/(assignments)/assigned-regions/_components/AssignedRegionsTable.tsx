'use client';

import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { AssignedRegionObjInterface } from '@/api';
import { DeleteDialog } from '@/components/Dialogs';
import { useResponsiveness, useGridDelete } from '@/hooks';

const AssignedRegionsTable = ({ rows, isLoading, refetch, ...otherProps }: GridProps<AssignedRegionObjInterface>) => {
    const { isMobile } = useResponsiveness();

    const { handleDelete, loading, open, onClose, setOpen, setDeleteParams } = useGridDelete<{
        vendorLocationID: string | number;
        vendorRegionID: string | number;
    }>({
        deleteKey: 'deleteAssignedRegions',
        initialDeleteParams: { vendorLocationID: '', vendorRegionID: '' },
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
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'VendorRegionName',
            headerName: 'Region',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'DateAdded',
            headerName: 'Date Added',
            ...getColumnWidth(200, isMobile),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            getActions: ({ row: { VendorLocationID, VendorRegionID } }) => {
                return [
                    <DataGridActions
                        actions={['delete']}
                        key="actions"
                        onDelete={() => {
                            setDeleteParams({
                                vendorLocationID: VendorLocationID,
                                vendorRegionID: VendorRegionID,
                            });
                            setOpen(true);
                        }}
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <DataGrid rows={getIndexedRows(rows)} columns={columns} loading={isLoading} {...otherProps} />
            <DeleteDialog open={open} loading={loading} onOkay={handleDelete} onCancel={onClose} />
        </>
    );
};

export default AssignedRegionsTable;
