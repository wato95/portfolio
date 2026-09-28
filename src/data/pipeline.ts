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
  "isFixture": false,
  "system": "PulseFoundry / QuakeLens V1",
  "generatedAt": "2026-09-21T20:49:38.631441Z",
  "dataThrough": "2026-09-01T00:00:00Z",
  "defaultStage": "serve",
  "stages": [
    {
      "id": "source",
      "number": "01",
      "name": "Source",
      "summary": "USGS earthquakes and Census places",
      "title": "Published public sources",
      "explanation": "The V1 preview combines USGS earthquake records with 2024 U.S. Census Gazetteer places. Places provide search context, not population exposure.",
      "metrics": [
        { "label": "Published sources", "value": "2" },
        { "label": "Licence records", "value": "2" },
        { "label": "Place-data vintage", "value": "2024" }
      ],
      "breakdown": {
        "title": "Published rows by source",
        "items": [
          { "label": "USGS events", "value": 19503, "display": "19,503" },
          { "label": "Census places", "value": 32333, "display": "32,333" }
        ]
      }
    },
    {
      "id": "ingest",
      "number": "02",
      "name": "Ingest",
      "summary": "Completed 2026 event acquisition",
      "title": "Completed event acquisition",
      "explanation": "The completed 2026 acquisition covered two catalogue windows and captured details for every targeted event.",
      "metrics": [
        { "label": "Catalogue windows", "value": "2" },
        { "label": "Event details captured", "value": "19,503 / 19,503" },
        { "label": "Details remaining", "value": "0" }
      ]
    },
    {
      "id": "validate",
      "number": "03",
      "name": "Validate",
      "summary": "Publication checks and reconciliation",
      "title": "Validated preview publication",
      "explanation": "Publication checks reconciled the event count with the completed acquisition and checked event identity, coverage, revision history and daily activity.",
      "metrics": [
        { "label": "Events reconciled", "value": "19,503 / 19,503" },
        { "label": "Duplicate event IDs", "value": "0" },
        { "label": "Events outside coverage", "value": "0" }
      ]
    },
    {
      "id": "persist",
      "number": "04",
      "name": "Persist",
      "summary": "Archived event and product evidence",
      "title": "Persisted source evidence",
      "explanation": "The acquisition retained event revisions, product revisions and product-content records before building the public preview.",
      "metrics": [
        { "label": "Event-revision rows", "value": "39,006" },
        { "label": "Product-revision rows", "value": "64,562" },
        { "label": "Product-content rows", "value": "346,880" }
      ],
      "breakdown": {
        "title": "Archived rows by type",
        "items": [
          { "label": "Event revisions", "value": 39006, "display": "39,006" },
          { "label": "Product revisions", "value": 64562, "display": "64,562" },
          { "label": "Product contents", "value": 346880, "display": "346,880" }
        ]
      }
    },
    {
      "id": "transform",
      "number": "05",
      "name": "Transform",
      "summary": "Event, history and activity models",
      "title": "Built analytical views",
      "explanation": "The preview models produce one latest row per event, captured display-state history and daily activity. Captured states do not claim to include every USGS update.",
      "metrics": [
        { "label": "Latest events", "value": "19,503" },
        { "label": "Captured states", "value": "19,537" },
        { "label": "Activity dates", "value": "243" }
      ],
      "breakdown": {
        "title": "Published analytical rows",
        "items": [
          { "label": "Events", "value": 19503, "display": "19,503" },
          { "label": "Captured states", "value": 19537, "display": "19,537" },
          { "label": "Daily activity", "value": 243, "display": "243" }
        ]
      }
    },
    {
      "id": "serve",
      "number": "06",
      "name": "Serve",
      "summary": "Immutable static preview artifacts",
      "title": "Published static artifacts",
      "explanation": "QuakeLens Web V1 uses immutable build 20260921T204938Z-a14edef9b000. Its four Parquet files contain event and place data, but no published shaking or exposure results.",
      "metrics": [
        { "label": "Parquet artifacts", "value": "4" },
        { "label": "Artifact bytes", "value": "3,123,122" },
        { "label": "Preview schema", "value": "v1" }
      ],
      "breakdown": {
        "title": "Artifact sizes",
        "items": [
          { "label": "events.parquet", "value": 1259751, "display": "1,259,751 B" },
          { "label": "revisions.parquet", "value": 1240842, "display": "1,240,842 B" },
          { "label": "places.parquet", "value": 620774, "display": "620,774 B" },
          { "label": "daily.parquet", "value": 1755, "display": "1,755 B" }
        ]
      }
    },
    {
      "id": "interface",
      "number": "07",
      "name": "Interface",
      "summary": "A static earthquake browser",
      "title": "QuakeLens Web V1",
      "explanation": "The browser presents the published earthquakes, daily activity and searchable Census places from the pinned preview build.",
      "metrics": [
        { "label": "Browsable events", "value": "19,503" },
        { "label": "Activity dates", "value": "243" },
        { "label": "Searchable places", "value": "32,333" }
      ],
      "breakdown": {
        "title": "Browser datasets",
        "items": [
          { "label": "Events", "value": 19503, "display": "19,503" },
          { "label": "Places", "value": 32333, "display": "32,333" },
          { "label": "Activity dates", "value": 243, "display": "243" }
        ]
      }
    }
  ]
}
