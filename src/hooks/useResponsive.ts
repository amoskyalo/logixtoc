import { useMediaQuery } from "@mui/material";

export const useResponsiveness = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:768px)');
    const isDesktop = useMediaQuery('(max-width:1024px)');

    return { isMobile, isTablet, isDesktop }
};