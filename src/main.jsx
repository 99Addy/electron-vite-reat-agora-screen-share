import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ScreenShareApp from "./components/ScreenShareApp";
import { AgoraProvider } from "./context/AgoraContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AgoraProvider>
      <ScreenShareApp />
    </AgoraProvider>
  </StrictMode>
);
