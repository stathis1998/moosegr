import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section className="px-4 py-16 space-y-4 bg-[#E9EAEB]">
      <div className="space-y-2">
        <h2 className="text-[#181D27] font-semibold text-2xl">
          Start your free trial
        </h2>
        <p className="text-[#535862]">
          Join over 4,000+ startups already growing with Untitled.
        </p>
      </div>
      <div className="space-y-2">
        <Button className="bg-[#0E9384] w-full hover:bg-[#0B6B5A]">
          Get started
        </Button>
        <Button className="bg-white w-full text-black hover:bg-gray-100">
          Learn more
        </Button>
      </div>
    </section>
  );
}
