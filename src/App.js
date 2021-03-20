import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import StoreProvider from "./context/Provider";
import SocketProvider from "./context/SocketProvider";
import RoutesPrivate from "./routes/Private";

// dashboard
import Dashboard from "./pages/Dashboard";

// auth
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import PasswordRecover from "./pages/Auth/PasswordRecover";

// external
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <StoreProvider>
        <SocketProvider token={"teste"}>
          <Switch>
            <RoutesPrivate path="/dashboard" component={Dashboard} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/password-recover" component={PasswordRecover} />
            <Route path="/" component={Home} />
          </Switch>
        </SocketProvider>
      </StoreProvider>
    </Router>
  );
};

export default App;
