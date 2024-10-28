import { useState } from 'react';
import { urls } from '@/api';
import { useMutate } from './useMutate';
import utils from '@/utils';

interface Args<T> {
    deleteKey: keyof typeof urls;
    initialDeleteParams: T;
    refetch?: () => void;
}

export const useGridDelete = <T>(args: Args<T>) => {
    const { deleteKey, initialDeleteParams, refetch } = args;
    const { mutateOptions } = utils;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteParams, setDeleteParams] = useState<T>(initialDeleteParams);

    const { mutate } = useMutate<T>(deleteKey);

    const onClose = () => {
        setOpen(false);
        setDeleteParams(initialDeleteParams);
    };

    const handleDelete = () => {
        setLoading(true);

        mutate(deleteParams, mutateOptions({ refetch, setLoading, onClose }));
    };

    return {
        loading,
        open,
        deleteParams,
        setLoading,
        setOpen,
        setDeleteParams,
        handleDelete,
        onClose,
    };
};
