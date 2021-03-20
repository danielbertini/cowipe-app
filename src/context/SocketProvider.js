import React, { useContext } from "react";
import SocketContext from "./SocketContext";
import socketIOClient from "socket.io-client";
import StoreContext from "./Context";

const SocketProvider = ({ children }) => {
  const { token } = useContext(StoreContext);
  var socket = token
    ? socketIOClient(process.env.REACT_APP_WS, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: "Infinity",
        path: process.env.REACT_APP_WS_PATH,
        query: {
          token: token,
        },
      })
    : null;

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
