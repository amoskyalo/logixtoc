'use client';

import { useState } from 'react';
import { AssignedUsersTable, AssignedUsersForm } from './_compoents';
import { useGetVendorLocationUserAssignment, useGetVendorUsers } from '@/api';
import { useGetUser } from '@/hooks';

const AssignedUsers = () => {
   const [open, setOpen] = useState(false);
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(10);

   const { VendorID } = useGetUser();

   const { data: vendorUsers } = useGetVendorUsers({ VendorID });

   const { data, isLoading, refetch, isRefetching } = useGetVendorLocationUserAssignment({
      VendorID,
      PageNO: page,
      PageSize: pageSize,
      VendorLocationID: 0,
   });

   return (
      <>
         <AssignedUsersTable
            rows={data?.Data ?? []}
            isLoading={isLoading || isRefetching}
            onAdd={() => setOpen(true)}
            refetch={refetch}
            setPageNo={setPage}
            setPageSize={setPageSize}
            pageSize={pageSize}
            pageNo={page}
         />

         <AssignedUsersForm
            open={open}
            refetch={refetch}
            onClose={() => setOpen(false)}
            vendorUsers={vendorUsers?.Data ?? []}
         />
      </>
   );
};

export default AssignedUsers;
