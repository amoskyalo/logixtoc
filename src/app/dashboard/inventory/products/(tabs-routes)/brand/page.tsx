"use client";

import React, { useState } from "react";
import { BrandTable, BrandForm } from "./_components";
import { useGetUser } from "@/hooks";
import { useGetVendorProductBrand, useGetProductClass } from "@/api";

const Brand = () => {
  const [open, setOpen] = useState(false);

  const { VendorID, VendorTypeID } = useGetUser();
  const {
    data: brands,
    isLoading,
    isRefetching,
    refetch,
  } = useGetVendorProductBrand({ VendorID });
  const { data: productClass } = useGetProductClass({ VendorID, VendorTypeID });

  return (
    <>
      <BrandTable
        rows={brands?.Data || []}
        isLoading={isLoading || isRefetching}
        onAdd={() => setOpen(true)}
        refetch={refetch}
      />

      <BrandForm
        open={open}
        onClose={() => setOpen(false)}
        productClass={productClass?.Data || []}
        refetch={refetch}
      />
    </>
  );
};

export default Brand;
