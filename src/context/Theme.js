import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import getTheme from "./ThemeBase";
import { SnackbarProvider } from "notistack";

export const CustomThemeContext = React.createContext({
  currentTheme: "dark",
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  const { children } = props;
  const currentTheme = localStorage.getItem("appTheme") || "dark";
  const [themeName, _setThemeName] = useState(currentTheme);
  const theme = getTheme(themeName);
  const useStyles = makeStyles(() => ({
    success: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: `${theme.palette.success.main}!important`,
    },
    info: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: `${theme.palette.info.main}!important`,
    },
    error: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: `${theme.palette.error.main}!important`,
    },
    warning: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      color: "#fff",
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: `${theme.palette.warning.main}!important`,
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
          // preventDuplicate
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
