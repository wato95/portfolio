/**
 * Personal identity and contact links.
 *
 * Any value left `undefined` hides its link or CTA — never publish a dead
 * control. Entries marked TODO must be confirmed before PORT-004 closes.
 */
export const site = {
  // TODO(PORT-004): confirm the exact displayed name.
  name: "Charlie Watson",
  title: "Charlie Watson — Data engineering, analytical products, interfaces",
  description:
    "Portfolio of Charlie Watson: data engineering, analytical products and interactive interfaces built around real-world data.",

  githubUrl: "https://github.com/wato95",
  // TODO(PORT-004): supply real values. Undefined = link hidden.
  linkedinUrl: undefined as string | undefined,
  email: undefined as string | undefined,
  cvUrl: undefined as string | undefined,

  heroTools: ["Python", "SQL", "dbt", "Geospatial", "Data Platforms", "Frontend"],
};

/** Prefix a root-relative path with the deployed base path (GitHub Pages). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
