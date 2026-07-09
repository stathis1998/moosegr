import { useEffect, useState } from "react";

import { Menu01, MessageChatCircle, Phone, XClose } from "@untitledui/icons";

import backgroundHeroImageMobile from "@/assets/hero-image-mobile.jpg";
import backgroundHeroImageDesktop from "@/assets/hero-image-desktop.jpg";

import logo from "@/assets/Logo wrap.svg";
import logoGreen from "@/assets/green-Logo.svg";

import { Button } from "@/components/ui/button";
// import { useLanguage } from "@/context/language-context";
import { scrollToContact } from "@/lib/contact";
import { useTranslations } from "@/lib/i18n";
import { menuLinks } from "./constants/menu";

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { language, toggleLanguage } = useLanguage();
  const t = useTranslations();

  // Close on Escape and lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const goToSection = (id: string) => {
    setMenuOpen(false);
    // Defer so the body scroll-lock is released before we scroll.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <section className="relative h-200">
      <img
        className="absolute inset-0 w-full h-full object-cover lg:hidden"
        src={backgroundHeroImageMobile}
        alt="background-hero-image-mobile"
      />
      <img
        className="absolute inset-0 w-full h-full object-cover hidden lg:block"
        src={backgroundHeroImageDesktop}
        alt="background-hero-image-desktop"
      />
      <div className="relative z-10 flex flex-col h-full">
        <nav className="w-full max-w-7xl mx-auto h-20 pl-4 pr-3 lg:px-8 flex items-center justify-between gap-2">
          <img src={logo} alt="logo" />
          <div className="hidden lg:flex items-center gap-8 text-[#99F6E0] font-semibold text-base leading-6">
            {menuLinks.map((id) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className="hover:text-white transition-colors"
              >
                {t.nav[id]}
              </button>
            ))}
            {/* <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`${t.nav.switchLanguage} ${language}`}
              className="ml-4 hover:text-white transition-colors"
            >
              {language}
            </button> */}
          </div>

          <button
            type="button"
            aria-label={t.nav.openMenu}
            onClick={() => setMenuOpen(true)}
            className="p-2 lg:hidden"
          >
            <Menu01 color="white" />
          </button>
        </nav>
        <div className="flex-1 flex items-start pt-24">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-8 pt-16 lg:pt-0 px-4 lg:px-8">
            <div className="flex flex-col gap-4 lg:gap-6 max-w-4xl">
              <h1 className="text-white font-semibold text-4xl leading-24 tracking-[-0.02em] lg:text-6xl xl:text-7xl">
                {t.hero.title}
              </h1>
            </div>
            <div className="text-[#99F6E0] text-lg leading-7 lg:text-xl mx-auto">
              {t.hero.subtitleBefore}
              <span className="whitespace-nowrap">
                {t.hero.subtitleHighlight}
              </span>
              {t.hero.subtitleAfter}
            </div>
            <div className="w-full lg:w-auto pt-4">
              <Button
                asChild
                className="w-full lg:w-auto bg-white font-semibold text-[#494855] shadow-xs py-3 lg:px-6 hover:bg-gray-200"
              >
                <a href="#contact" onClick={scrollToContact}>
                  {t.hero.cta}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="bg-white pb-8 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="h-20 pl-4 pr-3 flex items-center justify-between">
              <img src={logoGreen} alt="logo" />
              <button
                type="button"
                aria-label={t.nav.closeMenu}
                onClick={() => setMenuOpen(false)}
                className="p-2"
              >
                <XClose color="#181D27" />
              </button>
            </div>

            <nav className="flex flex-col items-start gap-6 px-4 pt-4">
              {menuLinks.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => goToSection(id)}
                  className="font-semibold text-2xl text-[#181D27] hover:text-[#0E9384] transition-colors"
                >
                  {t.nav[id]}
                </button>
              ))}
            </nav>

            <div className="px-4 py-6">
              <div className="border-t border-[#E9EAEB]" />
            </div>

            <div className="flex flex-col gap-4 px-6">
              <a
                href="mailto:stathopoulos.stathis98@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="bg-[#CCFBEF] rounded-full p-1.5 size-fit shrink-0">
                  <MessageChatCircle color="#0E9384" size={16} />
                </div>
                <span className="text-[#0E9384] font-semibold text-sm break-all">
                  stathopoulos.stathis98@gmail.com
                </span>
              </a>
              <a
                href="tel:+306980310555"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="bg-[#CCFBEF] rounded-full p-1.5 size-fit shrink-0">
                  <Phone color="#0E9384" size={16} />
                </div>
                <span className="text-[#0E9384] font-semibold text-sm">
                  +30 698 031 0555
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
