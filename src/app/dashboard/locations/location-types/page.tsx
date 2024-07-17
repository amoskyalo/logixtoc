"use client";

import { useState } from "react";
import { LocationTypesGrid, LocationTypesForm } from "./_components";
import { useGetVendorLocationTypes, useGetSystemLocationTypes } from "@/api";
import { useGetUser } from "@/hooks";

const LocationTypes = () => {
  const [open, setOpen] = useState(false);

  const { VendorID } = useGetUser();

  const {
    data: locationTypes,
    isLoading,
    isFetching,
    refetch,
  } = useGetVendorLocationTypes({ VendorID });

  const { data: systemLocationTypes } = useGetSystemLocationTypes({ VendorID });

  return (
    <>
      <LocationTypesGrid
        isLoading={isLoading || isFetching}
        rows={locationTypes?.Data || []}
        refetch={refetch}
        onAdd={() => setOpen(true)}
      />

      <LocationTypesForm
        open={open}
        onCancel={() => setOpen(false)}
        systemLocationTypes={systemLocationTypes?.Data || []}
        refetch={refetch}
      />
    </>
  );
};

export default LocationTypes;
