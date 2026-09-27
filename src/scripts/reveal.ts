/**
 * Shared scroll reveal. Marks [data-reveal] and [data-reveal-group] elements
 * with `.is-visible` the first time they enter the viewport; all motion is CSS
 * (see "Motion primitives" in global.css). Each element reveals once.
 */

declare global {
  interface Window {
    __aetherReveal?: boolean;
  }
}

window.__aetherReveal = true;

const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  targets.forEach((el) => observer.observe(el));
}

export {};
