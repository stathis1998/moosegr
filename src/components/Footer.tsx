import logo from "@/assets/Logo wrap.svg";

import {
  getTranslations,
  localePrefix,
  privacyPath,
  type Locale,
} from "@/lib/i18n";
import { menuLinks } from "./constants/menu";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-sm";

export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const prefix = localePrefix(locale);

  return (
    <footer className="bg-brand-dark px-4 lg:px-8 py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="space-y-12 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <img src={logo.src} alt="Moose Software Solutions" />

          <nav className="flex flex-wrap gap-8 lg:gap-8 text-base font-semibold text-brand-200">
            {menuLinks.map((id) => (
              <a
                key={id}
                href={`${prefix}/#${id}`}
                className={`hover:text-brand-300 transition-colors ${focusRing}`}
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <p className="text-base font-normal text-brand-300">
            {t.footer.copyright}
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between text-sm text-brand-300">
          <a
            href={privacyPath(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-white transition-colors ${focusRing}`}
          >
            {t.footer.privacy}
          </a>
          <span className="text-brand-300/80">
            MOOSE SOFTWARE SOLUTIONS Ε.Ε. · ΑΦΜ EL803018698 · Λεωφ. Κηφισίας 44,
            Μαρούσι 151 25
          </span>
        </div>
      </div>
    </footer>
  );
}
