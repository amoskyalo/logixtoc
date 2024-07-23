'use client';

import { useState } from 'react';
import { LocationTypesGrid, LocationTypesForm } from './_components';
import { useGetVendorLocationTypes, useGetSystemLocationTypes } from '@/api';
import { useGetUser } from '@/hooks';
import { PageHeader } from '@/components/Headers';
import { Stack } from '@mui/material';

const LocationTypes = () => {
   const [open, setOpen] = useState(false);

   const { VendorID } = useGetUser();

   const {
      data: locationTypes,
      isLoading,
      isFetching,
      refetch,
   } = useGetVendorLocationTypes({ VendorID });

   const { data: systemLocationTypes } = useGetSystemLocationTypes({ VendorID });

   return (
      <Stack spacing={3}>
         <PageHeader
            headerName="Location Types"
            subTitle="Manage vendor locations, and location assignments."
         />

         <LocationTypesGrid
            isLoading={isLoading || isFetching}
            rows={locationTypes?.Data || []}
            refetch={refetch}
            onAdd={() => setOpen(true)}
         />

         <LocationTypesForm
            open={open}
            onClose={() => setOpen(false)}
            systemLocationTypes={systemLocationTypes?.Data || []}
            refetch={refetch}
         />
      </Stack>
   );
};

export default LocationTypes;
