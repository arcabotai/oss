import assert from "node:assert/strict";

const licensed = [
  "arcabotai/a3stack",
  "arcabotai/hypersnap",
  "arcabotai/arca-openclaw-contributions",
  "arcabotai/openclaw-tui-deliver-stuck-spinner",
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

for (const repository of licensed) {
  const license = await github(`repos/${repository}/license`);
  assert.equal(license.license?.spdx_id, "MIT", `${repository}: expected MIT license`);
}

for (const number of prs) {
  const pr = await github(`repos/openclaw/openclaw/pulls/${number}`);
  const state = pr.merged_at ? "merged" : pr.state;
  assert.ok(["open", "closed", "merged"].includes(state), `PR #${number}: invalid state ${state}`);
}

console.log(`Verified ${licensed.length} licensed repositories and ${prs.length} upstream PR records.`);
