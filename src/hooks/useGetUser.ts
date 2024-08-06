'use client';

import { UserInterface } from "@/api/hooks";

export const useGetUser = (): UserInterface | {} => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : {};
    }
    return {}; 
}
