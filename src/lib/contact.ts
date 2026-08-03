/**
 * Smooth-scrolls to the contact section, focuses the First name field, and flashes
 * a border around the form. Used by every "Get a Free Consultation" button.
 */
export function scrollToContact(event?: { preventDefault: () => void }) {
  event?.preventDefault();

  const firstName = document.getElementById("firstName");
  const form = document.getElementById("contact-form");

  // Scroll the form (whose first field is First name) to the top of the
  // viewport; its scroll-mt keeps a little breathing room above it.
  form?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Only focus on desktop-like devices: on phones, focusing opens the on-screen
  // keyboard, which shrinks the viewport mid-scroll and hides the form.
  // preventScroll keeps focus() from hijacking the smooth scroll above.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    firstName?.focus({ preventScroll: true });
  }

  if (form) {
    form.classList.remove("flash-border");
    // Force a reflow so the animation restarts on repeated clicks.
    void form.offsetWidth;
    form.classList.add("flash-border");
  }
}
