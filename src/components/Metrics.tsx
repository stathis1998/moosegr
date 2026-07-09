import metricsBg from "@/assets/metrics-bg.jpg";

function MetricItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center p-6 gap-4 bg-white/30 border border-white/30 backdrop-blur-lg rounded-2xl h-full">
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
    <section
      id="process"
      className="px-4 lg:px-8 py-16 lg:py-24 bg-[#E9EAEB] scroll-mt-20"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 text-center lg:max-w-2xl lg:mx-auto">
          <header className="space-y-3">
            <h2 className="text-[#107569] font-semibold text-sm">Our Process</h2>

            <h3 className="font-semibold text-2xl lg:text-4xl">
              How We Bring Ideas to Life
            </h3>
          </header>
          <p className="text-[#535862] lg:text-lg">
            A transparent, streamlined approach from concept to deployment.
          </p>
        </div>

        <div className="relative p-8 lg:p-16 lg:rounded-2xl lg:overflow-hidden">
          <img
            src={metricsBg}
            alt="metrics-bg"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
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
      </div>
    </section>
  );
}
