import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

type ActionCellInterface = {
   id: string | number;
   isEditMode: boolean;
   handleSaveClick: (arg: string | number) => void;
   handleCancelClick: (arg: string | number) => void;
   handleEditClick: (arg: string | number) => void;
   handleDeleteClick: (arg: string | number) => void;
};

const DataGridActions = ({
   id,
   isEditMode,
   handleSaveClick,
   handleEditClick,
   handleCancelClick,
   handleDeleteClick,
}: ActionCellInterface) => {
   if (isEditMode) {
      return [
         <GridActionsCellItem
            key="save"
            label="Save"
            sx={{ color: 'primary' }}
            icon={<SaveIcon />}
            onClick={() => handleSaveClick(id)}
         />,
         <GridActionsCellItem
            color="inherit"
            key="cancel"
            label="Cancel"
            className="textPrimary"
            icon={<CancelIcon />}
            onClick={() => handleCancelClick(id)}
         />,
      ];
   }

   return [
      <GridActionsCellItem
         key="edit"
         label="Edit"
         color="success"
         icon={<EditIcon />}
         onClick={() => handleEditClick(id)}
      />,
      <GridActionsCellItem
         key="delete"
         label="Delete"
         color="error"
         icon={<DeleteIcon />}
         onClick={() => handleDeleteClick(id)}
      />,
   ];
};

export default DataGridActions;
