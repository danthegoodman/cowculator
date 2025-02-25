import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { MarketProvider } from "./context/MarketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <MarketProvider>
        <App />
      </MarketProvider>
    </MantineProvider>
  </React.StrictMode>
);
