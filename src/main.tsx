import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { LanguageProvider } from "@/context/LanguageProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { App } from "./App.tsx";
import { PrivacyPage } from "./components/PrivacyPage";

// Minimal path-based routing: the privacy policy keeps its historical
// /privacy.html URL (sitemap, external links, nginx) but renders from the
// same React bundle as the rest of the site.
const path = window.location.pathname;
const isPrivacy =
  path === "/privacy.html" || path.replace(/\/$/, "") === "/privacy";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        {isPrivacy ? <PrivacyPage /> : <App />}
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);
