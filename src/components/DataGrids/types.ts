import { DataGridProps } from "@mui/x-data-grid";
import { PaginationProps } from "@mui/material";

export type DatesInterface = {
    startDate: string;
    endDate: string;
};

export type GridProps<R> = {
    rows: R[],
    onAdd?: () => void;
    refetch?: () => void;
    count?:number;
    pageNo?:number;
    pageSize?: number;
    setPageSize?: any;
    setPageNo?: any;
    isLoading: boolean;
    setDates?: any;
    dates?: DatesInterface;
};
 
export type DataGridToolbarProps = {
    setDates?: any;
    onAdd?: () => void;
    dates?: DatesInterface;
};
 
export type DataGridFooterProps = PaginationProps & {
    loading: boolean | undefined; 
    pageSize?: number, 
    setPageSize?: (size: number) => void;
}

export type DataGridRowEditActionsProps = {
    id: string | number;
    isEditMode: boolean;
    handleSaveClick: (arg: string | number) => void;
    handleCancelClick: (arg: string | number) => void;
    handleEditClick: (arg: string | number) => void;
    handleDeleteClick: (arg: string | number) => void;
};

export type DataGridActionsProps = {
    onEdit?: () => void;
    onDelete?: () => void;
    onOptions?: () => void;
    actions?: Array<'edit' | 'delete' | 'options'>;
};

export type AllDataGridProps = DataGridProps & DataGridToolbarProps & {
   hideToolbar?: boolean;
   pageNo?: number;
   pageSize?: number;
   count?: number;
   setPageSize?: (size: number) => void;
   setPageNo?: (size: number) => void;
}