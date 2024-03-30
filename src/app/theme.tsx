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
        },
        h2: {
            fontSize: "24px",
            fontWeight: "600"
        },
        h3: {
            fontSize: "20px",
            fontWeight: "600"
        },
        h4: {
            fontSize: "16px",
            fontWeight: "600"
        },
        h5: {
            fontSize: "14px",
            fontWeight: "600"
        },
        h6: {
            fontSize: "12px",
            fontWeight: "600"
        },
        body1: {
            fontSize: "14px"
        },
        body2: {
            fontSize: "12px"
        }
        
    }
});

export default theme;