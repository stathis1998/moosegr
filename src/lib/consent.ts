/**
 * Cookie-consent state shared between the banner and the Consent Mode
 * bootstrap in Base.astro. The stored value is read by the inline head
 * script on every page load, so the key and values must stay in sync
 * with it. Consent updates go through the gtag() helper; GTM picks them
 * up from the shared dataLayer and applies them to every tag it manages.
 */

import "@/lib/analytics";

const STORAGE_KEY = "cookie-consent";

export type ConsentChoice = "granted" | "denied";

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Private mode / blocked storage: the choice still applies this visit.
  }

  window.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}
