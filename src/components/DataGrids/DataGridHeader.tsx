import { useState } from "react";
import { Box, Button, MenuList, MenuItem, ListItemText } from "@mui/material";
import { Popover } from "../Popover";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

const menuListStyles = {
  minHeight: 10,
  height: 18,
  py: 2,
};

const DataGridHeader = ({
  renderFilters,
  onAdd,
}: Readonly<{ renderFilters?: () => React.ReactNode, onAdd: () => void }>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: 0.5,
        paddingTop: 0.5,
        backgroundColor: "white",
      }}
    >
      {renderFilters?.()}
      <Box sx={{ display: "flex", columnGap: 1 }}>
        <Button
          startIcon={<DownloadIcon />}
          sx={{ fontWeight: "900" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          disableElevation
          size="small"
        >
          EXPORT
        </Button>
        <Button
          startIcon={<AddIcon />}
          sx={{ fontWeight: "900" }}
          disableElevation
          size="small"
          onClick={onAdd}
        >
          NEW
        </Button>
      </Box>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={() => setAnchorEl(null)}
      >
        <MenuList>
          <MenuItem sx={menuListStyles}>
            <ListItemText>Download as Excel</ListItemText>
          </MenuItem>
          <MenuItem sx={menuListStyles}>
            <ListItemText>Download as PDF</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  );
};

export default DataGridHeader;
