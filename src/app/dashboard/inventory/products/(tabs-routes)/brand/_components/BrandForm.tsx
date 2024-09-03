'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { FormDialog } from '@/components/Dialogs';
import { FormsPropsInterface } from '@/Types';
import { TextFieldInput, SelectField } from '@/components/Inputs';
import { Formik, Form } from 'formik';
import { MenuItem, Stack } from '@mui/material';
import { SubmitButton } from '@/components/Buttons';
import { ProductClass, useMutate } from '@/api';
import { useGetUser } from '@/hooks';
import { mutateOptions, getFormikFieldProps } from '@/utils';

type FormikValues = {
    productClassID: number;
    vendorProductBrandName: string;
};

const BrandForm = ({ open, onClose, refetch, productClass }: FormsPropsInterface & { productClass: ProductClass[] }) => {
    const [loading, setLoading] = useState(false);

    const { UserID: AddedBy } = useGetUser();

    const { mutate } = useMutate<{ productClassID: number; vendorProductBrandName: string; AddedBy: number }>('postProductsBrand');

    const validationSchema = () =>
        Yup.object().shape({
            productClassID: Yup.number().required('Product class cannot be empty'),
            vendorProductBrandName: Yup.string().required('Product brand name cannot be empty'),
        });

    const handleSubmit = (data: FormikValues) => {
        setLoading(true);
        mutate({ AddedBy, ...data }, mutateOptions({ refetch, onClose, setLoading }));
    };

    return (
        <FormDialog onClose={onClose} open={open} title="Add Product Brand">
            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema()}
                validateOnBlur={false}
                initialValues={{
                    productClassID: '' as unknown as number,
                    vendorProductBrandName: '',
                }}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Stack spacing={3}>
                                <TextFieldInput label="Product Brand Name" {...getFormikFieldProps(formik, 'vendorProductBrandName')} />
                                <SelectField label="Product Class" {...getFormikFieldProps(formik, 'productClassID')}>
                                    {productClass.map(({ ProductClassName, ProductClassID }) => (
                                        <MenuItem value={ProductClassID} key={ProductClassID}>
                                            {ProductClassName}
                                        </MenuItem>
                                    ))}
                                </SelectField>
                                <SubmitButton loading={loading} />
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </FormDialog>
    );
};

export default BrandForm;
