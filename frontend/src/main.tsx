// main.tsx
import React from "react";
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider defaultColorScheme="light" withCssVariables>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
