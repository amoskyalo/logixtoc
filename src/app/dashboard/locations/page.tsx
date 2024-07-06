"use client";

import { useState } from "react";
import { LocationsTable, LocationsForm } from "./_components";
import { useGetVendorLocation } from "@/api";
import { useGetUser } from "@/hooks";

const Locations = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);
  const [open, setOpen] = useState<boolean>(false);

  const { VendorID } = useGetUser();

  const { isLoading, data, refetch } = useGetVendorLocation({
    VendorID,
    VendorLocationTypeID: 0,
    PageSize: pageSize,
    PageNO: page,
  });

  return (
    <>
      <LocationsTable
        onAdd={() => setOpen(true)}
        rows={data?.Data || []}
        isLoading={isLoading}
        refetch={refetch}
      />
      <LocationsForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Locations;
