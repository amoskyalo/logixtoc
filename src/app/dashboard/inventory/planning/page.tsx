'use client';

import { DeliveryPlan, APPCRUD, VendorUserObjectInterface, DeliveryPlanType, useFetch, useMutate, urls } from '@/api';
import { StatusChips } from '@/components/Chips';
import { TablessContainer } from '@/components/Containers';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { SelectField } from '@/components/Inputs';
import { FormDialog } from '@/components/Dialogs';
import { MenuItem, Stack } from '@mui/material';
import { SubmitButton } from '@/components/Buttons';
import { getFormikFieldProps, mutateOptions } from '@/utils';

type Delete = { deliveryPlanNO: string };

type Params = {
    VendorLocationID: number;
    DeliveryPlanStatusID: number;
    DeliveryPlanTypeID: number;
};

type Values = {
    vendorLocationID: string;
    userID: string;
    deliveryPlanTypeID: string;
    locationsArray?: any[];
};

type InitialValues = {
    [key: string]: string | number;
};

const Planning = () => {
    const [planType, setPlanType] = useState<any>(null);
    const [formType, setFormType] = useState<string>('');
    const [activeRecord, setActiveRecord] = useState<DeliveryPlan | null>(null);
    const [loading, setLoading] = useState(false);

    const { data: vendorUsers } = useFetch<VendorUserObjectInterface, void>('getVendorUsers');
    const { data: deliveryPlanType } = useFetch<DeliveryPlanType, void>('getDeliveryPlanType');
    const router = useRouter();
    let refetch: any;

    const users = vendorUsers?.Data.map((user) => ({ value: user.UserID, label: user.FirstName + ' ' + user.LastName }));

    const onClose = () => {
        setFormType('');
        setActiveRecord(null);
    };

    const getForm = useCallback(() => {
        let api: keyof typeof urls | undefined, title, fieldLabel, lookupName, lookupValue, key;
        let initialValues: InitialValues = {};
        let lookups: any = [];

        switch (formType) {
            case 'changeDriver':
                api = 'changeDeliveryPlanDriver';
                title = 'Change Driver';
                fieldLabel = 'Select Driver';
                lookupName = 'label';
                lookupValue = 'value';
                key = 'userID';
                initialValues['userID'] = '';
                lookups = users?.filter((user) => user.label !== activeRecord?.DriverName);
                break;

            case 'changeDeliveryType':
                api = 'changeDeliveryPlanType';
                title = 'Change Delivery plan Type';
                fieldLabel = 'Select Delivery Plan Type';
                lookupName = 'DeliveryPlanTypeName';
                lookupValue = 'DeliveryPlanTypeID';
                key = 'deliveryPlanTypeID';
                initialValues['deliveryPlanTypeID'] = '';
                lookups = deliveryPlanType?.Data.filter((type) => type.DeliveryPlanTypeID !== activeRecord?.DeliveryPlanTypeID);
                break;
        }

        return { api, key, initialValues, title, fieldLabel, lookupName, lookupValue, lookups };
    }, [activeRecord, deliveryPlanType, formType, users]);

    const memoizedForm = useMemo(() => getForm(), [getForm]);

    const { api, key, initialValues, title, fieldLabel, lookupName, lookupValue, lookups } = memoizedForm;

    const { mutate } = useMutate(api);

    const handleSubmit = (data: InitialValues) => {
        setLoading(true);
        mutate({ ...data, deliveryPlanNO: activeRecord?.DeliveryPlanNO }, mutateOptions({ onClose, setLoading, refetch }));
    };

    const UI = new APPCRUD<DeliveryPlan, Values, Delete, Params>({
        grid: {
            fetchUrl: 'getDeliveryPlanHistory',
            deleteUrl: 'removeDeliveryPlan',
            actions: ['options'],
            initialDeleteParams: { deliveryPlanNO: '' },
            params: {
                VendorLocationID: 0,
                DeliveryPlanStatusID: 99,
                DeliveryPlanTypeID: 0,
            },
            getRefetchFn: (arg) => (refetch = arg),
            options: [
                {
                    name: 'Stock Summary',
                    onClick: (activeRecord) => {
                        const url = `/dashboard/inventory/planning/summary?StockNO=${activeRecord.StockNO}`;
                        router.push(url);
                    },
                },
                {
                    name: 'Change Driver',
                    onClick: (activeRecord) => {
                        setFormType('changeDriver');
                        setActiveRecord(activeRecord);
                    },
                },
                {
                    name: 'Change Delivery Type',
                    onClick: (activeRecord) => {
                        setFormType('changeDeliveryType');
                        setActiveRecord(activeRecord);
                    },
                },
                { name: 'Delete' },
            ],
            columns: [
                { field: 'DeliveryPlanNO', headerName: 'Delivery Plan NO.', width: 150 },
                { field: 'SourceVendorLocationName', headerName: 'Source Location', width: 150 },
                { field: 'VendorLocationName', headerName: 'Location', width: 150 },
                { field: 'DriverName', headerName: 'Driver Name', width: 150 },
                { field: 'DeliveryPlanTypeName', headerName: 'Delivery Plan Type', width: 150 },

                { field: 'GeneratedBy', headerName: 'Generated By', width: 150 },
                {
                    field: 'DeliveryPlanStatusName',
                    headerName: 'Status',
                    width: 150,
                    renderCell: ({ row: { DeliveryPlanStatusName, DeliveryPlanStatusID } }) => {
                        return <StatusChips name={DeliveryPlanStatusName} statusID={DeliveryPlanStatusID} />;
                    },
                },
            ],
        },
        form: {
            type: 'normal',
            title: 'Delivery Plan Status',
            submitKey: 'postVendorDeliveryPlanTx',
            initialValues: {
                vendorLocationID: '',
                userID: '',
                deliveryPlanTypeID: '',
                ...(!(planType === 1 || planType === 4) && { locationsArray: [] }),
            },
            watch: (values) => setPlanType(values.deliveryPlanTypeID),
            modifyData: ({ locationsArray, ...rest }) => ({
                ...rest,
                stockNO: '',
                deliveryPlanLocationArray: locationsArray?.map((item) => ({ vendorLocationID: item.locationID })),
            }),
            inputs: [
                { label: 'Location', key: 'vendorLocationID', validate: true, type: 'singleLocation' },
                {
                    label: 'Operator',
                    key: 'userID',
                    validate: true,
                    type: 'select',
                    lookups: users || [],
                    lookupDisplayName: 'label',
                    lookupDisplayValue: 'value',
                },
                {
                    label: 'Delivery Plan',
                    key: 'deliveryPlanTypeID',
                    validate: true,
                    type: 'select',
                    lookups: deliveryPlanType?.Data || [],
                    lookupDisplayName: 'DeliveryPlanTypeName',
                    lookupDisplayValue: 'DeliveryPlanTypeID',
                },
                ...(planType === 1 || planType === 4
                    ? []
                    : [{ label: 'Delivery Locations', type: 'mulipleLocation' as const, key: 'locationsArray' as const, validate: true }]),
            ],
        },
    });

    return (
        <>
            <TablessContainer headerName="Planning" subTitle="Manage your delivery plans, view, add and delete.">
                {UI.render()}
            </TablessContainer>

            <FormDialog title={title as string} open={Boolean(activeRecord)} onClose={onClose}>
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    {(formik) => (
                        <Form>
                            <Stack spacing={3}>
                                <SelectField label={fieldLabel} {...getFormikFieldProps(formik, key as string)}>
                                    {lookups.map((lookup: any) => (
                                        <MenuItem key={lookup[lookupValue as string]} value={lookup[lookupValue as string]}>
                                            {lookup[lookupName as string]}
                                        </MenuItem>
                                    ))}
                                </SelectField>

                                <SubmitButton loading={loading} />
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </FormDialog>
        </>
    );
};

export default Planning;
