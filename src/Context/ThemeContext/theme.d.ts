import { PaletteOptions, Palette, PaletteColorOptions, PaletteColor } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
    interface Palette {
        primaryGray: PaletteColor;
    }
    interface PaletteOptions {
        primaryGray?: PaletteColorOptions;
    }
}
