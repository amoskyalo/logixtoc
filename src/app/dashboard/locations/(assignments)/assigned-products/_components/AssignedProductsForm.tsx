'use client';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Stack } from '@mui/material';
import { FormDialog } from '@/components/Dialogs';
import { AutoCompleteField, SelectSingleLocation } from '@/components/Inputs';
import { ProductType, usePostAssignedProducts } from '@/api';
import { SubmitButton } from '@/components/Buttons';
import { useState } from 'react';
import { useGetUser } from '@/hooks';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions } from '@/utils';

type Props = {
   products: ProductType[];
};

const AssignedProductsForm = ({
   open,
   onClose,
   products,
   refetch,
}: FormsPropsInterface & Props) => {
   const [loading, setLoading] = useState(false);

   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = usePostAssignedProducts();

   const handleSubmit = (data: any) => {
      setLoading(true);

      const payload = {
         productTypeArray: data.productTypeArray.map((product: any) => ({
            vendorProductTypeID: product.vendorProductTypeID,
         })),
         vendorLocationID: data.vendorLocationID,
         VendorID,
         addedBy,
      };

      mutate(payload, mutateOptions({ onClose, refetch, setLoading }));
   };

   const validationSchema = () =>
      Yup.object().shape({
         productTypeArray: Yup.array().min(1, 'Atleast one product must be selected'),
         vendorLocationID: Yup.number().required('Location is required'),
      });

   return (
      <FormDialog title="Add New Location Product Type" open={open} onClose={onClose}>
         <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            initialValues={{
               vendorLocationID: '' as unknown as number,
               productTypeArray: [],
            }}
         >
            {(formik) => {
               const { values, touched, errors, setFieldValue } = formik;

               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectSingleLocation {...formik} />

                        <AutoCompleteField
                           options={products.map(
                              ({ VendorProductTypeName, VendorProductTypeID }) => ({
                                 title: VendorProductTypeName,
                                 vendorProductTypeID: VendorProductTypeID,
                              }),
                           )}
                           getOptionLabel={(product: any) => product.title}
                           multiple
                           value={values.productTypeArray}
                           label="Products"
                           helperText={
                              touched.productTypeArray && (errors.productTypeArray as string)
                           }
                           error={touched.productTypeArray && Boolean(errors.productTypeArray)}
                           onChange={(event: React.SyntheticEvent, value: any) =>
                              setFieldValue('productTypeArray', value)
                           }
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

export default AssignedProductsForm;
