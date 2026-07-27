# Verdent Growth OS

[![CI](https://github.com/moirakk/verdent-growth-os/actions/workflows/ci.yml/badge.svg)](https://github.com/moirakk/verdent-growth-os/actions/workflows/ci.yml)

Verdent 社媒增长工作的云端工作台。它把版本更新、新模型上线和日常内容统一为一条带事实门禁的发布流程，并将内容、设计 Brief、任务素材、发布记录和复盘放在同一个任务中。

> Private and cloud-backed. 任务数据保存在 Verdent Growth OS 的私有云端工作区，本机仅保留临时缓存。

## 工作流

| 阶段 | 主要动作 | 进入下一阶段前必须完成 |
| --- | --- | --- |
| 收集 | 保存完整 Changelog、模型通知或内容资料 | 原始资料完整保留 |
| 核实 | 识别 Brief，确认事实与公开边界 | 上线状态、依据和保密范围明确 |
| 制作 | 生成平台文案、海报和视频 Brief | 启用平台内容与素材交付完成 |
| 审核 | 自动扫描并由 PM / 产品确认 | 风险处理完毕，取得发布许可 |
| 发布 | 排期、选择账号并记录 URL | 上线状态再次确认，发布完成 |
| 复盘 | 记录表现和有效经验 | 将重复证据沉淀到模板或 Skill |

## 核心能力

- 自动识别 Brief，并发现多模型或多版本串线
- 管理 X、Discord、LinkedIn、Reddit、Instagram 和 TikTok 内容
- 统一维护官网和社媒账号目录
- 使用项目内 `verdent-social-growth` Skill 生成平台原生内容包
- 管理海报、视觉和视频剪辑 Brief
- 拦截未确认上线表达、夸大词、隐私暗示、长破折号和平台格式问题
- 保存文案快照、发布链接、平台表现和复盘结论
- 自动保存到浏览器，并支持完整 JSON 备份与恢复
- 云端保存任务与账号数据，并自动迁移旧版浏览器数据
- 使用任务素材库保存图片、视频和设计文件
- 使用数据修订号拦截多设备覆盖冲突

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm ci
npm run dev
```

打开终端显示的本地地址。端口可能根据电脑上已有服务自动调整。

提交前执行完整检查：

```bash
npm run check
```

## Verdent Social Growth Skill

主入口：[skills/verdent-social-growth/SKILL.md](./skills/verdent-social-growth/SKILL.md)

```text
skills/verdent-social-growth/
├── SKILL.md                         核心执行流程
├── agents/openai.yaml               Codex 展示与触发信息
├── references/platform-guides.md    六平台规范
├── references/production-briefs.md  海报与视频交付规范
├── references/safety-and-qa.md      发布风险与 QA
├── references/observed-voice.md     当前平台内容基线
└── scripts/lint-content.mjs         确定性文案检查
```

网页中的“用 Verdent Skill 生成”会复制一份包含事实状态、Brief、启用平台和账号的结构化任务。Codex 从项目相对路径读取 Skill，因此仓库移动或重新克隆后无需修改个人电脑路径。

## 云端数据、素材与备份

- 任务、账号、文案和发布记录保存在 D1
- 图片、视频、设计稿和文档保存在 R2，文件元数据保存在 D1
- 浏览器缓存仅用于云端暂时不可用时查看最近数据
- 第一次打开云端版时，旧版浏览器任务会自动迁移
- 仍可通过侧边栏导出和恢复完整 JSON 备份
- 不要把真实用户数据、内部截图、密钥或未公开 Changelog 提交到 GitHub

更完整的执行细节见 [WORKFLOW.md](./WORKFLOW.md)，版本变化见 [CHANGELOG.md](./CHANGELOG.md)，安全边界见 [SECURITY.md](./SECURITY.md)。

## 项目状态

- 当前版本：`0.3.0`
- 使用方式：私有云端工作台
- 仓库：Private
- 数据库：Cloudflare D1
- 文件存储：Cloudflare R2
- 身份接入：当前使用站点私有访问；飞书组织登录尚待配置真实应用凭证
