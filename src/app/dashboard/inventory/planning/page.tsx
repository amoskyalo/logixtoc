'use client';

import { PlanningGrid } from './_components';
import { useGetDeliveryPlan } from '@/api';
import { useGetUser } from '@/hooks';
import { Stack, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { PageHeader } from '@/components/Headers';
import { getInitialDates } from '@/utils';

const Planning = () => {
   const [dates, setDates] = useState(getInitialDates());

   const { VendorID } = useGetUser();
   const {
      data: deliveryPlanHistory,
      isLoading,
      isRefetching,
   } = useGetDeliveryPlan({
      VendorID,
      VendorLocationID: 0,
      DeliveryPlanStatusID: 99,
      DeliveryPlanTypeID: 0,
      StartDate: dates.startDate,
      EndDate: dates.endDate,
   });

   return (
      <Stack spacing={3}>
         <PageHeader
            headerName="Planning"
            subTitle="Manage your delivery plans, view, add and delete."
         />

         <PlanningGrid
            rows={deliveryPlanHistory?.Data ?? []}
            isLoading={isLoading || isRefetching}
            dates={dates}
            setDates={setDates}
         />
      </Stack>
   );
};

export default Planning;
