import { useState } from 'react';
import { FormsPropsInterface } from '@/Types';
import { Formik, Form } from 'formik';
import { FormDialog } from '@/components/Dialogs';
import { TextFieldInput, SelectField } from '@/components/Inputs';
import { string, number, object } from 'yup';
import { MenuItem, Stack } from '@mui/material';
import { SubmitButton } from '@/components/Buttons';
import { ProductUOMType, useMutate } from '@/api';
import { mutateOptions, getFormikFieldProps } from '@/utils';

type FormikValues = {
    uomSize: number;
    vendorProductUOMName: string;
    productUOMTypeID: number;
};

const UOMForm = ({ productUOMTypes, open, onClose, refetch }: FormsPropsInterface & { productUOMTypes: ProductUOMType[] }) => {
    const [loading, setLoading] = useState(false);
    const { mutate } = useMutate<{ uomSize: number; vendorProductUOMName: string; productUOMTypeID: number }>('postProductUOM');

    const handleSubmit = (data: FormikValues) => {
        setLoading(true);
        mutate(data, mutateOptions({ onClose, refetch, setLoading }));
    };

    const validationSchema = () =>
        object().shape({
            uomSize: number().required('This field is required'),
            vendorProductUOMName: string().required('This field is required'),
            productUOMTypeID: string().required('This field is required'),
        });

    return (
        <FormDialog open={open} title="Add Product UOM" onClose={onClose}>
            <Formik
                initialValues={{
                    uomSize: '' as unknown as number,
                    vendorProductUOMName: '',
                    productUOMTypeID: '' as unknown as number,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema()}
                validateOnBlur={false}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Stack spacing={3}>
                                <TextFieldInput label="UOM Name" {...getFormikFieldProps(formik, 'vendorProductUOMName')} />
                                <TextFieldInput label="UOM Size" {...getFormikFieldProps(formik, 'uomSize')} type="number" />
                                <SelectField label="Product UOM Type" {...getFormikFieldProps(formik, 'productUOMTypeID')}>
                                    {productUOMTypes.map(({ ProductUOMTypeID, UOMTypeName }) => (
                                        <MenuItem key={ProductUOMTypeID} value={ProductUOMTypeID}>
                                            {UOMTypeName}
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

export default UOMForm;
