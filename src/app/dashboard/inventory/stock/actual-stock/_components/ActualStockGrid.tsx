'use client';

import { DataGridToolbar, DataGrid } from "@/components/DataGrids";
import { GridColDef } from "@mui/x-data-grid";

const ActualStockGrid = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No.",
      sortable: false,
      width: 50,
    },
    {
      field: "StockNO",
      headerName: "Stock No.",
      width: 150,
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
      field: "SourceVendorLocationName",
      headerName: "Source Location",
      width: 150,
    },
    {
      field: "DestinationVendorLocationName",
      headerName: "Destination Location",
      width: 150,
    },
    {
      field: "StockMovementTypeName",
      headerName: "Movement Type",
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
    },
  ];

  const toolbar = () => <DataGridToolbar />;

  return (
    <DataGrid
      columns={columns}
      rows={[]}
      slots={{ toolbar }}
      checkboxSelection
    />
  );
};

export default ActualStockGrid;
