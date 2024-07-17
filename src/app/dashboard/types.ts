export type DataGridProps<R> = {
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