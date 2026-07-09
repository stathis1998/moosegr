import { useEffect, useState } from "react";

/**
 * Steps an index through 0..count-1 on a timer, looping back to 0.
 * Stays on the first item when the visitor prefers reduced motion.
 */
export function useCyclingHighlight(count: number, intervalMs: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [count, intervalMs]);

  return activeIndex;
}
