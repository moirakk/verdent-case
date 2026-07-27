import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("emits the Cloudflare deployment entrypoints and migration bundle", async () => {
  await Promise.all([
    access(new URL("../dist/server/index.js", import.meta.url)),
    access(new URL("../dist/.openai/hosting.json", import.meta.url)),
    access(new URL("../dist/.openai/drizzle/0000_daily_the_twelve.sql", import.meta.url)),
  ]);
});

test("keeps the workflow, safety scan, and cloud persistence in the product", async () => {
  const [page, layout, packageJson, workflow, hosting, schema, assetRoute] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../WORKFLOW.md", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/assets/route.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /收集.*核实.*制作.*审核.*发布.*复盘/s);
  assert.match(page, /verdent-local-workspace/);
  assert.match(page, /verdent-social-accounts/);
  assert.match(page, /verdent-workspace-cache-v3/);
  assert.match(page, /已保存到云端/);
  assert.match(page, /任务素材/);
  assert.match(page, /Instagram/);
  assert.match(page, /TikTok/);
  assert.match(page, /社媒账号中心/);
  assert.match(page, /privacyPatterns/);
  assert.match(page, /英文长破折号/);
  assert.match(page, /Verdent Social Growth Skill/);
  assert.match(page, /DRAFT — DO NOT PUBLISH/);
  assert.match(page, /未确认上线表述/);
  assert.match(page, /标准流程/);
  assert.match(page, /紧急流程/);
  assert.match(page, /任务模板/);
  assert.match(page, /回收站/);
  assert.match(page, /北京时间/);
  assert.match(page, /直接生成英文初稿/);
  assert.match(page, /整体互动率/);
  assert.match(assetRoute, /mode.*chunk/s);
  assert.match(assetRoute, /MAX_CHUNK_BYTES/);
  assert.match(layout, /"Verdent Growth OS"/);
  assert.match(layout, /og\.png/);
  assert.match(packageJson, /"name": "verdent-growth-os"/);
  assert.match(hosting, /"d1": "DB"/);
  assert.match(hosting, /"r2": "FILES"/);
  assert.match(schema, /workspaceState/);
  assert.match(schema, /assets/);
  assert.match(workflow, /六阶段流水线/);
  assert.match(workflow, /skills\/verdent-social-growth\/SKILL\.md/);
});
