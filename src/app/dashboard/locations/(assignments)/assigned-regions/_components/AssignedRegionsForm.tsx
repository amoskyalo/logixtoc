'use client';

import { useState } from 'react';
import { FormDialog } from '@/components/Dialogs';
import { VendorRegion, usePostAssignedRegions } from '@/api';
import { useGetUser } from '@/hooks';
import { SelectField, SelectMultipleLocations } from '@/components/Inputs';
import { MenuItem, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import { SubmitButton } from '@/components/Buttons';
import { FormsPropsInterface } from '@/Types';
import { mutateOptions } from '@/utils';
import * as Yup from 'yup';

type Props = {
   regions: VendorRegion[];
};

const AssignedRegionsForm = ({ onClose, open, regions, refetch }: FormsPropsInterface & Props) => {
   const [loading, setLoading] = useState(false);

   const { VendorID, UserID: addedBy } = useGetUser();
   const { mutate } = usePostAssignedRegions();

   const validationSchema = () =>
      Yup.object().shape({
         vendorRegionID: Yup.number().required('Region field is required'),
         locationsArray: Yup.array().min(1, 'Atleast one location is required'),
      });

   const handleSubmit = (data: any) => {
      setLoading(true);

      const payload = {
         VendorID,
         addedBy,
         vendorRegionID: data.vendorRegionID,
         vendorLocationArrays: data.locationsArray.map((v: any) => ({
            vendorLocationID: v.vendorLocationID,
         })),
      };

      mutate(payload, mutateOptions({ refetch, onClose, setLoading }));
   };

   return (
      <FormDialog open={open} onClose={onClose} title="Add Assigned Regions">
         <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            initialValues={{
               vendorRegionID: '' as unknown as number,
               locationsArray: [],
            }}
         >
            {(formik) => {
               const { errors, touched, getFieldProps } = formik;

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

                        <SelectMultipleLocations {...formik} label="Locations" />
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
