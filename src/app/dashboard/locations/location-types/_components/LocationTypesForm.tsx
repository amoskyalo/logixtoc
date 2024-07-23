'use client';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { SystemLocationType, usePostVendorLocationType } from '@/api';
import { FormDialog } from '@/components/Dialogs';
import { SelectField, TextFieldInput } from '@/components/Inputs';
import { MenuItem, Stack } from '@mui/material';
import { SubmitButton } from '@/components/Buttons';
import { useState } from 'react';
import { useGetUser } from '@/hooks';
import { toast } from 'react-toastify';
import { FormsPropsInterface } from '@/Types';

type Props = {
   systemLocationTypes: SystemLocationType[];
};

type FormikValues = {
   locationTypeID: number;
   vendorLocationTypeName: string;
};

const LocationTypesForm = ({
   open,
   refetch,
   onClose,
   systemLocationTypes,
}: FormsPropsInterface & Props) => {
   const [loading, setLoading] = useState(false);

   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = usePostVendorLocationType();

   const handleSubmit = (data: FormikValues) => {
      setLoading(true);

      mutate(
         { VendorID, addedBy, ...data },
         {
            onSuccess: ({ data }) => {
               toast.success(data.Message);
               setLoading(false);
               onClose();
               refetch();
            },
         },
      );
   };

   const validationSchema = () =>
      Yup.object().shape({
         locationTypeID: Yup.number().required('This field is required'),
         vendorLocationTypeName: Yup.string().required('This field is required'),
      });

   return (
      <FormDialog maxWidth="xs" onClose={onClose} open={open} title="Add new location type">
         <Formik
            initialValues={{
               locationTypeID: '' as unknown as number,
               vendorLocationTypeName: '',
            }}
            validationSchema={validationSchema()}
            onSubmit={handleSubmit}
         >
            {({ getFieldProps, errors, touched }) => {
               function getProps(field: keyof FormikValues) {
                  const helperText = touched[field] && errors[field];
                  const error = touched[field] && Boolean(errors[field]);

                  return { error, helperText, ...getFieldProps(field) };
               }

               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectField label="System Location Type" {...getProps('locationTypeID')}>
                           {systemLocationTypes.map(({ LocationTypeName, LocationTypeID }) => (
                              <MenuItem value={LocationTypeID} key={LocationTypeID}>
                                 {LocationTypeName}
                              </MenuItem>
                           ))}
                        </SelectField>

                        <TextFieldInput
                           label="Location Type Name"
                           {...getProps('vendorLocationTypeName')}
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

export default LocationTypesForm;
