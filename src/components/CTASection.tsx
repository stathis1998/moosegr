import { Button } from "./ui/button";
import { scrollToContact } from "@/lib/contact";
import { useTranslations } from "@/lib/i18n";

export function CTASection() {
  const t = useTranslations();

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
          <Button
            onClick={scrollToContact}
            className="bg-brand w-full lg:w-auto lg:px-5 hover:bg-brand-hover"
          >
            {t.cta.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
