"use client";

import { useState } from "react";
import { StockMovementGrid } from "./_components";
import { useGetStockMovementHistory } from "@/api";
import { useGetUser } from "@/hooks";

const Stock = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dates, setDates] = useState({
    startDate: "2023-06-17",
    endDate: "2024-07-17",
  });

  const { VendorID } = useGetUser();
  const {
    data: movementHistory,
    isLoading,
    isRefetching,
  } = useGetStockMovementHistory({
    VendorID,
    StockMovementTypeID: 0,
    StockMovementStatusID: 99,
    VendorLocationID: 0,
    StartDate: dates.startDate,
    EndDate: dates.endDate,
    PageNO: page,
    PageSize: pageSize,
  });

  return (
    <StockMovementGrid
      isLoading={isLoading || isRefetching}
      rows={movementHistory?.Data ?? []}
      setDates={setDates}
      dates={dates}
    />
  );
};

export default Stock;
