import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      Hello Word
    </StrictMode>,
  );
}
