'use client';

import { DataGridEditNDelete, DataGrid, DataGridToolbar } from '@/components/DataGrids';
import { TablesPropsInterface } from '@/Types';
import { ProductBrand, useDeleteVendorProductBrand } from '@/api';
import { getColumnWidth, getIndexedRows } from '@/utils';
import { GridColDef } from '@mui/x-data-grid';
import { useResponsiveness, useGetUser } from '@/hooks';
import { useState } from 'react';
import { DeleteDialog } from '@/components/Dialogs';
import { toast } from 'react-toastify';

const BrandTable = ({ rows, onAdd, isLoading, refetch }: TablesPropsInterface<ProductBrand>) => {
   const [loading, setLoading] = useState(false);
   const [params, setParams] = useState<string | number>('');

   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = useDeleteVendorProductBrand();
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
            return [
               <DataGridEditNDelete
                  key="actions"
                  onEdit={() => null}
                  onDelete={() => setParams(VendorProductBrandID)}
               />,
            ];
         },
      },
   ];

   const handleDelete = () => {
      setLoading(true);

      mutate(
         { VendorID, addedBy, vendorProductBrandID: params },
         {
            onSuccess: ({ data }) => {
               toast.success(data.Message);
               refetch!();
               setLoading(false);
               setParams('');
            },
         },
      );
   };

   const toolbar = () => <DataGridToolbar onAdd={onAdd} />;

   return (
      <>
         <DataGrid
            rows={getIndexedRows(rows)}
            columns={columns}
            slots={{ toolbar }}
            getRowId={(row) => row.id}
            loading={isLoading}
            checkboxSelection
         />

         <DeleteDialog
            open={Number.isInteger(params)}
            loading={loading}
            onOkay={handleDelete}
            onCancel={() => setParams('')}
         />
      </>
   );
};

export default BrandTable;
