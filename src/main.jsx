import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NowPlayingProvider } from "./context/NowPlayingProvider.jsx";
import { SessionProvider } from "./context/SessionProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionProvider>
      <NowPlayingProvider>
        <App />
      </NowPlayingProvider>
    </SessionProvider>
  </React.StrictMode>
);
