'use client';

import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ToolbarProps, FooterProps } from './types';
import DataGridFooter from './DataGridFooter';
import DataGridToolbar from './DataGridToolbar';

const Grid = (
   props: DataGridProps &
      FooterProps &
      ToolbarProps & {
         hideToolbar?: boolean;
      },
) => {
   const {
      palette: { mode },
   } = useTheme();

   const {
      setDates,
      onAdd,
      dates,
      loading,
      count,
      pageSize,
      pageNo,
      setPageSize,
      hideToolbar = false,
      ...otherProps
   } = props;

   const isDarkMode = mode === 'dark';

   const footer = () => (
      <DataGridFooter
         loading={loading}
         count={count}
         pageSize={pageSize}
         page={pageNo}
         setPageSize={setPageSize}
      />
   );
   
   const toolbar = () => <DataGridToolbar onAdd={onAdd} setDates={setDates} dates={dates} />;

   return (
      <Box sx={{ backgroundColor: isDarkMode ? '#1c252e' : 'white', borderRadius: 2 }}>
         <DataGrid
            disableRowSelectionOnClick
            autoHeight={true}
            disableColumnMenu={true}
            loading={loading}
            getRowClassName={(params) => {
               return params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row';
            }}
            slots={{ footer, ...(!hideToolbar && { toolbar }) }}
            {...otherProps}
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
