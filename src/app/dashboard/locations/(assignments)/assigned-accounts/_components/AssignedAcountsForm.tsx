'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { AutoCompleteField, SelectSingleLocation } from '@/components/Inputs';
import { FormDialog } from '@/components/Dialogs';
import { Stack } from '@mui/material';
import { VendorAccount, useMutate } from '@/api';
import { SubmitButton } from '@/components/Buttons';
import { useGetUser } from '@/hooks';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions, getFormikFieldProps } from '@/utils';

type Props = {
    accounts: VendorAccount[];
};

const AssignedAcountsForm = ({ open, onClose, refetch, accounts }: FormsPropsInterface & Props) => {
    const [loading, setLoading] = useState(false);

    const { VendorID, UserID: addedBy } = useGetUser();
    const { mutate } = useMutate<{
        vendorLocationID: number;
        vendorAccountArray: Array<{
            vendorAccountID: number;
        }>;
    }>('postAssignedAccount');

    const validationSchema = () =>
        Yup.object().shape({
            vendorAccountArray: Yup.array().min(1, 'Atleast one account must be selected'),
            vendorLocationID: Yup.number().required('Location field is required'),
        });

    const handlePost = (data: any) => {
        setLoading(true);

        const payload = {
            VendorID,
            addedBy,
            vendorLocationID: data.vendorLocationID,
            vendorAccountArray: data.vendorAccountArray.map((v: any) => ({
                vendorAccountID: v.value,
            })),
        };

        mutate(payload, mutateOptions({ onClose, refetch, setLoading }));
    };

    return (
        <FormDialog open={open} onClose={onClose} title="Add New Assigned Accounts">
            <Formik
                onSubmit={handlePost}
                validationSchema={validationSchema()}
                initialValues={{
                    vendorAccountArray: [],
                    vendorLocationID: '' as unknown as number,
                }}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Stack spacing={3}>
                                <SelectSingleLocation {...formik} />

                                <AutoCompleteField
                                    options={accounts.map(({ VendorAccountName, VendorAccountID }) => ({
                                        title: VendorAccountName,
                                        value: VendorAccountID,
                                    }))}
                                    getOptionLabel={(option: any) => option.title}
                                    label="Accounts"
                                    {...getFormikFieldProps(formik, 'vendorAccountArray', true)}
                                />

                                <SubmitButton loading={loading} />
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </FormDialog>
    );
};

export default AssignedAcountsForm;
