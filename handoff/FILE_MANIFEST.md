# 文件索引

## 交接入口

- `handoff/START_HERE.md`：接手顺序。
- `handoff/PROJECT_HANDOFF.md`：完整产品与工程进度。
- `handoff/VERDENT_CONTINUATION_PROMPT.md`：交给 Verdent 的续作任务。
- `handoff/STATUS_SNAPSHOT.json`：机器可读状态。

## 产品与流程

- `README.md`：项目概览、本地运行、云端数据。
- `WORKFLOW.md`：六阶段社媒增长工作流。
- `CHANGELOG.md`：0.1.0 至 0.4.1 版本历史。
- `SECURITY.md`：数据和安全边界。

## 主应用

- `app/page.tsx`：主工作台、任务数据结构、自动识别、生成、审核、排期、复盘、上传和界面。
- `app/globals.css`：整体视觉和响应式布局。
- `app/layout.tsx`：页面元信息与根布局。
- `app/chatgpt-auth.ts`：当前站点身份相关入口。

## 云端 API

- `app/api/workspace/route.ts`：D1 工作区读取、保存和修订冲突保护。
- `app/api/assets/route.ts`：R2 素材上传、分片上传和素材列表。
- `app/api/assets/file/route.ts`：素材私有读取与分片流式组合。
- `app/api/integrations/route.ts`：外部平台连接后端草稿，尚未上线。

## 数据库

- `db/schema.ts`：Drizzle 数据模型。
- `db/index.ts`：数据库入口。
- `drizzle/0000_daily_the_twelve.sql`：工作区与素材表初始迁移。
- `drizzle/0001_supreme_lyja.sql`：外部平台快照表迁移，交接工作区新增。
- `drizzle/meta/*`：迁移元数据。

## 内容 Skill

- `skills/verdent-social-growth/SKILL.md`：主内容执行流程。
- `skills/verdent-social-growth/references/platform-guides.md`：六平台规范。
- `skills/verdent-social-growth/references/production-briefs.md`：海报和视频 Brief。
- `skills/verdent-social-growth/references/safety-and-qa.md`：发布安全与 QA。
- `skills/verdent-social-growth/references/observed-voice.md`：有日期的近期语气基线。
- `skills/verdent-social-growth/scripts/lint-content.mjs`：确定性文案检查。

## 构建、部署与测试

- `package.json`：版本、依赖和命令。
- `package-lock.json`：锁定依赖。
- `next.config.ts`、`vite.config.ts`：构建配置。
- `worker/index.ts`：Cloudflare Worker 入口。
- `.openai/hosting.json`：现有 Sites 项目及 D1/R2 绑定，必须复用。
- `drizzle.config.ts`：迁移生成配置。
- `tests/rendered-html.test.mjs`：现有构建与核心功能回归测试。
- `.env.example`：外部平台服务端变量名模板，无真实值。

## 不应交接或提交的内容

- `node_modules/`
- `dist/`
- `.next/`
- `.vinext/`
- `.wrangler/`
- 真实 `.env` 或任何 Token
- 私有工作区 JSON 备份
- 未公开 Changelog、截图、录屏或用户数据

