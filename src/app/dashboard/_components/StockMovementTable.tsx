import React from "react";
import { DataGrid } from "@/components/DataGrids";
import { StatusChips } from "@/components/Chips";
import { Chip, Grid } from "@mui/material";
import { SectionsBox, StockMovementTableInterface } from ".";
import { GridColDef } from "@mui/x-data-grid";

const StockMovementTable = ({ loading, rows }: StockMovementTableInterface) => {
  const renderActionButton = () => {
    return (
      <Chip
        label="View all"
        sx={{ width: 75 }}
        color="secondary"
        onClick={() => null}
      />
    );
  };

  const columns: GridColDef[] = [
    { field: "SourceVendorLocationName", headerName: "Source", width: 150 },
    {
      field: "DestinationVendorLocationName",
      headerName: "Destination",
      width: 150,
    },
    { field: "StockMovementTypeName", headerName: "Type", width: 150 },
    {
      field: "StockMovementStatusID",
      headerName: "Status",
      width: 150,
      renderCell: ({
        row: { StockMovementStatusID, StockMovementStatusName },
      }) => (
        <StatusChips
          statusID={StockMovementStatusID}
          name={StockMovementStatusName}
        />
      ),
    },
  ];

  return (
    <Grid item lg={6} xs={12}>
      <SectionsBox
        title="Stock movement"
        renderActionButton={renderActionButton}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.DateAdded}
          loading={loading}
        />
      </SectionsBox>
    </Grid>
  );
};

export default StockMovementTable;
