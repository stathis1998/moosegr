import logo from "@/assets/Logo wrap.svg";

import { useTranslations } from "@/lib/i18n";
import { menuLinks } from "./constants/menu";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-[#115E59] px-4 lg:px-8 py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="space-y-12 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <img src={logo} alt="Moose Software Solutions" />

          <nav className="flex flex-wrap gap-8 lg:gap-8 text-base font-semibold text-[#99F6E0]">
            {menuLinks.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="hover:text-[#5FE9D0] transition-colors"
              >
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <p className="text-base font-normal text-[#5FE9D0]">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
