'use client';

import { useState } from 'react';
import { LocationsTable, LocationsForm } from './_components';
import { LocationsArrayInterface, useFetch } from '@/api';

const Locations = () => {
   const [page, setPage] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(100);
   const [open, setOpen] = useState<boolean>(false);

   const { isLoading, data, refetch, isRefetching } = useFetch<LocationsArrayInterface,{ VendorLocationTypeID: number }>('getVendorLocation', {
      VendorLocationTypeID: 0,
      PageSize: pageSize,
      PageNO: page,
   });

   return (
      <>
         <LocationsTable
            onAdd={() => setOpen(true)}
            rows={data?.Data || []}
            isLoading={isLoading || isRefetching}
            refetch={refetch}
            pageNo={page}
            setPageNo={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            count={data?.TotalCount}
         />
         <LocationsForm open={open} onClose={() => setOpen(false)} refetch={refetch} />
      </>
   );
};

export default Locations;
