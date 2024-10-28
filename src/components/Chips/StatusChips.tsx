import React from 'react';
import { Tooltip, Chip } from '@mui/material';
import utils from '@/utils';

export const StatusChips = ({ name, statusID }: Readonly<{ name: string; statusID: string | number }>) => {
    const { getStatusChipColor } = utils;

    return (
        <Tooltip title={name}>
            <Chip
                label={name}
                style={{
                    backgroundColor: getStatusChipColor(statusID),
                    borderColor: '#F2F2F2',
                    color: '#F2F2F2',
                }}
            />
        </Tooltip>
    );
};
