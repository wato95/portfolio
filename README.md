# Charlie Watson — Portfolio

Personal portfolio: data engineering, analytical products and interactive interfaces built around real-world data.

A single static page built with [Astro](https://astro.build), TypeScript, one stylesheet and four small vanilla scripts. No client framework, CSS framework or animation library.

## Run locally

Requires Node 22.12+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the build
npm run check     # type-check .astro and .ts files
```

## Editing content

All content lives in `src/data/` — templates never duplicate it.

| File | What it holds |
| --- | --- |
| `site.ts` | Name, page title/description, GitHub / LinkedIn / email, hero tools line |
| `projects.ts` | Every project: status, categories, links, media. Drives Selected Work (`featured: true`) and the Project Atlas, including its filters |
| `journey.ts` | The Journey narrative and timeline entries |
| `pipeline.ts` | The *Under the Interface* walkthrough. **Currently a labelled development fixture**, not live telemetry |

Rules the components follow:

- A link whose URL is `undefined` is not rendered — never a dead button. External URLs must be absolute (`https://…`).
- Atlas filters come from the categories projects actually carry: preferred order in `categoryOrder`, then any other category shared by 2+ projects.
- Selected Work shows the case-study button only when `caseStudyUrl` is set.

### CV

Save the PDF as `public/cv/charlie-watson-cv.pdf`. Both CV links (Journey and Contact) appear automatically on the next build; restart `npm run dev` after adding it.

### Project media

Real screenshots go in `public/images/projects/` as WebP with explicit dimensions (see QuakeLens in `projects.ts`). Projects without real media get a designed schematic glyph in `ProjectAtlas.astro` — never a fake app screenshot.

### Social preview

`public/og.png` is a 1200×630 capture of the hero. Regenerate it if the hero copy changes.

## Structure

```text
src/
├── components/   Nav, Hero, SelectedWork, Pipeline, Capabilities, Journey, ProjectAtlas, Footer
├── data/         site, projects, journey, pipeline
├── pages/        index.astro (head, metadata, page assembly)
├── scripts/      reveal.ts, hero.ts, pipeline.ts, projectAtlas.ts
└── styles/       global.css (tokens → reset → base → type → layout → controls → motion)
```

Motion is CSS; scripts only toggle state. Everything is readable without JavaScript and under `prefers-reduced-motion` (no autoplay, no ambient motion, final states shown).

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main` (or run the workflow manually).

The workflow reads the site origin and base path from `actions/configure-pages`, so it works for both a project site (`https://<user>.github.io/<repo>/`) and a user site (`https://<user>.github.io/`) without code changes.
