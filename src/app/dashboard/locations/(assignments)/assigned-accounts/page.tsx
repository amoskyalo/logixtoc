"use client";

import { AssignedAccountsTable, AssignedAcountsForm } from "./_components";
import {
  useGetAssignedAccounts,
  useGetVendorAccounts,
  useGetVendorLocation,
} from "@/api";
import { useGetUser } from "@/hooks";
import { useState } from "react";

const AssignedAccounts = () => {
  const [open, setOpen] = useState(false);

  const { VendorID } = useGetUser();

  const { data: vendorAccounts } = useGetVendorAccounts({
    VendorID,
    VendorAccountTypeID: 0,
  });

  const { data: vendorLocations } = useGetVendorLocation({
    VendorID,
    VendorLocationTypeID: 0,
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
        locations={vendorLocations?.Data ?? []}
        accounts={vendorAccounts?.Data ?? []}
        refetch={refetch}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AssignedAccounts;
