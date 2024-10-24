import { GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, useGridApiContext } from '@mui/x-data-grid';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { Button, Stack, TextField, InputAdornment, TextFieldProps, Box, Typography, Checkbox, Badge, Grid } from '@mui/material';
import { getInitialDates } from '@/utils';
import { useResponsiveness, useThemeMode } from '@/hooks';
import { styled } from '@mui/material/styles';
import { DataGridToolbarProps } from './types';
import { Popover } from '../Popover';
import { AutoCompleteField } from '../Inputs';
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

const StyledCalendar = styled(Box)<{ isMobile: boolean; searching: boolean }>(({ isMobile, searching }) => ({
    width: '240px',
    transition: 'width 0.5s ease',
    ...(isMobile && {
        width: searching ? '0' : '100%',
    }),
}));

const DataGridToolbar = ({ setDates, dates, onAdd, params, setParams, filters = [] }: Readonly<DataGridToolbarProps>) => {
    const apiRef = useGridApiContext();
    const { isMobile, isTablet } = useResponsiveness();
    const { isDarkMode } = useThemeMode();

    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [unProcessedFilters, setUnProcessedFilters] = useState(params);

    const updateSearchValue = useCallback(
        (newSearchValue: string) => {
            apiRef.current.setQuickFilterValues([newSearchValue]);
        },
        [apiRef],
    );

    useEffect(() => {
        updateSearchValue(searchValue);
    }, [searchValue, updateSearchValue]);

    const handleReset = (key?: string) => {
        if (key) {
            setUnProcessedFilters((prev: any) => ({ ...prev, [key]: params[key] }));
        } else {
            setUnProcessedFilters(params);
        }
    };

    const handleApplyFilters = () => {
        setParams?.(unProcessedFilters);
        setAnchorEl(null);
    };

    const totalFilters = useMemo(() => {
        return typeof params === 'object' ? Object.values(params).filter((val) => val !== 0 && val !== 99).length : 0;
    }, [params]);

    const width = isMobile ? "100%" : filters.length > 1 ? 450 : 250;
    const mdSpan = filters.length > 1 ? 6 : 12

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
            <Stack direction={isMobile ? 'column' : 'row'} spacing={1} justifyContent="space-between" width={'100%'}>
                <Stack direction={'row'} spacing={1}>
                    {dates && (
                        <StyledCalendar isMobile={isMobile} searching={searching}>
                            <Datepicker
                                readOnly
                                showFooter={!isMobile}
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

                <Stack direction="row" justifyContent={'flex-end'} className="w-full md:w-max">
                    {!isMobile && !isTablet && <GridToolbarColumnsButton />}
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                    {filters?.length > 0 && (
                        <Badge badgeContent={totalFilters} invisible={totalFilters === 0} color="primary">
                            <Button
                                startIcon={<FilterListOffIcon />}
                                color="primary"
                                size="small"
                                onClick={(event) => setAnchorEl(event?.currentTarget)}
                            >
                                Filters
                            </Button>
                        </Badge>
                    )}
                    {onAdd && (
                        <Button startIcon={<AddIcon />} color="primary" size="small" onClick={onAdd}>
                            New
                        </Button>
                    )}
                </Stack>
            </Stack>

            <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
                <Box sx={{ padding: 2, borderBottom: 1, borderBottomColor: 'divider' }}>
                    <Typography variant="h5">Filters</Typography>
                </Box>
                <Grid container rowGap={2} columnSpacing={2} sx={{ borderBottom: 1, borderColor: 'divider', width, padding: 2 }}>
                    {filters.map(({ labelKey, valueKey, title, filterOptions }) => {
                        const isStatus = valueKey.toLowerCase().includes('status');
                        const allValue = isStatus ? 99 : 0;

                        const options = [
                            { label: 'All', value: allValue },
                            ...filterOptions.map((option) => ({
                                label: option[labelKey],
                                value: option[valueKey],
                            })),
                        ];

                        const value = options.find((option) => option.value === unProcessedFilters[valueKey]);

                        return (
                            <Grid item xs={12} md={mdSpan} key={valueKey}>
                                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ mb: 1 }}>
                                    <Typography fontWeight={600} variant="body2">
                                        {title}
                                    </Typography>
                                </Stack>

                                <AutoCompleteField
                                    onChange={(__, newValue) => {
                                        if (newValue) {
                                            setUnProcessedFilters((prevValues: any) => ({ ...prevValues, [valueKey]: newValue.value }));
                                        } else {
                                            setUnProcessedFilters((prevValues: any) => ({ ...prevValues, [valueKey]: allValue }));
                                        }
                                    }}
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} id="list">
                                                <Stack direction={'row'} alignItems={'center'}>
                                                    <Checkbox size="small" checked={value?.value === option.value} />
                                                    <Typography fontWeight={600} fontSize={14}>
                                                        {option.label}
                                                    </Typography>
                                                </Stack>
                                            </li>
                                        );
                                    }}
                                    slotProps={{
                                        paper: {
                                            sx: {
                                                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                                                    backgroundColor: 'transparent',
                                                    width: '0px',
                                                },
                                                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                },
                                                maxHeight: 200,
                                                minWidth: 200,
                                                overflow: 'auto'
                                            },
                                        },
                                    }}
                                    options={options}
                                    value={value}
                                    multiple={false}
                                    disableClearable
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: '32px',
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                        '& .MuiAutocomplete-input': {
                                            fontSize: '14px',
                                            fontWeight: '600',
                                        },
                                        borderWidth: 2,
                                        borderColor: 'divider',
                                        borderRadius: '6px',
                                    }}
                                />
                            </Grid>
                        );
                    })}
                </Grid>

                <Stack direction={'row'} justifyContent={'flex-end'} spacing={2} sx={{ padding: 2 }}>
                    <Button size="small" variant="outlined" onClick={() => handleReset()}>
                        Reset all
                    </Button>
                    <Button size="small" variant="contained" onClick={handleApplyFilters}>
                        Apply filters
                    </Button>
                </Stack>
            </Popover>
        </GridToolbarContainer>
    );
};

export default DataGridToolbar;
