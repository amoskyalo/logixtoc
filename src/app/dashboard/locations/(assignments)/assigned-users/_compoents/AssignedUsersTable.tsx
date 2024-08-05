'use client';

import { useState } from 'react';
import { DataGrid, DataGridEditNDelete } from '@/components/DataGrids';
import { DeleteDialog } from '@/components/Dialogs';
import { GridColDef } from '@mui/x-data-grid';
import { VendorLocationUserAssignmentRow, useDeleteVendorLocationUserAssignement } from '@/api';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { useGetUser, useResponsiveness } from '@/hooks';
import { TablesPropsInterface } from '@/Types';

const AssignedUsersTable = ({
   isLoading,
   rows,
   onAdd,
   refetch,
}: TablesPropsInterface<VendorLocationUserAssignmentRow>) => {
   const [activeParam, setActiveParam] = useState<string | number>('');
   const [loading, setLoading] = useState<boolean>(false);

   const { VendorID, UserID: addedBy } = useGetUser();
   const { isMobile } = useResponsiveness();
   const { mutate } = useDeleteVendorLocationUserAssignement();

   const onClose = () => {
      setActiveParam('');
   };

   const handleDelete = () => {
      setLoading(true);
      mutate(
         { VendorID, addedBy, vendorLocationUserAssignmentID: activeParam },
         mutateOptions({ refetch, onClose, setLoading }),
      );
   };

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
         field: 'UserName',
         headerName: 'Operator',
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
         getActions: ({ row: { VendorLocationUserAssignmentID } }) => {
            return [
               <DataGridEditNDelete
                  key="action"
                  onDelete={() => setActiveParam(VendorLocationUserAssignmentID)}
                  actions={['delete']}
               />,
            ];
         },
      },
   ];

   return (
      <>
         <DataGrid
            rows={getIndexedRows(rows)}
            columns={columns}
            loading={isLoading}
            onAdd={onAdd}
            getRowId={(row) => row.id}
            checkboxSelection
         />

         <DeleteDialog
            open={Number.isInteger(activeParam)}
            onCancel={onClose}
            loading={loading}
            onOkay={handleDelete}
         />
      </>
   );
};

export default AssignedUsersTable;
