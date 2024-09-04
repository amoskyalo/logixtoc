'use client';

import { DataGridActions, DataGrid, GridProps } from '@/components/DataGrids';
import { ProductBrand } from '@/api';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { GridColDef } from '@mui/x-data-grid';
import { useResponsiveness, useGridDelete } from '@/hooks';
import { DeleteDialog } from '@/components/Dialogs';

const BrandTable = ({ rows, onAdd, isLoading, refetch }: GridProps<ProductBrand>) => {
    const { isMobile } = useResponsiveness();

    const { handleDelete, loading, deleteParams, onClose, setDeleteParams } = useGridDelete<{ vendorProductBrandID: string | number }>({
        deleteKey: 'deleteProductsBrand',
        initialDeleteParams: { vendorProductBrandID: '' },
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
            field: 'VendorProductBrandName',
            headerName: 'Brand Name',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'ProductClassName',
            headerName: 'Class Name',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'TotalProducts',
            headerName: 'Total Products',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'DateAdded',
            headerName: 'Date Added',
            ...getColumnWidth(200, isMobile),
        },
        {
            field: 'Actions',
            headerName: 'Actions',
            type: 'actions',
            getActions: ({ row: { VendorProductBrandID } }) => {
                return [<DataGridActions key="actions" onDelete={() => setDeleteParams({ vendorProductBrandID: VendorProductBrandID })} />];
            },
        },
    ];

    return (
        <>
            <DataGrid rows={getIndexedRows(rows)} columns={columns} loading={isLoading} onAdd={onAdd} />
            <DeleteDialog open={Number.isInteger(deleteParams.vendorProductBrandID)} loading={loading} onOkay={handleDelete} onCancel={onClose} />
        </>
    );
};

export default BrandTable;
