'use client';

import { useState, isValidElement } from 'react';
import { useMutate, useFetch } from '@/api';
import { GridColDef } from '@mui/x-data-grid';
import { getInitialDates, mutateOptions, getFormikFieldProps } from '@/utils';
import { DataGrid, DataGridActions } from '@/components/DataGrids';
import { DeleteDialog, FormDialog } from '@/components/Dialogs';
import { Formik, Form, FormikProps } from 'formik';
import { SubmitButton } from '@/components/Buttons';
import { Stack, MenuItem } from '@mui/material';
import { TextFieldInput, SelectField, AutoCompleteField, SelectMultipleLocations, SelectSingleLocation } from '@/components/Inputs';
import { Popover } from '@/components/Popover';
import { useResponsiveness } from '@/hooks';
import { UIProps, APIResponse, Input } from './types';

type M<V> = V & {
    vendorLocationID: number;
};

const UIModel = <R, V, D, P>({ formModel, gridModel, validationSchema }: UIProps<V, D, P>) => {
    // R is the response object we are getting from API after fetching data;
    // V is the interface of the form data we are sending to API;
    // D is the interface of the delete object we are sending to API;
    // P is the interface of the additional params that we are going to add when fetching data from API;

    const {
        columns,
        deleteUrl,
        fetchUrl,
        params,
        initialDeleteParams,
        actions = ['delete', 'edit'],
        pagination = true,
        showDates = true,
        showActions = true,
        options,
    } = gridModel;

    const [dates, setDates] = useState(getInitialDates());
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [deleteParams, setDeleteParams] = useState<D | undefined>(initialDeleteParams);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRecord, setActiveRecord] = useState<any>(null);

    const { isMobile, isMiniTablet } = useResponsiveness();

    const { data, isLoading, isFetching, refetch } = useFetch<APIResponse<R>, any>(fetchUrl, {
        ...(pagination && { PageNO: pageNo, PageSize: pageSize }),
        ...(showDates && { StartDate: dates.startDate, EndDate: dates.endDate }),
        ...(typeof params === 'object' && params),
    });

    const { mutate: deleteData } = useMutate<D>(deleteUrl);
    const { mutate: submitData } = useMutate<V>(formModel?.submitKey);

    const handleSubmit = (data: V) => {
        setFormLoading(true);
        const payload = typeof formModel?.modifyData === 'function' ? formModel?.modifyData(data) : data;
        submitData(payload, mutateOptions({ refetch, onClose, setLoading: setFormLoading }));
    };

    const handleDelete = () => {
        setDeleteLoading(true);

        deleteParams && deleteData(deleteParams, mutateOptions({ refetch, setLoading: setDeleteLoading, onClose }));
    };

    const getIndexedRows = () => {
        return data?.Data?.map((row, index) => ({ id: index + 1, ...row }));
    };

    const onClose = () => {
        setDeleteOpen(false);
        setFormOpen(false);
        setDeleteParams(initialDeleteParams);
        setAnchorEl(null);
        setActiveRecord(null);
    };

    const v = (row: any) => {
        const keys = Object.keys(initialDeleteParams as object);

        return keys.reduce((acc, curr) => {
            const rowKey = curr.charAt(0).toUpperCase() + curr.slice(1);
            const objKey = curr as keyof D;

            acc[objKey] = row[rowKey];

            return acc;
        }, {} as D);
    };

    const isOptionsOnly = actions.includes('options');
    const hasNew = Boolean(formModel);

    const updatedColumns: GridColDef[] = [
        { field: 'id', headerName: 'No.', width: 50, sortable: false },
        ...columns.map(({ mobileWidth, width, ...rest }) => {
            return {
                ...rest,
                ...(width ? { width } : (isMobile || isMiniTablet) && mobileWidth ? { width: mobileWidth } : { flex: 1 }),
            };
        }),
        ...(showActions
            ? [
                  {
                      field: 'actions',
                      headerName: 'Actions',
                      type: 'actions' as const,
                      getActions: (param: any) => [
                          <DataGridActions
                              key="actions"
                              actions={actions}
                              {...(!isOptionsOnly && {
                                  onDelete: () => {
                                      setDeleteOpen(true);
                                      setDeleteParams(v(param.row));
                                  },
                              })}
                              {...(isOptionsOnly && {
                                  onOptions: (el) => {
                                      setAnchorEl(el.currentTarget);
                                      setActiveRecord(param.row);
                                  },
                              })}
                          />,
                      ],
                  },
              ]
            : []),
    ];

    const renderInput = (input: Input, formik: FormikProps<V>) => {
        const { key, type, label } = input;

        const inputKey = key as keyof V;

        switch (input.type) {
            case 'text':
            case 'number':
                return <TextFieldInput label={label} {...getFormikFieldProps(formik, inputKey)} type={type} />;

            case 'select':
                return (
                    <SelectField label="Product Class" key={key} {...getFormikFieldProps(formik, inputKey)}>
                        {input.lookups.map((lookup) => (
                            <MenuItem
                                value={lookup[input.lookupDisplayValue] as string | number}
                                key={lookup[input.lookupDisplayValue] as string | number}
                            >
                                {lookup[input.lookupDisplayName] as string | number}
                            </MenuItem>
                        ))}
                    </SelectField>
                );

            case 'multiple':
                return (
                    <AutoCompleteField
                        options={input.lookups.map((lookup) => ({
                            [input.optionKey]: lookup[input.optionValueKey],
                            label: lookup[input.optionLabelKey],
                        }))}
                        getOptionLabel={(option: any) => option.label}
                        label={label}
                        {...getFormikFieldProps(formik, inputKey, true)}
                    />
                );

            case 'boolean':
                return (
                    <SelectField label={label} {...getFormikFieldProps(formik, inputKey)}>
                        {[
                            { label: 'Yes', value: 1 },
                            { label: 'No', value: 0 },
                        ].map(({ label, value }) => (
                            <MenuItem value={value} key={value}>
                                {label}
                            </MenuItem>
                        ))}
                    </SelectField>
                );

            case 'mulipleLocation':
                return <SelectMultipleLocations<any> {...formik} label={label} />;

            case 'singleLocation':
                return <SelectSingleLocation<any> {...formik} />;

            case 'customInput':
                if (!isValidElement(input.renderInput(formik))) {
                    throw new Error('Invalid element');
                }

                return input.renderInput(formik);

            default:
                throw new Error('Invalid input type');
        }
    };

    return (
        <>
            <DataGrid
                columns={updatedColumns}
                rows={getIndexedRows() || []}
                count={data?.TotalCount}
                loading={isLoading || isFetching}
                {...(pagination && { pageNo, pageSize, setPageNo, setPageSize })}
                {...(showDates && { setDates, dates })}
                {...(hasNew && { onAdd: () => setFormOpen(true) })}
            />

            {hasNew && (
                <FormDialog open={formOpen} title={formModel!.title} onClose={onClose}>
                    <Formik
                        initialValues={formModel!.initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema()}
                        validateOnBlur={false}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <Stack spacing={3}>
                                        {formModel!.inputs.map((input) => renderInput(input, formik))}
                                        <SubmitButton loading={formLoading} />
                                    </Stack>
                                </Form>
                            );
                        }}
                    </Formik>
                </FormDialog>
            )}

            {isOptionsOnly && (
                <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={onClose}>
                    {options!.map(({ name, onClick }) => (
                        <MenuItem
                            key={name}
                            sx={{ pr: 6 }}
                            dense={isMobile}
                            onClick={() => {
                                setAnchorEl(null);
                                onClick(activeRecord, setDeleteParams, setDeleteOpen);
                            }}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Popover>
            )}

            <DeleteDialog loading={deleteLoading} open={deleteOpen} onCancel={onClose} onOkay={handleDelete} />
        </>
    );
};

export default UIModel;
