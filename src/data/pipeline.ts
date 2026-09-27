/**
 * DEVELOPMENT FIXTURE — not production telemetry.
 *
 * Shape follows the public contract GridPulse will eventually publish
 * (see spec §12.6). Every value here is illustrative and is labelled as a
 * fixture wherever it renders. Replace with a build-time snapshot of the real
 * public contract when one exists; never read raw operational logs.
 */

export interface PipelineMetric {
  label: string;
  value: string;
  note?: string;
}

/** A small ranked list drawn as bars, e.g. top rejection reasons. */
export interface PipelineBreakdown {
  title: string;
  items: { label: string; value: number; display?: string }[];
}

export interface PipelineStage {
  id: string;
  number: string;
  name: string;
  /** One-line description under the stage node. */
  summary: string;
  /** Detail panel content. */
  title: string;
  explanation: string;
  metrics: PipelineMetric[];
  breakdown?: PipelineBreakdown;
}

export interface PipelineSnapshot {
  isFixture: boolean;
  system: string;
  generatedAt: string;
  dataThrough: string;
  /** Stage shown in the static state and under reduced motion. */
  defaultStage: string;
  stages: PipelineStage[];
}

export const pipeline: PipelineSnapshot = {
  isFixture: true,
  system: "GridPulse",
  generatedAt: "2026-09-27T14:30:00Z",
  dataThrough: "2026-09-27T14:29:42Z",
  defaultStage: "validate",
  stages: [
    {
      id: "source",
      number: "01",
      name: "Source",
      summary: "Authoritative public grid data",
      title: "Authoritative public sources",
      explanation:
        "Each source is registered with its owner, licence and expected cadence, so freshness problems are visible before they reach a product.",
      metrics: [
        { label: "Active sources", value: "3" },
        { label: "Stale sources", value: "0" },
        { label: "Freshest source", value: "18 s", note: "since last publish" },
      ],
      breakdown: {
        title: "Records by source",
        items: [
          { label: "Balancing API", value: 12904, display: "12,904" },
          { label: "Generation mix", value: 4811, display: "4,811" },
          { label: "Interconnectors", value: 717, display: "717" },
        ],
      },
    },
    {
      id: "ingest",
      number: "02",
      name: "Ingest",
      summary: "Scheduled, idempotent collection",
      title: "Scheduled, idempotent collection",
      explanation:
        "Raw payloads are captured exactly as received, hashed and stored with their request metadata. Re-running a window produces the same result.",
      metrics: [
        { label: "Records this window", value: "18,432" },
        { label: "Run duration", value: "41 s" },
        { label: "Last success", value: "14:29", note: "UTC" },
      ],
      breakdown: {
        title: "Recent run durations",
        items: [
          { label: "14:29 run", value: 41, display: "41 s" },
          { label: "14:24 run", value: 38, display: "38 s" },
          { label: "14:19 run", value: 44, display: "44 s" },
        ],
      },
    },
    {
      id: "validate",
      number: "03",
      name: "Validate",
      summary: "Quality checks and quarantine",
      title: "Quality checks and quarantine",
      explanation:
        "Records are checked for completeness, schema validity and domain rules. Failures are quarantined with a reason instead of silently dropped.",
      metrics: [
        { label: "Valid", value: "18,429" },
        { label: "Quarantined", value: "3" },
        { label: "Pass rate", value: "99.98%" },
      ],
      breakdown: {
        title: "Top rejection reasons",
        items: [
          { label: "Missing field", value: 2 },
          { label: "Out of range", value: 1 },
          { label: "Schema mismatch", value: 0 },
        ],
      },
    },
    {
      id: "persist",
      number: "04",
      name: "Persist",
      summary: "Versioned, deduplicated storage",
      title: "Versioned, deduplicated storage",
      explanation:
        "Validated records land in partitioned tables keyed on their natural identifiers, so late or repeated data updates rather than duplicates.",
      metrics: [
        { label: "Rows written", value: "18,429" },
        { label: "Duplicates removed", value: "112" },
        { label: "Late updates", value: "9" },
      ],
      breakdown: {
        title: "Rows by table",
        items: [
          { label: "balancing", value: 12901, display: "12,901" },
          { label: "generation", value: 4811, display: "4,811" },
          { label: "flows", value: 717, display: "717" },
        ],
      },
    },
    {
      id: "transform",
      number: "05",
      name: "Transform",
      summary: "Tested models and analytical views",
      title: "Tested models and analytical views",
      explanation:
        "dbt models turn raw records into documented analytical views. Every model carries tests, and a failing test blocks publication.",
      metrics: [
        { label: "Models updated", value: "14" },
        { label: "Tests passed", value: "62 / 62" },
        { label: "Duration", value: "27 s" },
      ],
      breakdown: {
        title: "Slowest models",
        items: [
          { label: "int_settlement", value: 9, display: "9 s" },
          { label: "mart_prices", value: 7, display: "7 s" },
          { label: "stg_balancing", value: 4, display: "4 s" },
        ],
      },
    },
    {
      id: "serve",
      number: "06",
      name: "Serve",
      summary: "Published static artifacts",
      title: "Published static artifacts",
      explanation:
        "Outputs are published as immutable, versioned files behind a small manifest, so products read a known-good snapshot instead of a live database.",
      metrics: [
        { label: "Artifacts published", value: "6" },
        { label: "Formats", value: "2", note: "Parquet + JSON" },
        { label: "Manifest", value: "v214" },
      ],
      breakdown: {
        title: "Largest artifacts",
        items: [
          { label: "prices.parquet", value: 2400, display: "2.4 MB" },
          { label: "flows.parquet", value: 1100, display: "1.1 MB" },
          { label: "summary.json", value: 90, display: "90 KB" },
        ],
      },
    },
    {
      id: "interface",
      number: "07",
      name: "Interface",
      summary: "Products people actually use",
      title: "Products people actually use",
      explanation:
        "The interface reads the published manifest, shows how fresh its data is, and degrades gracefully when the pipeline is behind.",
      metrics: [
        { label: "Data freshness", value: "< 1 min" },
        { label: "Serving manifest", value: "v214" },
        { label: "Open incidents", value: "0" },
      ],
      breakdown: {
        title: "Data age by view",
        items: [
          { label: "Flows", value: 58, display: "58 s" },
          { label: "Overview", value: 42, display: "42 s" },
          { label: "Prices", value: 42, display: "42 s" },
        ],
      },
    },
  ],
};
