"use client";

import React from "react";
import { DataGrid, DataGridToolbar } from "@/components/DataGrids";
import { GridColDef } from "@mui/x-data-grid";
import { StockMovement } from "@/api";
import { getIndexedRows } from "@/utils";
import { StatusChips } from "@/components/Chips";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import { DataGridProps } from "@/app/dashboard/types";

const StockMovementGrid = ({
  rows,
  setDates,
  dates,
  isLoading,
}: DataGridProps<StockMovement>) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No.",
      width: 50,
      sortable: false,
    },
    {
      field: "StockNO",
      headerName: "Stock NO",
      width: 150,
    },
    {
      field: "SourceVendorLocationName",
      headerName: "Source Location Name",
      width: 200,
    },
    {
      field: "DestinationVendorLocationName",
      headerName: "Destination Location Name",
      width: 220,
    },
    {
      field: "StockMovementTypeName",
      headerName: "Stock Movement Type",
      width: 200,
    },
    {
      field: "AddedByName",
      headerName: "Added By",
      width: 150,
    },
    {
      field: "DateAdded",
      headerName: "Date Added",
      width: 200,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      renderCell: ({
        row: { StockMovementStatusName, StockMovementStatusID },
      }) => (
        <StatusChips
          name={StockMovementStatusName}
          statusID={StockMovementStatusID}
        />
      ),
    },
    {
      field: "Action",
      headerName: "Actions",
      headerAlign: "center",
      renderCell: () => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MoreVertIcon />
        </Box>
      ),
    },
  ];

  const toolbar = () => <DataGridToolbar dates={dates} setDates={setDates} />;

  return (
    <DataGrid
      columns={columns}
      rows={getIndexedRows(rows)}
      checkboxSelection
      slots={{ toolbar }}
      getRowId={(row) => row.id}
      loading={isLoading}
    />
  );
};

export default StockMovementGrid;
