import { useFetch, LocationsArrayInterface } from '@/api';
import { FormikProps } from 'formik';
import { MenuItem } from '@mui/material';
import { getFormikFieldProps } from '@/utils';
import SelectField from '../SelectInput';
import AutoCompleteField from '../Autocomplete';

const SelectSingleLocation = <Type extends { vendorLocationID: number }>(
   formik: FormikProps<Type>,
) => {
   const { data: locations } = useFetch<LocationsArrayInterface, { VendorLocationTypeID: number }>(
      'getVendorLocation',
      { VendorLocationTypeID: 0 },
   );

   return (
      <SelectField label="Locations" {...getFormikFieldProps(formik, 'vendorLocationID')}>
         {locations?.Data?.map(({ VendorLocationID, VendorLocationName }) => (
            <MenuItem value={VendorLocationID} key={VendorLocationID}>
               {VendorLocationName}
            </MenuItem>
         ))}
      </SelectField>
   );
};

const SelectMultipleLocations = <
   Type extends { locationsArray: Array<{ locationID: number; locationName: string }> },
>({
   label,
   ...formikProps
}: FormikProps<Type> & { label: string }) => {
   const { data: vendorLocations } = useFetch<
      LocationsArrayInterface,
      { VendorLocationTypeID: number }
   >('getVendorLocation', { VendorLocationTypeID: 0 });

   const locations = vendorLocations?.Data || [];

   return (
      <AutoCompleteField
         options={locations.map((location) => ({
            locationName: location.VendorLocationName,
            locationID: location.VendorLocationID,
         }))}
         getOptionLabel={(option: any) => option.locationName}
         label={label}
         {...getFormikFieldProps(formikProps, 'locationsArray', true)}
      />
   );
};

export { SelectSingleLocation, SelectMultipleLocations };
