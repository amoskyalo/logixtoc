'use client';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { MenuItem, Stack } from '@mui/material';
import { FormDialog } from '@/components/Dialogs';
import { AutoCompleteField, SelectField } from '@/components/Inputs';
import { ProductType, LocationsArrayInterface, usePostAssignedProducts } from '@/api';
import { SubmitButton } from '@/components/Buttons';
import { useState } from 'react';
import { useGetUser } from '@/hooks';
import { toast } from 'react-toastify';
import { FormsPropsInterface } from '@/Types';

type Props = {
   locations: LocationsArrayInterface[];
   products: ProductType[];
};

const AssignedProductsForm = ({
   open,
   onClose,
   locations,
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

      mutate(payload, {
         onSuccess: ({ data }) => {
            toast.success(data.Message);
            onClose();
            setLoading(false);
            refetch();
         },
         onError: (error) => {
            toast.error(error.message);
            setLoading(false);
         },
      });
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
            {({ values, touched, errors, getFieldProps, setFieldValue }) => {
               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectField
                           label="Location"
                           helperText={touched.vendorLocationID && errors.vendorLocationID}
                           error={touched.vendorLocationID && Boolean(errors.vendorLocationID)}
                           {...getFieldProps('vendorLocationID')}
                        >
                           {locations.map(({ VendorLocationID, VendorLocationName }) => (
                              <MenuItem value={VendorLocationID} key={VendorLocationID}>
                                 {VendorLocationName}
                              </MenuItem>
                           ))}
                        </SelectField>

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
