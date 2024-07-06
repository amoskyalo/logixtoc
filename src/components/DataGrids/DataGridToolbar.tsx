import React from "react";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const DataGridToolbar = ({ onAdd }: Readonly<{ onAdd: () => void }>) => {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        startIcon={<AddIcon />}
        color="primary"
        // variant="contained"
        size="small"
        onClick={onAdd}
      >
        New
      </Button>
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
