'use client';

import { useState } from 'react';
import { StockLevelGrid } from './_components';
import { useFetch, GetVendorStockParams, VendorStock } from '@/api';
import { getInitialDates } from '@/utils';

const StockLevel = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dates, setDates] = useState(getInitialDates());

    const {
        data: stockLevel,
        isLoading,
        isRefetching,
    } = useFetch<VendorStock, GetVendorStockParams>('getStockLevel', {
        StartDate: dates.startDate,
        EndDate: dates.endDate,
        VendorLocationID: 0,
        VendorProductBrandID: 0,
        VendorProductTypeID: 0,
        VendorProductUOMID: 0,
        PageSize: pageSize,
        PageNO: page,
    });

    return (
        <StockLevelGrid
            rows={stockLevel?.Data ?? []}
            isLoading={isLoading || isRefetching}
            setDates={setDates}
            dates={dates}
            pageNo={page}
            pageSize={pageSize}
            setPageNo={setPage}
            setPageSize={setPageSize}
            count={stockLevel?.TotalCount}
        />
    );
};

export default StockLevel;
