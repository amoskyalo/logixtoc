'use client';

import { useState } from 'react';
import { StockLevelGrid } from './_components';
import { useGetUser } from '@/hooks';
import { useGetStockLevel } from '@/api';
import { getInitialDates } from '@/utils';

const StockLevel = () => {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [dates, setDates] = useState(getInitialDates());

   const { VendorID } = useGetUser();
   const {
      data: stockLevel,
      isLoading,
      isRefetching,
   } = useGetStockLevel({
      VendorID,
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
      />
   );
};

export default StockLevel;
