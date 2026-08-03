/**
 * Type-safe wrapper around the Google Analytics gtag.js snippet loaded in
 * index.html. Every call no-ops safely when gtag is missing — ad blockers,
 * or the server-side prerender pass — so analytics can never break the page.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type LeadMethod = "contact_form" | "email" | "phone";

/**
 * Reports a lead to GA4 as the recommended `generate_lead` event. `method`
 * distinguishes how the visitor reached out so a single key event can be
 * segmented in reports (form submit vs. email/phone click).
 */
export function trackLead(method: LeadMethod): void {
  window.gtag?.("event", "generate_lead", { method });
}
