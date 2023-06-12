import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LoginProvider } from "./Context/LoginProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <App />
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
