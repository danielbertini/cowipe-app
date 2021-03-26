import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import CustomThemeProvider from "./context/Theme";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "./store/store";

import App from "./App";
import "./i18n";

ReactDOM.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <CssBaseline />
      <SnackbarProvider
        autoHideDuration={3000}
        maxSnack={6}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <App />
      </SnackbarProvider>
    </CustomThemeProvider>
  </Provider>,
  document.getElementById("root")
);
