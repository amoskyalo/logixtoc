import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

type PropsInterface = {
   onEdit?: () => void;
   onDelete?: () => void;
   actions?: Array<'edit' | 'delete'>;
};

const DataGridEditNDelete = ({
   onEdit,
   onDelete,
   actions = ['edit', 'delete'],
}: PropsInterface) => {
   const actionComponents: {
      name: 'edit' | 'delete';
      component: () => JSX.Element;
   }[] = [
      {
         name: 'edit' as const,
         component: () => (
            <GridActionsCellItem
               key="edit"
               label="Edit"
               color="success"
               icon={<EditIcon />}
               onClick={onEdit}
            />
         ),
      },
      {
         name: 'delete' as const,
         component: () => (
            <GridActionsCellItem
               key="delete"
               label="Delete"
               color="error"
               icon={<DeleteIcon />}
               onClick={onDelete}
            />
         ),
      },
   ].filter(({ name }) => actions.includes(name));

   return actionComponents.map(({ component }) => component());
};

export default DataGridEditNDelete;
