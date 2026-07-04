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

export function TechStack() {
  return (
    <section className="px-4 py-16 space-y-12">
      <div className="space-y-4">
        <header className="space-y-3 text-center">
          <h2 className="text-[#107569] font-semibold text-sm">Tech Stack</h2>

          <h1 className="font-semibold text-3xl">
            Powered by Modern Technology
          </h1>
        </header>
        <p className="text-[#535862] text-lg text-center">
          We build on enterprise-grade frameworks and infrastructure to ensure
          your software is secure, scalable, and blazing fast.
        </p>
      </div>

      <div className="flex gap-8 justify-center flex-wrap">
        <img
          src={figmaLogo}
          alt="Figma"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={typescriptLogo}
          alt="TypeScript"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={reactLogo}
          alt="React"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={nextJSLogo}
          alt="Next.js"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={viteJSLogo}
          alt="Vite.js"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={tailwindLogo}
          alt="Tailwind CSS"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={nodejsLogo}
          alt="Node.js"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={pythonLogo}
          alt="Python"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={postgreSQLLogo}
          alt="PostgreSQL"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={shopifyLogo}
          alt="Shopify"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={dockerLogo}
          alt="Docker"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={githubLogo}
          alt="GitHub"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={awsLogo}
          alt="AWS"
          className="border border-gray-200 rounded p-0.5"
        />
        <img
          src={stripeLogo}
          alt="Stripe"
          className="border border-gray-200 rounded p-0.5"
        />
      </div>
    </section>
  );
}
