'use client';

import * as Yup from 'yup';
import { FormDialog } from '@/components/Dialogs';
import { SelectSingleLocation, SelectMultipleLocations } from '@/components/Inputs';
import { Stack } from '@mui/material';
import { usePostAssignedLocations } from '@/api';
import { Formik, Form } from 'formik';
import { SubmitButton } from '@/components/Buttons';
import { useState } from 'react';
import { useGetUser } from '@/hooks';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions } from '@/utils';

type FormiValuesInterface = {
   vendorLocationID: number;
   locationsArray: Array<{
      locationID: number;
      locationName: string;
   }>;
};

const AssignedLocationForm = ({ open, onClose, refetch }: FormsPropsInterface) => {
   const [loading, setLoading] = useState<boolean>(false);

   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = usePostAssignedLocations();

   const validationSchema = () => {
      return Yup.object().shape({
         vendorLocationID: Yup.number().required('Atleast one location is required'),
         locationsArray: Yup.array().min(1, 'Atleast one assigned location should be selected'),
      });
   };

   const handleSubmit = (data: FormiValuesInterface) => {
      setLoading(true);

      const payload = {
         locationsArray: data.locationsArray.map(({ locationID }) => ({
            assignedVendorLocationID: locationID,
         })),
         vendorLocationID: data.vendorLocationID,
         VendorID,
         addedBy,
      };

      mutate(payload, mutateOptions({ setLoading, onClose, refetch }));
   };

   return (
      <FormDialog title="Add New Assigned Location" maxWidth="xs" onClose={onClose} open={open}>
         <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            initialValues={{
               locationsArray: [],
               vendorLocationID: '' as unknown as number,
            }}
         >
            {(formik) => {
               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectSingleLocation {...formik} />
                        <SelectMultipleLocations {...formik} label="Assigned Locations" />
                        <SubmitButton text="Submit" loading={loading} />
                     </Stack>
                  </Form>
               );
            }}
         </Formik>
      </FormDialog>
   );
};

export default AssignedLocationForm;
