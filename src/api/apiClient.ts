'use client';

import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const user = typeof window !== 'undefined' && localStorage.getItem('user');
const { userToken, VendorID, UserID: addedBy } = user && JSON.parse(user) || {};

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
        config.params = { ...config.params, addedBy, VendorID };
    } else if (method?.toLowerCase() === 'post') {
        config.data = { ...config.data, addedBy, VendorID };
    }
    return config;
});
