import { useLanguage } from "@/context/language-context";
import translations from "@/locales/translations.json";

/** English is the source of truth for the shape every locale must satisfy. */
export type Translations = typeof translations.en;

// The annotation on `el` turns a missing or misspelled Greek key into a build error.
const en: Translations = translations.en;
const el: Translations = translations.el;

export function useTranslations(): Translations {
  const { language } = useLanguage();
  return language === "EN" ? en : el;
}
