'use client';

import React from 'react';
import { DataGrid, DataGridEditNDelete, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { StockMovement } from '@/api';
import { getIndexedRows } from '@/utils';
import { StatusChips } from '@/components/Chips';

const StockMovementGrid = ({ rows, setDates, dates, isLoading }: GridProps<StockMovement>) => {
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
         headerName: 'Actions',
         getActions: () => {
            return [<DataGridEditNDelete key="actions" actions={['options']} />];
         },
      },
   ];

   return (
      <DataGrid
         columns={columns}
         rows={getIndexedRows(rows)}
         checkboxSelection
         dates={dates}
         setDates={setDates}
         getRowId={(row) => row.id}
         loading={isLoading}
      />
   );
};

export default StockMovementGrid;
