import { Button } from "./ui/button";
import { scrollToContact } from "@/lib/contact";

export function CTASection() {
  return (
    <section className="px-4 lg:px-8 py-16 lg:py-24 bg-[#E9EAEB]">
      <div className="w-full max-w-7xl mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="space-y-2">
          <h2 className="text-[#181D27] font-semibold text-2xl lg:text-3xl">
            Let’s Talk
          </h2>
          <p className="text-[#535862]">
            Finding the best solution for you is our priority.
          </p>
        </div>
        <div className="space-y-2 lg:space-y-0 lg:flex lg:gap-3 lg:shrink-0">
          <Button
            onClick={scrollToContact}
            className="bg-[#0E9384] w-full lg:w-auto lg:px-5 hover:bg-[#0B6B5A]"
          >
            Get a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
