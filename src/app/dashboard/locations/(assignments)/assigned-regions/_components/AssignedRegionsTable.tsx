'use client';

import { useState } from 'react';
import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { getColumnWidth, getIndexedRows, mutateOptions } from '@/utils';
import { AssignedRegionObjInterface, useDeleteAssignedRegions } from '@/api';
import { DeleteDialog } from '@/components/Dialogs';
import { useGetUser, useResponsiveness } from '@/hooks';

const AssignedRegionsTable = ({
   rows,
   isLoading,
   refetch,
   ...otherProps
}: GridProps<AssignedRegionObjInterface>) => {
   const [open, setOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [activeParam, setActiveParam] = useState<{
      vendorLocationID: string | number;
      vendorRegionID: string | number;
   }>({
      vendorLocationID: '',
      vendorRegionID: '',
   });

   const { VendorID, UserID: addedBy } = useGetUser();
   const { isMobile } = useResponsiveness();
   const { mutate } = useDeleteAssignedRegions();

   const onClose = () => {
      setOpen(false);
      setActiveParam({
         vendorLocationID: '',
         vendorRegionID: '',
      });
   };

   const handleDelete = () => {
      setLoading(true);

      mutate(
         { VendorID, addedBy, ...activeParam },
         mutateOptions({ refetch, setLoading, onClose }),
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
         ...getColumnWidth(150, isMobile),
      },
      {
         field: 'VendorRegionName',
         headerName: 'Region',
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
         getActions: ({ row: { VendorLocationID, VendorRegionID } }) => {
            return [
               <DataGridActions
                  actions={['delete']}
                  key="actions"
                  onDelete={() => {
                     setActiveParam({
                        vendorLocationID: VendorLocationID,
                        vendorRegionID: VendorRegionID,
                     });
                     setOpen(true);
                  }}
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
            {...otherProps}
         />

         <DeleteDialog open={open} loading={loading} onOkay={handleDelete} onCancel={onClose} />
      </>
   );
};

export default AssignedRegionsTable;
