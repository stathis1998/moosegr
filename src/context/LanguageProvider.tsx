import { useCallback, useMemo, useState, type ReactNode } from "react";

import { LanguageContext, type Language } from "@/context/language-context";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "EN" ? "ΕΛ" : "EN"));
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, toggleLanguage],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}
