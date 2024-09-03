'use client';

import { useState } from 'react';
import { FormDialog } from '@/components/Dialogs';
import { VendorRegion, useMutate } from '@/api';
import { SelectField, SelectMultipleLocations } from '@/components/Inputs';
import { MenuItem, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import { SubmitButton } from '@/components/Buttons';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions, getFormikFieldProps } from '@/utils';
import * as Yup from 'yup';

type Props = {
    regions: VendorRegion[];
};

const AssignedRegionsForm = ({ onClose, open, regions, refetch }: FormsPropsInterface & Props) => {
    const [loading, setLoading] = useState(false);

    const { mutate } = useMutate<{ vendorRegionID: number; vendorLocationArrays: Array<{ vendorLocationID: number }> }>('postAssignedRegions');

    const validationSchema = () =>
        Yup.object().shape({
            vendorRegionID: Yup.number().required('Region field is required'),
            locationsArray: Yup.array().min(1, 'Atleast one location is required'),
        });

    const handleSubmit = (data: any) => {
        setLoading(true);

        const payload = {
            vendorRegionID: data.vendorRegionID,
            vendorLocationArrays: data.locationsArray.map((v: any) => ({
                vendorLocationID: v.vendorLocationID,
            })),
        };

        mutate(payload, mutateOptions({ refetch, onClose, setLoading }));
    };

    return (
        <FormDialog open={open} onClose={onClose} title="Add Assigned Regions">
            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema()}
                initialValues={{
                    vendorRegionID: '' as unknown as number,
                    locationsArray: [],
                }}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Stack spacing={3}>
                                <SelectField label="Region" {...getFormikFieldProps(formik, 'vendorRegionID')}>
                                    {regions.map(({ VendorRegionID, VendorRegionName }) => (
                                        <MenuItem key={VendorRegionID} value={VendorRegionID}>
                                            {VendorRegionName}
                                        </MenuItem>
                                    ))}
                                </SelectField>

                                <SelectMultipleLocations {...formik} label="Locations" />
                                <SubmitButton loading={loading} />
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </FormDialog>
    );
};

export default AssignedRegionsForm;
