import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </StrictMode>,
  );
}
