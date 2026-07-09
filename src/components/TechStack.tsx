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

const logoClass =
  "h-8 w-auto sm:h-10 lg:h-12 border border-gray-200 rounded p-0.5 grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100";

export function TechStack() {
  return (
    <section
      id="tech"
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 space-y-12 scroll-mt-20"
    >
      <div className="space-y-4 lg:max-w-3xl lg:mx-auto">
        <header className="space-y-3 text-center">
          <h2 className="text-[#107569] font-semibold text-sm">Tech Stack</h2>

          <h1 className="font-semibold text-3xl lg:text-4xl">
            Powered by Modern Technology
          </h1>
        </header>
        <p className="text-[#535862] text-lg text-center">
          We build on enterprise-grade frameworks and infrastructure to ensure
          your software is secure, scalable, and blazing fast.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(7,auto)] justify-center gap-2 sm:gap-6 lg:gap-8">
        <img src={figmaLogo} alt="Figma" className={logoClass} />
        <img src={typescriptLogo} alt="TypeScript" className={logoClass} />
        <img src={reactLogo} alt="React" className={logoClass} />
        <img src={nextJSLogo} alt="Next.js" className={logoClass} />
        <img src={viteJSLogo} alt="Vite.js" className={logoClass} />
        <img src={tailwindLogo} alt="Tailwind CSS" className={logoClass} />
        <img src={nodejsLogo} alt="Node.js" className={logoClass} />
        <img src={pythonLogo} alt="Python" className={logoClass} />
        <img src={postgreSQLLogo} alt="PostgreSQL" className={logoClass} />
        <img src={shopifyLogo} alt="Shopify" className={logoClass} />
        <img src={dockerLogo} alt="Docker" className={logoClass} />
        <img src={githubLogo} alt="GitHub" className={logoClass} />
        <img src={awsLogo} alt="AWS" className={logoClass} />
        <img src={stripeLogo} alt="Stripe" className={logoClass} />
      </div>
    </section>
  );
}
