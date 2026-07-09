import { useState } from "react";

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
  const [activeProject, setActiveProject] = useState("shipping");

  const selectProject = (value: string) => {
    setActiveProject(value);
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-360 mx-auto bg-white">
      <Hero />
      <SocialProof />
      <Features onSelectProject={selectProject} />
      <Metrics />
      <TechStack />
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
        <Separator className="data-horizontal:h-0.5 bg-[#15B79E]" />
      </div>
      <Work value={activeProject} onValueChange={setActiveProject} />
      <CTASection />
      <ContactUs />
      <Footer />
    </div>
  );
}
