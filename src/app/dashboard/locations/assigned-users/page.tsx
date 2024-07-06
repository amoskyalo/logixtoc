"use client";

import { useState } from "react";
import { AssignedUsersTable, AssignedUsersForm } from "./_compoents";
import {
  useGetVendorLocationUserAssignment,
  useGetVendorLocation,
  useGetVendorUsers,
} from "@/api";
import { useGetUser } from "@/hooks";

const AssignedUsers = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { VendorID } = useGetUser();

  const { data: vendorUsers } = useGetVendorUsers({ VendorID });

  const { data: vendorLocations } = useGetVendorLocation({
    VendorID,
    VendorLocationTypeID: 0,
  });

  const { data, isLoading, refetch } = useGetVendorLocationUserAssignment({
    VendorID,
    PageNO: page,
    PageSize: pageSize,
    VendorLocationID: 0,
  });

  return (
    <>
      <AssignedUsersTable
        rows={data?.Data ?? []}
        isLoading={isLoading}
        onAdd={() => setOpen(true)}
        refetch={refetch}
      />

      <AssignedUsersForm
        open={open}
        refetch={refetch}
        onClose={() => setOpen(false)}
        locations={vendorLocations?.Data ?? []}
        vendorUsers={vendorUsers?.Data ?? []}
      />
    </>
  );
};

export default AssignedUsers;
