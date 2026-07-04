import { Menu01 } from "@untitledui/icons";

import backgroundHeroImageMobile from "@/assets/hero-image-mobile.jpg";
import logo from "@/assets/Logo wrap.svg";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-svh">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={backgroundHeroImageMobile}
        alt="background-hero-image-mobile"
      />
      <div className="relative z-10">
        <nav className="h-20 pl-4 pr-3 flex items-center gap-2 justify-between">
          <img src={logo} alt="logo" />
          <div className="p-2">
            <Menu01 color="white" />
          </div>
        </nav>
        <div className="flex flex-col gap-8 pt-16 px-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-semibold text-4xl leading-11 tracking-[-0.02em]">
              Custom Software Solutions that Scale
            </h1>
            <div className="text-[#99F6E0] text-lg leading-7">
              We build high-performance web apps,{" "}
              <span className="whitespace-nowrap">e-shops</span>, and CRMs for
              forward-thinking companies.
            </div>
          </div>
          <div>
            <Button className="w-full bg-white font-semibold text-[#494855] shadow-xs py-3">
              Get a Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
