import assert from "node:assert/strict";

const licensed = [
  { repository: "arcabotai/a3stack", spdx: "MIT" },
  { repository: "arcabotai/hypersnap", spdx: "MIT" },
  { repository: "arcabotai/ardea-knowledge-steward", contains: "Apache License\nVersion 2.0" },
  { repository: "arcabotai/arca-openclaw-contributions", spdx: "MIT" },
  { repository: "arcabotai/openclaw-tui-deliver-stuck-spinner", spdx: "MIT" },
];

const prs = [104192, 104492, 104893, 105029];
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "arca-oss-claim-validator",
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

console.log(`Verified ${licensed.length} licensed repositories, ${prs.length} upstream PR records, and 1 upstream review.`);
