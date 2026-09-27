/**
 * Canonical project content. Every project surface on the site reads from
 * here — never duplicate project copy in templates.
 */

export type ProjectStatus =
  | "live"
  | "live-iterating"
  | "building"
  | "researching"
  | "planned"
  | "archived";

export interface Project {
  slug: string;
  number: string;

  name: string;
  subtitle?: string;
  description: string;

  status: ProjectStatus;

  categories: string[];
  technologies: string[];
  /** Skills the project demonstrates; shown on featured work. */
  skills?: string[];

  featured: boolean;

  yearStarted?: number;
  yearCompleted?: number;

  /** Root-relative paths under /public. Projects without one use a glyph. */
  thumbnail?: string;
  heroImage?: string;
  heroImageAlt?: string;

  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  "live-iterating": "Live · Iterating",
  building: "Building",
  researching: "Researching",
  planned: "Planned",
  archived: "Archived",
};

/** Colour family per status. Text label always accompanies the colour. */
export const statusTone: Record<ProjectStatus, "signal" | "artifact" | "muted"> = {
  live: "signal",
  "live-iterating": "signal",
  building: "artifact",
  researching: "artifact",
  planned: "muted",
  archived: "muted",
};

/**
 * Preferred filter order and plural filter labels. Only categories that at
 * least one project actually carries are rendered (see `atlasFilters`).
 */
export const categoryOrder: { category: string; label: string }[] = [
  { category: "Data Product", label: "Data Products" },
  { category: "Data Platform", label: "Data Platforms" },
  { category: "Pipeline", label: "Pipelines" },
  { category: "Geospatial", label: "Geospatial" },
  { category: "Experiment", label: "Experiments" },
  { category: "Observability", label: "Observability" },
];

export const projects: Project[] = [
  {
    slug: "quakelens",
    number: "01",
    name: "QuakeLens",
    subtitle: "Earthquake Impact Explorer",
    description:
      "A map-first earthquake observatory. Published USGS catalogue data is queried directly in the browser, connecting a clustered global map, a daily activity timeline and a searchable event catalogue in one shared view.",
    status: "live-iterating",
    categories: ["Data Product", "Geospatial"],
    technologies: ["React", "TypeScript", "DuckDB-Wasm", "MapLibre", "Parquet"],
    skills: [
      "Geospatial analysis",
      "Static analytical products",
      "Data storytelling",
      "UI / UX design",
    ],
    featured: true,
    yearStarted: 2026,
    thumbnail: "/images/projects/quakelens-thumb.webp",
    heroImage: "/images/projects/quakelens-hero.webp",
    heroImageAlt:
      "QuakeLens interface: a global earthquake map with clustered events, a daily seismic activity timeline, an event catalogue and a selected-event detail panel.",
    liveUrl: "https://wato95.github.io/quakelens-web/",
    githubUrl: "https://github.com/wato95/quakelens-web",
  },
  {
    slug: "gridpulse-bm",
    number: "02",
    name: "GridPulse BM",
    // TODO(PORT-004): confirm final short description and public status.
    description:
      "Energy data platform that ingests, validates, persists and serves grid data through a modular, observable pipeline.",
    status: "building",
    categories: ["Data Platform", "Energy", "Pipeline"],
    technologies: ["Python", "SQL", "dbt"],
    featured: false,
  },
  {
    slug: "mythology-network",
    number: "03",
    // TODO(PORT-004): confirm final public name.
    name: "Olympian network explorer",
    description:
      "An interactive knowledge graph of Greek mythology where every relationship carries its source, so conflicting traditions stay visible rather than flattened.",
    status: "building",
    categories: ["Experiment", "Graph"],
    technologies: ["TypeScript", "React", "Three.js", "Python"],
    featured: false,
  },
  {
    slug: "pulsefoundry",
    number: "04",
    name: "PulseFoundry",
    description:
      "A small batch data-product platform that acquires public datasets, preserves source evidence, transforms them with DuckDB and dbt, and publishes versioned analytical datasets.",
    status: "building",
    categories: ["Data Platform", "Pipeline"],
    technologies: ["Python", "DuckDB", "dbt", "Parquet"],
    featured: false,
  },
  {
    slug: "firewatch",
    number: "05",
    name: "FireWatch",
    // TODO(PORT-004): confirm description once scoped.
    description: "A planned analytical product for exploring wildfire activity from public data.",
    status: "planned",
    categories: ["Data Product", "Environmental"],
    technologies: [],
    featured: false,
  },
  {
    slug: "riverpulse",
    number: "06",
    name: "RiverPulse",
    // TODO(PORT-004): confirm description once scoped.
    description: "A planned analytical product for exploring river levels and flow from public data.",
    status: "planned",
    categories: ["Data Product", "Geospatial"],
    technologies: [],
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

/**
 * Atlas filters, derived from the data (`All` is added by the UI):
 * 1. categories in `categoryOrder` that at least one project carries, in that order;
 * 2. then any other category shared by 2+ projects, alphabetically — so new
 *    categories appear without a code change, while one-off descriptive tags
 *    (e.g. "Energy") stay tile labels rather than single-result filters.
 */
export function atlasFilters(list: Project[] = projects) {
  const counts = new Map<string, number>();
  for (const category of list.flatMap((project) => project.categories)) {
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  const preferred = categoryOrder.filter(({ category }) => counts.has(category));
  const known = new Set(categoryOrder.map(({ category }) => category));
  const discovered = [...counts]
    .filter(([category, count]) => !known.has(category) && count >= 2)
    .map(([category]) => ({ category, label: category }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return [...preferred, ...discovered];
}
