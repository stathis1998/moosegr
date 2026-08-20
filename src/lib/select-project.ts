/**
 * Tiny external store for the selected featured project, bridging the static
 * Features section and the hydrated Work island. Features' "See our featured
 * projects" buttons are plain HTML (no React on the client), so selection
 * travels as a window event; Work subscribes via useSyncExternalStore.
 */

const EVENT = "moose:select-project";

// Last selection, kept so a click that lands before the Work island has
// hydrated still applies once it mounts.
let lastSelected: string | null = null;

export function selectProject(value: string): void {
  lastSelected = value;
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: value }));
}

export function getSelectedProject(): string | null {
  return lastSelected;
}

/** Subscribe function shaped for React's useSyncExternalStore. */
export function subscribeSelectedProject(onChange: () => void): () => void {
  const handler = (event: Event) => {
    // Sync from the event too, in case the dispatch came from another bundle
    // copy of this module.
    lastSelected = (event as CustomEvent<string>).detail;
    onChange();
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
