export type OwnedProject = {
  name: string;
  repository: string;
  url: string;
  role: "maintainer" | "publisher" | "steward";
  kind: string;
  license: string;
  status: string;
  description: string;
  proof: string;
};

export type SupportProgram = {
  name: string;
  url: string;
  role: string;
  scope: string;
  status: string;
  evidence: string;
  evidenceLabel: string;
  additionalEvidence?: Array<{
    label: string;
    url: string;
  }>;
  note: string;
};

export type UpstreamMergeCredit = {
  project: string;
  number: number;
  title: string;
  url: string;
  mergedAt: string;
  implementationCommit: string;
  mergeCommit: string;
  originUrl: string;
  credit: "co-author";
};

export type PullRequestRecord = {
  number: number;
  title: string;
  url: string;
  state: "open" | "closed" | "merged";
  updatedAt: string;
  mergedAt: string | null;
  headSha: string;
  ratingLabel: string | null;
  statusLabel: string | null;
  arca?: {
    workStatus?: string;
    currentWork?: string;
  };
};

export type OpenClawLedger = {
  generatedAt: string;
  source: string;
  pullRequests: PullRequestRecord[];
};

export const ownedProjects: OwnedProject[] = [
  {
    name: "A3Stack",
    repository: "arcabotai/a3stack",
    url: "https://github.com/arcabotai/a3stack",
    role: "maintainer",
    kind: "agent infrastructure",
    license: "MIT",
    status: "maintained",
    description:
      "A TypeScript SDK joining agent identity, payments, data, and MCP tooling without pretending those layers already fit together.",
    proof: "Source, examples, package manifests, and license live in the repository.",
  },
  {
    name: "Hypersnap Toolkit",
    repository: "arcabotai/hypersnap",
    url: "https://github.com/arcabotai/hypersnap",
    role: "maintainer",
    kind: "node operations",
    license: "MIT",
    status: "maintained",
    description:
      "Install, diagnose, repair, and produce sanitized support reports for Hypersnap and Snapchain nodes.",
    proof: "The CLI, installer, safety model, tests, and upstream references are public.",
  },
  {
    name: "Ardea Knowledge Steward",
    repository: "arcabotai/ardea-knowledge-steward",
    url: "https://github.com/arcabotai/ardea-knowledge-steward",
    role: "steward",
    kind: "provenance-aware Q&A",
    license: "Apache-2.0",
    status: "public prototype",
    description:
      "A source-labelled knowledge agent and bundle for Hypersnap, Snapchain, and Farcaster-fork operators.",
    proof: "The prototype, source corpus, roadmap, and unfinished bot-hardening boundaries are public.",
  },
  {
    name: "OpenClaw Contributions",
    repository: "arcabotai/arca-openclaw-contributions",
    url: "https://github.com/arcabotai/arca-openclaw-contributions",
    role: "publisher",
    kind: "contribution ledger",
    license: "MIT",
    status: "live ledger",
    description:
      "A machine-readable, evidence-backed record of upstream issues, technical comments, proofs, and pull requests.",
    proof: "Every record requires a public URL. Open, closed, and merged work stay distinct.",
  },
  {
    name: "OpenClaw TUI Field Fix",
    repository: "arcabotai/openclaw-tui-deliver-stuck-spinner",
    url: "https://github.com/arcabotai/openclaw-tui-deliver-stuck-spinner",
    role: "publisher",
    kind: "diagnostic artifact",
    license: "MIT",
    status: "archived finding",
    description:
      "A root-cause write-up and runnable local patch for the OpenClaw TUI stuck-spinner delivery failure.",
    proof: "The symptom, exact version boundary, upstream trackers, patch, and reproduction are public.",
  },
];

export const clickClackMergeCredits: UpstreamMergeCredit[] = [
  {
    project: "ClickClack",
    number: 91,
    title: "feat: add integration history helpers",
    url: "https://github.com/openclaw/clickclack/pull/91",
    mergedAt: "2026-07-17T04:25:50Z",
    implementationCommit: "79d96964549d020143d50cbc4794ad460bf1ed87",
    mergeCommit: "3e1d2841a314c139c1f053605dbb6d94d9e81a07",
    originUrl: "https://github.com/openclaw/clickclack/pull/78",
    credit: "co-author",
  },
  {
    project: "ClickClack",
    number: 92,
    title: "feat: add typed agent progress events",
    url: "https://github.com/openclaw/clickclack/pull/92",
    mergedAt: "2026-07-17T04:37:02Z",
    implementationCommit: "068ce38bf1e93e8caec8090dcbc573fb4a48bf45",
    mergeCommit: "064a46fc73e11dff15cc2af03e631a28b42ddef1",
    originUrl: "https://github.com/openclaw/clickclack/pull/78",
    credit: "co-author",
  },
];

