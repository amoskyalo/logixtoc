'use client';
import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { LocationsArrayInterface } from '@/api';
import { useResponsiveness, useGridDelete } from '@/hooks';
import { DeleteDialog } from '@/components/Dialogs';

const LocationsTable = ({ rows, isLoading, refetch, ...otherProps }: Readonly<GridProps<LocationsArrayInterface>>) => {
    const { isMobile } = useResponsiveness();

    const { setDeleteParams, handleDelete, loading, open, setOpen } = useGridDelete<{ vendorLocationID: string | number }>({
        deleteKey: 'deleteVendorLocation',
        initialDeleteParams: { vendorLocationID: '' },
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
            field: 'VendorLocationTypeName',
            headerName: 'Type',
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
            ...getColumnWidth(175, isMobile),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            type: 'actions',
            getActions: ({ row: { VendorLocationID } }) => {
                return [
                    <DataGridActions
                        key="actions"
                        onDelete={() => {
                            setDeleteParams({
                                vendorLocationID: VendorLocationID,
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
            <DataGrid columns={columns} rows={getIndexedRows(rows)} loading={isLoading} {...otherProps} />
            <DeleteDialog open={open} loading={loading} onOkay={handleDelete} onCancel={() => setOpen(false)} />
        </>
    );
};

export default LocationsTable;
