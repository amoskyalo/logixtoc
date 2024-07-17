"use client";

import React from "react";
import { DataGrid, DataGridToolbar } from "@/components/DataGrids";
import { GridColDef } from "@mui/x-data-grid";

const StockMovementGrid = () => {
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
      width: 150,
    },
    {
      field: "DestinationVendorLocationName",
      headerName: "Destination Location Name",
      width: 200,
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
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
    },
    {
      field: "Action",
      headerName: "Actions",
    },
  ];

  const toolbar = () => <DataGridToolbar />;

  return (
    <DataGrid
      columns={columns}
      rows={[]}
      checkboxSelection
      slots={{ toolbar }}
    />
  );
};

export default StockMovementGrid;
