import React from "react";
import ReactDOM from "react-dom";
import StateContextProvider from "./stateHandling/contexts/StateContext";
import AuthContextProvider from "./stateHandling/contexts/AuthContext";
import App from "./App";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
