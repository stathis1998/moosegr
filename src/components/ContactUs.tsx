import { useState, type SyntheticEvent } from "react";

import { MessageChatCircle, Phone } from "@untitledui/icons";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations, type Translations } from "@/lib/i18n";
import { useLanguage } from "@/context/language-context";
import { trackLead } from "@/lib/analytics";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Feedback is held as a translation key rather than a resolved string, so a
 * language toggle re-renders the message in the new language.
 */
type Feedback = { key: keyof Translations["contact"]["status"] } | null;

export function ContactUs() {
  const t = useTranslations();
  const { language } = useLanguage();
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState<Feedback>(null);

  const feedbackText = feedback ? t.contact.status[feedback.key] : "";

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!agreed) {
      setStatus("error");
      setFeedback({ key: "privacyRequired" });
      return;
    }

    setStatus("submitting");
    setFeedback(null);

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(formData.get("firstName") ?? ""),
          lastName: String(formData.get("lastName") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
          website: String(formData.get("website") ?? ""), // honeypot
          lang: language === "EN" ? "en" : "el",
        }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFeedback({ key: "success" });
        form.reset();
        setAgreed(false);
        trackLead("contact_form", {
          email: String(formData.get("email") ?? ""),
        });
      } else {
        setStatus("error");
        setFeedback({ key: "genericError" });
      }
    } catch {
      setStatus("error");
      setFeedback({ key: "networkError" });
    }
  };

  return (
    <section
      id="contact"
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24"
    >
      <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-16 md:items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <SectionHeader
              eyebrow={t.contact.eyebrow}
              title={t.contact.title}
            />
            <p className="text-body text-lg">{t.contact.description}</p>
          </div>

          <div className="space-y-10">
            <div className="flex gap-4">
              <div className="bg-brand-100 rounded-full p-2 size-fit">
                <MessageChatCircle color="#0E9384" size={18} />
              </div>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    {t.contact.emailTitle}
                  </h3>
                  <p className="text-body">{t.contact.emailDescription}</p>
                </div>
                <a
                  href="mailto:info@moose.gr"
                  onClick={() => trackLead("email")}
                  className="text-brand font-semibold"
                >
                  info@moose.gr
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-100 rounded-full p-2 size-fit">
                <Phone color="#0E9384" size={18} />
              </div>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    {t.contact.phoneTitle}
                  </h3>
                  <p className="text-body">{t.contact.phoneDescription}</p>
                </div>
                <a
                  href="tel:+306980310555"
                  onClick={() => trackLead("phone")}
                  className="text-brand font-semibold"
                >
                  +30 698 031 0555
                </a>
              </div>
            </div>
          </div>
        </div>

        <form
          id="contact-form"
          onSubmit={onSubmit}
          className="scroll-mt-4 md:bg-surface md:rounded-2xl md:p-8"
        >
          {/* Honeypot: humans never see it; bots that fill it are dropped
              server-side. Clipped rather than display:none, which some
              bots detect. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
          />
          <FieldSet>
            <FieldGroup>
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
                <Field>
                  <FieldLabel htmlFor="firstName">
                    <span className="font-medium">
                      {t.contact.form.firstName}{" "}
                      <span className="text-success">*</span>
                    </span>
                  </FieldLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    placeholder={t.contact.form.firstName}
                    className="bg-white"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">
                    <span className="font-medium">
                      {t.contact.form.lastName}{" "}
                      <span className="text-success">*</span>
                    </span>
                  </FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    placeholder={t.contact.form.lastName}
                    className="bg-white"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">
                  <span className="font-medium">
                    {t.contact.form.email}{" "}
                    <span className="text-success">*</span>
                  </span>
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t.contact.form.email}
                  className="bg-white"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="message">
                  <span className="font-medium">
                    {t.contact.form.message}{" "}
                    <span className="text-success">*</span>
                  </span>
                </FieldLabel>
                <Textarea
                  id="message"
                  name="message"
                  required
                  autoComplete="off"
                  placeholder={t.contact.form.messagePlaceholder}
                  className="min-h-32 bg-white"
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="privacy"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                />
                <FieldLabel htmlFor="privacy">
                  {t.contact.form.privacyBefore}
                  <a
                    href="/privacy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {t.contact.form.privacyLink}
                  </a>
                  {t.contact.form.privacyAfter}
                </FieldLabel>
              </Field>
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-brand hover:bg-brand-hover"
              >
                {status === "submitting"
                  ? t.contact.form.submitting
                  : t.contact.form.submit}
              </Button>
              {feedbackText && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm font-medium ${
                    status === "success" ? "text-success" : "text-red-600"
                  }`}
                >
                  {feedbackText}
                </p>
              )}
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </section>
  );
}
