//set new rows

import { FormDialog } from "@/components/Dialogs";
import { TextFieldInput } from "@/components/Inputs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const LocationsForm = ({
  onClose,
  open,
}: Readonly<{
  onClose: () => void;
  open: boolean;
}>) => {
  const columns: GridColDef[] = [
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      editable: true,
    },
    {
      field: "locationName",
      headerName: "Location Name",
      flex: 1,
    },
  ];

  const rows = [{ location: "Nairobi", locationName: "Juja" }];

  return (
    <FormDialog onClose={onClose} open={open}>
      <Box>
        <DataGrid
          columns={columns}
          rows={rows}
          getRowId={(row) => row.location}
          density="compact"
          hideFooter
          autoHeight
        />
      </Box>
    </FormDialog>
  );
};

export default LocationsForm;
