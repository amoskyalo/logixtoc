import { SubmitButton } from '@/components/Buttons';
import { FormDialog } from '@/components/Dialogs';
import { SelectField, TextFieldInput } from '@/components/Inputs';
import { FormsPropsInterface } from '@/Types';
import { MenuItem, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { ProductUOM, useAddVendorProductCategoryType } from '@/api';
import { mutateOptions } from '@/utils';

type FormikValues = {
   isAdminSaleOnly: number;
   vendorProductCategoryTypeName: string;
   vendorProductUOMID: number;
};

const SaleCategoryTypeForm = ({
   open,
   onClose,
   uomList,
   VendorID,
   addedBy,
   refetch,
   vendorProductCategoryID,
}: FormsPropsInterface & {
   uomList: ProductUOM[];
   VendorID: number;
   addedBy: number;
   vendorProductCategoryID: number;
}) => {
   const [loading, setLoading] = useState(false);

   const { mutate } = useAddVendorProductCategoryType();

   const handleSubmit = (data: FormikValues) => {
      setLoading(true);

      const payload = {
         VendorID,
         addedBy,
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
            {({ errors, touched, getFieldProps }) => {
               function getProps(field: keyof FormikValues) {
                  const error = touched[field] && Boolean(errors[field]);
                  const helperText = touched[field] && errors[field];

                  return { error, helperText, ...getFieldProps(field) };
               }

               return (
                  <Form>
                     <Stack spacing={3}>
                        <TextFieldInput
                           label="Product Category Type"
                           {...getProps('vendorProductCategoryTypeName')}
                        />

                        <SelectField label="Product UOM" {...getProps('vendorProductUOMID')}>
                           {uomList.map(({ VendorProductUOMName, VendorProductUOMID }) => (
                              <MenuItem key={VendorProductUOMID} value={VendorProductUOMID}>
                                 {VendorProductUOMName}
                              </MenuItem>
                           ))}
                        </SelectField>

                        <SelectField label="Is Admin Sale Only" {...getProps('isAdminSaleOnly')}>
                           {[
                              { label: 'Yes', value: 1 },
                              { label: 'No', value: 0 },
                           ].map(({ label, value }) => (
                              <MenuItem value={value} key={value}>
                                 {label}
                              </MenuItem>
                           ))}
                        </SelectField>

                        <SubmitButton text="Submit" loading={loading} />
                     </Stack>
                  </Form>
               );
            }}
         </Formik>
      </FormDialog>
   );
};

export default SaleCategoryTypeForm;
