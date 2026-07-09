import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import primeNav from "@/assets/prime-nav.jpg";
import veterinary from "@/assets/Macbook Pro mockup.png";
import eshopPhone from "@/assets/eshop-phone.png";

import { useTranslations } from "@/lib/i18n";

/** Copy lives in `translations.work.projects`, keyed by `value`. */
const projectImages = [
  { value: "shipping", image: primeNav },
  { value: "ecommerce", image: eshopPhone },
  { value: "veterinary", image: veterinary },
] as const;

export function Work({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  const t = useTranslations();

  const projects = projectImages.map((project) => ({
    ...project,
    ...t.work.projects[project.value],
  }));

  const active =
    projects.find((project) => project.value === value) ?? projects[0];

  return (
    <section
      id="work"
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 space-y-12 scroll-mt-20"
    >
      <div className="space-y-4 lg:max-w-3xl">
        <header className="space-y-3">
          <h2 className="text-[#107569] font-semibold text-sm">
            {t.work.eyebrow}
          </h2>

          <h1 className="font-semibold text-3xl lg:text-4xl">{t.work.title}</h1>
        </header>
        <p className="text-[#535862] text-lg">{t.work.description}</p>
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="lg:hidden"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="hidden lg:block lg:self-stretch relative">
          <img
            src={active.image}
            alt={active.title}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
