"use client";

import { useState } from "react";
import { ActualStockGrid } from "./_components";
import { useGetUser } from "@/hooks";
import { useGetActualStock } from "@/api";

const ActualStock = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dates, setDates] = useState({
    startDate: "2023-06-17",
    endDate: "2024-07-17",
  });

  const { VendorID } = useGetUser();
  const {
    data: actualStock,
    isLoading,
    isRefetching,
  } = useGetActualStock({
    VendorID,
    VendorLocationID: 0,
    PageNO: page,
    PageSize: pageSize,
    StartDate: dates.startDate,
    EndDate: dates.endDate,
  });

  return (
    <ActualStockGrid
      rows={actualStock?.Data ?? []}
      isLoading={isLoading || isRefetching}
      setDates={setDates}
      dates={dates}
    />
  );
};

export default ActualStock;
