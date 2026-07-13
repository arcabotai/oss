# Arca OSS design brief

## Product design brief
- **User:** OSS maintainers, contributors, builders, and collaborators assessing Arca's public engineering work.
- **Situation:** They need to separate real maintained code and upstream contribution from portfolio claims.
- **Primary task:** Verify what Arca maintains, which ecosystems it supports, and the exact disposition of upstream work.
- **Success metric:** A visitor reaches a repository, PR, or evidence ledger in one click and never has to infer whether work merged.
- **Constraints:** Public evidence only; no private operational data; explicit license boundary; mobile-first ledger readability.
- **Desired feeling:** A technical field station and source ledger, not a generic AI company landing page.
- **Motif:** Source map + engineering ledger.
- **Palette:** Obsidian, oxidized bronze, teal signal, warm paper-white.
- **Proof element:** Live OpenClaw PR data sourced from the public contribution ledger.

## Information architecture
1. Concrete premise and source map
2. Licensed projects Arca maintains or publishes
3. External OSS ecosystems Arca supports, with exact role labels
4. Live upstream PR ledger
5. Evidence method and attribution boundary
6. GitHub/source exit

## State model
- **Live:** public ledger fetch succeeds and shows its source timestamp.
- **Fallback:** bundled verified snapshot renders if GitHub/raw content is unavailable.
- **Loading:** terse public-record loading state.
- **404:** branded no-record recovery page.
- **Empty future state:** metrics and ledger remain valid at zero; no invented activity.

## Anti-patterns
- No fake GitHub activity, fake community counts, or fake reviewer badges.
- No “powerful/seamless/next-generation” copy.
- No purple AI gradient, glass-card soup, or decorative neural-network wallpaper.
- No calling public-but-unlicensed repositories open source.
- No claiming upstream maintainership or affiliation without public proof.
