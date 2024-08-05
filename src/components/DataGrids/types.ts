export type PropsInterface<R> = {
    rows: R[],
    onAdd?: () => void;
    refetch?: () => void;
    isLoading: boolean;
    setDates?: any;
    dates?: {
        startDate: string;
        endDate: string;
    };
};

export type DatesInterface = {
    startDate: string;
    endDate: string;
 };
 
export type ToolbarProps = {
    setDates?: any;
    onAdd?: () => void;
    dates?: DatesInterface;
 };
 
 export type FooterProps = {
    pageNo?: number;
    pageSize?: number;
    count?: number;
    setPageSize?: () => void;
    setPageNo?: () => void;
 }
