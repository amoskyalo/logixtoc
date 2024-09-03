'use client';

import { useState } from 'react';
import { VendorRegion, useFetch, AssignedRegionObjInterface } from '@/api';
import { AssignedRegionsTable, AssignedRegionsForm } from './_components';

const AssignedRegions = () => {
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [open, setOpen] = useState(false);
   
   const { data: vendorRegions } = useFetch<VendorRegion, void>('getVendorRegions');

   const {
      data: assignedRegions,
      isLoading,
      refetch,
      isRefetching,
   } = useFetch<AssignedRegionObjInterface, { VendorLocationID: number; VendorRegionID: number }>(
      'getAssignedRegions',
      { PageNO: page, PageSize: pageSize, VendorRegionID: 0, VendorLocationID: 0 },
   );

   return (
      <>
         <AssignedRegionsTable
            rows={assignedRegions?.Data ?? []}
            isLoading={isLoading || isRefetching}
            refetch={refetch}
            onAdd={() => setOpen(true)}
            setPageNo={setPage}
            setPageSize={setPageSize}
            pageNo={page}
            pageSize={pageSize}
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
