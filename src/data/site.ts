import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * CV: drop the PDF at public/cv/charlie-watson-cv.pdf and every CV link on
 * the site appears automatically. No file → links stay hidden.
 * Checked at build time (restart `npm run dev` after adding the file).
 */
const CV_PATH = "/cv/charlie-watson-cv.pdf";
const hasCv = existsSync(join(process.cwd(), "public", CV_PATH));

/**
 * Personal identity and contact links.
 *
 * Any value left `undefined` hides its link or CTA — never publish a dead
 * control. URLs must be absolute (https://…), or they resolve relative to
 * the site and break.
 */
export const site = {
  name: "Charlie Watson",
  title: "Charlie Watson — Data engineering, analytical products, interfaces",
  description:
    "Portfolio of Charlie Watson: data engineering, analytical products and interactive interfaces built around real-world data.",

  githubUrl: "https://github.com/wato95",
  linkedinUrl: "https://www.linkedin.com/in/charlie-watson-90142b152" as string | undefined,
  email: "wato95@gmail.com" as string | undefined,
  cvUrl: hasCv ? withBase(CV_PATH) : undefined,

  heroTools: ["Python", "SQL", "dbt", "Geospatial", "Data Platforms", "Frontend"],
};

/** Prefix a root-relative path with the deployed base path (GitHub Pages). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
