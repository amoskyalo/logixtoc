'use client';

import * as Yup from 'yup';
import { FormDialog } from '@/components/Dialogs';
import { SelectField, AutoCompleteField } from '@/components/Inputs';
import { MenuItem, Stack } from '@mui/material';
import { LocationsArrayInterface, usePostAssignedLocations } from '@/api';
import { Formik, Form } from 'formik';
import { SubmitButton } from '@/components/Buttons';
import { useState } from 'react';
import { useGetUser } from '@/hooks';
import { toast } from 'react-toastify';
import { FormsPropsInterface } from '@/Types';

type Props = {
   locations: LocationsArrayInterface[];
};

type FormiValuesInterface = {
   vendorLocationID: number;
   locationsArray: Array<{
      locationID: number;
      locationName: string;
   }>;
};

const AssignedLocationForm = ({
   open,
   onClose,
   locations,
   refetch,
}: FormsPropsInterface & Props) => {
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

      mutate(payload, {
         onSuccess: ({ data }) => {
            setLoading(false);
            toast.success(data.Message);
            onClose();
            refetch();
         },
      });
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
            {({ errors, touched, values, setFieldValue, getFieldProps }) => {
               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectField
                           label="Location"
                           error={touched.vendorLocationID && Boolean(errors.vendorLocationID)}
                           helperText={touched.vendorLocationID && errors.vendorLocationID}
                           {...getFieldProps('vendorLocationID')}
                        >
                           {locations.map(({ VendorLocationID, VendorLocationName }) => (
                              <MenuItem value={VendorLocationID} key={VendorLocationID}>
                                 {VendorLocationName}
                              </MenuItem>
                           ))}
                        </SelectField>

                        <AutoCompleteField
                           options={locations.map((location) => ({
                              locationName: location.VendorLocationName,
                              locationID: location.VendorLocationID,
                           }))}
                           getOptionLabel={(option: any) => option.locationName}
                           multiple
                           value={values.locationsArray}
                           label="Assigned Locations"
                           onChange={(event: React.SyntheticEvent, value: any) =>
                              setFieldValue('locationsArray', value)
                           }
                           error={touched.locationsArray && Boolean(errors.locationsArray)}
                           helperText={touched.locationsArray && (errors.locationsArray as string)}
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

export default AssignedLocationForm;
