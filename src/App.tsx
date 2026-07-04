import { Separator } from "@/components/ui/separator";

import { SocialProof } from "@/components/SocialProof";
import { Features } from "@/components/Features";
import { Metrics } from "@/components/Metrics";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Work } from "@/components/Work";
import { CTASection } from "@/components/CTASection";
import { ContactUs } from "./components/ContactUs";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Features />
      <Metrics />
      <TechStack />
      <div className="px-4">
        <Separator className="data-horizontal:h-0.5 bg-[#15B79E]" />
      </div>
      <Work />
      <CTASection />
      <ContactUs />
      <Footer />
    </>
  );
}
