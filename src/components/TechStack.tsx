import figmaLogo from "@/assets/logos/figma.svg";
import typescriptLogo from "@/assets/logos/typescript.svg";
import reactLogo from "@/assets/logos/react.svg";
import nextJSLogo from "@/assets/logos/nextjs.svg";
import viteJSLogo from "@/assets/logos/vitejs.svg";
import tailwindLogo from "@/assets/logos/tailwindcss.svg";
import nodejsLogo from "@/assets/logos/node_js.svg";
import pythonLogo from "@/assets/logos/python.svg";
import postgreSQLLogo from "@/assets/logos/postgresql.svg";
import shopifyLogo from "@/assets/logos/shopify.svg";
import dockerLogo from "@/assets/logos/docker.svg";
import githubLogo from "@/assets/logos/github.svg";
import awsLogo from "@/assets/logos/aws.svg";
import stripeLogo from "@/assets/logos/stripe_simple.svg";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/lib/i18n";
import { useCyclingHighlight } from "@/lib/useCyclingHighlight";

const logos = [
  { src: figmaLogo, alt: "Figma" },
  { src: typescriptLogo, alt: "TypeScript" },
  { src: reactLogo, alt: "React" },
  { src: nextJSLogo, alt: "Next.js" },
  { src: viteJSLogo, alt: "Vite.js" },
  { src: tailwindLogo, alt: "Tailwind CSS" },
  { src: nodejsLogo, alt: "Node.js" },
  { src: pythonLogo, alt: "Python" },
  { src: postgreSQLLogo, alt: "PostgreSQL" },
  { src: shopifyLogo, alt: "Shopify" },
  { src: dockerLogo, alt: "Docker" },
  { src: githubLogo, alt: "GitHub" },
  { src: awsLogo, alt: "AWS" },
  { src: stripeLogo, alt: "Stripe" },
];

const HIGHLIGHT_DURATION_MS = 2000;

const logoClass =
  "size-[88px] object-contain border border-gray-200 rounded-[12px] p-3 transition duration-500 hover:grayscale-0 hover:opacity-100";

export function TechStack() {
  const t = useTranslations();
  const activeIndex = useCyclingHighlight(logos.length, HIGHLIGHT_DURATION_MS);

  return (
    <section
      id="tech"
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 space-y-12"
    >
      <div className="space-y-4 lg:max-w-3xl lg:mx-auto">
        <SectionHeader
          eyebrow={t.tech.eyebrow}
          title={t.tech.title}
          align="center"
        />
        <p className="text-body text-lg text-center">{t.tech.description}</p>
      </div>

      <div className="grid grid-cols-[repeat(3,88px)] sm:grid-cols-[repeat(5,88px)] lg:grid-cols-[repeat(7,88px)] justify-center gap-8">
        {logos.map((logo, index) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={88}
            height={88}
            loading="lazy"
            className={`${logoClass} ${
              index === activeIndex
                ? "grayscale-0 opacity-100"
                : "grayscale opacity-70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
