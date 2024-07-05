"use client";

import React from "react";
import {
  DataGrid,
  DataGridContainer,
} from "@/components/DataGrids";
import { GridColDef } from "@mui/x-data-grid";
import { getColumnWidth } from "@/utils";

const LocationsTable = ({ onAdd }: Readonly<{ onAdd: () => void }>) => {
  const columns: GridColDef[] = [
    {
      field: "location",
      headerName: "Location",
      ...getColumnWidth(150),
    },
    {
      field: "Type",
      ...getColumnWidth(150),
    },
    {
      field: "Added By",
      ...getColumnWidth(150),
    },
    {
      field: "Date Added",
      ...getColumnWidth(150),
    },
    {
      field: "Actions",
      ...getColumnWidth(100),
    },
  ];

  return (
    <DataGridContainer>
      <DataGrid columns={columns} rows={[]} />
    </DataGridContainer>
  );
};

export default LocationsTable;
