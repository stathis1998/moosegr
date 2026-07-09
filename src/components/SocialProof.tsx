import odeaoLabsLogo from "@/assets/logos/odeaolabs.svg";
import kintsugiLogo from "@/assets/logos/kintsugi.svg";
import stackedLogo from "@/assets/logos/stackedlab.svg";
import mangoliaLogo from "@/assets/logos/magnolia.svg";
import warpspeedLogo from "@/assets/logos/warpspeed.svg";
import sisyphusLogo from "@/assets/logos/sisyphus.svg";

const logoClass =
  "grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100";

export function SocialProof() {
  return (
    <section className="bg-[#E9EAEB] py-16 lg:py-20 px-4 lg:px-8">
      <div className="w-full max-w-7xl mx-auto space-y-8 lg:space-y-12">
        <h2 className="text-[#535862] text-lg font-medium text-center">
          Join the businesses that trusted us.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8 place-items-center">
          <img src={odeaoLabsLogo} alt="Odeao Labs" className={logoClass} />
          <img src={kintsugiLogo} alt="Kintsugi" className={logoClass} />
          <img src={stackedLogo} alt="Stacked Lab" className={logoClass} />
          <img src={mangoliaLogo} alt="Mangolia" className={logoClass} />
          <img src={warpspeedLogo} alt="Warpspeed" className={logoClass} />
          <img src={sisyphusLogo} alt="Sisyphus" className={logoClass} />
        </div>
      </div>
    </section>
  );
}
