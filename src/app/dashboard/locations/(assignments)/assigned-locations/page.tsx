'use client';

import { useState } from 'react';
import { useGetUser } from '@/hooks';
import { useGetVendorAssignedLocations } from '@/api';
import { AssignedLocationsTable, AssignedLocationForm } from './_components';

const AssignedLocations = () => {
   const [pageSize, setPageSize] = useState<number>(100);
   const [page, setPage] = useState<number>(1);
   const [open, setOpen] = useState<boolean>(false);

   const { VendorID } = useGetUser();

   const { data, isLoading, refetch, isRefetching } = useGetVendorAssignedLocations({
      VendorID,
      PageNO: page,
      PageSize: pageSize,
      VendorLocationID: 0,
   });

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
