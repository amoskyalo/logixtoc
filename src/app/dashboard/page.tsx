
"use client";

import React from "react";
import {
  CardsInterface,
  DashboardCard,
  ProductPerfomanceLineChart,
  SectionsBox,
  SalesChart,
} from "./_components";
import {
  Groups2,
  LocalShipping,
  DeliveryDining,
  Build,
} from "@mui/icons-material";
import { Box, Grid, Chip } from "@mui/material";
import { DataGrid } from "@/components/DataGrids";
import { GridColDef } from "@mui/x-data-grid";
import { useResponsiveness } from "@/hooks";

const DashboardPage = () => {
  const { isMobile } = useResponsiveness();
  const cards: CardsInterface[] = [
    {
      title: "Customers",
      subTitle: "Total customers",
      iconBackground: "rgba(136, 135, 182, 0.5)",
      color: "#8e96d3",
      cardBackground: "#c1e547",
      Icon: Groups2,
      percentages: [
        { text: "Served", value: 0 },
        { text: "Unserved", value: 0 },
      ],
    },
    {
      title: "Assets",
      subTitle: "Total assets",
      color: "#c7e6e5",
      iconBackground: "rgba(199, 230, 229, 0.3)",
      Icon: LocalShipping,
      percentages: [
        { text: "Available", value: 0 },
        { text: "Unavailable", value: 0 },
      ],
    },
    {
      title: "Delivery plan",
      subTitle: "Total delivery plan",
      color: "#9e9dc3",
      iconBackground: "rgba(158, 157, 195, 0.3)",
      Icon: DeliveryDining,
      percentages: [
        { text: "Active", value: 0 },
        { text: "Inactive", value: 0 },
      ],
    },
    {
      title: "Maintenance",
      subTitle: "Total request",
      color: "#b2d0f9",
      iconBackground: "rgba(178, 208, 249, 0.3)",
      Icon: Build,
      percentages: [
        { text: "Today", value: 0 },
        { text: "Planned", value: 0 },
      ],
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  const rows = [
    {
      location: "Nairobi",
      type: "Stationary",
      status: 0,
    },
    {
      location: "Mombasa",
      type: "Stationary",
      status: 1,
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
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        rowGap: 6,
      }}
    >
      <Box sx={{ overflow: isMobile ? "scroll" : "none" }}>
        <Grid container spacing={2} width={1200}>
          {cards.map(
            ({
              title,
              subTitle,
              color,
              iconBackground,
              cardBackground,
              Icon,
              percentages,
            }) => (
              <Grid item xs={3} key={title}>
                <DashboardCard
                  title={title}
                  subTitle={subTitle}
                  color={color}
                  iconBackground={iconBackground}
                  Icon={Icon}
                  cardBackground={cardBackground}
                  percentages={percentages}
                />
              </Grid>
            )
          )}
        </Grid>
      </Box>

      <Grid container spacing={4}>
        <Grid item lg={8} xs={12}>
          <SectionsBox title="Product Performance">
            <Box>
              <ProductPerfomanceLineChart />
            </Box>
          </SectionsBox>
        </Grid>

        <Grid item lg={4} xs={12}>
          <SectionsBox title="Sales Per Category">
            <Box>
              <SalesChart />
            </Box>
          </SectionsBox>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item lg={6} xs={12}>
          <SectionsBox
            title="Delivery plan"
            renderActionButton={renderActionButton}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.location}
            />
          </SectionsBox>
        </Grid>
        <Grid item lg={6} xs={12}>
          <SectionsBox
            title="Stock movement"
            renderActionButton={renderActionButton}
          >
            <DataGrid rows={[]} columns={columns} />
          </SectionsBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
