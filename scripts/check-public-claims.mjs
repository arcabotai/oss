import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const licensed = [
  { repository: "arcabotai/a3stack", spdx: "MIT" },
  { repository: "arcabotai/hypersnap", spdx: "MIT" },
  { repository: "arcabotai/ardea-knowledge-steward", contains: "Apache License\nVersion 2.0" },
  { repository: "arcabotai/arca-openclaw-contributions", spdx: "MIT" },
  { repository: "arcabotai/openclaw-tui-deliver-stuck-spinner", spdx: "MIT" },
];

const prs = [104192, 104492, 104893, 105029];
const founderMergedPr = {
  number: 107243,
  author: "felirami",
  headSha: "e35ddb3ce365c07419365d5b799bbb45b65ac38e",
  mergeCommit: "c1191cdf2fbbea4cc9797d7f110a4e0acf50d3c7",
};
const clickClackMergeCredits = [
  {
    number: 91,
    implementationCommit: "79d96964549d020143d50cbc4794ad460bf1ed87",
    mergeCommit: "3e1d2841a314c139c1f053605dbb6d94d9e81a07",
    changelogText: "Added SDK helpers for paginated realtime recovery and bounded latest thread-history windows. Thanks @arcabotai",
  },
  {
    number: 92,
    implementationCommit: "068ce38bf1e93e8caec8090dcbc573fb4a48bf45",
    mergeCommit: "064a46fc73e11dff15cc2af03e631a28b42ddef1",
    changelogText: "Added typed agent-progress SDK payloads while preserving workspace-wide presence events without channel or DM targets. Thanks @arcabotai",
  },
];
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "arca-oss-claim-validator",
  ...((process.env.GH_TOKEN || process.env.GITHUB_TOKEN)
    ? { Authorization: `Bearer ${process.env.GH_TOKEN || process.env.GITHUB_TOKEN}` }
    : {}),
};

async function github(path) {
  const response = await fetch(`https://api.github.com/${path}`, { headers });
  assert.equal(response.ok, true, `${path}: GitHub returned ${response.status}`);
  return response.json();
}

async function githubText(path) {
  const response = await fetch(`https://api.github.com/${path}`, {
    headers: { ...headers, Accept: "application/vnd.github.raw+json" },
  });
  assert.equal(response.ok, true, `${path}: GitHub returned ${response.status}`);
  return response.text();
}

for (const expected of licensed) {
  if (expected.spdx) {
    const license = await github(`repos/${expected.repository}/license`);
    assert.equal(license.license?.spdx_id, expected.spdx, `${expected.repository}: expected ${expected.spdx} license`);
  } else {
    const license = await githubText(`repos/${expected.repository}/contents/LICENSE`);
    assert.ok(license.includes(expected.contains), `${expected.repository}: expected explicit Apache-2.0 license notice`);
  }
}

for (const number of prs) {
  const pr = await github(`repos/openclaw/openclaw/pulls/${number}`);
  const state = pr.merged_at ? "merged" : pr.state;
  assert.ok(["open", "closed", "merged"].includes(state), `PR #${number}: invalid state ${state}`);
}

const founderPr = await github(`repos/openclaw/openclaw/pulls/${founderMergedPr.number}`);
assert.ok(founderPr.merged_at, `OpenClaw PR #${founderMergedPr.number}: expected merged state`);
assert.equal(founderPr.user?.login, founderMergedPr.author, `OpenClaw PR #${founderMergedPr.number}: author changed`);
assert.equal(founderPr.head?.sha, founderMergedPr.headSha, `OpenClaw PR #${founderMergedPr.number}: head changed`);
assert.equal(founderPr.merge_commit_sha, founderMergedPr.mergeCommit, `OpenClaw PR #${founderMergedPr.number}: merge commit changed`);

const publicLedger = JSON.parse(
  await githubText("repos/arcabotai/arca-openclaw-contributions/contents/data/openclaw-prs.json?ref=main"),
);
assert.equal(publicLedger.pullRequests?.length, 9, "OpenClaw public ledger: expected 9 Arca-era PRs");
assert.ok(publicLedger.authors?.some((identity) => identity.login === "arcabotai"), "OpenClaw public ledger: arcabotai identity missing");
assert.ok(publicLedger.authors?.some((identity) => identity.login === "felirami" && identity.since === "2026-02-12"), "OpenClaw public ledger: scoped felirami identity missing");
assert.ok(
  publicLedger.pullRequests.some((pr) => pr.number === founderMergedPr.number && pr.author === "felirami" && pr.state === "merged"),
  `OpenClaw public ledger: merged founder PR #${founderMergedPr.number} missing`,
);
assert.ok(
  !publicLedger.pullRequests.some((pr) => [4429, 4432, 4434].includes(pr.number)),
  "OpenClaw public ledger: pre-Arca personal PRs must stay excluded",
);

