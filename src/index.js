import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import CustomThemeProvider from "./context/Theme";
import { Provider } from "react-redux";
import store from "./store/store";
import { registerServiceWorker } from './services/serviceWorker'

import App from "./App";
import "./i18n";

ReactDOM.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();