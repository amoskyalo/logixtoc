import {
   GridToolbarContainer,
   GridToolbarExport,
   GridToolbarColumnsButton,
   GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useGridApiContext } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { Button, Stack, TextField, InputAdornment } from '@mui/material';
import { getInitialDates } from '@/utils';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Datepicker from 'react-tailwindcss-datepicker';

export type DatesInterface = {
   startDate: string;
   endDate: string;
};

type PropsInterface = {
   setDates?: any;
   onAdd?: () => void;
   dates?: DatesInterface;
};

const DataGridToolbar = ({ setDates, dates, onAdd }: Readonly<PropsInterface>) => {
   const apiRef = useGridApiContext();

   const updateSearchValue = useCallback(
      (newSearchValue: string) => {
         apiRef.current.setQuickFilterValues([newSearchValue]);
      },
      [apiRef],
   );

   return (
      <GridToolbarContainer
         sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            paddingY: '8px',
            paddingX: '8px',
         }}
      >
         <Stack direction="row" spacing={1}>
            {dates && (
               <Datepicker
                  readOnly
                  showFooter
                  value={dates}
                  showShortcuts={true}
                  onChange={(newValue) => {
                     if (!newValue?.startDate && !newValue?.endDate) {
                        setDates(getInitialDates());
                     } else {
                        setDates(newValue);
                     }
                  }}
                  primaryColor="blue"
                  inputClassName="w-full rounded-md font-bold h-full pl-2 focus:outline-none"
                  containerClassName="relative border border-gray-300 p-0 h-8 w-[240px] rounded-[5px] hover:border-gray-600"
               />
            )}

            <TextField
               placeholder="Search..."
               size="small"
               sx={{ width: 250 }}
               onChange={(e) => updateSearchValue(e.target.value)}
               inputProps={{
                  style: {
                     height: '15px',
                  },
               }}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                     </InputAdornment>
                  ),
               }}
            />
         </Stack>

         <Stack direction="row">
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            <Button startIcon={<FilterListOffIcon />} color="primary" size="small" onClick={onAdd}>
               Filters
            </Button>
            {onAdd && (
               <Button startIcon={<AddIcon />} color="primary" size="small" onClick={onAdd}>
                  New
               </Button>
            )}
         </Stack>
      </GridToolbarContainer>
   );
};

export default DataGridToolbar;
