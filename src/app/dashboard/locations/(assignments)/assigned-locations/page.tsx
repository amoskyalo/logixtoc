'use client';

import { useState } from 'react';
import { useFetch, AssignedLocationObject } from '@/api';
import { AssignedLocationsTable, AssignedLocationForm } from './_components';

const AssignedLocations = () => {
    const [pageSize, setPageSize] = useState<number>(100);
    const [page, setPage] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);

    const { data, isLoading, refetch, isRefetching } = useFetch<AssignedLocationObject, { VendorLocationID: number }>(
        'getVendorLocationAssignedLocation',
        {
            PageNO: page,
            PageSize: pageSize,
            VendorLocationID: 0,
        },
    );

    return (
        <>
            <AssignedLocationsTable
                rows={data?.Data ?? []}
                isLoading={isLoading || isRefetching}
                onAdd={() => setOpen(true)}
                refetch={refetch}
                pageNo={page}
                pageSize={pageSize}
                setPageNo={setPage}
                setPageSize={setPageSize}
            />

            <AssignedLocationForm open={open} onClose={() => setOpen(false)} refetch={refetch} />
        </>
    );
};

export default AssignedLocations;
