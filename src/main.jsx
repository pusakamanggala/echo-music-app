import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NowPlayingProvider } from "./context/NowPlayingProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NowPlayingProvider>
      <App />
    </NowPlayingProvider>
  </React.StrictMode>
);
