import { useGetUser } from '@/hooks';
import { useGetVendorLocation } from '@/api';
import { FormikProps } from 'formik';
import { MenuItem } from '@mui/material';
import SelectField from '../SelectInput';
import AutoCompleteField from '../Autocomplete';

const SelectSingleLocation = <T extends { vendorLocationID: number }>({
   getFieldProps,
   touched,
   errors,
}: FormikProps<T>) => {
   const { VendorID } = useGetUser();

   const { data: locations } = useGetVendorLocation({ VendorID, VendorLocationTypeID: 0 });

   return (
      <SelectField
         label="Locations"
         helperText={touched.vendorLocationID && (errors.vendorLocationID as string)}
         error={touched.vendorLocationID && Boolean(errors.vendorLocationID)}
         {...getFieldProps('vendorLocationID')}
      >
         {locations?.Data?.map(({ VendorLocationID, VendorLocationName }) => (
            <MenuItem value={VendorLocationID} key={VendorLocationID}>
               {VendorLocationName}
            </MenuItem>
         ))}
      </SelectField>
   );
};

const SelectMultipleLocations = <
   T extends {
      locationsArray: Array<{
         locationID: number;
         locationName: string;
      }>;
   },
>({
   touched,
   errors,
   values,
   setFieldValue,
   label,
}: FormikProps<T> & { label: string }) => {
   const { VendorID } = useGetUser();

   const { data: vendorLocations } = useGetVendorLocation({ VendorID, VendorLocationTypeID: 0 });

   const locations = vendorLocations?.Data || [];

   return (
      <AutoCompleteField
         options={locations.map((location) => ({
            locationName: location.VendorLocationName,
            locationID: location.VendorLocationID,
         }))}
         onChange={(__: React.SyntheticEvent, value: any) => setFieldValue('locationsArray', value)}
         getOptionLabel={(option: any) => option.locationName}
         error={touched.locationsArray && Boolean(errors.locationsArray)}
         helperText={touched.locationsArray && (errors.locationsArray as string)}
         value={values.locationsArray}
         label={label}
         multiple
      />
   );
};

export { SelectSingleLocation, SelectMultipleLocations };
