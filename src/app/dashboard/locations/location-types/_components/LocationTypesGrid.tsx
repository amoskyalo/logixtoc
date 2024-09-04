'use client';

import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { StatusChips } from '@/components/Chips';
import { VendorLocationType } from '@/api';
import { useResponsiveness, useGridDelete } from '@/hooks';
import { DeleteDialog } from '@/components/Dialogs';

const LocationTypesGrid = ({ isLoading, rows, refetch, onAdd }: GridProps<VendorLocationType>) => {
    const { isMobile } = useResponsiveness();

    const { setDeleteParams, loading, handleDelete, onClose, deleteParams } = useGridDelete<{ vendorLocationTypeID: number | string }>({
        deleteKey: 'deleteVendorLocationType',
        initialDeleteParams: { vendorLocationTypeID: '' },
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
            field: 'VendorLocationTypeName',
            headerName: 'Location Type',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'LocationsArray',
            headerName: 'Count',
            type: 'number',
            valueGetter: (__, row) => row.LocationArray.length,
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'AddedByName',
            headerName: 'Added By',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'DateAdded',
            headerName: 'Date Added',
            ...getColumnWidth(200, isMobile),
        },
        {
            field: 'StatusID',
            headerName: 'Status',
            ...getColumnWidth(100, isMobile),
            renderCell: ({ row: { StatusID } }) => <StatusChips statusID={StatusID} name="Active" />,
        },
        {
            field: 'Actions',
            type: 'actions',
            headerName: 'Actions',
            getActions: ({ row: { VendorLocationTypeID } }) => {
                return [
                    <DataGridActions
                        key="actions"
                        onDelete={() => setDeleteParams({ vendorLocationTypeID: VendorLocationTypeID })}
                        onEdit={() => null}
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <DataGrid rows={getIndexedRows(rows)} loading={isLoading} columns={columns} onAdd={onAdd} />
            <DeleteDialog loading={loading} open={Number.isInteger(deleteParams.vendorLocationTypeID)} onOkay={handleDelete} onCancel={onClose} />
        </>
    );
};

export default LocationTypesGrid;
