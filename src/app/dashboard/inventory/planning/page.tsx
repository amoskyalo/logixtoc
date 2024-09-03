'use client';

import { PlanningGrid } from './_components';
import { DeliveryPlan, useFetch } from '@/api';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { PageHeader } from '@/components/Headers';
import { getInitialDates } from '@/utils';

const Planning = () => {
    const [dates, setDates] = useState(getInitialDates());

    const {
        data: deliveryPlanHistory,
        isLoading,
        isRefetching,
    } = useFetch<DeliveryPlan, { VendorLocationID: number; DeliveryPlanStatusID: number; DeliveryPlanTypeID: number }>('getDeliveryPlanHistory', {
        VendorLocationID: 0,
        DeliveryPlanStatusID: 99,
        DeliveryPlanTypeID: 0,
        StartDate: dates.startDate,
        EndDate: dates.endDate,
    });

    return (
        <Stack spacing={3}>
            <PageHeader headerName="Planning" subTitle="Manage your delivery plans, view, add and delete." />
            <PlanningGrid rows={deliveryPlanHistory?.Data ?? []} isLoading={isLoading || isRefetching} dates={dates} setDates={setDates} />
        </Stack>
    );
};

export default Planning;
