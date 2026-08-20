import { useSyncExternalStore, type ComponentProps } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import primeNav from "@/assets/prime-nav.jpg";
import veterinary from "@/assets/veterinary-mockup.jpg";
import eshopPhone from "@/assets/eshop-phone.webp";
import primeNavDesktop from "@/assets/prime-nav-desktop.jpg";
import retailStoreDesktop from "@/assets/retail-store-desktop.jpg";
import vetDesktop from "@/assets/vet-desktop.jpg";

import { SectionHeader } from "@/components/SectionHeader";
import { getTranslations, type Locale } from "@/lib/i18n";
import {
  getSelectedProject,
  selectProject,
  subscribeSelectedProject,
} from "@/lib/select-project";

/**
 * Copy lives in `translations.work.projects`, keyed by `value`.
 * `size` / `desktopSize` scale each image in percent (100 = default).
 */
const projectImages = [
  {
    value: "shipping",
    image: primeNav.src,
    desktopImage: primeNavDesktop.src,
    size: 100,
    desktopSize: 100,
  },
  {
    value: "ecommerce",
    image: eshopPhone.src,
    desktopImage: retailStoreDesktop.src,
    size: 100,
    desktopSize: 110,
  },
  {
    value: "veterinary",
    image: veterinary.src,
    desktopImage: vetDesktop.src,
    size: 100,
    desktopSize: 100,
  },
] as const;

function ProjectImage({
  size = 100,
  className,
  style,
  ...props
}: ComponentProps<"img"> & { size?: number }) {
  return (
    <img
      className={className}
      style={
        size !== 100 ? { ...style, transform: `scale(${size / 100})` } : style
      }
      {...props}
    />
  );
}

export function Work({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  // Selection lives in a window-level store (see select-project.ts) so the
  // static Features section can drive it; the snapshot read also picks up a
  // click that landed before this island hydrated.
  const value = useSyncExternalStore(
    subscribeSelectedProject,
    () => getSelectedProject() ?? "shipping",
    () => "shipping",
  );

  const projects = projectImages.map((project) => ({
    ...project,
    ...t.work.projects[project.value],
  }));

  const active =
    projects.find((project) => project.value === value) ?? projects[0];

  return (
    <section id="work" className="w-full space-y-12">
      <div className="space-y-4 md:max-w-7xl pt-24 mx-auto px-4 md:px-8">
        <div className="max-w-3xl space-y-4">
          <SectionHeader eyebrow={t.work.eyebrow} title={t.work.title} />
          <p className="text-body text-lg">{t.work.description}</p>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-16 md:items-start">
        <Accordion
          type="single"
          collapsible
          value={value}
          onValueChange={(next) => {
            // md+: sections never collapse — clicking only selects
            if (!next && window.matchMedia("(min-width: 768px)").matches) {
              return;
            }
            selectProject(next);
          }}
          className="px-4 md:pl-28 py-10"
        >
          {projects.map((project) => (
            <AccordionItem
              key={project.value}
              value={project.value}
              className={
                project.value === active.value
                  ? "md:border-l-brand-accent"
                  : undefined
              }
            >
              <AccordionTrigger className="font-semibold text-lg">
                {project.title}
              </AccordionTrigger>
              <div className="hidden md:block text-body pb-4">
                {project.description}
              </div>
              <AccordionContent className="text-body h-auto md:hidden">
                <div className="mb-6">{project.description}</div>
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  size={project.size}
                  className="w-full rounded-xl mx-auto object-contain object-center origin-center"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="hidden md:block md:self-stretch relative">
          {projects.map((project) => (
            <ProjectImage
              key={project.value}
              src={project.desktopImage}
              alt={project.title}
              size={project.desktopSize}
              className={`absolute inset-0 w-full h-full object-contain object-bottom-right origin-bottom-right ${
                project.value === active.value ? "" : "invisible"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
