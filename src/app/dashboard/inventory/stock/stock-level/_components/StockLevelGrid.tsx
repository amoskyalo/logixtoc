"use client";

import { GridColDef } from "@mui/x-data-grid";
import { DataGrid, DataGridToolbar } from "@/components/DataGrids";
import { DataGridProps } from "@/app/dashboard/types";
import { VendorStock } from "@/api";
import { getIndexedRows } from "@/utils";

const StockLevelGrid = ({ isLoading, rows, setDates, dates }: DataGridProps<VendorStock>) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No.",
      width: 50,
      sortable: false,
    },
    {
      field: "VendorLocationName",
      headerName: "Location",
      width: 150,
    },
    {
      field: "VendorProductBrandName",
      headerName: "Product Brand",
      width: 150,
    },
    {
      field: "VendorProductTypeName",
      headerName: "Product Type",
      width: 150,
    },
    {
      field: "VendorProductUOMName",
      headerName: "Product UOM",
      width: 150,
    },
    {
      field: "OpeningStock",
      headerName: "Opening Stock",
      type: "number",
      width: 150,
    },
    {
      field: "ReceivedStock",
      headerName: "Received Stock",
      type: "number",
      width: 150,
    },
    {
      field: "SoldStock",
      headerName: "Sold Stock",
      type: "number",
      width: 150,
    },
    {
      field: "IssuedStock",
      headerName: "Issued Stock",
      type: "number",
      width: 150,
    },
    {
      field: "CurrentStock",
      headerName: "Current Stock",
      type: "number",
      width: 150,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
    },
  ];

  const toolbar = () => <DataGridToolbar setDates={setDates} dates={dates}/>;

  return (
    <DataGrid
      checkboxSelection
      columns={columns}
      rows={getIndexedRows(rows)}
      slots={{ toolbar }}
      loading={isLoading}
      getRowId={(row) => row.id}
    />
  );
};

export default StockLevelGrid;
