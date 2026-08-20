import { Button } from "./ui/button";
import { getTranslations, type Locale } from "@/lib/i18n";

export function CTASection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section className="px-4 lg:px-8 py-16 lg:py-24 bg-surface-muted">
      <div className="w-full max-w-7xl mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="space-y-2">
          <h2 className="text-ink font-semibold text-2xl lg:text-3xl">
            {t.cta.title}
          </h2>
          <p className="text-body">{t.cta.description}</p>
        </div>
        <div className="space-y-2 lg:space-y-0 lg:flex lg:gap-3 lg:shrink-0">
          {/* Rendered statically — click behavior (focus + border flash)
              comes from the global #contact handler in home-interactions.ts. */}
          <Button
            asChild
            className="cta-pulse cta-pulse-brand bg-brand w-full lg:w-auto lg:px-5 hover:bg-brand-hover"
          >
            <a href="#contact">{t.cta.button}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
