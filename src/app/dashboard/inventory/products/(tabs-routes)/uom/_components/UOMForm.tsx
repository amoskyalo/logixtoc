import { useState } from 'react';
import { FormsPropsInterface } from '@/Types';
import { Formik, Form } from 'formik';
import { FormDialog } from '@/components/Dialogs';
import { TextFieldInput, SelectField } from '@/components/Inputs';
import { string, number, object } from 'yup';
import { MenuItem, Stack } from '@mui/material';
import { SubmitButton } from '@/components/Buttons';
import { ProductUOMType, useAddProductUOM } from '@/api';
import { mutateOptions } from '@/utils';
import { useGetUser } from '@/hooks';

type FormikValues = {
   uomSize: number;
   vendorProductUOMName: string;
   productUOMTypeID: number;
};

const UOMForm = ({
   productUOMTypes,
   open,
   onClose,
   refetch,
}: FormsPropsInterface & { productUOMTypes: ProductUOMType[] }) => {
   const [loading, setLoading] = useState(false);

   const { VendorID, UserID: AddedBy } = useGetUser();
   const { mutate } = useAddProductUOM();

   const handleSubmit = (data: FormikValues) => {
      setLoading(true);
      mutate({ VendorID, AddedBy, ...data }, mutateOptions({ onClose, refetch, setLoading }));
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
            {({ errors, touched, getFieldProps }) => {
               function getProps(field: keyof FormikValues) {
                  const helperText = touched[field] && errors[field];
                  const error = touched[field] && Boolean(errors[field]);

                  return { helperText, error, ...getFieldProps(field) };
               }

               return (
                  <Form>
                     <Stack spacing={3}>
                        <TextFieldInput label="UOM Name" {...getProps('vendorProductUOMName')} />
                        <TextFieldInput label="UOM Size" {...getProps('uomSize')} type="number" />
                        <SelectField label="Product UOM Type" {...getProps('productUOMTypeID')}>
                           {productUOMTypes.map(({ ProductUOMTypeID, UOMTypeName }) => (
                              <MenuItem key={ProductUOMTypeID} value={ProductUOMTypeID}>
                                 {UOMTypeName}
                              </MenuItem>
                           ))}
                        </SelectField>
                        <SubmitButton loading={loading} text="Submit" />
                     </Stack>
                  </Form>
               );
            }}
         </Formik>
      </FormDialog>
   );
};

export default UOMForm;
