'use client';

import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AllDataGridProps, DatesInterface, FiltersObject } from './types';
import { useThemeMode, useSetSearchParams } from '@/hooks';
import DataGridFooter from './DataGridFooter';
import DataGridToolbar from './DataGridToolbar';

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setDates?: any;
        dates?: DatesInterface;
        filters?: FiltersObject[];
        params?: any;
        onAdd?: () => void;
    }
}

const Grid = (props: AllDataGridProps) => {
    const {
        onAdd,
        dates,
        totalPages,
        pageSize,
        pageNo,
        getRowId,
        loading,
        filters,
        params,
        hideToolbar,
        checkboxSelection = true,
        ...otherProps
    } = props;

    const { isDarkMode } = useThemeMode();
    const setParams = useSetSearchParams();

    const footer = () => (
        <DataGridFooter
            loading={loading}
            count={totalPages}
            pageSize={pageSize}
            page={pageNo}
            onChange={(__, page) => {
                setParams({ PageNO: page });
            }}
        />
    );

    return (
        <Box sx={{ backgroundColor: isDarkMode ? '#1c252e' : 'white', borderRadius: 2 }}>
            <DataGrid
                disableRowSelectionOnClick
                autoHeight={true}
                disableColumnMenu={true}
                loading={loading}
                getRowClassName={({ indexRelativeToCurrentPage }) => (indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                slots={{
                    footer,
                    ...(!hideToolbar && { toolbar: DataGridToolbar }),
                }}
                slotProps={{
                    toolbar: { onAdd, dates, filters, params },
                }}
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
