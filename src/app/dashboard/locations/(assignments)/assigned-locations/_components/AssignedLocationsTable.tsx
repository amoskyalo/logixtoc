import { useState } from 'react';
import { DataGrid } from '@/components/DataGrids';
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { AssignedLocationObject, useDeleteAssignedLocation } from '@/api';
import { DeleteDialog } from '@/components/Dialogs';
import { useGetUser, useResponsiveness } from '@/hooks';
import { TablesPropsInterface } from '@/Types';
import DeleteIcon from '@mui/icons-material/Delete';

const AssignedLocationsTable = ({
   rows,
   isLoading,
   onAdd,
   refetch,
}: TablesPropsInterface<AssignedLocationObject>) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [activeParam, setActiveParam] = useState<string | number>('');

   const { VendorID, UserID: addedBy } = useGetUser();
   const { isMobile } = useResponsiveness();
   const { mutate } = useDeleteAssignedLocation();

   const onClose = () => {
      setActiveParam('');
   };

   const handleDelete = () => {
      setLoading(true);
      mutate(
         { VendorID, addedBy, vendorLocationAssignmentID: activeParam },
         mutateOptions({ setLoading, refetch, onClose }),
      );
   };

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
                  onClick={() => setActiveParam(VendorLocationAssignmentID)}
               />,
            ];
         },
      },
   ];

   return (
      <>
         <DataGrid
            columns={columns}
            rows={getIndexedRows(rows)}
            loading={isLoading}
            onAdd={onAdd}
            checkboxSelection
         />

         <DeleteDialog
            open={Number.isInteger(activeParam)}
            loading={loading}
            onCancel={onClose}
            onOkay={handleDelete}
         />
      </>
   );
};

export default AssignedLocationsTable;
