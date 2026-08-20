import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { LanguageContext, type Language } from "@/context/language-context";

const STORAGE_KEY = "language";

// Home and the privacy page are separate documents, so the choice must
// survive a full page load. Prerendering always snapshots the EN default.
function initialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "el") return "ΕΛ";
  } catch {
    // Storage unavailable (private mode etc.) — fall back to the default.
  }
  return "EN";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  // Keep <html lang> in sync so screen readers pick the right pronunciation.
  useEffect(() => {
    document.documentElement.lang = language === "EN" ? "en" : "el";
    try {
      localStorage.setItem(STORAGE_KEY, language === "EN" ? "en" : "el");
    } catch {
      // Storage unavailable — the choice just won't persist.
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "EN" ? "ΕΛ" : "EN"));
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, toggleLanguage],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}
