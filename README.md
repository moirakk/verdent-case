# Verdent Growth OS

Verdent 社媒增长工作的本地单人工作台。它把产品版本更新、新模型上线和日常内容统一为一条带事实门禁的发布流程：收集、核实、制作、审核、发布、复盘。

## 核心能力

- 粘贴 Changelog 或模型通知后自动识别 Brief
- 检测多模型主体混入同一任务的风险
- 管理 X、Discord、LinkedIn、Reddit、Instagram、TikTok 六个平台文案
- 集中维护官网和全部社媒账号，任务发布时直接选择目标账号
- 使用项目内 Verdent Social Growth Skill 生成可审核的 Codex 指令
- 管理海报 Brief、视频剪辑 Brief、排期和发布链接
- 自动扫描夸大营销词、隐私数据暗示、英文长破折号等风险
- 使用发布门禁防止未确认事实提前流入下一阶段
- 记录平台表现、复盘结论和内容快照
- 浏览器本地自动保存，并支持 JSON 备份与恢复

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

然后打开开发服务显示的本地地址。

## 数据与隐私

任务数据和社媒账号目录只保存在当前浏览器的 `localStorage` 中，不会自动上传到外部服务。建议每周通过侧边栏导出一次 JSON 备份；备份会同时包含任务与账号配置。`.env`、密钥文件和本地构建产物已被 Git 忽略。

## Verdent Social Growth Skill

“用 Verdent Skill 生成”会生成结构化任务指令，并调用项目内自有 Skill：

```text
skills/verdent-social-growth/SKILL.md
```

该 Skill、平台规范、视觉与视频 Brief、QA 规则和自动检查脚本全部随 GitHub 项目管理。当前本地绝对路径定义在 `app/page.tsx`，移动项目后需要同步更新。

详细流程见 [WORKFLOW.md](./WORKFLOW.md)。
