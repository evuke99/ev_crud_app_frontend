import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./Context/UserContext";
import { ItemContextProvider } from "./Context/ItemContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
