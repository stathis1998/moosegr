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
}) {
  const t = useTranslations();

  return (
    <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className={`space-y-8 ${reverse ? "lg:order-2" : ""}`}>
        <div className="space-y-5">
          <div className="bg-[#CCFBEF] rounded-full p-3 size-fit">{icon}</div>
          <div className="space-y-2">
            <h3 className="font-semibold text-2xl lg:text-3xl">{title}</h3>
            <p className="text-[#535862] lg:text-lg">{description}</p>
          </div>
        </div>
        <div className="space-y-6">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex gap-3">
                <div className="bg-[#CCFBEF] rounded-full p-1 size-fit">
                  <Check color="#0E9384" size={18} />
                </div>
                <span className="text-[#535862]">{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onSelectProject(projectValue)}
            className="inline-flex items-center gap-2 text-[#107569] font-semibold hover:text-[#0B6B5A] transition-colors"
          >
            {t.features.seeProjects}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <img src={image} alt={altImage} className="w-full" />
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
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 space-y-12 lg:space-y-24 scroll-mt-20"
    >
      <div className="space-y-4 lg:max-w-3xl lg:mx-auto">
        <header className="space-y-3 text-center">
          <h2 className="text-[#107569] font-semibold text-sm">
            {t.features.eyebrow}
          </h2>

          <h1 className="font-semibold text-3xl lg:text-4xl">
            {t.features.title}
          </h1>
        </header>
        <p className="text-[#535862] text-lg text-center">
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
