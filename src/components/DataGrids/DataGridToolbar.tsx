import {
   GridToolbarContainer,
   GridToolbarExport,
   GridToolbarColumnsButton,
   GridToolbarDensitySelector,
   useGridApiContext,
} from '@mui/x-data-grid';
import { useCallback } from 'react';
import { Button, Stack, TextField, InputAdornment } from '@mui/material';
import { getInitialDates } from '@/utils';
import { useResponsiveness } from '@/hooks';
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
   const { isMobile } = useResponsiveness();

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
         <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={1}
            // sx={{ ...isMobile && {width: '100%'} }}
         >
            {dates && (
               <Datepicker
                  readOnly
                  value={dates}
                  showFooter={!isMobile}
                  showShortcuts={!isMobile}
                  useRange={!isMobile}
                  onChange={(newValue) => {
                     if (!newValue?.startDate && !newValue?.endDate) {
                        setDates(getInitialDates());
                     } else {
                        setDates(newValue);
                     }
                  }}
                  primaryColor="blue"
                  inputClassName="w-full rounded-md font-bold h-full pl-2 focus:outline-none bg-transparent"
                  containerClassName={`relative border border-gray-600 p-0 h-8 rounded-[5px] hover:border-gray-600 bg-transparent ${isMobile ? '100%' : 'w-[240px]'}`}
               />
            )}

            <TextField
               placeholder="Search..."
               size="small"
               sx={{ width: !isMobile ? 250 : '100%' }}
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
