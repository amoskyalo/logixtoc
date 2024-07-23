import { Box } from '@mui/material';

const DataGridContainer = ({ children }: Readonly<{ children: React.ReactNode }>) => {
   return (
      <Box sx={{ border: '1px solid #e0e1e3', borderRadius: 2, overflow: 'hidden' }}>
         {children}
      </Box>
   );
};

export default DataGridContainer;
