import React from "react";
import { Tabs } from "./_components";
import { Box, Divider } from "@mui/material";

const LocationsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Box>
      <Tabs />
      <Divider sx={{mb: 3}}/>
      {children}
    </Box>
  );
};

export default LocationsLayout;
