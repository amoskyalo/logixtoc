import React, { useState } from 'react';
import { FormDialog } from '@/components/Dialogs';
import { Formik, Form } from 'formik';
import { SelectField, AutoCompleteField } from '@/components/Inputs';
import { MenuItem, Stack } from '@mui/material';
import {
   LocationsArrayInterface,
   VendorUserObjectInterface,
   usePostVendorLocationUserAssignmentTx,
} from '@/api';
import * as Yup from 'yup';
import { SubmitButton } from '@/components/Buttons';
import { useGetUser } from '@/hooks';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions } from '@/utils';

type InitialValuesInterface = {
   usersArray: Array<{ userID: number }>;
   vendorLocationID: number;
};

type OptionsInterface = {
   userID: number;
   title: string;
};

type Props = {
   locations: LocationsArrayInterface[];
   vendorUsers: VendorUserObjectInterface[];
};

const AssignedUsersForm = ({
   open,
   refetch,
   onClose,
   locations,
   vendorUsers,
}: FormsPropsInterface & Props) => {
   const [loading, setLoading] = useState<boolean>(false);
   const { VendorID, UserID } = useGetUser();
   const { mutate } = usePostVendorLocationUserAssignmentTx();

   const getValidationSchema = () => {
      return Yup.object().shape({
         vendorLocationID: Yup.number().required('Location field cannot be empty'),
         usersArray: Yup.array()
            .min(1, 'At least one user must be selected')
            .required('Users field cannot be empty'),
      });
   };

   const initialValues = {
      usersArray: [],
      vendorLocationID: '' as unknown as number,
   };

   const handleSubmitForm = (data: {
      vendorLocationID: number;
      usersArray: OptionsInterface[];
   }) => {
      setLoading(true);

      const payload = {
         vendorLocationID: data.vendorLocationID,
         usersArray: data.usersArray.map(({ userID }) => ({ userID })),
         VendorID,
         addedBy: UserID,
      };

      mutate(payload, mutateOptions({ setLoading, onClose, refetch }));
   };

   return (
      <FormDialog open={open} onClose={onClose} title="Add New User" maxWidth="xs">
         <Formik
            onSubmit={handleSubmitForm}
            validationSchema={getValidationSchema()}
            initialValues={initialValues}
         >
            {({ errors, touched, values, getFieldProps, setFieldValue }) => {
               function getProps(field: keyof InitialValuesInterface) {
                  const error = touched[field] && Boolean(errors[field]);
                  const helperText =
                     touched[field] && (errors[field] as string | boolean | undefined);

                  return { error, helperText, ...getFieldProps(field) };
               }

               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectField {...getProps('vendorLocationID')} label="Locations">
                           {locations.map(({ VendorLocationID, VendorLocationName }) => (
                              <MenuItem key={VendorLocationID} value={VendorLocationID}>
                                 {VendorLocationName}
                              </MenuItem>
                           ))}
                        </SelectField>

                        <AutoCompleteField
                           label="Users"
                           multiple
                           value={values.usersArray}
                           error={touched.usersArray && Boolean(errors.usersArray)}
                           helperText={touched.usersArray && (errors.usersArray as string)}
                           options={vendorUsers.map(({ UserID, FirstName, LastName }) => ({
                              userID: UserID,
                              title: `${FirstName} ${LastName}`,
                           }))}
                           getOptionLabel={(option: OptionsInterface) => option.title}
                           onChange={(
                              event: React.SyntheticEvent,
                              value: Array<OptionsInterface>,
                           ) => setFieldValue('usersArray', value)}
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

export default AssignedUsersForm;
