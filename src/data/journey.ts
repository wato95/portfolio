/**
 * Career timeline for The Journey (§14).
 **/

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
    story:
      "I started in astrophysics, simulating galaxies colliding and learning to reason about systems too large to observe directly. That habit carried into analytical work at the UK's financial regulator, then into data engineering on hundreds of billions of market records, and now into building the products that sit on top of the pipelines.",
    entries: [
      {
        dates: "2026 - Present",
        organisation: "Independent",
        role: "Data & product engineering",
        summary:
          "Building QuakeLens, PulseFoundry and GridPulse end to end: pipelines, models, published artifacts and the interfaces on top.",
        current: true,
      },
      {
        dates: "2024 - Present",
        organisation: "Financial Conduct Authority",
        role: "Lead Associate, Data Engineering",
        summary:
          "Own the data platform behind wholesale-markets supervision: a 600TB Redshift warehouse, Airflow pipelines validating 150M+ transactions a day, and the data layer under a risk dashboard ~50 supervisors use daily.",
          current: true,
      },
      {
        dates: "2018 - 2024",
        organisation: "Financial Conduct Authority",
        role: "Associate → Senior Associate, Market Analysis",
        summary:
          "Turned raw transaction data into supervisory tools: exposure dashboards used by 300+ supervisors, Tableau monitoring for three post-Brexit trading regimes, and network analysis across 100M+ transactions.",
      },
      {
        dates: "2014 - 2018",
        organisation: "University of Leicester",
        role: "MPhys Physics with Astrophysics",
        summary:
          "First Class Honours (85% average); master's thesis on N-body simulations of galactic mergers.",
      },
    ] satisfies JourneyEntry[],
  };
