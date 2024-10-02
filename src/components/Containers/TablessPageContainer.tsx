import React from 'react';
import { PageHeader } from '../Headers';
import { Stack } from '@mui/material';

type Props = {
    headerName: string;
    subTitle?: string;
    backURL?: string;
    children: React.ReactNode;
};

const TablessContainer = ({ headerName, subTitle, backURL, children }: Props) => {
    return (
        <Stack spacing={3}>
            <PageHeader headerName={headerName} subTitle={subTitle} backURL={backURL} />
            {children}
        </Stack>
    );
};

export default TablessContainer;
