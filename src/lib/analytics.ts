/**
 * Type-safe wrapper around the Google gtag.js snippet loaded in
 * Base.astro (GA4 + Google Ads). Every call no-ops safely when gtag is
 * missing — ad blockers, or the server-side prerender pass — so analytics
 * can never break the page.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type LeadMethod = "contact_form" | "email" | "phone";

interface LeadUserData {
  email?: string;
}

/**
 * Reports a lead to GA4 as the recommended `generate_lead` event. `method`
 * distinguishes how the visitor reached out so a single key event can be
 * segmented in reports (form submit vs. email/phone click).
 *
 * Pass `userData` when the visitor's own details are known (form submits):
 * the Google tag hashes them client-side and sends them with the conversion
 * for enhanced conversions. Email/phone *clicks* carry no visitor data, so
 * those leads are tracked without it.
 */
export function trackLead(method: LeadMethod, userData?: LeadUserData): void {
  // Enhanced conversions: user_data must be set before the conversion event
  // fires. gtag normalizes and SHA-256 hashes the value before transmission.
  const email = userData?.email?.trim().toLowerCase();
  if (email) {
    window.gtag?.("set", "user_data", { email });
  }

  window.gtag?.("event", "generate_lead", { method });

  // Google Ads conversion. All lead methods share the "Submit lead form"
  // action for now — split into per-method actions once they exist in Ads.
  window.gtag?.("event", "conversion", {
    send_to: "AW-18369329164/ywsSCMTzotscEIzwlrdE",
    value: 1.0,
    currency: "EUR",
  });
}
