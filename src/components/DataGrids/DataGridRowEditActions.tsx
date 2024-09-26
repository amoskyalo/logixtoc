import { GridActionsCellItem } from '@mui/x-data-grid';
import { DataGridRowEditActionsProps } from './types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

const DataGridRowEditActions = ({
   id,
   isEditMode,
   handleSaveClick,
   handleEditClick,
   handleCancelClick,
   handleDeleteClick,
}: DataGridRowEditActionsProps) => {
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

export default DataGridRowEditActions;
