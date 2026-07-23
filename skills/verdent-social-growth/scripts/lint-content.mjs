#!/usr/bin/env node

import fs from "node:fs";

const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : "";
};

const platform = valueAfter("--platform").toLowerCase();
const status = valueAfter("--status").toLowerCase() || "pending";
const inlineText = valueAfter("--text");
const file = args.find((arg, index) => !arg.startsWith("--") && args[index - 1] !== "--platform" && args[index - 1] !== "--status" && args[index - 1] !== "--text");

if (!platform || (!inlineText && !file)) {
  console.error("Usage: node lint-content.mjs --platform <platform> --status <confirmed|pending> <file>");
  process.exit(2);
}

const text = inlineText || fs.readFileSync(file, "utf8");
const failures = [];
const warnings = [];
const addMatch = (list, label, pattern) => {
  const match = text.match(pattern);
  if (match) list.push(`${label}: ${match[0]}`);
};

addMatch(failures, "Em dash", /—/);
addMatch(failures, "Unapproved privacy implication", /we looked at user data|our data shows|we analyzed (?:user )?.*sessions|we tracked user behavior|our users['’] data/i);
addMatch(failures, "Banned marketing phrase", /game[- ]changer|revolutionary|unleash|seamlessly|excited to share|thrilled|delighted|cutting[- ]edge|best[- ]in[- ]class|\bsynergy\b/i);

if (status !== "confirmed") {
  addMatch(failures, "Unconfirmed availability claim", /\b(?:is live|available now|now supports|try .{0,60} now)\b/i);
}

addMatch(warnings, "Unresolved placeholder", /\[(?:CONFIRM|TBD)[^\]]*\]|待确认|TBC/i);

if (platform === "x" && [...text].length > 280 && !args.includes("--long")) {
  failures.push(`X length: ${[...text].length} characters`);
}
if (platform === "reddit" && (!/Reddit Title:/i.test(text) || !/Reddit Body:/i.test(text))) {
  failures.push("Reddit requires separate Title and Body sections");
}
if (platform === "instagram" || platform === "tiktok") {
  const hashtagCount = (text.match(/#[\p{L}\p{N}_]+/gu) || []).length;
  const max = platform === "instagram" ? 10 : 6;
  if (hashtagCount > max) warnings.push(`${platform} has ${hashtagCount} hashtags; review relevance`);
}

console.log(`Platform: ${platform}`);
console.log(`Status: ${status}`);
console.log(`Failures: ${failures.length}`);
failures.forEach((item) => console.log(`FAIL ${item}`));
warnings.forEach((item) => console.log(`WARN ${item}`));
if (!failures.length) console.log("PASS automated checks");

process.exit(failures.length ? 1 : 0);
