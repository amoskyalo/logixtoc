'use client';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useResponsiveness } from '@/hooks';

type PropsInterface = {
   headerName: string;
   subTitle: string;
};

const HeaderTypography = styled(Typography)(({ theme }) => ({
   color: theme.palette.mode === 'dark' ? '' : 'rgba(0, 0, 0, 0.7)',
}));

const PageHeader = ({ headerName, subTitle }: PropsInterface) => {
   const { isMobile } = useResponsiveness();

   return (
      <Box>
         <HeaderTypography variant={isMobile ? 'h5' : 'h4'}>{headerName}</HeaderTypography>
         <HeaderTypography fontWeight={600} variant={isMobile ? 'body2' : 'body1'}>
            {subTitle}
         </HeaderTypography>
      </Box>
   );
};

export default PageHeader;