for (const expected of clickClackMergeCredits) {
  const pr = await github(`repos/openclaw/clickclack/pulls/${expected.number}`);
  assert.ok(pr.merged_at, `ClickClack PR #${expected.number}: expected merged state`);
  assert.equal(pr.merge_commit_sha, expected.mergeCommit, `ClickClack PR #${expected.number}: merge commit changed`);
  assert.equal(pr.user?.login, "steipete", `ClickClack PR #${expected.number}: expected maintainer-authored replacement PR`);
  assert.ok(pr.body?.includes("#78") || pr.body?.includes("pull/78"), `ClickClack PR #${expected.number}: origin PR #78 credit missing`);
  assert.ok(pr.body?.includes("@arcabotai"), `ClickClack PR #${expected.number}: @arcabotai credit missing`);

  const commit = await github(`repos/openclaw/clickclack/commits/${expected.implementationCommit}`);
  assert.ok(
    commit.commit?.message?.includes("Co-authored-by: Cad from Arca <cad@arcabot.ai>"),
    `ClickClack PR #${expected.number}: Cad co-author trailer missing`,
  );
}

const clickClackChangelog = await githubText("repos/openclaw/clickclack/contents/CHANGELOG.md?ref=main");
for (const expected of clickClackMergeCredits) {
  assert.ok(
    clickClackChangelog.includes(expected.changelogText),
    `ClickClack PR #${expected.number}: changelog credit missing`,
  );
}

const reviews = await github("repos/farcasterorg/hypersnap/pulls/10/reviews");
const review = reviews.find((item) => item.user?.login === "arcabotai");
assert.ok(review, "Hypersnap PR #10: arcabotai review not found");
assert.equal(review.state, "CHANGES_REQUESTED", "Hypersnap PR #10: expected CHANGES_REQUESTED review");
assert.equal(
  review.html_url,
  "https://github.com/farcasterorg/hypersnap/pull/10#pullrequestreview-4177281968",
  "Hypersnap PR #10: review URL changed",
);

const hypersnapPr = await github("repos/farcasterorg/hypersnap/pulls/10");
assert.ok(hypersnapPr.merged_at, "Hypersnap PR #10: expected merged upstream PR");

const activity = JSON.parse(
  await readFile(new URL("../public/activity.json", import.meta.url), "utf8"),
);
const activityTypes = new Set([
  "upstream_pr_state",
  "upstream_credit",
  "release",
  "project_published",
  "review_submitted",
]);
assert.equal(activity.schemaVersion, 1, "Public activity: unsupported schema version");
assert.equal(activity.cadence, "every 6 hours", "Public activity: cadence changed");
assert.ok(activity.events.length > 0 && activity.events.length <= 50, "Public activity: expected 1-50 bounded events");
assert.equal(new Set(activity.events.map((event) => event.id)).size, activity.events.length, "Public activity: duplicate event IDs");
for (const [index, event] of activity.events.entries()) {
  assert.ok(activityTypes.has(event.type), `Public activity ${event.id}: unsupported type`);
  assert.match(event.url, /^https:\/\/github\.com\//, `Public activity ${event.id}: evidence URL must be public GitHub`);
  assert.ok(!Number.isNaN(Date.parse(event.occurredAt)), `Public activity ${event.id}: invalid timestamp`);
  if (index > 0) {
    assert.ok(
      activity.events[index - 1].occurredAt >= event.occurredAt,
      `Public activity ${event.id}: events are not newest first`,
    );
  }
  if (event.type === "upstream_pr_state") {
    assert.ok(!event.repository.startsWith("arcabotai/"), `Public activity ${event.id}: internal arcabotai PR leaked upstream`);
    assert.ok(!event.repository.startsWith("felirami/"), `Public activity ${event.id}: internal felirami PR leaked upstream`);
  }
}
assert.ok(
  activity.events.some(
    (event) => event.repository === "openclaw/openclaw" && event.number === 107243 && event.actor === "felirami" && event.state === "merged",
  ),
  "Public activity: merged founder OpenClaw receipt missing",
);
assert.deepEqual(
  activity.events
    .filter((event) => event.type === "upstream_credit" && event.repository === "openclaw/clickclack")
    .map((event) => event.number)
    .sort((a, b) => a - b),
  [91, 92],
  "Public activity: ClickClack merged credits changed",
);
assert.ok(
  activity.events.some(
    (event) => event.type === "review_submitted" && event.repository === "farcasterorg/hypersnap" && event.number === 10,
  ),
  "Public activity: Hypersnap review receipt missing",
);

console.log(
  `Verified ${licensed.length} licensed repositories, ${prs.length} sampled OpenClaw PR records, ` +
    `1 merged founder PR, ${publicLedger.pullRequests.length} live ledger records, ` +
    `${activity.events.length} public activity events, ${clickClackMergeCredits.length} merged ClickClack co-author credits, and 1 upstream review.`,
);
