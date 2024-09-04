import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { ProductUOM } from '@/api';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { useResponsiveness, useGridDelete } from '@/hooks';
import { DeleteDialog } from '@/components/Dialogs';

const UOMGrid = ({ rows, isLoading, refetch, ...otherProps }: GridProps<ProductUOM>) => {
    const { isMobile } = useResponsiveness();

    const { handleDelete, loading, onClose, deleteParams, setDeleteParams } = useGridDelete<{ vendorProductUOMID: number | string }>({
        deleteKey: 'deleteProductUOM',
        initialDeleteParams: { vendorProductUOMID: '' },
        refetch,
    });

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'No.',
            sortable: false,
            width: 50,
        },
        {
            field: 'VendorProductUOMName',
            headerName: 'Product UOM',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'UOMTypeName',
            headerName: 'UOM Type',
            ...getColumnWidth(150, isMobile),
        },
        {
            field: 'UOMSize',
            headerName: 'UOM Size',
            type: 'number',
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
            getActions: ({ row: { VendorProductUOMID } }) => [
                <DataGridActions key="Actions" onDelete={() => setDeleteParams({ vendorProductUOMID: VendorProductUOMID })} />,
            ],
        },
    ];

    return (
        <div>
            <DataGrid columns={columns} rows={getIndexedRows(rows)} loading={isLoading} {...otherProps} />
            <DeleteDialog loading={loading} open={Number.isInteger(deleteParams.vendorProductUOMID)} onCancel={onClose} onOkay={handleDelete} />
        </div>
    );
};

export default UOMGrid;
