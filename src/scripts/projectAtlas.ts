/**
 * Project Atlas filtering. Filter buttons and tiles are rendered from
 * src/data/projects.ts; each tile carries its categories in data-categories.
 */

const root = document.querySelector<HTMLElement>("[data-atlas]");
if (root) initAtlas(root);

function initAtlas(root: HTMLElement) {
  const group = root.querySelector<HTMLElement>("[data-atlas-filters]")!;
  const buttons = [...group.querySelectorAll<HTMLButtonElement>("[data-filter]")];
  const tiles = [...root.querySelectorAll<HTMLElement>("[data-categories]")];
  const status = root.querySelector<HTMLElement>("[data-atlas-status]")!;
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function apply(filter: string) {
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    }

    let shown = 0;
    for (const tile of tiles) {
      const categories = tile.dataset.categories!.split("|");
      const match = filter === "all" || categories.includes(filter);
      if (match) {
        shown++;
        if (animate) {
          tile.classList.remove("is-entering");
          void tile.offsetWidth; // restart the short fade
          tile.classList.add("is-entering");
        }
      }
      tile.hidden = !match;
    }

    const label = buttons.find((b) => b.dataset.filter === filter)?.textContent?.trim();
    const count = `${shown} project${shown === 1 ? "" : "s"}`;
    status.textContent = filter === "all" ? `Showing all ${count}` : `${label}: ${count}`;
  }

  group.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-filter]");
    if (button) apply(button.dataset.filter!);
  });

  group.hidden = false;
}

export {};
