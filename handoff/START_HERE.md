# Verdent Growth OS 交接入口

交接日期：2026-07-27（北京时间）

## 先看这四个文件

1. `PROJECT_HANDOFF.md`：产品目标、所有已完成能力、架构、数据、安全边界和后续路线。
2. `VERDENT_CONTINUATION_PROMPT.md`：在 Verdent 中继续开发时直接粘贴的完整 Prompt。
3. `FILE_MANIFEST.md`：关键代码与文档位置。
4. `STATUS_SNAPSHOT.json`：机器可读的版本和状态快照。

## 当前两个版本必须分清

- **线上稳定版**：`v0.4.1`，Git 提交 `8a2dc849164c5ce4732c86c354dec9c58e0a1329`。
- **交接工作区**：在线上稳定版之上，增加了“外部平台连接”的后端骨架、数据库表和环境变量模板。它已通过编译和现有测试，但还没有管理界面、真实凭证和真实平台联调，因此不能视为已完成功能。

线上私有地址：

`https://verdent-growth-os.moirahou1.chatgpt.site`

## 在 Verdent 中接手

1. 解压交接包并把整个项目目录交给 Verdent。
2. 让 Verdent 先读取本文件、`PROJECT_HANDOFF.md`、`VERDENT_CONTINUATION_PROMPT.md`、`README.md`、`WORKFLOW.md` 和 `SECURITY.md`。
3. 把 `VERDENT_CONTINUATION_PROMPT.md` 的全文作为新任务 Prompt。
4. 第一轮只要求 Verdent完成代码审计和本地验证，不要立刻部署。
5. 真实密钥只配置到托管平台的服务端 Secret，不写进代码、聊天、截图或 Git。

## 本地验证

要求 Node.js 22.13 或更高版本。

```bash
npm ci
npm run check
npm run dev
```

当前交接工作区执行 `npm run check` 的结果：通过（lint、build、2 项测试全部通过）。

