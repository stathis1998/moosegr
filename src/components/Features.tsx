import { Check, CodeBrowser } from "@untitledui/icons";

import womanOnScreen from "@/assets/woman-on-screen.jpg";
import shopifyLaptop from "@/assets/shopify-laptop.jpg";
import womanCoffee from "@/assets/woman-coffee.jpg";

function FeatureItem({
  title,
  description,
  items,
  icon,
  image,
  altImage,
}: {
  title: string;
  description: string;
  items: string[];
  image: string;
  altImage: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-10">
      <div className="space-y-8">
        <div className="space-y-5">
          <div className="bg-[#CCFBEF] rounded-full p-3 size-fit">{icon}</div>
          <div className="space-y-2">
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-[#535862]">{description}</p>
          </div>
        </div>
        <div>
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
        </div>
      </div>
      <div>
        <img src={image} alt={altImage} />
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="px-4 space-y-12 py-16">
      <div className="space-y-4">
        <header className="space-y-3 text-center">
          <h2 className="text-[#107569] font-semibold text-sm">
            Core Services
          </h2>

          <h1 className="font-semibold text-3xl">What We Build For You</h1>
        </header>
        <p className="text-[#535862] text-lg text-center">
          We translate your business challenges into intuitive, scalable
          software solutions designed to drive your growth.
        </p>
      </div>

      <FeatureItem
        title="Web Applications"
        description="Empower your business with lightning-fast, scalable web apps built just for you."
        items={[
          "Intuitive, user-centric interfaces",
          "Optimized for maximum performance",
          "Custom features engineered for your workflows",
        ]}
        image={womanOnScreen}
        altImage="woman-on-screen"
        icon={<CodeBrowser color="#0E9384" />}
      />

      <FeatureItem
        title="Custom E-shops"
        description="Turn visitors into loyal customers. With Shopify, we build seamless, high-converting e-commerce experiences tailored to your brand."
        items={[
          "Custom theme development and seamless API integrations",
          "Frictionless, high-converting checkout flows",
          "Easy-to-manage inventory and admin dashboards",
        ]}
        image={shopifyLaptop}
        altImage="shopify-laptop"
        icon={<CodeBrowser color="#0E9384" />}
      />

      <FeatureItem
        title="Tailored CRMs"
        description="Ditch rigid software. Automate your daily operations with a CRM mapped perfectly to your needs."
        items={[
          "Automated routing aligned with your actual processes",
          "Centralized, secure customer data hubs",
          "Zero bloatware or unnecessary features",
        ]}
        image={womanCoffee}
        altImage="woman-coffee"
        icon={<CodeBrowser color="#0E9384" />}
      />
    </section>
  );
}
