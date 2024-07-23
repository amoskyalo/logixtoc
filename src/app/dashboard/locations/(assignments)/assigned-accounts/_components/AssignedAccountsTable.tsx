'use client';

import { DataGrid, DataGridToolbar } from '@/components/DataGrids';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { getIndexedRows } from '@/utils';
import { AssignedAccount, useDeleteAssignedAccount } from '@/api';
import { useGetUser } from '@/hooks';
import { useState } from 'react';
import { DeleteDialog } from '@/components/Dialogs';
import { toast } from 'react-toastify';
import { TablesPropsInterface } from '@/Types';
import DeleteIcon from '@mui/icons-material/Delete';

const AssignedAccountsTable = ({
   rows,
   isLoading,
   refetch,
   onAdd,
}: TablesPropsInterface<AssignedAccount>) => {
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);
   const [activeParams, setActiveParams] = useState({
      vendorAccountID: '',
      vendorLocationID: '',
   });

   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = useDeleteAssignedAccount();

   const handleCancel = () => {
      setOpen(false);
      setActiveParams({
         vendorAccountID: '',
         vendorLocationID: '',
      });
   };

   const handleDelete = () => {
      setLoading(true);

      mutate(
         { VendorID, addedBy, ...activeParams },
         {
            onSuccess: ({ data }) => {
               toast.success(data.Message);
               handleCancel();
               refetch!();
               setLoading(false);
            },
         },
      );
   };

   const columns: GridColDef[] = [
      {
         field: 'id',
         headerName: 'No.',
         width: 50,
         sortable: false,
      },
      {
         field: 'VendorLocationName',
         headerName: 'Location',
         width: 150,
      },
      {
         field: 'VendorAccountTypeName',
         headerName: 'Account Type',
         width: 150,
      },
      {
         field: 'VendorAccountName',
         headerName: 'Account Name',
         width: 150,
      },
      {
         field: 'VendorAccountNO',
         headerName: 'Account Number',
         width: 150,
      },
      {
         field: 'Description',
         headerName: 'Description',
         width: 150,
      },
      {
         field: 'isShared',
         headerName: 'Shared',
         width: 150,
         type: 'boolean',
         valueGetter: (__, row) => row.isShared === 1,
      },
      {
         field: 'isIntegrated',
         headerName: 'Integrated',
         width: 150,
         type: 'boolean',
         valueGetter: (__, row) => row.isIntegrated === 1,
      },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         getActions: ({ row: { VendorAccountID, VendorLocationID } }) => {
            return [
               <GridActionsCellItem
                  label="Delete"
                  key="Delete"
                  color="error"
                  icon={<DeleteIcon />}
                  onClick={() => {
                     setOpen(true);
                     setActiveParams({
                        vendorAccountID: VendorAccountID,
                        vendorLocationID: VendorLocationID,
                     });
                  }}
               />,
            ];
         },
      },
   ];

   const toolbar = () => <DataGridToolbar onAdd={onAdd} />;

   return (
      <>
         <DataGrid
            columns={columns}
            rows={getIndexedRows(rows)}
            getRowId={(row) => row.id}
            checkboxSelection
            loading={isLoading}
            slots={{ toolbar }}
         />

         <DeleteDialog
            open={open}
            onCancel={handleCancel}
            onOkay={handleDelete}
            loading={loading}
         />
      </>
   );
};

export default AssignedAccountsTable;
