'use client';

import { useState, isValidElement, useCallback, useMemo } from 'react';
import { useMutate, useFetch } from '@/api';
import { GridColDef, GridRowsProp, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { getInitialDates, mutateOptions, getFormikFieldProps, validateObjectFields } from '@/utils';
import { DataGrid, DataGridActions, DataGridRowEditActions, EditToolbar } from '@/components/DataGrids';
import { DeleteDialog, FormDialog } from '@/components/Dialogs';
import { Formik, Form, FormikProps } from 'formik';
import { SubmitButton } from '@/components/Buttons';
import { Stack, MenuItem, Box, FormGroup, FormHelperText, FormControl, FormLabel } from '@mui/material';
import { TextFieldInput, SelectField, AutoCompleteField, SelectMultipleLocations, SelectSingleLocation, CheckboxInput } from '@/components/Inputs';
import { Popover } from '@/components/Popover';
import { useGridRowEditFunctions, useResponsiveness } from '@/hooks';
import { UIProps, APIResponse, Input } from './types';
import { HorizontalLinearStepper } from '@/components/Stepper';

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
    const [activeRecord, setActiveRecord] = useState<R | null>(null);
    const [formRows, setFormRows] = useState<GridRowsProp>([]);
    const [rowModels, setRowModels] = useState<GridRowModesModel>({});
    const [activeStep, setActiveStep] = useState<number>(0);

    const { isMobile, isMiniTablet, isDesktop } = useResponsiveness();

    const { data, isLoading, isFetching, refetch } = useFetch<APIResponse<R>, any>(fetchUrl, {
        ...(pagination && { PageNO: pageNo, PageSize: pageSize }),
        ...(showDates && { StartDate: dates.startDate, EndDate: dates.endDate }),
        ...(typeof params === 'object' && params),
    });

    const { mutate: deleteData } = useMutate<D>(deleteUrl);
    const { mutate: submitData } = useMutate<V>(formModel?.submitKey);

    const isOptionsOnly = actions.includes('options');
    const hasNew = Boolean(formModel);
    const formType = formModel?.type;
    const dialogSize =
        formType === 'stepperForm' && typeof formModel?.stepBasedDialogSize === 'function'
            ? formModel.stepBasedDialogSize(activeStep)
            : formModel?.dialogSize
              ? formModel.dialogSize
              : 'xs';

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

    const v = (row: any) => {
        const keys = Object.keys(initialDeleteParams as object);

        return keys.reduce((acc, curr) => {
            const rowKey = curr.charAt(0).toUpperCase() + curr.slice(1);
            const objKey = curr as keyof D;

            acc[objKey] = row[rowKey];

            return acc;
        }, {} as D);
    };

    const getGridFormProps = useCallback(() => {
        let newRow = {};
        let focusField = '';
        let columns: GridColDef[] = [];

        if (formType === 'gridForm') {
            newRow = { ...formModel?.newRow, id: formRows.length + 1 };
            focusField = formModel!.focusField;
            columns = formModel!.columns;
        } else if (formType === 'stepperForm') {
            const gridForm = formModel?.steps.find((step) => step.type === 'gridForm') as any;
            newRow = { ...gridForm?.newRow, id: formRows.length + 1 };
            focusField = gridForm?.focusField ?? '';
            columns = gridForm?.columns || [];
        }

        return { newRow, focusField, columns };
    }, [formModel, formRows.length, formType]);

    const getMarginTop = (formIndex: number, gridFormIndex: number) => {
        if (activeStep !== gridFormIndex) {
            return isMobile ? 3 : 5;
        } else if (activeStep === gridFormIndex) {
            return isMobile ? 0 : 4;
        }
        return 0;
    };

    const {
        handleAddRecord,
        handleCancelClick,
        handleSaveClick,
        handleEditClick,
        handleDeleteClick,
        handleRowModesModelChange,
        processRowUpdate,
        handleRowEditStop,
    } = useGridRowEditFunctions({
        rowId: formRows.length + 1,
        focusField: getGridFormProps()?.focusField,
        setRowModesModels: setRowModels,
        setRows: setFormRows,
        newRow: getGridFormProps()?.newRow,
        rows: formRows,
    });

    const onClose: () => void = () => {
        setDeleteOpen(false);
        setFormOpen(false);
        setDeleteParams(initialDeleteParams);
        setAnchorEl(null);
        setActiveRecord(null);
        setActiveStep(0);
        setFormRows([]);
        setRowModels({});
    };

    const toolbar = useCallback(() => <EditToolbar handleClick={handleAddRecord} />, [handleAddRecord]);

    const updatedFormColumns: GridColDef[] = useMemo(
        () => [
            ...getGridFormProps().columns.map((column) => ({ ...column, editable: true, sortable: false })),
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                getActions: ({ id }) => {
                    const isEditMode = rowModels[id]?.mode === GridRowModes.Edit;

                    return [
                        <DataGridRowEditActions
                            id={id}
                            key="actions"
                            isEditMode={isEditMode}
                            handleCancelClick={handleCancelClick}
                            handleDeleteClick={handleDeleteClick}
                            handleEditClick={handleEditClick}
                            handleSaveClick={handleSaveClick}
                        />,
                    ];
                },
            },
        ],
        [getGridFormProps, handleCancelClick, handleDeleteClick, handleEditClick, handleSaveClick, rowModels],
    );

    const updatedGridColumns: GridColDef[] = [
        { field: 'id', headerName: 'No.', width: 50, sortable: false },
        ...columns.map(({ mobileWidth, width, ...rest }) => {
            return {
                ...rest,
                ...(isDesktop ? { flex: 1 } : width ? { width } : (isMobile || isMiniTablet) && mobileWidth ? { width: mobileWidth } : { flex: 1 }),
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

    const renderInputUI = useCallback((input: Input<V>, formik: FormikProps<V>) => {
        const { key, type, label } = input;

        switch (type) {
            case 'text':
            case 'number':
                return <TextFieldInput label={label} {...getFormikFieldProps(formik, key)} type={type} />;

            case 'select':
                return (
                    <SelectField label={label} key={key as string | number} {...getFormikFieldProps(formik, key)}>
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
                        {...getFormikFieldProps(formik, key, true)}
                    />
                );

            case 'boolean':
                return (
                    <SelectField label={label} {...getFormikFieldProps(formik, key)}>
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

            case 'checkbox': {
                const { setFieldValue, touched, errors } = formik;
                const error = Boolean(touched[key] && errors[key]);

                return (
                    <FormControl error={error} component="fieldset" variant="standard">
                        <FormLabel component="legend">{label}</FormLabel>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {input.options.map(({ name, value }) => (
                                <CheckboxInput
                                    key={name}
                                    label={name}
                                    onChange={(event) => {
                                        const newValue = event.target.checked;
                                        if (newValue) {
                                            setFieldValue(key as string, value);
                                        } else {
                                            setFieldValue(key as string, '');
                                        }
                                    }}
                                />
                            ))}
                        </FormGroup>
                        {error && <FormHelperText>This field is required</FormHelperText>}
                    </FormControl>
                );
            }

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
    }, []);

    const renderGridForm = useCallback(
        () => (
            <DataGrid
                columns={updatedFormColumns}
                rows={formRows}
                slots={{ toolbar }}
                slotProps={{
                    toolbar: { setRows: setFormRows, setRowModesModel: setRowModels },
                }}
                rowModesModel={rowModels}
                onRowModesModelChange={handleRowModesModelChange}
                processRowUpdate={processRowUpdate}
                onRowEditStop={handleRowEditStop}
                checkboxSelection={false}
                hideFooter
                editMode="row"
                autoHeight
            />
        ),
        [updatedFormColumns, formRows, toolbar, rowModels, handleRowModesModelChange, processRowUpdate, handleRowEditStop],
    );

    const handleWatch = (values: V) => {
        typeof formModel?.watch === 'function' && formModel.watch(values);
    };

    const renderFormUI = () => {
        switch (formModel?.type) {
            case 'normal':
                return (
                    <Formik
                        initialValues={formModel.initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema()}
                        validateOnBlur={false}
                    >
                        {(formik) => {
                            handleWatch(formik.values);

                            return (
                                <Form>
                                    <Stack spacing={3}>
                                        {formModel.inputs.map((input) => renderInputUI(input, formik))}
                                        <SubmitButton loading={formLoading} />
                                    </Stack>
                                </Form>
                            );
                        }}
                    </Formik>
                );

            case 'gridForm':
                return (
                    <Stack direction="column" spacing={3}>
                        {renderGridForm()}
                        <Stack justifyContent={'flex-end'} direction={'row'}>
                            <Box sx={{ width: 150 }}>
                                <SubmitButton
                                    loading={formLoading}
                                    onClick={() => {
                                        const gridValues = formRows.map(({ id, isNew, ...rest }) => rest);
                                        handleSubmit(gridValues as V);
                                    }}
                                    disabled={formRows.length === 0 || validateObjectFields([...formRows])}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                );

            case 'stepperForm': {
                const formIndex = formModel.steps.findIndex((step) => step.type === 'normal');
                const gridFormIndex = formModel.steps.findIndex((step) => step.type === 'gridForm');

                return (
                    <Formik
                        initialValues={formModel.initialValues}
                        onSubmit={(val) => console.log(val)}
                        validationSchema={validationSchema()}
                        validateOnBlur={false}
                    >
                        {(formik) => {
                            const x = formModel.steps[activeStep];
                            handleWatch(formik.values);

                            function getStepValues() {
                                if (x.type === 'normal') {
                                    return x.inputs.reduce((acc, { key }) => {
                                        acc[key] = formik.values[key];

                                        return acc;
                                    }, {} as V);
                                } else return {};
                            }

                            return (
                                <HorizontalLinearStepper
                                    steps={formModel.stepsLabels}
                                    activeStep={activeStep}
                                    setActiveStep={setActiveStep}
                                    disableNext={validateObjectFields([getStepValues()])}
                                    submitButton={() => (
                                        <Box sx={{ width: 150 }}>
                                            <SubmitButton
                                                loading={formLoading}
                                                onClick={() => {
                                                    const gridValues = formRows.map(({ id, isNew, ...rest }) => rest);
                                                    const payload = { gridValues, ...formik.values };
                                                    handleSubmit(payload);
                                                }}
                                                disabled={formRows.length === 0 || validateObjectFields([...formRows])}
                                            />
                                        </Box>
                                    )}
                                >
                                    <Form>
                                        <Stack spacing={3} sx={{ mt: getMarginTop(formIndex, gridFormIndex) }}>
                                            {formModel.steps.map(
                                                (step, index) =>
                                                    activeStep === index &&
                                                    (step.type === 'normal' ? (
                                                        step.inputs.map((input) => renderInputUI(input, formik))
                                                    ) : (
                                                        <Stack direction="column" spacing={3} key={step.focusField}>
                                                            {renderGridForm()}
                                                        </Stack>
                                                    )),
                                            )}
                                        </Stack>
                                    </Form>
                                </HorizontalLinearStepper>
                            );
                        }}
                    </Formik>
                );
            }
            default:
                throw new Error('Inavlid form type');
        }
    };

    return (
        <>
            <DataGrid
                columns={updatedGridColumns}
                rows={getIndexedRows() || []}
                count={data?.TotalCount}
                loading={isLoading || isFetching}
                {...(pagination && { pageNo, pageSize, setPageNo, setPageSize })}
                {...(showDates && { setDates, dates })}
                {...(hasNew && { onAdd: () => setFormOpen(true) })}
            />

            {hasNew && (
                <FormDialog open={formOpen} title={formModel!.title} onClose={onClose} maxWidth={dialogSize}>
                    {renderFormUI()}
                </FormDialog>
            )}

            {isOptionsOnly && (
                <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={onClose}>
                    {options!.map(({ name, onClick }) => {
                        const isDelete = name.toLowerCase() === 'delete';

                        return (
                            <MenuItem
                                key={name}
                                sx={{ pr: 6, color: isDelete ? 'red !important' : '' }}
                                dense={isMobile}
                                onClick={() => {
                                    setAnchorEl(null);
                                    if (isDelete) {
                                        setDeleteOpen(true);
                                        setDeleteParams(v(activeRecord));
                                    } else {
                                        onClick!(activeRecord, setDeleteParams, setDeleteOpen);
                                    }
                                }}
                            >
                                {name}
                            </MenuItem>
                        );
                    })}
                </Popover>
            )}

            <DeleteDialog loading={deleteLoading} open={deleteOpen} onCancel={onClose} onOkay={handleDelete} />
        </>
    );
};

export default UIModel;
