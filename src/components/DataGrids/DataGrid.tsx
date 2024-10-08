'use client';

import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AllDataGridProps } from './types';
import { useThemeMode } from '@/hooks';
import DataGridFooter from './DataGridFooter';
import DataGridToolbar from './DataGridToolbar';

const Grid = (props: AllDataGridProps) => {
   const {
      setDates,
      onAdd,
      dates,
      count,
      pageSize,
      pageNo,
      setPageSize,
      setPageNo,
      getRowId,
      loading,
      hideToolbar = false,
      checkboxSelection = true,
      ...otherProps
   } = props;

   const { isDarkMode } = useThemeMode();

   const footer = () => (
      <DataGridFooter
         loading={loading}
         count={count}
         pageSize={pageSize}
         page={pageNo}
         setPageSize={setPageSize}
         onChange={(__, page) => {
            setPageNo?.(page);
         }}
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
            getRowClassName={({ indexRelativeToCurrentPage }) =>
               indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
            }
            slots={{ footer, ...(!hideToolbar && { toolbar }) }}
            getRowId={getRowId || ((row) => row.id)}
            checkboxSelection={checkboxSelection}
            {...otherProps}
            sx={{
               '&>.MuiDataGrid-main': {
                  '& .MuiDataGrid-columnHeaderTitle': {
                     fontWeight: '900',
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
