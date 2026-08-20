import iconstormLogo from "@/assets/iconstorm-logo.svg";
import kyklomaLogo from "@/assets/kykloma-logo.svg";
import primeNavLogo from "@/assets/prime-nav-logo.svg";
import vetLogo from "@/assets/vet-logo.svg";
import fantasiaLogo from "@/assets/fantasia-logo.webp";

import { getTranslations, type Locale } from "@/lib/i18n";
import { useCyclingHighlight } from "@/lib/useCyclingHighlight";

const logos = [
  { src: iconstormLogo.src, alt: "Iconstorm" },
  { src: kyklomaLogo.src, alt: "Kykloma" },
  { src: primeNavLogo.src, alt: "Prime Nav" },
  { src: vetLogo.src, alt: "Vet" },
  { src: fantasiaLogo.src, alt: "Fantasia" },
];

const HIGHLIGHT_DURATION_MS = 2000;

const logoClass =
  "h-10 lg:h-12 w-auto max-w-full object-contain transition duration-500 hover:grayscale-0 hover:opacity-100";

export function SocialProof({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const activeIndex = useCyclingHighlight(logos.length, HIGHLIGHT_DURATION_MS);

  return (
    <section className="bg-surface-muted py-16 lg:py-20 px-4 lg:px-8">
      <div className="w-full max-w-7xl mx-auto space-y-8 lg:space-y-12">
        <h2 className="text-body text-lg font-medium text-center">
          {t.socialProof.title}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8 lg:gap-8">
          {logos.map((logo, index) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className={`${logoClass} ${
                index === activeIndex
                  ? "grayscale-0 opacity-100"
                  : "grayscale opacity-70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
