'use client';

import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const user = typeof window !== 'undefined' && localStorage.getItem('user');
const userToken = user && JSON.parse(user).UserToken;

export const axiosPrivate = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${userToken}`,
    },
});

export const queryClient = new QueryClient();