import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ScreenShareApp from "./components/ScreenShareApp copy.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScreenShareApp />
  </StrictMode>
);
