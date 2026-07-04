import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import primeNav from "@/assets/prime-nav.jpg";
import veterinary from "@/assets/Macbook Pro mockup.png";
import eshopPhone from "@/assets/eshop-phone.png";

export function Work() {
  return (
    <section className="px-4 py-16 space-y-12">
      <div className="space-y-4">
        <header className="space-y-3">
          <h2 className="text-[#107569] font-semibold text-sm">
            Featured Work
          </h2>

          <h1 className="font-semibold text-3xl">
            Engineering Solutions for Every Industry
          </h1>
        </header>
        <p className="text-[#535862] text-lg">
          We don't just write code; we build scalable software that solves real
          business bottlenecks. Here is a look at some of our recent
          partnerships.
        </p>
      </div>
      <div>
        <Accordion type="single" collapsible defaultValue="ecommerce">
          <AccordionItem value="ecommerce">
            <AccordionTrigger className="font-semibold text-lg">
              Retail E-commerce
            </AccordionTrigger>
            <AccordionContent className="text-[#535862] h-auto">
              <div className="mb-2">
                We transformed a clunky, underperforming legacy website into a
                seamless, highly-customized Shopify experience. To eliminate
                their biggest operational bottleneck, we engineered proprietary
                software to automate their massive bulk product uploads, saving
                the client hundreds of hours of manual data entry.
              </div>
              <img src={eshopPhone} alt="E-commerce Website" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="veterinary">
            <AccordionTrigger className="font-semibold text-lg">
              Veterinary Medical CRM
            </AccordionTrigger>
            <AccordionContent className="text-[#535862] h-auto">
              <div className="mb-2">
                Designed and developed a secure, centralized management system
                currently utilized by veterinary clinics across Athens. The
                portal allows medical professionals to seamlessly upload, track,
                and manage complex diagnostic results and patient files in
                real-time.
              </div>
              <img src={veterinary} alt="Veterinary Medical CRM" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger className="font-semibold text-lg">
              PrimeNav Maritime Platform
            </AccordionTrigger>
            <AccordionContent className="text-[#535862] h-auto">
              <div className="mb-2">
                Partnering with an enterprise Java backend team, we engineered
                the complex frontend architecture for a global maritime
                logistics application. The web app provides an intuitive
                interface for tracking international shipping routes, cargo
                manifests, and real-time weather data.
              </div>
              <img src={primeNav} alt="PrimeNav Maritime Platform" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
