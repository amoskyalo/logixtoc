import React from "react";
import { DataGrid } from "@/components/DataGrids";
import { GridColDef } from "@mui/x-data-grid";
import { SectionsBox, DeliveryPlanTableInterface } from ".";
import { Chip, Grid } from "@mui/material";
import { StatusChips } from "@/components/Chips";

const DeliveryPlanTable = ({ loading, rows }: DeliveryPlanTableInterface) => {
  const columns: GridColDef[] = [
    { field: "VendorLocationName", headerName: "Location", width: 150 },
    { field: "DeliveryPlanTypeName", headerName: "Type", width: 100 },
    {
      field: "DeliveryPlanStatusName",
      headerName: "Status",
      width: 150,
      renderCell: (param) => (
        <StatusChips
          statusID={param.row.DeliveryPlanStatusID}
          name={param.row.DeliveryPlanStatusName}
        />
      ),
    },
  ];

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

  return (
    <Grid item lg={6} xs={12}>
      <SectionsBox
        title="Delivery plan"
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

export default DeliveryPlanTable;
