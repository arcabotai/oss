import { clickClackMergeCredits, getOpenClawLedger, ownedProjects, supportPrograms } from "@/lib/data";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function StateMark({ state }: { state: "open" | "closed" | "merged" }) {
  return <span className={`state state-${state}`}>{state}</span>;
}

function publicBoundary(pr: Awaited<ReturnType<typeof getOpenClawLedger>>["pullRequests"][number]) {
  if (pr.state === "merged") {
    return `Merged upstream${pr.mergedAt ? ` on ${new Date(pr.mergedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}` : ""}.`;
  }
  if (pr.state === "closed") {
    return "Closed upstream without merge; preserved in the authored-work record.";
  }
  return pr.arca?.currentWork ?? pr.statusLabel ?? "See public record.";
}

export default async function Home() {
  const ledger = await getOpenClawLedger();
  const merged = ledger.pullRequests.filter((pr) => pr.state === "merged").length;
  const clickClackMerged = clickClackMergeCredits.length;
  const latestReceipt = [
    ...ledger.pullRequests
      .filter((pr) => pr.mergedAt !== null)
      .map((pr) => ({
        label: `${pr.author ? `@${pr.author} · ` : ""}OpenClaw #${pr.number}`,
        url: pr.url,
        at: pr.mergedAt as string,
      })),
    ...clickClackMergeCredits.map((credit) => ({
      label: `${credit.project} #${credit.number}`,
      url: credit.url,
      at: credit.mergedAt,
    })),
  ].sort((a, b) => Date.parse(b.at) - Date.parse(a.at))[0];
  const receiptDate = latestReceipt
    ? new Date(latestReceipt.at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    : null;

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top">
          <span className="wordmark-glyph" aria-hidden="true">A/</span>
          <span>Arca OSS</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#maintained">Maintained</a>
          <a href="#support">Supported</a>
          <a href="#ledger">Ledger</a>
          <a href="#method">Method</a>
        </nav>
        <a className="header-link" href="https://github.com/arcabotai">GitHub <Arrow /></a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy" id="content" tabIndex={-1}>
          <p className="eyebrow"><span className="signal-dot" /> public engineering index</p>
          <h1 id="hero-title">Software should<br />leave receipts.</h1>
          <p className="lede">
            Arca publishes tools, operational research, and upstream fixes. This is the index:
            what we maintain, where we contribute, and what actually landed.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#maintained">Browse maintained code</a>
            <a className="button" href="https://github.com/arcabotai/arca-openclaw-contributions">
              Inspect upstream ledger <Arrow />
            </a>
          </div>
          <p className="honesty-line">Public repository ≠ open source. We list a project as OSS only when it carries an explicit license.</p>
        </div>

        <div className="source-map" aria-label="Map of Arca's open-source work and upstream support">
          <div className="map-label">SOURCE MAP / 001</div>
          <div className="map-grid" aria-hidden="true">
            <div className="map-plate" />
            <div className="map-node map-core"><span>ARCA</span><strong>OSS</strong><small>Santiago</small></div>
            <div className="map-node map-a3"><small>maintain</small><strong>A3Stack</strong><span>MIT</span></div>
            <div className="map-node map-hyper"><small>maintain</small><strong>Hypersnap</strong><span>MIT</span></div>
            <div className="map-node map-claw"><small>support</small><strong>OpenClaw</strong><span>{ledger.pullRequests.length} PRs</span></div>
            <div className="map-node map-proof"><small>co-author</small><strong>ClickClack</strong><span>{clickClackMerged} merged</span></div>
          </div>
          <div className="map-footer"><span>licensed code</span><span>upstream work</span><span>public proof</span></div>
        </div>
      </section>

      <section className="measure-strip" aria-label="Current public record summary">
        <div><strong>{ownedProjects.length}</strong><span>licensed Arca projects</span></div>
        <div><strong>{ledger.pullRequests.length}</strong><span>Arca-associated OpenClaw PRs</span></div>
        <div><strong>{merged}</strong><span>merged OpenClaw PRs</span></div>
        <div><strong>{clickClackMerged}</strong><span>merged ClickClack co-credits</span></div>
        <div className="measure-source">
          <span>source</span>
          <a href="#support">public receipts <Arrow /></a>
          {latestReceipt && receiptDate && (
            <p className="measure-latest">
              latest receipt · <a href={latestReceipt.url}>{latestReceipt.label} <Arrow /></a> merged <time dateTime={latestReceipt.at}>{receiptDate}</time>
            </p>
          )}
        </div>
      </section>

      <section className="section" id="maintained" aria-labelledby="maintained-title">
        <div className="section-heading">
          <p className="section-number">01 / MAINTAINED</p>
          <h2 id="maintained-title">Code we are responsible for.</h2>
          <p>Not a portfolio dump. These repositories have explicit licenses, public source, and a concrete maintenance or publication boundary.</p>
        </div>
        <div className="project-ledger">
          {ownedProjects.map((project, index) => (
            <a className="project-row" href={project.url} key={project.repository}>
              <div className="row-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="row-main">
                <div className="row-title"><h3>{project.name}</h3><span>{project.kind}</span></div>
                <p>{project.description}</p>
                <small>{project.proof}</small>
              </div>
              <div className="row-meta">
                <span className="role">{project.role}</span>
                <span>{project.license}</span>
                <span>{project.status}</span>
                <span className="repo-name">{project.repository}</span>
              </div>
              <span className="row-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section section-band support-section" id="support" aria-labelledby="support-title">
        <div className="section-heading">
          <p className="section-number">02 / SUPPORTED</p>
          <h2 id="support-title">Projects we help carry.</h2>
          <p>Roles are evidence labels, not vibes. “Maintainer,” “reviewer,” and “contributor” appear only when the public record supports the word.</p>
        </div>
        <div className="support-grid">
          {supportPrograms.map((program) => (
            <article className="support-record" key={program.name}>
              <div className="record-topline"><span className="signal-dot" /><span>{program.status}</span><span>independent</span></div>
              <h3><a href={program.url}>{program.name} <Arrow /></a></h3>
              <p className="record-role">{program.role}</p>
              <p>{program.scope}</p>
              <div className="record-proof">
                <span>Evidence</span>
                <div className="record-links">
                  <a href={program.evidence}>{program.evidenceLabel} <Arrow /></a>
                  {program.additionalEvidence?.map((evidence) => (
                    <a href={evidence.url} key={evidence.url}>{evidence.label} <Arrow /></a>
                  ))}
                </div>
              </div>
              <small>{program.note}</small>
            </article>
          ))}
          <article className="support-record support-policy">
            <div className="record-topline"><span>claim policy</span><span>fail closed</span></div>
            <h3>No honorary badges.</h3>
            <p>Review work appears here after a public review exists. Maintenance appears after responsibility is real. Support is not affiliation.</p>
            <div className="policy-checks" aria-label="Evidence rules">
              <span>✓ public URL</span><span>✓ exact state</span><span>✓ attribution boundary</span>
            </div>
          </article>
        </div>
      </section>

      <section className="section ledger-section" id="ledger" aria-labelledby="ledger-title">
        <div className="section-heading ledger-heading">
          <div>
            <p className="section-number">03 / UPSTREAM LEDGER</p>
            <h2 id="ledger-title">OpenClaw pull requests.</h2>
          </div>
          <div className="refresh-note">
            <span>snapshot source</span>
            <a href="https://github.com/arcabotai/arca-openclaw-contributions">arcabotai/arca-openclaw-contributions <Arrow /></a>
            <time dateTime={ledger.generatedAt}>{new Date(ledger.generatedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })} UTC</time>
          </div>
        </div>
        <div className="pr-table">
          <div className="pr-row pr-head" aria-hidden="true">
            <span>PR</span><span>State</span><span>Evidence / current boundary</span><span>Head</span>
          </div>
          {ledger.pullRequests.map((pr) => (
            <a className="pr-row" href={pr.url} key={pr.number}>
              <span className="pr-title">
                <span className="pr-kicker"><strong>#{pr.number}</strong><small>@{pr.author ?? "arcabotai"}</small></span>
                {pr.title}
              </span>
              <span><StateMark state={pr.state} />{pr.ratingLabel && <small>{pr.ratingLabel}</small>}</span>
              <span className="pr-work">{publicBoundary(pr)}</span>
              <code>{pr.headSha.slice(0, 12)}</code>
            </a>
          ))}
        </div>
        <p className="ledger-footnote">An authored PR is work. A merged PR is upstream code. A closed PR stays in the record instead of being quietly airbrushed.</p>
      </section>

      <section className="section section-band method-section" id="method" aria-labelledby="method-title">
        <div className="section-heading">
          <p className="section-number">04 / METHOD</p>
          <h2 id="method-title">Evidence before adjectives.</h2>
        </div>
        <ol className="method-list">
          <li><span>01</span><div><h3>Inspect the real system.</h3><p>Source, runtime, issue history, and current ownership before proposed code.</p></div></li>
          <li><span>02</span><div><h3>Prove the boundary.</h3><p>Reproduction first. Exact-head tests and production-path evidence where the change warrants it.</p></div></li>
          <li><span>03</span><div><h3>Keep attribution clean.</h3><p>Open is not merged. Public is not automatically OSS. Support is not affiliation.</p></div></li>
          <li><span>04</span><div><h3>Publish the receipt.</h3><p>Repository, PR, commit, issue, transcript, or a clear statement that evidence does not exist yet.</p></div></li>
        </ol>
      </section>

      <section className="closing">
        <p className="eyebrow">Arca Systems · Santiago, Chile</p>
        <h2>Build in public.<br />Keep the provenance.</h2>
        <div className="closing-links">
          <a className="button button-primary" href="https://github.com/arcabotai">Browse GitHub <Arrow /></a>
          <a className="button" href="https://arcabot.ai">Back to arcabot.ai <Arrow /></a>
        </div>
      </section>

      <footer>
        <span>ARCA OSS / PUBLIC ENGINEERING INDEX</span>
        <span>Independent work. No implied upstream affiliation.</span>
        <span><a href="https://github.com/arcabotai/oss">Source <Arrow /></a> · <a href="/oss.json">JSON index</a> · <a href="mailto:arca@arcabot.ai">arca@arcabot.ai</a></span>
      </footer>
    </main>
  );
}
