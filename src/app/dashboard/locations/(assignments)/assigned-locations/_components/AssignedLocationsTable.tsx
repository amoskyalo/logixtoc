import { DataGrid, GridProps } from '@/components/DataGrids';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { AssignedLocationObject } from '@/api';
import { DeleteDialog } from '@/components/Dialogs';
import { useResponsiveness, useGridDelete } from '@/hooks';
import DeleteIcon from '@mui/icons-material/Delete';

const AssignedLocationsTable = ({ rows, isLoading, refetch, ...otherParams }: GridProps<AssignedLocationObject>) => {
    const { isMobile } = useResponsiveness();

    const { loading, handleDelete, onClose, deleteParams, setDeleteParams } = useGridDelete<{ vendorLocationAssignmentID: number | string }>({
        deleteKey: 'deleteAssignedLocation',
        initialDeleteParams: { vendorLocationAssignmentID: '' },
        refetch,
    });

    const columns: GridColDef[] = [
        {
            field: 'id',
            sortable: false,
            headerName: 'No.',
            width: 60,
        },
        {
            field: 'VendorLocationName',
            headerName: 'Location',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'AssignedVendorLocationName',
            headerName: 'Location Assigned',
            ...getColumnWidth(200, isMobile),
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
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: ({ row: { VendorLocationAssignmentID } }) => {
                return [
                    <GridActionsCellItem
                        label="Delete"
                        color="error"
                        key="delete"
                        icon={<DeleteIcon />}
                        onClick={() => setDeleteParams({ vendorLocationAssignmentID: VendorLocationAssignmentID })}
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <DataGrid columns={columns} rows={getIndexedRows(rows)} loading={isLoading} {...otherParams} />

            <DeleteDialog
                open={Number.isInteger(deleteParams.vendorLocationAssignmentID)}
                loading={loading}
                onCancel={onClose}
                onOkay={handleDelete}
            />
        </>
    );
};

export default AssignedLocationsTable;
