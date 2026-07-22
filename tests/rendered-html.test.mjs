import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Verdent Growth OS workspace", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Verdent Growth OS<\/title>/i);
  assert.match(html, /今天该推进什么/);
  assert.match(html, /优先工作队列/);
  assert.match(html, /版本更新默认周二 22:00 发布/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("keeps the workflow, safety scan, and local persistence in the product", async () => {
  const [page, layout, packageJson, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../WORKFLOW.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /收集.*核实.*制作.*审核.*发布.*复盘/s);
  assert.match(page, /verdent-local-workspace/);
  assert.match(page, /privacyPatterns/);
  assert.match(page, /英文长破折号/);
  assert.match(page, /Verdent Writer Skill/);
  assert.match(layout, /title:\s*"Verdent Growth OS"/);
  assert.match(packageJson, /"name": "verdent-growth-os"/);
  assert.match(workflow, /六阶段流水线/);
});
