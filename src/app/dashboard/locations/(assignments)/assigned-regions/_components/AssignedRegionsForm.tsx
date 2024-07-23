'use client';

import { useState } from 'react';
import { FormDialog } from '@/components/Dialogs';
import { VendorRegion, LocationsArrayInterface, usePostAssignedRegions } from '@/api';
import { useGetUser } from '@/hooks';
import { SelectField, AutoCompleteField } from '@/components/Inputs';
import { MenuItem, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import { SubmitButton } from '@/components/Buttons';
import { toast } from 'react-toastify';
import { FormsPropsInterface } from '@/Types';
import * as Yup from 'yup';

type Props = {
   regions: VendorRegion[];
   locations: LocationsArrayInterface[];
};

const AssignedRegionsForm = ({
   onClose,
   open,
   regions,
   locations,
   refetch,
}: FormsPropsInterface & Props) => {
   const [loading, setLoading] = useState(false);

   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = usePostAssignedRegions();

   const validationSchema = () =>
      Yup.object().shape({
         vendorRegionID: Yup.number().required('Region field is required'),
         vendorLocationArrays: Yup.array().min(1, 'Atleast one location is required'),
      });

   const handleSubmit = (data: any) => {
      setLoading(true);

      const payload = {
         VendorID,
         addedBy,
         vendorRegionID: data.vendorRegionID,
         vendorLocationArrays: data.vendorLocationArrays.map((v: any) => ({
            vendorLocationID: v.vendorLocationID,
         })),
      };

      mutate(payload, {
         onSuccess: ({ data }) => {
            toast.success(data.Message);
            setLoading(false);
            onClose();
            refetch();
         },
      });
   };

   return (
      <FormDialog open={open} onClose={onClose} title="Add Assigned Regions">
         <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            initialValues={{
               vendorRegionID: '' as unknown as number,
               vendorLocationArrays: [],
            }}
         >
            {({ values, errors, touched, getFieldProps, setFieldValue }) => {
               return (
                  <Form>
                     <Stack spacing={3}>
                        <SelectField
                           label="Region"
                           {...getFieldProps('vendorRegionID')}
                           error={touched.vendorRegionID && Boolean(errors.vendorRegionID)}
                           helperText={touched.vendorRegionID && errors.vendorRegionID}
                        >
                           {regions.map(({ VendorRegionID, VendorRegionName }) => (
                              <MenuItem key={VendorRegionID} value={VendorRegionID}>
                                 {VendorRegionName}
                              </MenuItem>
                           ))}
                        </SelectField>

                        <AutoCompleteField
                           options={locations.map(({ VendorLocationID, VendorLocationName }) => ({
                              title: VendorLocationName,
                              vendorLocationID: VendorLocationID,
                           }))}
                           getOptionLabel={(option: any) => option.title}
                           multiple
                           value={values.vendorLocationArrays}
                           label="Locations"
                           onChange={(event: React.SyntheticEvent, value: any) =>
                              setFieldValue('vendorLocationArrays', value)
                           }
                           error={
                              touched.vendorLocationArrays && Boolean(errors.vendorLocationArrays)
                           }
                           helperText={
                              touched.vendorLocationArrays &&
                              (errors.vendorLocationArrays as string)
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

export default AssignedRegionsForm;
