import { GridToolbarContainer } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const EditToolbar = ({ handleClick }: Readonly<{ handleClick: () => void }>) => {
   return (
      <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end' }}>
         <Button startIcon={<AddIcon />} color="primary" size="small" onClick={handleClick}>
            Add Record
         </Button>
      </GridToolbarContainer>
   );
};

export default EditToolbar;
