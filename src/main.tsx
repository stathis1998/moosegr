import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { LanguageProvider } from "@/context/LanguageProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);
