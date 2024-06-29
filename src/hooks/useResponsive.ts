import { useMediaQuery } from "@mui/material";

export const useResponsiveness = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:900px)');
    const isDesktop = useMediaQuery('(max-width:1200px)');

    return {
        isMobile,
        isTablet,
        isDesktop
    }
};