'use client';

import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

const Grid = (props: DataGridProps) => {
   return (
      <DataGrid
         disableRowSelectionOnClick
         autoHeight={true}
         disableColumnMenu={true}
         getRowClassName={(params) => {
            return params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row';
         }}
         {...props}
         sx={{
            '&>.MuiDataGrid-main': {
               '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: '900',
                  fontSize: 14,
               },
               '& .MuiDataGrid-columnHeader': {
                  backgroundColor: 'white',
               },
               '& .MuiDataGrid-columnHeader:focus': {
                  outline: 'none',
                  border: 'none',
               },
               '& .MuiDataGrid-columnHeader:focus-within': {
                  outline: 'none !important',
               },
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
               outline: 'none !important',
            },
            '& .odd-row': {
               backgroundColor: 'rgba(245,250,254, 0.9)',
            },
            borderColor: 'transparent',
            backgroundColor: 'white',
            borderRadius: '1px',
         }}
      />
   );
};

export default Grid;
