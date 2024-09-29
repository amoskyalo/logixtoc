'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
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
                <HeaderTypography variant={isMobile ? 'h5' : 'h4'}>{headerName}</HeaderTypography>
                {backURL && (
                    <Button
                        onClick={() => router.push(backURL)}
                        endIcon={<IoReturnUpBack />}
                        sx={{ maxHeight: 30, textTransform: 'capitalize', ml: 3 }}
                        size="small"
                        variant="outlined"
                    >
                        Back
                    </Button>
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
