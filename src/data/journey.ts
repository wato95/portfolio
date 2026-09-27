/**
 * Career timeline for The Journey (§14).
 *
 * TODO(PORT-004): every bracketed value below is a placeholder and must be
 * replaced with real organisations, roles and dates before launch.
 */

export interface JourneyEntry {
  dates: string;
  organisation: string;
  role: string;
  summary: string;
  current?: boolean;
}

export const journey = {
  headline: "From studying the universe",
  headlineAccent: "to mapping complex systems.",
  // TODO(PORT-004): confirm final narrative.
  story:
    "I started in astrophysics, turning noisy observations into something you could reason about. That habit carried into analytical work, then into data engineering, and now into building the products that sit on top of the pipelines.",
  entries: [
    {
      dates: "[20XX] – Present",
      organisation: "Independent",
      role: "Data & product engineering",
      summary:
        "Building QuakeLens, PulseFoundry and GridPulse end to end: pipelines, models, published artifacts and the interfaces on top.",
      current: true,
    },
    {
      dates: "[20XX] – [20XX]",
      organisation: "[Organisation]",
      role: "[Data Engineer]",
      summary: "[One sentence on scope, ownership or progression in this role.]",
    },
    {
      dates: "[20XX] – [20XX]",
      organisation: "[Organisation]",
      role: "[Data / Analytical role]",
      summary: "[One sentence on scope, ownership or progression in this role.]",
    },
    {
      dates: "[20XX] – [20XX]",
      organisation: "[University]",
      role: "[Astrophysics degree]",
      summary: "[One sentence on the research or study focus.]",
    },
  ] satisfies JourneyEntry[],
};
