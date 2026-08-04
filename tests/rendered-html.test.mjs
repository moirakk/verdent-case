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
  assert.match(page, /最近两条 Verdent 内容校准/);
  assert.match(page, /Recent-post calibration/);
  assert.match(page, /VOICE SAMPLE MISSING/);
  assert.match(page, /2080810458714681819/);
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

test("protects every workspace and asset API with ChatGPT identity", async () => {
  const routes = await Promise.all([
    readFile(new URL("../app/api/workspace/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/assets/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/assets/file/route.ts", import.meta.url), "utf8"),
  ]);

  for (const route of routes) {
    assert.match(route, /import \{ getChatGPTUser \} from "@\/app\/chatgpt-auth"/);
    assert.match(route, /const user = await getChatGPTUser\(\)/);
    assert.match(route, /if \(!user\)[\s\S]*status: 401/);
  }

  assert.equal(routes[0].match(/const user = await getChatGPTUser\(\)/g)?.length, 2);
  assert.equal(routes[1].match(/const user = await getChatGPTUser\(\)/g)?.length, 2);
  assert.equal(routes[2].match(/const user = await getChatGPTUser\(\)/g)?.length, 1);
});

test("requires confirmation before migrating local data into an empty cloud workspace", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /const hasLocalContent = localTasks\.length > 0 \|\| localPending/);
  assert.match(page, /conflictRef\.current = 0/);
  assert.match(page, /系统不会自动迁移/);
  assert.match(page, /将本设备内容保存到云端/);
  assert.match(page, /if \(creatingTaskRef\.current\) return/);
  assert.match(page, /seen\.has\(task\.id\)/);
});
