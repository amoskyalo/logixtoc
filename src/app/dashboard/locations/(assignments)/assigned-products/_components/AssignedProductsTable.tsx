'use client';

import { DataGrid, DataGridToolbar } from '@/components/DataGrids';
import { AssignedProductInterface, useDeleteAssignedProducts } from '@/api';
import { getIndexedRows, getColumnWidth, mutateOptions } from '@/utils';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useState } from 'react';
import { useGetUser, useResponsiveness } from '@/hooks';
import { toast } from 'react-toastify';
import { DeleteDialog } from '@/components/Dialogs';
import { TablesPropsInterface } from '@/Types';
import DeleteIcon from '@mui/icons-material/Delete';

const AssignedProductsTable = ({
   rows,
   onAdd,
   isLoading,
   refetch,
}: TablesPropsInterface<AssignedProductInterface>) => {
   const [loading, setLoading] = useState(false);
   const [activeParam, setActiveParam] = useState<string | number>('');

   const { VendorID, UserID: addedBy } = useGetUser();
   const { isMobile } = useResponsiveness();
   const { mutate } = useDeleteAssignedProducts();

   const onClose = () => {
      setActiveParam('');
   };

   const handleDelete = () => {
      setLoading(true);
      mutate(
         { VendorID, addedBy, vendorLocationProductTypeID: activeParam },
         mutateOptions({ refetch, onClose, setLoading }),
      );
   };

   const toolbar = () => <DataGridToolbar onAdd={onAdd} />;

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
                  onClick={() => setActiveParam(VendorLocationProductTypeID)}
               />,
            ];
         },
      },
   ];

   return (
      <>
         <DataGrid
            rows={getIndexedRows(rows)}
            loading={isLoading}
            slots={{ toolbar }}
            columns={columns}
            checkboxSelection
         />

         <DeleteDialog
            loading={loading}
            onOkay={handleDelete}
            onCancel={onClose}
            open={Number.isInteger(activeParam)}
         />
      </>
   );
};

export default AssignedProductsTable;
