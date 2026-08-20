import { useEffect } from "react";

import logoGreen from "@/assets/green-Logo.svg";

import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/language-context";
import { useTranslations } from "@/lib/i18n";
import { menuLinks } from "./constants/menu";

const navFocus =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand";

function PolicySection({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h2 className="text-ink font-semibold text-2xl mt-10 mb-4">{title}</h2>
      <p className="mb-4.5 leading-7">{body}</p>
    </>
  );
}

export function PrivacyPage() {
  const { language, toggleLanguage } = useLanguage();
  const t = useTranslations();

  // The SPA shell ships the homepage head; swap in this page's metadata so
  // both the prerendered privacy.html and the live tab carry the right tags.
  useEffect(() => {
    document.title = t.privacy.metaTitle;
    const set = (selector: string, content: string) =>
      document.querySelector(selector)?.setAttribute("content", content);
    set('meta[name="description"]', t.privacy.metaDescription);
    set('meta[property="og:title"]', t.privacy.metaTitle);
    set('meta[property="og:description"]', t.privacy.metaDescription);
    set('meta[property="og:url"]', "https://moose.gr/privacy.html");
    set('meta[name="twitter:title"]', t.privacy.metaTitle);
    set('meta[name="twitter:description"]', t.privacy.metaDescription);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", "https://moose.gr/privacy.html");
  }, [t]);

  return (
    <div className="max-w-360 mx-auto bg-white">
      <header>
        <div className="w-full max-w-7xl mx-auto h-20 px-4 lg:px-8 flex items-center justify-between gap-2">
          <a
            href="/"
            aria-label="Moose Software Solutions — Home"
            className={navFocus}
          >
            <img src={logoGreen} alt="Moose Software Solutions" />
          </a>
          <div className="flex items-center gap-8 text-base font-semibold text-label">
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center gap-8"
            >
              {menuLinks.map((id) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  className={`hover:text-brand transition-colors ${navFocus}`}
                >
                  {t.nav[id]}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`${t.nav.switchLanguage} ${language}`}
              className={`hover:text-brand transition-colors ${navFocus}`}
            >
              {language}
            </button>
          </div>
        </div>
      </header>

      <main
        id="privacy-policy"
        className="px-4 lg:px-8 pt-16 pb-24 lg:pt-24 text-body"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand font-semibold mb-3">{t.privacy.eyebrow}</p>
          <h1 className="text-ink font-semibold text-4xl lg:text-5xl tracking-[-0.02em] mb-6">
            {t.privacy.title}
          </h1>
          <p className="text-lg leading-7 lg:text-xl lg:leading-8">
            {t.privacy.leadBefore}
            <strong className="font-semibold">{t.privacy.leadCompany}</strong>
            {t.privacy.leadAfter}
          </p>
        </div>

        <div className="max-w-[45rem] mx-auto mt-16 lg:mt-24">
          <PolicySection {...t.privacy.collect} />
          <PolicySection {...t.privacy.use} />
          <PolicySection {...t.privacy.share} />

          <h2 className="text-ink font-semibold text-2xl mt-10 mb-4">
            {t.privacy.cookies.title}
          </h2>
          <p className="mb-4.5 leading-7">
            {t.privacy.cookies.p1Before}
            <strong className="font-semibold">
              {t.privacy.cookies.p1Strong}
            </strong>
            {t.privacy.cookies.p1After}
          </p>
          <p className="mb-4.5 leading-7">{t.privacy.cookies.p2}</p>

          <PolicySection {...t.privacy.retention} />
          <PolicySection {...t.privacy.security} />
          <PolicySection {...t.privacy.rights} />

          <h2 className="text-ink font-semibold text-2xl mt-10 mb-4">
            {t.privacy.contact.title}
          </h2>
          <p className="mb-4.5 leading-7">{t.privacy.contact.intro}</p>
          <ol className="list-decimal pl-6 leading-7">
            <li className="mb-3">
              {t.privacy.contact.emailBefore}
              <a
                href="mailto:info@moose.gr"
                className="text-brand-strong underline underline-offset-[3px] transition-colors hover:text-brand-dark"
              >
                info@moose.gr
              </a>
              {t.privacy.contact.emailAfter}
            </li>
            <li className="mb-3">{t.privacy.contact.mail}</li>
            <li className="mb-3">{t.privacy.contact.response}</li>
          </ol>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
