'use client';

import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { urls } from '.';
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

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const user = typeof window !== 'undefined' && localStorage.getItem('user');
const userToken = user && JSON.parse(user).UserToken;
const addedBy = user && JSON.parse(user).UserID;
const VendorID = user && JSON.parse(user).VendorID;

export const queryClient = new QueryClient();

export const axiosPrivate = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${userToken}`,
    },
});

axiosPrivate.interceptors.request.use((config) => {
    const { method } = config;

    if (method?.toLowerCase() === 'get') {
        config.params = {
            ...config.params,
            addedBy,
            VendorID,
        };
    } else if (method?.toLowerCase() === 'post') {
        config.data = {
            ...config.data,
            addedBy,
            VendorID,
        };
    }
    return config;
});

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

export const useMutate = <T>(url: keyof typeof urls | undefined | null) => {
    // T here is the interface of the data we are sending to the API;

    return useMutation({
        mutationFn: async (data: T) => {
            try {
                if (url) {
                    const response = await axiosPrivate.post(urls[url], data);
                    return response;
                }
            } catch (error: any) {
                snackbarToast.error(error?.message);
            }
        },
    });
};
