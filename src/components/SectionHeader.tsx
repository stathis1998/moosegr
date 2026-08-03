import { cn } from "@/lib/utils";

/**
 * Shared eyebrow + title for every marketing section. The eyebrow is a styled
 * paragraph (not a heading) and the title is an <h2>, so the page keeps a single
 * <h1> (the hero) and a flat, correct heading outline.
 */
export function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header
      className={cn("space-y-3", align === "center" && "text-center", className)}
    >
      <p className="text-brand-strong font-semibold text-sm">{eyebrow}</p>
      <h2 className={cn("font-semibold text-3xl lg:text-4xl", titleClassName)}>
        {title}
      </h2>
    </header>
  );
}
