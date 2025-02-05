import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Application } from "./Application";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Application />
    </StrictMode>,
  );
}
