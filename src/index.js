import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContextWrapper } from "./context/auth.context";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <AppContextWrapper>
    <App />
  </AppContextWrapper> 
  </BrowserRouter>
</React.StrictMode>,
  document.getElementById("root")
);
