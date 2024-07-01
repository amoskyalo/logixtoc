"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: { main: "#10333f" },
      secondary: { main: "#c1e547" },
      background: { default: "#F3F4F6" },
      primaryGray: { main: "#F3F4F6" },
    },
    typography: {
      fontFamily: ["Quicksand", "sans-serif"].join(","),
      fontWeightRegular: "500",
      subtitle1: {
        fontWeight: "700",
        fontSize: 18,
      },
      h6: {
        fontWeight: "700",
        fontSize: 20,
      },
      h4: {
        fontWeight: "700",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        }
      }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { ThemeWrapper };
