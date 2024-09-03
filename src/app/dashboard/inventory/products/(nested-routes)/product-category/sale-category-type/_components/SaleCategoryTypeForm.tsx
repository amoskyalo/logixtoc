import { SubmitButton } from '@/components/Buttons';
import { FormDialog } from '@/components/Dialogs';
import { SelectField, TextFieldInput } from '@/components/Inputs';
import { FormsPropsInterface } from '@/Types';
import { MenuItem, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { ProductUOM, useMutate } from '@/api';
import { mutateOptions, getFormikFieldProps } from '@/utils';

type FormikValues = {
    isAdminSaleOnly: number;
    vendorProductCategoryTypeName: string;
    vendorProductUOMID: number;
};

const SaleCategoryTypeForm = ({
    open,
    onClose,
    uomList,
    refetch,
    vendorProductCategoryID,
}: FormsPropsInterface & {
    uomList: ProductUOM[];
    vendorProductCategoryID: number;
}) => {
    const [loading, setLoading] = useState(false);

    const { mutate } = useMutate<{
        isAdminSaleOnly: number;
        vendorProductCategoryTypeName: string;
        vendorProductUOMID: number;
        vendorProductCategoryID: number;
    }>('addVendorProductCategoryType');

    const handleSubmit = (data: FormikValues) => {
        setLoading(true);

        const payload = {
            vendorProductCategoryID,
            ...data,
        };

        mutate(payload, mutateOptions({ onClose, refetch, setLoading }));
    };

    return (
        <FormDialog open={open} onClose={onClose} title="Add New Product Category Type">
            <Formik
                initialValues={{
                    isAdminSaleOnly: '' as unknown as number,
                    vendorProductCategoryTypeName: '',
                    vendorProductUOMID: '' as unknown as number,
                }}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Stack spacing={3}>
                                <TextFieldInput label="Product Category Type" {...getFormikFieldProps(formik, 'vendorProductCategoryTypeName')} />

                                <SelectField label="Product UOM" {...getFormikFieldProps(formik, 'vendorProductUOMID')}>
                                    {uomList.map(({ VendorProductUOMName, VendorProductUOMID }) => (
                                        <MenuItem key={VendorProductUOMID} value={VendorProductUOMID}>
                                            {VendorProductUOMName}
                                        </MenuItem>
                                    ))}
                                </SelectField>

                                <SelectField label="Is Admin Sale Only" {...getFormikFieldProps(formik, 'isAdminSaleOnly')}>
                                    {[
                                        { label: 'Yes', value: 1 },
                                        { label: 'No', value: 0 },
                                    ].map(({ label, value }) => (
                                        <MenuItem value={value} key={value}>
                                            {label}
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

export default SaleCategoryTypeForm;
