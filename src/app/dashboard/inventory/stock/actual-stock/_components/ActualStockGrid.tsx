'use client';

import { DataGrid, DataGridActions, GridProps } from '@/components/DataGrids';
import { GridColDef } from '@mui/x-data-grid';
import { ActualStock } from '@/api';
import { getIndexedRows } from '@/utils';
import { StatusChips } from '@/components/Chips';

const ActualStockGrid = ({ rows, isLoading, ...otherProps }: GridProps<ActualStock>) => {
   const columns: GridColDef[] = [
      {
         field: 'id',
         headerName: 'No.',
         sortable: false,
         width: 50,
      },
      {
         field: 'StockNO',
         headerName: 'Stock No.',
         width: 150,
      },
      {
         field: 'AddedByName',
         headerName: 'Added By',
         width: 150,
      },
      {
         field: 'DateAdded',
         headerName: 'Date Added',
         width: 180,
      },
      {
         field: 'SourceVendorLocationName',
         headerName: 'Source Location',
         width: 150,
      },
      {
         field: 'DestinationVendorLocationName',
         headerName: 'Destination Location',
         width: 170,
      },
      {
         field: 'StockMovementTypeName',
         headerName: 'Movement Type',
         width: 150,
      },
      {
         field: 'Status',
         headerName: 'Status',
         width: 150,
         renderCell: ({ row: { StockMovementStatusID, StockMovementStatusName } }) => (
            <StatusChips statusID={StockMovementStatusID} name={StockMovementStatusName} />
         ),
      },
      {
         field: 'Actions',
         headerName: 'Actions',
         type: 'actions',
         getActions: () => [<DataGridActions key="options" actions={['options']} />],
      },
   ];

   return (
      <DataGrid columns={columns} rows={getIndexedRows(rows)} loading={isLoading} {...otherProps} />
   );
};

export default ActualStockGrid;
