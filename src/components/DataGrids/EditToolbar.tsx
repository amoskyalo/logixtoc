//updates rows and rowModesModel.
import { GridToolbarContainer, GridRowsProp, GridRowModesModel } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModes: (oldModes: GridRowModesModel) => GridRowModesModel) => void;
}

const EditToolbar = ({
  setRows,
  setRowModesModel,
}: Readonly<EditToolbarProps>) => {
  const handleAddRecord = () => {
    setRows((oldRows: any) => [
      ...oldRows,
      { id: "name", name: "Amos", age: 24 },
    ]);
    // setRowModesModel()
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} size="small">
        Add Record
      </Button>
    </GridToolbarContainer>
  );
};

export default EditToolbar;
