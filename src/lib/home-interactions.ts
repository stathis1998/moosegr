/**
 * Click enhancements for the statically-rendered parts of the homepage.
 * Loaded once from HomePage.astro; listens at the document level so it covers
 * buttons/links inside static HTML and hydrated islands alike.
 *
 * - `a[href="#contact"]`: every "Get a Free Consultation" CTA. Without JS the
 *   anchor still works (CSS smooth scroll); with JS we also focus the first
 *   field and flash the form border.
 * - `[data-select-project]`: Features' "See our featured projects" buttons.
 *   Selects the matching tab in the Work island and scrolls to it.
 */

import { scrollToContact } from "@/lib/contact";
import { selectProject } from "@/lib/select-project";

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const contactLink = target.closest('a[href="#contact"]');
  if (contactLink) {
    event.preventDefault();
    scrollToContact();
    return;
  }

  const projectButton = target.closest<HTMLElement>("[data-select-project]");
  const project = projectButton?.dataset.selectProject;
  if (project) {
    selectProject(project);
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }
});
