/**
 * Hero ambience helpers (the motion itself is CSS in Hero.astro):
 * - pauses SVG animation while the hero is off screen;
 * - adds a few pixels of pointer parallax on desktop with a fine pointer.
 * Both are skipped under prefers-reduced-motion.
 */

const hero = document.querySelector<HTMLElement>("[data-hero]");
const atlas = hero?.querySelector<SVGSVGElement>(".atlas");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && atlas && !reduceMotion) {
  new IntersectionObserver(([entry]) => {
    hero.classList.toggle("is-offscreen", !entry.isIntersecting);
  }).observe(hero);

  const parallax = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
  const MAX_X = 6; // px
  const MAX_Y = 4; // px
  let frame = 0;

  hero.addEventListener("pointermove", (event) => {
    if (!parallax.matches || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      atlas.style.setProperty("--px", `${(-x * MAX_X * 2).toFixed(2)}px`);
      atlas.style.setProperty("--py", `${(-y * MAX_Y * 2).toFixed(2)}px`);
    });
  });

  hero.addEventListener("pointerleave", () => {
    atlas.style.setProperty("--px", "0px");
    atlas.style.setProperty("--py", "0px");
  });
}

export {};
