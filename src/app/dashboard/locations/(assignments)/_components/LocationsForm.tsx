'use client';

import { FormDialog } from '@/components/Dialogs';
import {
   DataGrid,
   GridColDef,
   GridRowsProp,
   GridRowModesModel,
   GridRowModes,
} from '@mui/x-data-grid';
import { EditToolbar, DataGridRowEditActions } from '@/components/DataGrids';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useGridRowEditFunctions } from '@/hooks';
import { FormsPropsInterface } from '@/Types';

const LocationsForm = ({ onClose, open }: FormsPropsInterface) => {
   const [rows, setRows] = useState<GridRowsProp>([]);
   const [rowModels, setRowModels] = useState<GridRowModesModel>({});

   const columns: GridColDef[] = [
      {
         field: 'location',
         headerName: 'Location',
         flex: 1,
         editable: true,
      },
      {
         field: 'locationName',
         headerName: 'Location Name',
         editable: true,
         flex: 1,
      },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         getActions: ({ id }) => {
            const isEditMode = rowModels[id]?.mode === GridRowModes.Edit;

            return [
               <DataGridRowEditActions
                  id={id}
                  key="actions"
                  isEditMode={isEditMode}
                  handleCancelClick={handleCancelClick}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                  handleSaveClick={handleSaveClick}
               />,
            ];
         },
      },
   ];

   const newRow = {
      location: '',
      locationName: '',
      id: rows.length + 1,
   };

   const {
      handleAddRecord,
      handleCancelClick,
      handleSaveClick,
      handleEditClick,
      handleDeleteClick,
      handleRowModesModelChange,
      processRowUpdate,
      handleRowEditStop,
   } = useGridRowEditFunctions({
      rowId: rows.length + 1,
      focusField: 'location',
      setRowModesModels: setRowModels,
      setRows,
      newRow,
      rows,
   });

   const toolbar = () => <EditToolbar handleClick={handleAddRecord} />;

   return (
      <FormDialog onClose={onClose} open={open} maxWidth="sm" title="Add New User">
         <Box>
            <DataGrid
               columns={columns}
               rows={rows}
               slots={{ toolbar }}
               rowModesModel={rowModels}
               onRowModesModelChange={handleRowModesModelChange}
               processRowUpdate={processRowUpdate}
               onRowEditStop={handleRowEditStop}
               density="compact"
               hideFooter
               autoHeight
            />
         </Box>
      </FormDialog>
   );
};

export default LocationsForm;
