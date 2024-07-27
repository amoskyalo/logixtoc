'use client';

import React from 'react';
import { DataGrid, DataGridToolbar, DataGridEditNDelete } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { StockMovement } from '@/api';
import { getIndexedRows } from '@/utils';
import { StatusChips } from '@/components/Chips';
import { TablesPropsInterface } from '@/Types';

const StockMovementGrid = ({
   rows,
   setDates,
   dates,
   isLoading,
}: TablesPropsInterface<StockMovement>) => {
   const columns: GridColDef[] = [
      {
         field: 'id',
         headerName: 'No.',
         width: 50,
         sortable: false,
      },
      {
         field: 'StockNO',
         headerName: 'Stock NO',
         width: 150,
      },
      {
         field: 'SourceVendorLocationName',
         headerName: 'Source Location Name',
         width: 200,
      },
      {
         field: 'DestinationVendorLocationName',
         headerName: 'Destination Location Name',
         width: 220,
      },
      {
         field: 'StockMovementTypeName',
         headerName: 'Stock Movement Type',
         width: 200,
      },
      {
         field: 'AddedByName',
         headerName: 'Added By',
         width: 150,
      },
      {
         field: 'DateAdded',
         headerName: 'Date Added',
         width: 200,
      },
      {
         field: 'Status',
         headerName: 'Status',
         width: 150,
         renderCell: ({ row: { StockMovementStatusName, StockMovementStatusID } }) => (
            <StatusChips name={StockMovementStatusName} statusID={StockMovementStatusID} />
         ),
      },
      {
         field: 'Action',
         type: 'actions',
         headerName: "Actions",
         getActions: () => {
            return [<DataGridEditNDelete key="actions" actions={['options']}/>];
         },
      },
   ];

   const toolbar = () => <DataGridToolbar dates={dates} setDates={setDates} />;

   return (
      <DataGrid
         columns={columns}
         rows={getIndexedRows(rows)}
         checkboxSelection
         slots={{ toolbar }}
         getRowId={(row) => row.id}
         loading={isLoading}
      />
   );
};

export default StockMovementGrid;
