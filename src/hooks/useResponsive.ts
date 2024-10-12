import { useMediaQuery } from '@mui/material';

export const useResponsiveness = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const isMiniTablet = useMediaQuery('(max-width:768px)');
    const isTablet = useMediaQuery('(max-width:1024px)');
    const isLaptop = useMediaQuery('(max-width:1440px)');
    const isDesktop = useMediaQuery('(min-width:1440px)');

    return { isMobile, isMiniTablet, isTablet, isLaptop, isDesktop };
};
