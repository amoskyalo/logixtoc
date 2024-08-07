import {
   GridToolbarContainer,
   GridToolbarExport,
   GridToolbarColumnsButton,
   GridToolbarDensitySelector,
   useGridApiContext,
} from '@mui/x-data-grid';
import { useCallback, useState, useEffect } from 'react';
import { Button, Stack, TextField, InputAdornment, TextFieldProps, Box } from '@mui/material';
import { getInitialDates } from '@/utils';
import { useResponsiveness, useThemeMode } from '@/hooks';
import { styled } from '@mui/material/styles';
import { DataGridToolbarProps } from './types';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import Datepicker from 'react-tailwindcss-datepicker';

type SearchProps = TextFieldProps & {
   isMobile: boolean;
   searching: boolean;
   dates: boolean;
};

const StyledSearchBox = styled(TextField)<SearchProps>(({ isMobile, searching, dates }) => ({
   width: 300,
   transition: 'width 0.5s ease',
   cursor: 'pointer',
   ...(isMobile && {
      width: searching || !dates ? '100%' : 55,
   }),
}));

const StyledCalendar = styled(Box)<{ isMobile: boolean; searching: boolean }>(
   ({ isMobile, searching }) => ({
      width: '240px',
      transition: 'width 0.5s ease',
      ...(isMobile && {
         width: searching ? '0' : '100%',
      }),
   }),
);

const DataGridToolbar = ({ setDates, dates, onAdd }: Readonly<DataGridToolbarProps>) => {
   const apiRef = useGridApiContext();
   const { isMobile, isTablet } = useResponsiveness();
   const { isDarkMode } = useThemeMode();

   const [searchValue, setSearchValue] = useState('');
   const [searching, setSearching] = useState(false);

   const updateSearchValue = useCallback(
      (newSearchValue: string) => {
         apiRef.current.setQuickFilterValues([newSearchValue]);
      },
      [apiRef],
   );

   useEffect(() => {
      updateSearchValue(searchValue);
   }, [searchValue, updateSearchValue]);

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
         <Stack direction={'row'} spacing={1} className="w-full md:w-max">
            {dates && (
               <StyledCalendar isMobile={isMobile} searching={searching}>
                  <Datepicker
                     readOnly
                     showFooter
                     value={dates}
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
                     inputClassName="w-full rounded-md h-full pl-2 bg-transparent focus:outline-none lg:font-bold"
                     containerClassName={`relative border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} p-0 h-8 rounded-[5px] hover:border-gray-600 bg-transparent w-full`}
                     toggleClassName={`${searching && isMobile ? 'opacity-0' : ''}`}
                  />
               </StyledCalendar>
            )}

            <StyledSearchBox
               dates={Boolean(dates)}
               searching={searching}
               isMobile={isMobile}
               placeholder="Search..."
               size="small"
               onChange={(e) => setSearchValue(e.target.value)}
               onClick={() => setSearching(true)}
               value={searchValue}
               inputProps={{
                  style: {
                     height: '15px',
                  },
               }}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ cursor: 'pointer' }} />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end">
                        {(searchValue || (isMobile && searching && Boolean(dates))) && (
                           <CloseIcon
                              fontSize="small"
                              sx={{ cursor: 'pointer' }}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setSearching(false);
                                 setSearchValue('');
                              }}
                           />
                        )}
                     </InputAdornment>
                  ),
               }}
            />
         </Stack>

         <Stack direction="row" justifyContent="flex-end" className="w-full md:w-max">
            {!isMobile && !isTablet && <GridToolbarColumnsButton />}
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
