'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import utils from '@/utils';
import { DateType } from 'react-tailwindcss-datepicker';

export const useSetSearchParams = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isDefaultFilter, isDefaultPagination, isDefaltDate } = utils;

    const setParams = (params: Record<string, string | null | undefined | number | DateType>) => {
        const p = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value && !isDefaultFilter(value) && !isDefaultPagination(key, value) && !isDefaltDate(key, value)) {
                p.set(key, String(value));
            } else {
                p.delete(key);
            }
        });

        router.push(`?${p.toString()}`);
    };

    return setParams;
};
