import { useState, type SyntheticEvent } from "react";

import { MessageChatCircle } from "@untitledui/icons";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const WEB3FORMS_ACCESS_KEY = "bee09bdb-369c-4d61-8d96-89edc7e78f75";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactUs() {
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!agreed) {
      setStatus("error");
      setFeedback("Please agree to our privacy policy before submitting.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New contact request from the website");
    formData.append(
      "name",
      `${formData.get("firstName") ?? ""} ${formData.get("lastName") ?? ""}`.trim(),
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFeedback(
          "Thanks for reaching out! Your message has been sent — we'll get back to you shortly.",
        );
        form.reset();
        setAgreed(false);
      } else {
        setStatus("error");
        setFeedback(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Couldn't reach the server. Please try again or email us directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 scroll-mt-20"
    >
      <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <header className="space-y-3">
              <h2 className="text-[#107569] font-semibold text-sm">
                Contact Us
              </h2>

              <h1 className="font-semibold text-3xl lg:text-4xl">
                Chat to our friendly team
              </h1>
            </header>
            <p className="text-[#535862] text-lg">
              We’d love to hear from you. Please fill out this form or shoot us
              an email.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex gap-4">
              <div className="bg-[#CCFBEF] rounded-full p-2 size-fit">
                <MessageChatCircle color="#0E9384" size={18} />
              </div>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-[#535862]">
                    Our friendly team is here to help.
                  </p>
                </div>
                <a
                  href="mailto:stathopoulos.stathis98@gmail.com"
                  className="text-[#0E9384] font-semibold"
                >
                  stathopoulos.stathis98@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#CCFBEF] rounded-full p-2 size-fit">
                <MessageChatCircle color="#0E9384" size={18} />
              </div>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-[#535862]">Mon-Fri from 8am to 5pm.</p>
                </div>
                <a
                  href="tel:+306980310555"
                  className="text-[#0E9384] font-semibold"
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
          className="lg:bg-[#FAFAFA] lg:rounded-2xl lg:p-8"
        >
          <FieldSet>
            <FieldGroup>
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
                <Field>
                  <FieldLabel htmlFor="firstName">
                    <span className="font-medium">
                      First name <span className="text-[#079455]">*</span>
                    </span>
                  </FieldLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    placeholder="First name"
                    className="bg-white"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">
                    <span className="font-medium">
                      Last name <span className="text-[#079455]">*</span>
                    </span>
                  </FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    placeholder="Last name"
                    className="bg-white"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">
                  <span className="font-medium">
                    Email <span className="text-[#079455]">*</span>
                  </span>
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email"
                  className="bg-white"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="message">
                  <span className="font-medium">
                    Message <span className="text-[#079455]">*</span>
                  </span>
                </FieldLabel>
                <Textarea
                  id="message"
                  name="message"
                  required
                  autoComplete="off"
                  placeholder="Leave us a message..."
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
                  You agree to our friendly{" "}
                  <a href="#" className="underline">
                    privacy policy
                  </a>
                  .
                </FieldLabel>
              </Field>
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#0E9384] hover:bg-[#0B6B5A]"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </Button>
              {feedback && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm font-medium ${
                    status === "success" ? "text-[#079455]" : "text-red-600"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </section>
  );
}
