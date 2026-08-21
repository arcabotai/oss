import { writeFile } from 'node:fs/promises';

const url = 'https://raw.githubusercontent.com/arcabotai/arca-openclaw-contributions/main/data/openclaw-prs.json';
const response = await fetch(url, { headers: { 'User-Agent': 'arcacomputer-oss-refresh' } });
if (!response.ok) throw new Error(`OpenClaw ledger returned ${response.status}`);
const ledger = await response.json();
if (!Array.isArray(ledger.pullRequests)) throw new Error('OpenClaw ledger has no pullRequests array');
await writeFile(new URL('../public/openclaw-prs.json', import.meta.url), `${JSON.stringify(ledger, null, 2)}\n`);
console.log(`Refreshed ${ledger.pullRequests.length} OpenClaw PR records.`);
