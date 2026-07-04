import odeaoLabsLogo from "@/assets/logos/odeaolabs.svg";
import kintsugiLogo from "@/assets/logos/kintsugi.svg";
import stackedLogo from "@/assets/logos/stackedlab.svg";
import mangoliaLogo from "@/assets/logos/magnolia.svg";
import warpspeedLogo from "@/assets/logos/warpspeed.svg";
import sisyphusLogo from "@/assets/logos/sisyphus.svg";

export function SocialProof() {
  return (
    <section className="bg-[#E9EAEB] space-y-8 py-16 px-4">
      <h2 className="text-[#535862] text-lg font-medium text-center">
        Join the businesses that trusted us.
      </h2>

      <div className="grid grid-cols-2 gap-4 place-items-center">
        <img src={odeaoLabsLogo} alt="Odeao Labs" />
        <img src={kintsugiLogo} alt="Kintsugi" />
        <img src={stackedLogo} alt="Stacked Lab" />
        <img src={mangoliaLogo} alt="Mangolia" />
        <img src={warpspeedLogo} alt="Warpspeed" />
        <img src={sisyphusLogo} alt="Sisyphus" />
      </div>
    </section>
  );
}
