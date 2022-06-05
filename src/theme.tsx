/** @jsxImportSource @emotion/react */
import { css, GlobalStyles, ThemeOptions, useTheme } from "@mui/material";

export const DarkThemeOptions: ThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  typography: {
    allVariants: {
      color: "#fff",
    },
    subtitle1: {
      opacity: 0.8,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#2F80ED",
    },
    error: {
      main: "#b53750",
    },
    secondary: {
      main: "#437aff",
    },
    background: {
      default: "#0c0c0e",
      paper: "#191920",
    },
    divider: "rgba(191,202,208,0.12)",
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#191920",
        },
      },
    },
  },
};
export const LightThemeOptions: ThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  typography: {
    allVariants: {
      color: "#000000e0",
    },
    subtitle1: {
      color: "#000000e0",
      opacity: 0.8,
    },
    subtitle2: {
      color: "#000000f0f",
      // opacity: 0.8,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#5F259F",
      contrastText: "#f5f5f5",
    },
    secondary: {
      main: "#437aff",
    },
    background: {
      default: "#fcfaff",
      paper: "#f1edf4",
    },
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
};

export function Globals() {
  const theme = useTheme();
  return (
    <GlobalStyles
      styles={css`
        body {
          background-color: ${theme.palette.background.default};
        }
      `}
    />
  );
}