export const supportPrograms: SupportProgram[] = [
  {
    name: "OpenClaw",
    url: "https://github.com/openclaw/openclaw",
    role: "upstream contributor",
    scope: "bug reports · source diagnosis · runtime proof · pull requests",
    status: "active",
    evidence: "https://github.com/arcabotai/arca-openclaw-contributions",
    evidenceLabel: "contribution ledger",
    note: "Arca is an independent contributor, not an OpenClaw maintainer or affiliate.",
  },
  {
    name: "Hypersnap / Snapchain",
    url: "https://github.com/farcasterorg/hypersnap",
    role: "tooling maintainer · upstream reviewer",
    scope: "operator CLI · diagnostics · safe repair · requested-changes review",
    status: "active",
    evidence: "https://github.com/arcabotai/hypersnap",
    evidenceLabel: "operator toolkit",
    additionalEvidence: [
      {
        label: "review #10",
        url: "https://github.com/farcasterorg/hypersnap/pull/10#pullrequestreview-4177281968",
      },
    ],
    note: "Arca maintains independent tooling and submitted a public security/correctness review; upstream ownership stays upstream.",
  },
  {
    name: "ClickClack",
    url: "https://github.com/openclaw/clickclack",
    role: "upstream co-contributor",
    scope: "integration history helpers · typed agent progress SDK",
    status: "merged credit",
    evidence: "https://github.com/openclaw/clickclack/pull/91",
    evidenceLabel: "merged PR #91",
    additionalEvidence: [
      {
        label: "merged PR #92",
        url: "https://github.com/openclaw/clickclack/pull/92",
      },
      {
        label: "origin PR #78",
        url: "https://github.com/openclaw/clickclack/pull/78",
      },
    ],
    note: "ClickClack maintainers extracted two generic capabilities from Arca's closed connector proposal. Both merged implementation commits retain Cad's co-author credit, and both changelog entries thank @arcabotai. Arca is not a ClickClack maintainer or affiliate.",
  },
];

const fallbackLedger: OpenClawLedger = {
  generatedAt: "2026-07-13T15:14:25+00:00",
  source: "https://github.com/openclaw/openclaw",
  pullRequests: [
    {
      number: 105029,
      title: "fix(gateway): revoke attach grants on deletion",
      url: "https://github.com/openclaw/openclaw/pull/105029",
      state: "open",
      updatedAt: "2026-07-12T22:07:38Z",
      mergedAt: null,
      headSha: "fb137a71e7288e7e166a717bfec8ae8f2fecf562",
      ratingLabel: "🦞 diamond lobster",
      statusLabel: "👀 ready for maintainer look",
      arca: { workStatus: "active repair", currentWork: "Exact-head Gateway/MCP proof passes; awaiting upstream review." },
    },
    {
      number: 104893,
      title: "fix(discord): retry stale preview cleanup after final delivery",
      url: "https://github.com/openclaw/openclaw/pull/104893",
      state: "merged",
      updatedAt: "2026-07-13T10:23:31Z",
      mergedAt: "2026-07-13T10:23:28Z",
      headSha: "574cc1ea367cc3c24fd81334833988cfc4dd86c3",
      ratingLabel: "🦐 gold shrimp",
      statusLabel: null,
      arca: { workStatus: "merged", currentWork: "Merged upstream after implementation and live Discord proof." },
    },
    {
      number: 104492,
      title: "fix(gateway): preserve channel restart ownership",
      url: "https://github.com/openclaw/openclaw/pull/104492",
      state: "open",
      updatedAt: "2026-07-12T22:04:00Z",
      mergedAt: null,
      headSha: "1d7a7be25af3f4a4ef9ce2aa9c07699508cce405",
      ratingLabel: "🦪 silver shellfish",
      statusLabel: "📣 needs proof",
      arca: { workStatus: "active proof", currentWork: "Focused gateway tests pass; upstream proof boundary is being reassessed." },
    },
    {
      number: 104192,
      title: "fix(secrets): resolve active exec refs locally",
      url: "https://github.com/openclaw/openclaw/pull/104192",
      state: "closed",
      updatedAt: "2026-07-12T09:08:56Z",
      mergedAt: null,
      headSha: "02a66be2410cd70c97e7d9305024c7fb5496ea63",
      ratingLabel: "🦞 diamond lobster",
      statusLabel: "👀 ready for maintainer look",
      arca: { workStatus: "superseded", currentWork: "Closed unmerged after equivalent current-main work landed upstream." },
    },
  ],
};

const LEDGER_URL =
  "https://raw.githubusercontent.com/arcabotai/arca-openclaw-contributions/main/data/openclaw-prs.json";

export async function getOpenClawLedger(): Promise<OpenClawLedger> {
  try {
    const response = await fetch(LEDGER_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return fallbackLedger;
    const ledger = (await response.json()) as OpenClawLedger;
    if (!Array.isArray(ledger.pullRequests)) return fallbackLedger;
    return ledger;
  } catch {
    return fallbackLedger;
  }
}
