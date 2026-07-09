/**
 * Smooth-scrolls to the contact section, focuses the Message field, and flashes
 * a border around the form. Used by every "Get a Free Consultation" button.
 */
export function scrollToContact(event?: { preventDefault: () => void }) {
  event?.preventDefault();

  const section = document.getElementById("contact");
  const message = document.getElementById("message");
  const form = document.getElementById("contact-form");

  section?.scrollIntoView({ behavior: "smooth" });

  // preventScroll keeps focus() from hijacking the smooth scroll above.
  message?.focus({ preventScroll: true });

  if (form) {
    form.classList.remove("flash-border");
    // Force a reflow so the animation restarts on repeated clicks.
    void form.offsetWidth;
    form.classList.add("flash-border");
  }
}
