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