/**
 * Under the Interface — stage playback.
 *
 * Every stage's content is pre-rendered from src/data/pipeline.ts; this module
 * only decides which stage is shown and keeps classes/ARIA in sync with state.
 *
 * State:
 *   current   index of the stage on display
 *   isPinned  the visitor chose a stage (or pressed Pause) — autoplay stops
 *   isPaused  pointer over / keyboard focus in the pipeline — autoplay holds
 *   isVisible the pipeline is on screen and the tab is visible
 *
 * Reduced motion: no autoplay; stages remain manually selectable.
 */

const INTERVAL_MS = 5000;

const root = document.querySelector<HTMLElement>("[data-pipeline]");
if (root) initPipeline(root);

function initPipeline(root: HTMLElement) {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-stage-button]")];
  const stages = buttons.map((button) => button.closest<HTMLElement>(".stage")!);
  const panels = buttons.map(
    (button) => root.querySelector<HTMLElement>(`[data-stage-detail="${button.dataset.stageButton}"]`)!,
  );
  const scroller = root.querySelector<HTMLElement>("[data-pipeline-scroller]")!;
  const detail = root.querySelector<HTMLElement>("#pipeline-detail")!;
  const detailStack = detail.querySelector<HTMLElement>(".detail-stack")!;
  const bar = root.querySelector<HTMLElement>("[data-playback-bar]")!;
  const playback = root.querySelector<HTMLElement>("[data-playback]")!;
  const status = root.querySelector<HTMLElement>("[data-playback-status]")!;
  const toggle = root.querySelector<HTMLButtonElement>("[data-playback-toggle]")!;

  const autoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const defaultIndex = buttons.findIndex((b) => b.dataset.stageButton === root.dataset.defaultStage);

  const state = {
    // Autoplay walks the pipeline from the source; manual mode keeps the richest default.
    current: autoplay ? 0 : Math.max(0, defaultIndex),
    isPinned: false,
    isPaused: false,
    isVisible: false,
  };
  const pauseReasons = { hover: false, focus: false };
  let timer: number | undefined;

  const isPlaying = () => autoplay && !state.isPinned && !state.isPaused && state.isVisible;
  const position = () =>
    `${String(state.current + 1).padStart(2, "0")} / ${String(buttons.length).padStart(2, "0")}`;

  function render(announce: boolean) {
    buttons.forEach((button, i) => {
      const active = i === state.current;
      stages[i].classList.toggle("is-active", active);
      stages[i].classList.toggle("is-done", i < state.current);
      if (active) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });

    panels.forEach((panel, i) => {
      const show = i === state.current;
      if (show && panel.hidden && autoplay) {
        panel.classList.remove("is-entering");
        void panel.offsetWidth; // restart the entry animation
        panel.classList.add("is-entering");
      }
      panel.hidden = !show;
    });

    // Announce stage changes the visitor asked for, never autoplay ticks.
    detail.setAttribute("aria-live", announce ? "polite" : "off");
    renderPlayback();
  }

  function renderPlayback() {
    let mode: "manual" | "pinned" | "paused" | "playing";
    if (!autoplay) mode = "manual";
    else if (state.isPinned) mode = "pinned";
    else if (state.isPaused || !state.isVisible) mode = "paused";
    else mode = "playing";

    const labels = {
      manual: `Select a stage · ${position()}`,
      pinned: `Walkthrough paused · ${position()}`,
      paused: `Holding while you read · ${position()}`,
      playing: `Auto-advancing · ${position()}`,
    };
    playback.dataset.state = mode;
    status.textContent = labels[mode];

    toggle.hidden = !autoplay;
    toggle.textContent = state.isPinned ? "Play walkthrough" : "Pause";
  }

  function schedule() {
    window.clearTimeout(timer);
    bar.classList.remove("is-running");
    renderPlayback();
    if (!isPlaying()) return;

    void bar.offsetWidth; // restart the progress bar
    bar.classList.add("is-running");
    timer = window.setTimeout(() => select((state.current + 1) % buttons.length, false), INTERVAL_MS);
  }

  function select(index: number, byVisitor: boolean) {
    state.current = index;
    if (byVisitor) state.isPinned = true;
    render(byVisitor);
    if (!byVisitor) keepInView(index);
    schedule();
  }

  // On narrow screens the stage row scrolls sideways; follow the active stage.
  function keepInView(index: number) {
    if (scroller.scrollWidth <= scroller.clientWidth + 1) return;
    const padding = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
    const offset = stages[index].getBoundingClientRect().left - scroller.getBoundingClientRect().left;
    scroller.scrollTo({ left: scroller.scrollLeft + offset - padding, behavior: "smooth" });
  }

  function setPause(reason: keyof typeof pauseReasons, value: boolean) {
    pauseReasons[reason] = value;
    const paused = pauseReasons.hover || pauseReasons.focus;
    if (paused === state.isPaused) return;
    state.isPaused = paused;
    schedule();
  }

  // ---- Visitor input ----

  buttons.forEach((button, i) => button.addEventListener("click", () => select(i, true)));

  scroller.addEventListener("keydown", (event) => {
    const i = buttons.indexOf(event.target as HTMLButtonElement);
    if (i === -1) return;
    const last = buttons.length - 1;
    const next = {
      ArrowRight: Math.min(i + 1, last),
      ArrowLeft: Math.max(i - 1, 0),
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    buttons[next].focus();
    select(next, true);
  });

  toggle.addEventListener("click", () => {
    state.isPinned = !state.isPinned;
    schedule();
  });

  // Reading the stages or the detail holds autoplay; the playback control doesn't.
  for (const area of [scroller, detailStack]) {
    area.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && setPause("hover", true));
    area.addEventListener("pointerleave", (e) => e.pointerType === "mouse" && setPause("hover", false));
  }
  scroller.addEventListener("focusin", () => setPause("focus", true));
  scroller.addEventListener("focusout", (event) => {
    if (!scroller.contains(event.relatedTarget as Node | null)) setPause("focus", false);
  });

  // ---- Visibility ----

  const updateVisibility = (onScreen: boolean) => {
    state.isVisible = onScreen && !document.hidden;
    schedule();
  };
  let onScreen = false;
  new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      updateVisibility(onScreen);
    },
    { threshold: 0.35 },
  ).observe(root);
  document.addEventListener("visibilitychange", () => updateVisibility(onScreen));

  // ---- Start ----

  bar.style.setProperty("--playback-ms", `${INTERVAL_MS}ms`);
  playback.hidden = false;
  render(false);
  schedule();
}

export {};
