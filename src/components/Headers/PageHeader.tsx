'use client';

import { Box, Stack, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useResponsiveness } from '@/hooks';
import { IoReturnUpBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

type PropsInterface = {
    headerName: string;
    subTitle?: string;
    backURL?: string;
};

const HeaderTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '' : 'rgba(0, 0, 0, 0.7)',
}));

const PageHeader = ({ headerName, subTitle, backURL }: PropsInterface) => {
    const { isMobile } = useResponsiveness();
    const router = useRouter();

    return (
        <Box>
            <Stack alignItems={'center'} direction={'row'} rowGap={8}>
                <HeaderTypography variant={'h5'}>{headerName}</HeaderTypography>
                {backURL && (
                    <Chip
                        onClick={() => router.push(backURL)}
                        sx={{ maxHeight: 30, textTransform: 'capitalize', ml: 2 }}
                        size="small"
                        variant="outlined"
                        color="primary"
                        label="Back"
                        onDelete={() => router.push(backURL)}
                        deleteIcon={<IoReturnUpBack />}
                    />
                )}
            </Stack>
            {subTitle && (
                <HeaderTypography fontWeight={600} variant={isMobile ? 'body2' : 'body1'}>
                    {subTitle}
                </HeaderTypography>
            )}
        </Box>
    );
};

export default PageHeader;
