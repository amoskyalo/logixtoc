'use client';

import { useState } from 'react';
import { useGetAssignedRegions, useGetRegions } from '@/api';
import { AssignedRegionsTable, AssignedRegionsForm } from './_components';
import { useGetUser } from '@/hooks';

const AssignedRegions = () => {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [open, setOpen] = useState(false);

   const { VendorID } = useGetUser();
   const { data: vendorRegions } = useGetRegions({ VendorID });
   const {
      data: assignedRegions,
      isLoading,
      refetch,
      isRefetching,
   } = useGetAssignedRegions({
      VendorID,
      PageNO: page,
      PageSize: pageSize,
      VendorRegionID: 0,
      VendorLocationID: 0,
   });

   return (
      <>
         <AssignedRegionsTable
            rows={assignedRegions?.Data ?? []}
            isLoading={isLoading || isRefetching}
            refetch={refetch}
            onAdd={() => setOpen(true)}
         />

         <AssignedRegionsForm
            open={open}
            refetch={refetch}
            onClose={() => setOpen(false)}
            regions={vendorRegions?.Data ?? []}
         />
      </>
   );
};

export default AssignedRegions;
