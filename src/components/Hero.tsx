import { useEffect, useState } from "react";

import { Menu01, MessageChatCircle, Phone, XClose } from "@untitledui/icons";

import backgroundHeroImageMobile from "@/assets/hero-image-mobile.jpg";
import backgroundHeroImageDesktop from "@/assets/hero-image-desktop.jpg";
import logo from "@/assets/Logo wrap.svg";
import logoGreen from "@/assets/green-Logo.svg";

import { Button } from "@/components/ui/button";
import { scrollToContact } from "@/lib/contact";

const menuLinks = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Tech Stack", id: "tech" },
  { label: "Featured Work", id: "work" },
  { label: "Contact Us", id: "contact" },
];

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#tech" className="hover:text-white transition-colors">
              Tech Stack
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="p-2 lg:hidden"
          >
            <Menu01 color="white" />
          </button>
        </nav>
        <div className="flex-1 flex items-start lg:items-center">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-8 pt-16 lg:pt-0 px-4 lg:px-8">
            <div className="flex flex-col gap-4 lg:gap-6 max-w-4xl">
              <h1 className="text-white font-semibold text-4xl leading-11 tracking-[-0.02em] lg:text-6xl xl:text-7xl lg:leading-[1.05]">
                Custom Software Solutions that Scale
              </h1>
              <div className="text-[#99F6E0] text-lg leading-7 lg:text-xl lg:max-w-2xl mx-auto">
                We build high-performance web apps,{" "}
                <span className="whitespace-nowrap">e-shops</span>, and CRMs for
                forward-thinking companies.
              </div>
            </div>
            <div className="w-full lg:w-auto">
              <Button
                asChild
                className="w-full lg:w-auto bg-white font-semibold text-[#494855] shadow-xs py-3 lg:px-6 hover:bg-gray-200"
              >
                <a href="#contact" onClick={scrollToContact}>
                  Get a Free Consultation
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
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="p-2"
              >
                <XClose color="#181D27" />
              </button>
            </div>

            <nav className="flex flex-col items-start gap-6 px-4 pt-4">
              {menuLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  className="font-semibold text-2xl text-[#181D27] hover:text-[#0E9384] transition-colors"
                >
                  {link.label}
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
