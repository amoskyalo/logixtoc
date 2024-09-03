import React, { useState } from 'react';
import { FormDialog } from '@/components/Dialogs';
import { FormsPropsInterface } from '@/Types';
import { SubmitButton } from '@/components/Buttons';
import { Stack } from '@mui/material';
import { TextFieldInput, AutoCompleteField } from '@/components/Inputs';
import { ProductClass, ProductUOM, ProductBrand, useMutate, AddProductTypeInterface } from '@/api';
import { Formik, Form } from 'formik';
import { object, array, string } from 'yup';
import { mutateOptions, getMappedObjectArray, getFormikFieldProps } from '@/utils';

type PropsInterface = FormsPropsInterface & {
    productsClass: ProductClass[];
    productUOMTypes: ProductUOM[];
    productBrands: ProductBrand[];
};

type FormikValues = {
    vendorProductTypeName: string;
    vendorProductTypeBrandArray: Array<{
        vendorProductBrandID: number;
        label: string;
    }>;
    vendorProductTypeClassArray: Array<{
        productClassID: number;
        label: string;
    }>;
    vendorProductTypeUOMArray: Array<{
        vendorProductUOMID: number;
        label: string;
    }>;
};

const ProductTypeForm = ({ open, onClose, productsClass, productUOMTypes, productBrands, refetch }: PropsInterface) => {
    const [loading, setLoading] = useState(false);
    const { mutate } = useMutate<AddProductTypeInterface>('addVendorProductTypes');

    const validationSchema = () =>
        object().shape({
            vendorProductTypeName: string().required('This field is required'),
            vendorProductTypeBrandArray: array().min(1, 'Atleast one brand should be selected'),
            vendorProductTypeClassArray: array().min(1, 'Atleast one class should be selected'),
            vendorProductTypeUOMArray: array().min(1, 'Atleast one uom should be selected'),
        });

    const handleSubmit = (data: FormikValues) => {
        setLoading(true);

        const { vendorProductTypeBrandArray, vendorProductTypeClassArray, vendorProductTypeUOMArray, vendorProductTypeName } = data;

        const payload = {
            vendorProductTypeBrandArray: vendorProductTypeBrandArray.map(({ vendorProductBrandID }) => ({
                vendorProductBrandID,
            })),
            vendorProductTypeClassArray: vendorProductTypeClassArray.map(({ productClassID }) => ({
                productClassID,
            })),
            vendorProductTypeUOMArray: getMappedObjectArray('vendorProductUOMID', vendorProductTypeUOMArray),
            vendorProductTypeName,
        };

        mutate(payload, mutateOptions({ setLoading, onClose, refetch }));
    };

    return (
        <FormDialog open={open} title="Add Product Type" onClose={onClose}>
            <Formik
                initialValues={{
                    vendorProductTypeName: '',
                    vendorProductTypeBrandArray: [],
                    vendorProductTypeClassArray: [],
                    vendorProductTypeUOMArray: [],
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema()}
                validateOnBlur={false}
            >
                {(formik) => {
                    return (
                        <Form>
                            <Stack spacing={3}>
                                <TextFieldInput label="Product Type Name" {...getFormikFieldProps(formik, 'vendorProductTypeName')} />
                                <AutoCompleteField
                                    options={productsClass.map(({ ProductClassID, ProductClassName }) => ({
                                        productClassID: ProductClassID,
                                        label: ProductClassName,
                                    }))}
                                    getOptionLabel={(option: any) => option.label}
                                    label="Product Type Class"
                                    {...getFormikFieldProps(formik, 'vendorProductTypeClassArray', true)}
                                />

                                <AutoCompleteField
                                    options={productUOMTypes.map(({ VendorProductUOMID, VendorProductUOMName }) => ({
                                        vendorProductUOMID: VendorProductUOMID,
                                        label: VendorProductUOMName,
                                    }))}
                                    getOptionLabel={(option: any) => option.label}
                                    label="Product Type UOM"
                                    {...getFormikFieldProps(formik, 'vendorProductTypeUOMArray', true)}
                                />

                                <AutoCompleteField
                                    options={productBrands.map(({ VendorProductBrandID, VendorProductBrandName }) => ({
                                        vendorProductBrandID: VendorProductBrandID,
                                        label: VendorProductBrandName,
                                    }))}
                                    getOptionLabel={(option: any) => option.label}
                                    label="Product Type Brand"
                                    {...getFormikFieldProps(formik, 'vendorProductTypeBrandArray', true)}
                                />

                                <SubmitButton text="Submit" loading={loading} />
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </FormDialog>
    );
};

export default ProductTypeForm;
