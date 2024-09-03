'use client';

import axios from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { urls } from '.';
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
    return useQuery<Response<T>>({
        queryKey: [url, ...Object.keys(params ?? {})],
        queryFn: async () => {
            try {
                const response = await axiosPrivate.get(urls[url], { params });
                return response.data;
            } catch (error) {
                console.log(error);
            }
        },
    });
};

export const useMutate = <PostData>(url: keyof typeof urls) => {
    return useMutation({
        mutationFn: async (data: PostData) => {
            try {
                const response = await axiosPrivate.post(urls[url], data);
                return response;
            } catch (error) {
                console.log(`Failed to post data: ${error}`);
            }
        },
    });
};
