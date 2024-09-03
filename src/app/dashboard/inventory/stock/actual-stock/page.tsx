'use client';

import { useState } from 'react';
import { ActualStockGrid } from './_components';
import { useFetch, ActualStock as ActualStockProps } from '@/api';
import { getInitialDates } from '@/utils';

const ActualStock = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dates, setDates] = useState(getInitialDates());

    const {
        data: actualStock,
        isLoading,
        isRefetching,
    } = useFetch<ActualStockProps, { VendorLocationID: number }>('getActualStock', {
        VendorLocationID: 0,
        PageNO: page,
        PageSize: pageSize,
        StartDate: dates.startDate,
        EndDate: dates.endDate,
    });

    return (
        <ActualStockGrid
            rows={actualStock?.Data ?? []}
            isLoading={isLoading || isRefetching}
            setDates={setDates}
            dates={dates}
            pageNo={page}
            setPageNo={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            count={actualStock?.TotalCount}
        />
    );
};

export default ActualStock;
