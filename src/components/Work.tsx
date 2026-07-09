import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import primeNav from "@/assets/prime-nav.jpg";
import veterinary from "@/assets/Macbook Pro mockup.png";
import eshopPhone from "@/assets/eshop-phone.png";

const projects = [
  {
    value: "shipping",
    title: "PrimeNav Maritime Platform",
    description:
      "Partnering with an enterprise Java backend team, we engineered the complex frontend architecture for a global maritime logistics application. The web app provides an intuitive interface for tracking international shipping routes, cargo manifests, and real-time weather data.",
    image: primeNav,
    alt: "PrimeNav Maritime Platform",
  },
  {
    value: "ecommerce",
    title: "Retail E-commerce",
    description:
      "We transformed a clunky, underperforming legacy website into a seamless, highly-customized Shopify experience. To eliminate their biggest operational bottleneck, we engineered proprietary software to automate their massive bulk product uploads, saving the client hundreds of hours of manual data entry.",
    image: eshopPhone,
    alt: "E-commerce Website",
  },
  {
    value: "veterinary",
    title: "Veterinary Medical CRM",
    description:
      "Designed and developed a secure, centralized management system currently utilized by veterinary clinics across Athens. The portal allows medical professionals to seamlessly upload, track, and manage complex diagnostic results and patient files in real-time.",
    image: veterinary,
    alt: "Veterinary Medical CRM",
  },
];

export function Work({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const active = projects.find((project) => project.value === value) ?? projects[0];

  return (
    <section
      id="work"
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 space-y-12 scroll-mt-20"
    >
      <div className="space-y-4 lg:max-w-3xl">
        <header className="space-y-3">
          <h2 className="text-[#107569] font-semibold text-sm">
            Featured Work
          </h2>

          <h1 className="font-semibold text-3xl lg:text-4xl">
            Engineering Solutions for Every Industry
          </h1>
        </header>
        <p className="text-[#535862] text-lg">
          We don't just write code; we build scalable software that solves real
          business bottlenecks. Here is a look at some of our recent
          partnerships.
        </p>
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        <Accordion
          type="single"
          collapsible
          value={value}
          onValueChange={onValueChange}
        >
          {projects.map((project) => (
            <AccordionItem key={project.value} value={project.value}>
              <AccordionTrigger className="font-semibold text-lg">
                {project.title}
              </AccordionTrigger>
              <AccordionContent className="text-[#535862] h-auto">
                <div className="mb-2">{project.description}</div>
                <img src={project.image} alt={project.alt} className="lg:hidden" />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="hidden lg:block lg:self-stretch relative">
          <img
            src={active.image}
            alt={active.alt}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
