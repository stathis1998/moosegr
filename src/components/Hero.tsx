import { useRef, useState } from "react";

import { Menu01, MessageChatCircle, Phone, XClose } from "@untitledui/icons";
import { Dialog } from "radix-ui";

import heroDesktopWebp from "@/assets/hero-image-desktop.webp";
import heroDesktopJpg from "@/assets/hero-image-desktop.jpg";
import heroMobileWebp from "@/assets/hero-image-mobile.webp";
import heroMobileJpg from "@/assets/hero-image-mobile.jpg";

import logo from "@/assets/Logo wrap.svg";
import logoGreen from "@/assets/green-Logo.svg";

import { Button } from "@/components/ui/button";
import { trackLead } from "@/lib/analytics";
import { getTranslations, localeLabel, type Locale } from "@/lib/i18n";
import { menuLinks } from "./constants/menu";

const navFocus =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white";

export function Hero({
  locale,
  switchHref,
}: {
  locale: Locale;
  switchHref: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = getTranslations(locale);
  const language = localeLabel(locale);

  const pendingSection = useRef<string | null>(null);

  const goToSection = (id: string) => {
    if (menuOpen) {
      // Scroll in onCloseAutoFocus, once the dialog's scroll-lock is released.
      pendingSection.current = id;
      setMenuOpen(false);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-200">
      {/* Only one source is fetched per viewport (unlike two toggled <img>s). */}
      <picture>
        <source
          media="(min-width:1024px)"
          type="image/webp"
          srcSet={heroDesktopWebp.src}
        />
        <source media="(min-width:1024px)" srcSet={heroDesktopJpg.src} />
        <source type="image/webp" srcSet={heroMobileWebp.src} />
        <img
          src={heroMobileJpg.src}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <div className="relative z-10 flex flex-col h-full">
        <nav className="w-full max-w-7xl mx-auto h-20 pl-4 pr-3 lg:px-8 flex items-center justify-between gap-2">
          <img src={logo.src} alt="Moose Software Solutions" />
          <div className="hidden md:flex items-center gap-8 text-brand-200 font-semibold text-base leading-6">
            {menuLinks.map((id) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className={`hover:text-white transition-colors ${navFocus}`}
              >
                {t.nav[id]}
              </button>
            ))}
            <a
              href={switchHref}
              aria-label={`${t.nav.switchLanguage} ${language}`}
              className={`ml-4 hover:text-white transition-colors ${navFocus}`}
            >
              {language}
            </a>
          </div>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label={t.nav.openMenu}
                className="p-2 md:hidden"
              >
                <Menu01 color="white" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20 md:hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
              <Dialog.Content
                aria-describedby={undefined}
                onCloseAutoFocus={(event) => {
                  const id = pendingSection.current;
                  if (!id) return;
                  pendingSection.current = null;
                  // Keep focus from returning to the trigger at the top of
                  // the page, which would scroll the viewport back up.
                  event.preventDefault();
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="fixed inset-x-0 top-0 z-50 bg-white pb-8 shadow-xl md:hidden outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-top-4 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-4"
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="h-20 pl-4 pr-3 flex items-center justify-between">
                  <img src={logoGreen.src} alt="Moose Software Solutions" />
                  <div className="flex items-center gap-2">
                    <a
                      href={switchHref}
                      aria-label={`${t.nav.switchLanguage} ${language}`}
                      className="p-2 font-semibold text-ink hover:text-brand transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {language}
                    </a>
                    <Dialog.Close
                      aria-label={t.nav.closeMenu}
                      className="p-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <XClose color="#181D27" />
                    </Dialog.Close>
                  </div>
                </div>

                <nav className="flex flex-col items-start gap-6 px-4 pt-4">
                  {menuLinks.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => goToSection(id)}
                      className="font-semibold text-2xl text-ink hover:text-brand transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {t.nav[id]}
                    </button>
                  ))}
                </nav>

                <div className="px-4 py-6">
                  <div className="border-t border-surface-muted" />
                </div>

                <div className="flex flex-col gap-4 px-6">
                  <a
                    href="mailto:info@moose.gr"
                    onClick={() => {
                      trackLead("email");
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-brand-100 rounded-full p-1.5 size-fit shrink-0">
                      <MessageChatCircle color="#0E9384" size={18} />
                    </div>
                    <span className="text-brand font-semibold text-base break-all">
                      info@moose.gr
                    </span>
                  </a>
                  <a
                    href="tel:+306980310555"
                    onClick={() => {
                      trackLead("phone");
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-brand-100 rounded-full p-1.5 size-fit shrink-0">
                      <Phone color="#0E9384" size={18} />
                    </div>
                    <span className="text-brand font-semibold text-base">
                      +30 698 031 0555
                    </span>
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </nav>
        <div className="flex-1 flex items-start pt-8 lg:pt-24">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-start text-left lg:items-center lg:text-center gap-8 px-4 lg:px-8">
            <div className="flex flex-col gap-4 lg:gap-6 max-w-4xl">
              <h1 className="text-white font-semibold text-4xl leading-tight tracking-[-0.02em] lg:text-6xl xl:text-7xl">
                {t.hero.title}
              </h1>
            </div>
            <div className="text-brand-200 text-lg leading-7 lg:text-xl mx-auto">
              {t.hero.subtitleBefore}
              <span className="whitespace-nowrap">
                {t.hero.subtitleHighlight}
              </span>
              {t.hero.subtitleAfter}
            </div>
            <div className="w-full lg:w-auto pt-4">
              {/* Click behavior (focus + border flash) comes from the global
                  #contact handler in home-interactions.ts. */}
              <Button
                asChild
                className="cta-pulse w-full lg:w-auto bg-white font-semibold text-ink-muted shadow-xs py-3.5 lg:px-6 hover:bg-gray-200"
              >
                <a href="#contact">{t.hero.cta}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
