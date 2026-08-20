import translations from "@/locales/translations.json";

/**
 * The language is fixed per page at build time: `/` renders English and
 * `/el/` renders Greek. Components receive the locale as a prop instead of
 * reading a client-side context, so every section can be rendered to static
 * HTML by Astro.
 */
export type Locale = "en" | "el";

/** English is the source of truth for the shape every locale must satisfy. */
export type Translations = typeof translations.en;

// The annotation on `el` turns a missing or misspelled Greek key into a build error.
const en: Translations = translations.en;
const el: Translations = translations.el;

export function getTranslations(locale: Locale): Translations {
  return locale === "el" ? el : en;
}

/** Site-root-relative URL prefix for a locale's pages: "" for en, "/el" for el. */
export function localePrefix(locale: Locale): string {
  return locale === "el" ? "/el" : "";
}

/** Home URL for a locale ("/" or "/el/"). */
export function homePath(locale: Locale): string {
  return locale === "el" ? "/el/" : "/";
}

/** Privacy-policy URL for a locale (keeps the historical /privacy.html name). */
export function privacyPath(locale: Locale): string {
  return `${localePrefix(locale)}/privacy.html`;
}

/** The other locale — used by the language-switch link in the nav. */
export function otherLocale(locale: Locale): Locale {
  return locale === "el" ? "en" : "el";
}

/** Label shown on the language-switch control (mirrors the old toggle text). */
export function localeLabel(locale: Locale): string {
  return locale === "el" ? "ΕΛ" : "EN";
}
