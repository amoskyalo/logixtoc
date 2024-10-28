import { axiosPrivate, urls } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { snackbarToast } from '@/components/Snackbar';

export interface FetchParams {
    PageSize?: number;
    PageNO?: number;
    StartDate?: string;
    EndDate?: string;
}
export interface Response<Data> {
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
    PageNO: number;
    TotalPages: number;
    Data: Data[];
}

export const useFetch = <T, U>(url: keyof typeof urls, params?: U & FetchParams) => {
    // T is the response interface;
    // U is the additional params interface ( can be undefined also );

    const queryKey = [url, params ? JSON.stringify(params) : null];

    return useQuery<Response<T>>({
        queryKey,
        queryFn: async () => {
            try {
                const response = await axiosPrivate.get(urls[url], { params });
                return response.data;
            } catch (error: any) {
                if (error?.message === 'Network Error') {
                    snackbarToast.error('Ooops! No internet connection.');
                } else {
                    snackbarToast.error(error?.message);
                }
            }
        },
    });
};
