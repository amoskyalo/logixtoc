import { DataGridProps } from '@mui/x-data-grid';
import { PaginationProps } from '@mui/material';
export interface DatesInterface {
    startDate: string;
    endDate: string;
}
export interface FilterOptionObject {
    [key: string]: string | number | any[];
}
export interface FiltersObject {
    title: string;
    valueKey: string;
    labelKey: string;
    filterOptions: FilterOptionObject[];
}

export type GridProps<R> = {
    rows: R[];
    count?: number;
    pageNo?: number;
    pageSize?: number;
    isLoading: boolean;
    dates?: DatesInterface;
    setDates?: any;
    onAdd?: () => void;
    refetch?: () => void;
    setPageSize?: (size: number) => void;
    setPageNo?: (size: number) => void;
};

export type DataGridToolbarProps = {
    dates?: DatesInterface;
    filters?: FiltersObject[];
    params?: any;
    onAdd?: () => void;
};

export type DataGridFooterProps = PaginationProps & {
    loading: boolean | undefined;
    pageSize?: number;
};

export type DataGridRowEditActionsProps = {
    id: string | number;
    isEditMode: boolean;
    handleSaveClick: (arg: string | number) => void;
    handleCancelClick: (arg: string | number) => void;
    handleEditClick: (arg: string | number) => void;
    handleDeleteClick: (arg: string | number) => void;
};

export type DataGridActionsProps = {
    actions?: Array<'edit' | 'delete' | 'options'>;
    onEdit?: () => void;
    onDelete?: () => void;
    onOptions?: (args: any) => void;
};

export type AllDataGridProps = DataGridProps & DataGridToolbarProps & {
   pageNo?: number;
   pageSize?: number;
   totalPages?: number;
   hideToolbar?: boolean;
   setPageSize?: (size: number) => void;
   setPageNo?: (size: number) => void;
}
