import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

type PropsInterface = {
  onEdit: () => void;
  onDelete: () => void;
};

const DataGridEditNDelete = ({ onEdit, onDelete }: PropsInterface) => {
  return [
    <GridActionsCellItem
      key="edit"
      label="Edit"
      color="success"
      icon={<EditIcon />}
      onClick={onEdit}
    />,
    <GridActionsCellItem
      key="delete"
      label="Delete"
      color="error"
      icon={<DeleteIcon />}
      onClick={onDelete}
    />,
  ];
};

export default DataGridEditNDelete;
