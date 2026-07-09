import iconstormLogo from "@/assets/iconstorm-logo.svg";
import kyklomaLogo from "@/assets/kykloma-logo.svg";
import primeNavLogo from "@/assets/prime-nav-logo.svg";
import vetLogo from "@/assets/vet-logo.svg";
import fantasiaLogo from "@/assets/fantasia-logo.svg";

const logoClass =
  "h-12 w-auto max-w-full object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100";

export function SocialProof() {
  return (
    <section className="bg-[#E9EAEB] py-16 lg:py-20 px-4 lg:px-8">
      <div className="w-full max-w-7xl mx-auto space-y-8 lg:space-y-12">
        <h2 className="text-[#535862] text-lg font-medium text-center">
          Join the businesses that trusted us.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
          <img src={iconstormLogo} alt="Iconstorm" className={logoClass} />
          <img src={kyklomaLogo} alt="Kykloma" className={logoClass} />
          <img src={primeNavLogo} alt="Prime Nav" className={logoClass} />
          <img src={vetLogo} alt="Vet" className={logoClass} />
          <img src={fantasiaLogo} alt="Fantasia" className={logoClass} />
        </div>
      </div>
    </section>
  );
}
