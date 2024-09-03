'use client';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { SystemLocationType, useMutate } from '@/api';
import { FormDialog } from '@/components/Dialogs';
import { SelectField, TextFieldInput } from '@/components/Inputs';
import { MenuItem, Stack } from '@mui/material';
import { SubmitButton } from '@/components/Buttons';
import { useState } from 'react';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions, getFormikFieldProps } from '@/utils';

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
   const { mutate } = useMutate<{ locationTypeID: number; vendorLocationTypeName: string }>(
      'postVendorLocationType',
   );

   const handleSubmit = (data: FormikValues) => {
      setLoading(true);

      mutate(data, mutateOptions({ onClose, refetch, setLoading }));
   };

   const validationSchema = () =>
      Yup.object().shape({
         locationTypeID: Yup.number().required('This field is required'),
         vendorLocationTypeName: Yup.string().required('This field is required'),
      });

   return (
      <FormDialog onClose={onClose} open={open} title="Add new location type">
         <Formik
            initialValues={{
               locationTypeID: '' as unknown as number,
               vendorLocationTypeName: '',
            }}
            validationSchema={validationSchema()}
            onSubmit={handleSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectField
                           label="System Location Type"
                           {...getFormikFieldProps(formik, 'locationTypeID')}
                        >
                           {systemLocationTypes.map(({ LocationTypeName, LocationTypeID }) => (
                              <MenuItem value={LocationTypeID} key={LocationTypeID}>
                                 {LocationTypeName}
                              </MenuItem>
                           ))}
                        </SelectField>

                        <TextFieldInput
                           label="Location Type Name"
                           {...getFormikFieldProps(formik, 'vendorLocationTypeName')}
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

export default LocationTypesForm;
