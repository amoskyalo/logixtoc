'use client';

import { AssignedAccountsTable, AssignedAcountsForm } from './_components';
import { useGetAssignedAccounts, useGetVendorAccounts } from '@/api';
import { useGetUser } from '@/hooks';
import { useState } from 'react';

const AssignedAccounts = () => {
   const [open, setOpen] = useState(false);

   const { VendorID } = useGetUser();

   const { data: vendorAccounts } = useGetVendorAccounts({
      VendorID,
      VendorAccountTypeID: 0,
   });

   const {
      data: assignedAccounts,
      isLoading,
      refetch,
      isRefetching,
   } = useGetAssignedAccounts({
      VendorAccountTypeID: 0,
      VendorID,
      VendorLocationID: 0,
   });

   return (
      <>
         <AssignedAccountsTable
            rows={assignedAccounts?.Data ?? []}
            isLoading={isLoading || isRefetching}
            refetch={refetch}
            onAdd={() => setOpen(true)}
         />

         <AssignedAcountsForm
            open={open}
            accounts={vendorAccounts?.Data ?? []}
            refetch={refetch}
            onClose={() => setOpen(false)}
         />
      </>
   );
};

export default AssignedAccounts;
