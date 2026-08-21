/**
 * Thin wrapper around the Google Tag Manager dataLayer created in
 * Base.astro. GA4 and Google Ads are configured inside the GTM container
 * (GTM-T4JVVFKQ), so this module only pushes events — the tags, triggers
 * and conversion labels live in GTM. Every call no-ops safely when the
 * dataLayer is missing — ad blockers, or the server-side prerender pass —
 * so analytics can never break the page.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    /** Consent Mode helper defined in Base.astro; only used for consent updates. */
    gtag?: (...args: unknown[]) => void;
  }
}

type LeadMethod = "contact_form" | "email" | "phone";

interface LeadUserData {
  email?: string;
}

/**
 * Reports a lead by pushing a `generate_lead` event to the dataLayer.
 * `lead_method` distinguishes how the visitor reached out so a single key
 * event can be segmented in reports (form submit vs. email/phone click).
 *
 * GTM wiring (custom-event trigger `generate_lead`):
 *   - GA4 event tag `generate_lead` with parameter `method` = {{lead_method}}.
 *   - Google Ads conversion tag AW-18369329164 / ywsSCMTzotscEIzwlrdE
 *     (value 1, EUR), with enhanced conversions reading {{user_data}}.
 *
 * Pass `userData` when the visitor's own details are known (form submits):
 * the Ads tag hashes them client-side and sends them with the conversion
 * for enhanced conversions. Email/phone *clicks* carry no visitor data, so
 * `user_data` is explicitly reset to keep a stale value from an earlier
 * form submit out of later events.
 */
export function trackLead(method: LeadMethod, userData?: LeadUserData): void {
  const email = userData?.email?.trim().toLowerCase();

  window.dataLayer?.push({
    event: "generate_lead",
    lead_method: method,
    user_data: email ? { email } : undefined,
  });
}
