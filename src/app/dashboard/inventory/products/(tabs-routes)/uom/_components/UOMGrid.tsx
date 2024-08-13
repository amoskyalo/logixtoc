import { useState } from 'react';
import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { ProductUOM, useDeleteProductUOM } from '@/api';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { useResponsiveness, useGetUser } from '@/hooks';
import { DeleteDialog } from '@/components/Dialogs';

const UOMGrid = ({ rows, isLoading, refetch, ...otherProps }: GridProps<ProductUOM>) => {
   const [vendorProductUOMID, setVendorProductUOMID] = useState('');
   const [loading, setLoading] = useState(false);

   const { isMobile } = useResponsiveness();
   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = useDeleteProductUOM();

   const onClose = () => {
      setVendorProductUOMID('');
   };

   const handleDelete = () => {
      setLoading(true);
      mutate(
         { vendorProductUOMID, VendorID, addedBy },
         mutateOptions({ onClose, setLoading, refetch }),
      );
   };

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
            <DataGridActions
               key="Actions"
               onDelete={() => setVendorProductUOMID(VendorProductUOMID)}
            />,
         ],
      },
   ];

   return (
      <div>
         <DataGrid
            columns={columns}
            rows={getIndexedRows(rows)}
            loading={isLoading}
            {...otherProps}
         />

         <DeleteDialog
            loading={loading}
            open={Number.isInteger(vendorProductUOMID)}
            onCancel={onClose}
            onOkay={handleDelete}
         />
      </div>
   );
};

export default UOMGrid;
