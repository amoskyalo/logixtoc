'use client';

import { UserInterface } from '@/api';

export const useGetUser = (): UserInterface => {
    const user = typeof window !== 'undefined' && localStorage.getItem('user');

    return user ? JSON.parse(user) : {};
};
