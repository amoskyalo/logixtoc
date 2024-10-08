import { GridRowsProp, GridRowModesModel, GridRowModel, GridRowModes, GridEventListener, GridRowEditStopReasons } from '@mui/x-data-grid';

interface Props<T> {
    newRow: T;
    rowId: string | number;
    focusField: string;
    rows: GridRowsProp;
    setRows: (updateRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModels: (updateModesModel: (oldModels: GridRowModesModel) => GridRowModesModel) => void;
}

export const useGridRowEditFunctions = <T extends GridRowModel>({ newRow, rowId, focusField, rows, setRowModesModels, setRows }: Props<T>) => {
    const handleAddRecord = () => {
        setRows((oldRows: GridRowsProp) => [...oldRows, { ...newRow, isNew: true }]);
        setRowModesModels((oldModes: GridRowModesModel) => ({
            ...oldModes,
            [rowId]: { mode: GridRowModes.Edit, fieldToFocus: focusField },
        }));
    };

    const handleEditClick = (rowId: string | number) => {
        setRowModesModels((oldModes: GridRowModesModel) => ({
            ...oldModes,
            [rowId]: { mode: GridRowModes.Edit },
        }));
    };

    const handleSaveClick = (rowId: string | number) => {
        setRowModesModels((oldModes: GridRowModesModel) => ({
            ...oldModes,
            [rowId]: { mode: GridRowModes.View },
        }));
    };

    const handleCancelClick = (rowId: string | number) => {
        setRowModesModels((oldModes: GridRowModesModel) => ({
            ...oldModes,
            [rowId]: { mode: GridRowModes.View, ignoreModifications: true },
        }));

        const editedRow = rows.find((row) => row.id === rowId);
        if (editedRow!.isNew) {
            handleDeleteClick(rowId);
        }
    };

    const handleDeleteClick = (rowId: string | number) => {
        setRows((oldRows) => oldRows.filter((row) => row.id !== rowId));
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModels(() => newRowModesModel);
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(() => rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    return {
        handleAddRecord,
        handleEditClick,
        handleSaveClick,
        processRowUpdate,
        handleDeleteClick,
        handleCancelClick,
        handleRowEditStop,
        handleRowModesModelChange,
    };
};
