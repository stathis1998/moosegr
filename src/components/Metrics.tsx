import metricsBg from "@/assets/metrics-bg.jpg";

function MetricItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center p-6 gap-4 bg-white/30 border border-white/30 backdrop-blur-lg rounded-2xl">
      <div className="space-y-3">
        <h3 className="text-white text-2xl font-semibold text-center">
          {title}
        </h3>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="px-4 py-16 space-y-12 bg-[#E9EAEB]">
      <div className="space-y-2 text-center">
        <h3 className="font-semibold text-2xl">How We Bring Ideas to Life</h3>
        <p className="text-[#535862]">
          A transparent, streamlined approach from concept to deployment.
        </p>
      </div>

      <div className="relative p-8">
        <img
          src={metricsBg}
          alt="metrics-bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="space-y-8">
          <MetricItem
            title="Plan & Design"
            description="We dive into your business goals to map out a strategic architecture, then craft intuitive, user-centric interfaces before writing a single line of code."
          />

          <MetricItem
            title="Build & Iterate"
            description="We write clean, secure code and keep you in the loop with regular updates, transparent testing, and milestone reviews."
          />

          <MetricItem
            title="Launch & Scale"
            description="We handle the seamless deployment of your software and provide post-launch support to ensure your application grows effortlessly with your business."
          />
        </div>
      </div>
    </section>
  );
}
