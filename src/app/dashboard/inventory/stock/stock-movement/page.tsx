'use client';

import { useState } from 'react';
import { StockMovementGrid } from './_components';
import { useFetch, StockMovement } from '@/api';
import { getInitialDates } from '@/utils';

const Stock = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dates, setDates] = useState(getInitialDates());

    const {
        data: movementHistory,
        isLoading,
        isRefetching,
    } = useFetch<StockMovement, { StockMovementTypeID: number; StockMovementStatusID: number; VendorLocationID: number }>('getStockMovementHistory', {
        StockMovementTypeID: 0,
        StockMovementStatusID: 99,
        VendorLocationID: 0,
        StartDate: dates.startDate,
        EndDate: dates.endDate,
        PageNO: page,
        PageSize: pageSize,
    });

    return (
        <StockMovementGrid
            isLoading={isLoading || isRefetching}
            rows={movementHistory?.Data ?? []}
            setDates={setDates}
            dates={dates}
            setPageNo={setPage}
            pageNo={page}
            setPageSize={setPageSize}
            pageSize={pageSize}
        />
    );
};

export default Stock;
