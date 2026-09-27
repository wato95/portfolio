// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/.
// The deploy workflow passes the real origin and base path from
// actions/configure-pages, so nothing here is hard-coded to a repo name.
// Locally both fall back to a root-served site.
const site = process.env.SITE_ORIGIN ?? "http://localhost:4321";
const base = process.env.SITE_BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
});
