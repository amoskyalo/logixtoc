export type DatesInterface = {
    startDate: string;
    endDate: string;
};

export type TablesPropsInterface<R> = {
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
    dates?: {
        startDate: string;
        endDate: string;
    };
};

export type FormsPropsInterface = {
    open: boolean;
    onClose: () => void;
    refetch: () => void;
};