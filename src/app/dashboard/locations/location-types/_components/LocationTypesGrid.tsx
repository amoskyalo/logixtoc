'use client';

import { DataGrid, DataGridEditNDelete } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { StatusChips } from '@/components/Chips';
import { VendorLocationType, useDeleteVendorLocationTypes } from '@/api';
import { useGetUser, useResponsiveness } from '@/hooks';
import { useState } from 'react';
import { DeleteDialog } from '@/components/Dialogs';
import { TablesPropsInterface } from '@/Types';

const LocationTypesGrid = ({
   isLoading,
   rows,
   refetch,
   onAdd,
}: TablesPropsInterface<VendorLocationType>) => {
   const [activeParams, setActiveParams] = useState<string | number>('');
   const [loading, setLoading] = useState<boolean>(false);

   const { VendorID, UserID: addedBy } = useGetUser();
   const { isMobile } = useResponsiveness();
   const { mutate } = useDeleteVendorLocationTypes();

   const handleDelete = () => {
      setLoading(true);

      mutate(
         { VendorID, addedBy, vendorLocationTypeID: activeParams },
         mutateOptions({ refetch, setLoading, onClose: () => setActiveParams('') }),
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
         field: 'VendorLocationTypeName',
         headerName: 'Location Type',
         ...getColumnWidth(150, isMobile),
      },
      {
         field: 'LocationsArray',
         headerName: 'Count',
         type: 'number',
         valueGetter: (__, row) => row.LocationArray.length,
         ...getColumnWidth(150, isMobile),
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
         field: 'StatusID',
         headerName: 'Status',
         ...getColumnWidth(100, isMobile),
         renderCell: ({ row: { StatusID } }) => <StatusChips statusID={StatusID} name="Active" />,
      },
      {
         field: 'Actions',
         type: 'actions',
         headerName: 'Actions',
         getActions: ({ row: { VendorLocationTypeID } }) => {
            return [
               <DataGridEditNDelete
                  key="actions"
                  onDelete={() => setActiveParams(VendorLocationTypeID)}
                  onEdit={() => null}
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
            columns={columns}
            getRowId={(row) => row.id}
            checkboxSelection
            onAdd={onAdd}
         />

         <DeleteDialog
            loading={loading}
            open={Number.isInteger(activeParams)}
            onOkay={handleDelete}
            onCancel={() => setActiveParams('')}
         />
      </>
   );
};

export default LocationTypesGrid;
