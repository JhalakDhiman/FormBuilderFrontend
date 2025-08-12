import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FormContextProvider } from "./context/FormContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FormContextProvider>
      <UserContextProvider>
        <App />
      <Toaster/>
      </UserContextProvider>
    </FormContextProvider>
  </BrowserRouter>
);
