import * as Yup from 'yup';
import { useState } from 'react';
import { FormDialog } from '@/components/Dialogs';
import { Formik, Form } from 'formik';
import { SelectSingleLocation, AutoCompleteField } from '@/components/Inputs';
import { Stack } from '@mui/material';
import { VendorUserObjectInterface, useMutate } from '@/api';
import { SubmitButton } from '@/components/Buttons';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions, getFormikFieldProps } from '@/utils';

type OptionsInterface = {
   userID: number;
   title: string;
};

type Props = {
   vendorUsers: VendorUserObjectInterface[];
};

const AssignedUsersForm = ({
   open,
   refetch,
   onClose,
   vendorUsers,
}: FormsPropsInterface & Props) => {
   const [loading, setLoading] = useState<boolean>(false);

   const { mutate } = useMutate<{
      vendorLocationID: number;
      usersArray: Array<{ userID: number }>;
   }>('postVendorLocationUserAssignmentTx');

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
      };

      mutate(payload, mutateOptions({ setLoading, onClose, refetch }));
   };

   return (
      <FormDialog open={open} onClose={onClose} title="Add New User">
         <Formik
            onSubmit={handleSubmitForm}
            validationSchema={getValidationSchema()}
            initialValues={initialValues}
         >
            {(formik) => {
               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectSingleLocation {...formik} />

                        <AutoCompleteField
                           label="Users"
                           options={vendorUsers.map(({ UserID, FirstName, LastName }) => ({
                              userID: UserID,
                              title: `${FirstName} ${LastName}`,
                           }))}
                           getOptionLabel={(option: OptionsInterface) => option.title}
                           {...getFormikFieldProps(formik, 'usersArray')}
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

export default AssignedUsersForm;
