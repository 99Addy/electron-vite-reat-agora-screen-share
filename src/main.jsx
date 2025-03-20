import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import VideoCalling from "./components/video-component.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VideoCalling />
  </StrictMode>
);
