import {
  ArrowRight,
  Check,
  CodeBrowser,
  ShoppingBag02,
  Users01,
} from "@untitledui/icons";

import womanOnScreen from "@/assets/woman-on-screen.jpg";
import shopifyLaptop from "@/assets/shopify-laptop.jpg";
import womanCoffee from "@/assets/woman-coffee.jpg";

import { SectionHeader } from "@/components/SectionHeader";
import { useTranslations } from "@/lib/i18n";

function FeatureItem({
  title,
  description,
  items,
  icon,
  image,
  altImage,
  projectValue,
  onSelectProject,
  reverse = false,
  className = "",
}: {
  title: string;
  description: string;
  items: string[];
  image: string;
  altImage: string;
  icon: React.ReactNode;
  projectValue: string;
  onSelectProject: (value: string) => void;
  reverse?: boolean;
  className?: string;
}) {
  const t = useTranslations();

  return (
    <div
      className={`space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:items-center md:gap-16 ${className}`}
    >
      <div
        className={`space-y-8 px-4 ${reverse ? "md:order-2 md:pl-10 md:pr-32" : "md:pl-32 md:pr-10"}`}
      >
        <div className="space-y-5">
          <div className="bg-brand-100 rounded-full p-3 size-fit">{icon}</div>
          <div className="space-y-2">
            <h3 className="font-semibold text-2xl lg:text-3xl">{title}</h3>
            <p className="text-body lg:text-lg">{description}</p>
          </div>
        </div>
        <div className="space-y-6 pl-4">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex gap-3">
                <div className="bg-brand-100 rounded-full p-1 size-fit">
                  <Check color="#0E9384" size={18} />
                </div>
                <span className="text-body">{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onSelectProject(projectValue)}
            className="inline-flex items-center gap-2 text-brand-strong font-semibold hover:text-brand-hover transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            {t.features.seeProjects}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className={`${reverse ? "md:order-1" : ""} p-4 md:p-0`}>
        <img src={image} alt={altImage} loading="lazy" className="w-full" />
      </div>
    </div>
  );
}

export function Features({
  onSelectProject,
}: {
  onSelectProject: (value: string) => void;
}) {
  const t = useTranslations();

  return (
    <section
      id="services"
      className="w-full py-16 lg:py-24 space-y-12 lg:space-y-24"
    >
      <div className="px-4 space-y-4 lg:max-w-3xl lg:mx-auto">
        <SectionHeader
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          align="center"
        />
        <p className="text-body text-lg text-center">
          {t.features.description}
        </p>
      </div>

      <FeatureItem
        title={t.features.web.title}
        description={t.features.web.description}
        items={t.features.web.items}
        image={womanOnScreen}
        altImage={t.features.web.imageAlt}
        icon={<CodeBrowser color="#0E9384" />}
        projectValue="shipping"
        onSelectProject={onSelectProject}
      />

      <FeatureItem
        title={t.features.eshop.title}
        description={t.features.eshop.description}
        items={t.features.eshop.items}
        image={shopifyLaptop}
        altImage={t.features.eshop.imageAlt}
        icon={<ShoppingBag02 color="#0E9384" />}
        projectValue="ecommerce"
        onSelectProject={onSelectProject}
        reverse
      />

      <FeatureItem
        title={t.features.crm.title}
        description={t.features.crm.description}
        items={t.features.crm.items}
        image={womanCoffee}
        altImage={t.features.crm.imageAlt}
        icon={<Users01 color="#0E9384" />}
        projectValue="veterinary"
        onSelectProject={onSelectProject}
      />
    </section>
  );
}
