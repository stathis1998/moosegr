import { MessageChatCircle } from "@untitledui/icons";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

export function ContactUs() {
  return (
    <section className="px-4 py-16 space-y-12">
      <div className="space-y-4">
        <header className="space-y-3">
          <h2 className="text-[#107569] font-semibold text-sm">Contact Us</h2>

          <h1 className="font-semibold text-3xl">Chat to our friendly team</h1>
        </header>
        <p className="text-[#535862] text-lg">
          We’d love to hear from you. Please fill out this form or shoot us an
          email.
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

      <div>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">
                <span>
                  First name <span className="text-[#079455]">*</span>
                </span>
              </FieldLabel>
              <Input
                id="firstName"
                autoComplete="off"
                placeholder="First name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">
                <span>
                  Last name <span className="text-[#079455]">*</span>
                </span>
              </FieldLabel>
              <Input id="lastName" autoComplete="off" placeholder="Last name" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">
                <span>
                  Email <span className="text-[#079455]">*</span>
                </span>
              </FieldLabel>
              <Input id="email" autoComplete="off" placeholder="Email" />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">
                <span>
                  Message <span className="text-[#079455]">*</span>
                </span>
              </FieldLabel>
              <Textarea
                id="message"
                autoComplete="off"
                placeholder="Leave us a message..."
                className="min-h-32"
              />
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="privacy" />
              <FieldLabel htmlFor="privacy">
                You agree to our friendly{" "}
                <a href="#" className="underline">
                  privacy policy
                </a>
                .
              </FieldLabel>
            </Field>
            <Button className="w-full bg-[#0E9384] hover:bg-[#0B6B5A]">
              Send message
            </Button>
          </FieldGroup>
        </FieldSet>
      </div>
    </section>
  );
}
