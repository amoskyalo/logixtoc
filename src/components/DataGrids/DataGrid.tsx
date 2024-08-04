'use client';

import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Grid = (props: DataGridProps) => {
   const {
      palette: { mode },
   } = useTheme();

   const isDarkMode = mode === 'dark';

   return (
      <Box sx={{ backgroundColor: isDarkMode ? '#1c252e' : 'white', borderRadius: 2 }}>
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
                     backgroundColor: isDarkMode ? '#1c252e' : 'white',
                  },
                  '& .MuiDataGrid-columnHeader:focus': {
                     outline: 'none',
                     border: 'none',
                  },
                  '& .MuiDataGrid-columnHeader:focus-within': {
                     outline: 'none !important',
                  },
                  '& .MuiDataGrid-row': {
                     borderBottom: '1px #272e36',
                  },
               },
               '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                  outline: 'none !important',
               },
               borderColor: 'transparent',
               ...(!isDarkMode && {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& .odd-row': {
                     backgroundColor: 'rgba(245,250,254, 0.9)',
                  },
               }),
            }}
         />
      </Box>
   );
};

export default Grid;
