import React from "react";
import { Box, Typography } from "@mui/material";
import { ContainerInterface } from "./types";

const Container = ({
  title,
  children,
  renderActionButton,
}: Readonly<ContainerInterface>) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 4,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        rowGap: 3,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {React.isValidElement(renderActionButton?.()) && renderActionButton?.()}
      </Box>
      {children}
    </Box>
  );
};

export default Container;
