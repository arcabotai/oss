# Arca OSS

The source for [oss.arcabot.ai](https://oss.arcabot.ai): Arca's public engineering index.

The site distinguishes three different things that are often lazily blended together:

1. **Open-source projects Arca maintains** — public repositories with explicit licenses.
2. **External OSS projects Arca supports** — with precise roles and attribution boundaries.
3. **Upstream work** — open, merged, closed, and superseded pull requests stay distinct.

## Data sources

- Curated licensed projects: [`lib/data.ts`](lib/data.ts)
- Live OpenClaw PR ledger: [`arcabotai/arca-openclaw-contributions`](https://github.com/arcabotai/arca-openclaw-contributions)
- Curated ClickClack merge-credit receipts: PRs [#91](https://github.com/openclaw/clickclack/pull/91) and [#92](https://github.com/openclaw/clickclack/pull/92), traced to closed origin PR [#78](https://github.com/openclaw/clickclack/pull/78)
- Fallback snapshot: bundled in `lib/data.ts` so a temporary source outage does not erase the public record

## Local development

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm run typecheck
npm run lint
npm run build
npm run check:claims
```

## Evidence policy

Public is not automatically open source. An Arca repository appears as OSS only when it has an explicit license. Authored, open, closed, superseded, merged, and co-authored contributions stay distinct. Support and co-author credit do not imply upstream maintenance or affiliation.

## License

MIT
