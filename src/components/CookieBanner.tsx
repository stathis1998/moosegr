import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n";
import {
  getStoredConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/consent";

export function CookieBanner() {
  const t = useTranslations();
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.cookies.title}
      className="fixed inset-x-0 bottom-0 z-50 p-4 lg:p-6"
    >
      <div className="mx-auto max-w-3xl bg-brand-dark text-white shadow-2xl ring-1 ring-white/10 p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="font-semibold">{t.cookies.title}</p>
            <p className="text-sm text-brand-300">
              {t.cookies.description}{" "}
              <a
                href="/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                {t.cookies.privacyLink}
              </a>
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white"
              onClick={() => choose("denied")}
            >
              {t.cookies.decline}
            </Button>
            <Button size="sm" onClick={() => choose("granted")}>
              {t.cookies.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
