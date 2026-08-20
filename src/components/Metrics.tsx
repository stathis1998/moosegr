import metricsBg from "@/assets/metrics-bg.webp";

import { SectionHeader } from "@/components/SectionHeader";
import { getTranslations, type Locale } from "@/lib/i18n";

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
        {/* Sized so the Greek titles stay on one line in the 3-column grid. */}
        <h3 className="text-white text-2xl lg:text-lg xl:text-xl lg:whitespace-nowrap font-semibold text-center">
          {title}
        </h3>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
}

export function Metrics({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section
      id="process"
      className="px-4 lg:px-8 py-16 lg:py-24 bg-surface-muted"
    >
      <div className="w-full max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 text-center lg:max-w-2xl lg:mx-auto">
          <SectionHeader
            eyebrow={t.metrics.eyebrow}
            title={t.metrics.title}
            align="center"
            titleClassName="text-2xl lg:text-4xl"
          />
          <p className="text-body lg:text-lg">{t.metrics.description}</p>
        </div>

        <div className="relative p-8 lg:p-16 rounded-2xl overflow-hidden">
          <img
            src={metricsBg.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Scrim keeps the white card text legible over any photo. */}
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            <MetricItem
              title={t.metrics.plan.title}
              description={t.metrics.plan.description}
            />

            <MetricItem
              title={t.metrics.build.title}
              description={t.metrics.build.description}
            />

            <MetricItem
              title={t.metrics.launch.title}
              description={t.metrics.launch.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
