'use client';

import { DataGridActions, DataGrid, GridProps } from '@/components/DataGrids';
import { ProductBrand, useMutate } from '@/api';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { GridColDef } from '@mui/x-data-grid';
import { useResponsiveness } from '@/hooks';
import { useState } from 'react';
import { DeleteDialog } from '@/components/Dialogs';

const BrandTable = ({ rows, onAdd, isLoading, refetch }: GridProps<ProductBrand>) => {
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState<string | number>('');

    const { mutate } = useMutate<{ vendorProductBrandID: number | string }>('deleteProductsBrand');
    const { isMobile } = useResponsiveness();

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
                return [<DataGridActions key="actions" onEdit={() => null} onDelete={() => setParams(VendorProductBrandID)} />];
            },
        },
    ];

    const handleDelete = () => {
        setLoading(true);

        mutate({ vendorProductBrandID: params }, mutateOptions({ refetch, setLoading, onClose: () => setParams('') }));
    };

    return (
        <>
            <DataGrid rows={getIndexedRows(rows)} columns={columns} loading={isLoading} onAdd={onAdd} />
            <DeleteDialog open={Number.isInteger(params)} loading={loading} onOkay={handleDelete} onCancel={() => setParams('')} />
        </>
    );
};

export default BrandTable;
