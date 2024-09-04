'use client';

import { DataGrid, GridProps } from '@/components/DataGrids';
import { AssignedProductInterface } from '@/api';
import { getIndexedRows, getColumnWidth } from '@/utils';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useGridDelete, useResponsiveness } from '@/hooks';
import { DeleteDialog } from '@/components/Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';

const AssignedProductsTable = ({ rows, isLoading, refetch, ...otherParams }: GridProps<AssignedProductInterface>) => {
    const { isMobile } = useResponsiveness();

    const { loading, handleDelete, onClose, deleteParams, setDeleteParams } = useGridDelete<{ vendorLocationProductTypeID: number | string }>({
        deleteKey: 'deleteAssignedProducts',
        initialDeleteParams: { vendorLocationProductTypeID: '' },
        refetch,
    });

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'No.',
            width: 40,
            sortable: false,
        },
        {
            field: 'VendorLocationName',
            headerName: 'Location',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'VendorProductTypeName',
            headerName: 'Product Type',
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
            getActions: ({ row: { VendorLocationProductTypeID } }) => {
                return [
                    <GridActionsCellItem
                        label="Delete"
                        key="Delete"
                        color="error"
                        icon={<DeleteIcon />}
                        onClick={() => setDeleteParams({ vendorLocationProductTypeID: VendorLocationProductTypeID })}
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <DataGrid rows={getIndexedRows(rows)} loading={isLoading} columns={columns} {...otherParams} />

            <DeleteDialog
                loading={loading}
                onOkay={handleDelete}
                onCancel={onClose}
                open={Number.isInteger(deleteParams.vendorLocationProductTypeID)}
            />
        </>
    );
};

export default AssignedProductsTable;
