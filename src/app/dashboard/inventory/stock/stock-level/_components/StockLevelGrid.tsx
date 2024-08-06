'use client';

import { GridColDef } from '@mui/x-data-grid';
import { DataGrid, DataGridEditNDelete, GridProps } from '@/components/DataGrids';
import { VendorStock } from '@/api';
import { getIndexedRows } from '@/utils';

const StockLevelGrid = ({
   isLoading,
   rows,
   setDates,
   dates,
   setPageNo,
   setPageSize,
   pageNo,
   pageSize,
   count,
}: GridProps<VendorStock>) => {
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
         field: 'VendorProductBrandName',
         headerName: 'Product Brand',
         width: 150,
      },
      {
         field: 'VendorProductTypeName',
         headerName: 'Product Type',
         width: 150,
      },
      {
         field: 'VendorProductUOMName',
         headerName: 'Product UOM',
         width: 150,
      },
      {
         field: 'OpeningStock',
         headerName: 'Opening Stock',
         type: 'number',
         width: 150,
      },
      {
         field: 'ReceivedStock',
         headerName: 'Received Stock',
         type: 'number',
         width: 150,
      },
      {
         field: 'SoldStock',
         headerName: 'Sold Stock',
         type: 'number',
         width: 150,
      },
      {
         field: 'IssuedStock',
         headerName: 'Issued Stock',
         type: 'number',
         width: 150,
      },
      {
         field: 'CurrentStock',
         headerName: 'Current Stock',
         type: 'number',
         width: 150,
      },
      {
         field: 'Actions',
         headerName: 'Actions',
         type: 'actions',
         getActions: () => [<DataGridEditNDelete key="options" actions={['options']} />],
      },
   ];

   return (
      <DataGrid
         checkboxSelection
         columns={columns}
         rows={getIndexedRows(rows)}
         setDates={setDates}
         dates={dates}
         loading={isLoading}
         getRowId={(row) => row.id}
         count={count}
         pageSize={pageSize}
         pageNo={pageNo}
         setPageSize={setPageSize}
         setPageNo={setPageNo}
      />
   );
};

export default StockLevelGrid;
