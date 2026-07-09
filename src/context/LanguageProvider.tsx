import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { LanguageContext, type Language } from "@/context/language-context";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  // Keep <html lang> in sync so screen readers pick the right pronunciation.
  useEffect(() => {
    document.documentElement.lang = language === "EN" ? "en" : "el";
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
