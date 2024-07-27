'use client';

import { useState } from 'react';
import {
   DataGrid,
   DataGridToolbar,
   DataGridEditNDelete,
} from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { LocationsArrayInterface, useDeleteVendorLocation } from '@/api';
import { useGetUser, useResponsiveness } from '@/hooks';
import { DeleteDialog } from '@/components/Dialogs';
import { TablesPropsInterface } from '@/Types';

type RowParamsInterface = {
   addedBy: string;
   vendorLocationID: number | string;
};

const initialParams: RowParamsInterface = {
   addedBy: '',
   vendorLocationID: '',
};

const LocationsTable = ({
   onAdd,
   rows,
   isLoading,
   refetch,
}: Readonly<TablesPropsInterface<LocationsArrayInterface>>) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false);
   const [activeParams, setActiveParams] = useState<RowParamsInterface>(initialParams);

   const { VendorID, UserID } = useGetUser();
   const { isMobile } = useResponsiveness();
   const { mutate } = useDeleteVendorLocation();

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
         field: 'VendorLocationTypeName',
         headerName: 'Type',
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
         ...getColumnWidth(175, isMobile),
      },
      {
         field: 'actions',
         headerName: 'Actions',
         width: 100,
         type: 'actions',
         getActions: ({ row: { AddedByName, VendorLocationID } }) => {
            return [
               <DataGridEditNDelete
                  key="actions"
                  onDelete={() => {
                     setActiveParams({
                        addedBy: AddedByName,
                        vendorLocationID: VendorLocationID,
                     });
                     setOpen(true);
                  }}
               />,
            ];
         },
      },
   ];

   const handleDelete = () => {
      const { vendorLocationID } = activeParams;
      setLoading(true);
      mutate(
         {
            VendorID,
            addedBy: UserID,
            vendorLocationID,
         },
         mutateOptions({
            setLoading,
            refetch,
            onClose: () => {
               setActiveParams(initialParams);
               setOpen(false);
            },
         }),
      );
   };

   const toolbar = () => {
      return <DataGridToolbar onAdd={onAdd} />;
   };

   return (
      <>
            <DataGrid
               columns={columns}
               rows={getIndexedRows(rows)}
               slots={{ toolbar }}
               loading={isLoading}
               getRowId={(row) => row.id}
               checkboxSelection
            />

         <DeleteDialog
            open={open}
            loading={loading}
            onOkay={handleDelete}
            onCancel={() => setOpen(false)}
         />
      </>
   );
};

export default LocationsTable;
