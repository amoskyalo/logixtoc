import { useTheme } from '@mui/material/styles';

export const useThemeMode = () => {
    const { palette: { mode } } = useTheme(); 

    const isDarkMode = mode === 'dark';
    const isLightMode = mode === 'light';

    return { isDarkMode, isLightMode, mode };
};