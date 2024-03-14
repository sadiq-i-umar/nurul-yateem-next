"use client";

import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: string;
      };
    }
    interface ThemeOptions {
      status?: {
        danger?: string;
      };
    }
  }

const theme = createTheme({
    palette: {
        primary: {
            main: "#268600"
        },
        text: {

            primary: "#07020D"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: "primary.main",
                    color: "#FFFFFF"
                }
            }
        }
    },
    typography: {
        fontFamily: "poppins",
        h1: {
            fontSize: "28px",
            fontWeight: "600"
        }
    }
});

export default theme;