import React from "react";
import { PageTabs } from "@/components/Tabs";
import { Box, Divider } from "@mui/material";
import { PageHeader } from "@/components/Headers";

const LocationsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Box>
      <PageHeader
        headerName="Locations"
        subTitle="Manage vendor locations, and location assignments."
      />
      <Divider sx={{ mb: 2, mt: 1 }} />
      <PageTabs
        parentRoute="locations"
        tabsList={[
          "Locations",
          "Assigned Users",
          "Assigned Locations",
          "Assigned Products",
          "Assigned Regions",
          "Assigned Accounts",
        ]}
      />
      {children}
    </Box>
  );
};

export default LocationsLayout;
