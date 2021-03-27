import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import getTheme from "./ThemeBase";
import { SnackbarProvider } from "notistack";

export const CustomThemeContext = React.createContext({
  currentTheme: "normal",
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  const { children } = props;
  const currentTheme = localStorage.getItem("appTheme") || "normal";
  const [themeName, _setThemeName] = useState(currentTheme);
  const theme = getTheme(themeName);
  const useStyles = makeStyles(() => ({
    success: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize - 2,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.success.main,
    },
    info: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize - 2,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.info.main,
    },
    error: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize - 2,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.error.main,
    },
    warning: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize - 2,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.warning.main,
    },
    anchorOriginTopCenter: {
      left: "50% !important",
      transform: "translateX(-50%)",
      position: "fixed",
      top: 6,
      width: "max-content",
      "@media (max-width: 960px)": {
        maxWidth: "100%",
      },
    },
  }));
  const classes = useStyles();

  const setThemeName = (name) => {
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };
  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };
  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          autoHideDuration={3000}
          hideIconVariant
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          preventDuplicate
          classes={{
            variantInfo: classes.info,
            variantSuccess: classes.success,
            variantError: classes.error,
            variantWarning: classes.warning,
            anchorOriginTopCenter: classes.anchorOriginTopCenter,
          }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
