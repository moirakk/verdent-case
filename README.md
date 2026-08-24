# Verdent Case

Verdent HTML 视频 case 的长期生产仓库。

这个仓库只服务一件事：把每一条 HTML 视频从想法、页面、录屏版本到复盘都留下可追溯记录。以后如果某次网页改动影响录屏、文案或发布时间，可以通过 Git 历史快速找回当时的版本。

## 核心原则

- 每一条 HTML 视频都是一个独立 case。
- 每一集都有一个主编辑 HTML 文件，放在 `episodes/`。
- 所有超过 15-30 分钟的有效修改都要 commit 一次。
- 录屏前必须做一次 `recording-ready` commit，冻结可回退版本。
- 旧资料保留，不删除实质内容；case 说明从 `cases/` 沉淀，录屏文件从 `episodes/` 编辑。

## 推荐目录

```text
verdent-case/
├── episodes/              # 每集一个可编辑、可录屏的 HTML 文件
│   └── ep-001-plan-mode.html
├── cases/                 # case 说明、录屏记录、复盘材料
│   └── YYYY-MM-DD-topic/
│       ├── README.md       # brief、脚本、录屏状态、发布记录
│       └── assets/         # 当前 case 专属素材
├── templates/              # case 模板
│   ├── case-template.html
│   └── skillbook-episode-template.html
├── versions/               # 自动保存的 episode 版本快照
├── scripts/                # 版本保存、录屏前流程工具
├── docs/
│   ├── workflow.md         # HTML case 工作流与 Git 规范
│   ├── verdent-2.9.0-social-copy.md
│   └── verdent-account-analysis.md
├── skillbook/              # 既有 Verdent Skillbook 资料
├── tweets/                 # 既有 tweets 内容
├── content/                # 既有内容参考资料
└── assets/                 # 共享素材
```

## 当前重点

当前主线是 `Verdent Skillbook`。

Skillbook 只是系列容器，每一集的主角必须是一个 Verdent skill 的核心能力。

EP001 当前定位：

```text
PLAN MODE
Vague content brief -> executable content plan
```

当前可编辑文件：

```text
episodes/ep-001-plan-mode.html
```

预览方式：

```text
open episodes/ep-001-plan-mode.html
open episodes/ep-001-plan-mode.html?t=18.5
```

`?t=seconds` 用来冻结关键帧，方便逐帧检查文字是否越界、画面是否太乱。

## 新建一条 Skillbook Episode

1. 在 `episodes/` 下创建一个主 HTML 文件，例如 `ep-002-visual-system.html`。
2. 沿用 EP001 的 CRT / Verdent Skillbook 视觉语言，只替换 skill、输入、节点、artifact 和 next。
3. 在 `cases/` 下创建对应 case 说明，记录目标、受众、镜头、录屏状态和发布链接。
4. 第一次能打开页面时 commit：`video(ep-002): create visual system episode`。
5. 每次明显改动后保存版本：`scripts/save-episode-version.sh episodes/ep-002-visual-system.html "refine pacing"`。
6. 录屏前 commit：`recording(ep-002): mark visual system as recording-ready`。
7. 录屏后把最终链接、备注和复盘写回该 case 的 `README.md`。

## Commit 命名约定

常用前缀：

- `feat:` 新建 case 或新增主要模块
- `copy:` 修改标题、字幕、脚本、页面文案
- `style:` 调整视觉、布局、动画、响应式
- `asset:` 添加或替换图片、截图、图标等素材
- `fix:` 修复显示、录屏、交互或兼容问题
- `recording:` 录屏准备、录屏完成、版本冻结
- `docs:` 更新工作流、README、复盘和说明
- `video(ep-001):` 单集 HTML 页面改动
- `recording(ep-001):` 单集录屏节点

录屏前的关键 commit 建议固定写法：

```text
recording: mark <case-name> as recording-ready
```

## 已有资料如何使用

- `skillbook/`、`tweets/`、`content/`、`docs/` 里的既有内容全部保留，作为参考资料和内容资产。
- 新的可录屏 HTML 不要散落在旧目录里，统一进入 `episodes/`。
- 每条 episode 的说明、复盘和录屏记录进入 `cases/`。
- 如果旧资料被复用到某个视频，在该 case 的 `README.md` 里记录来源文件和用途。

## 工作流入口

- 完整流程：[`docs/workflow.md`](docs/workflow.md)
- Skillbook 视觉体系：[`skillbook/video-system.md`](skillbook/video-system.md)
- Episode 编辑目录：[`episodes/README.md`](episodes/README.md)
- Skillbook HTML 模板：[`templates/skillbook-episode-template.html`](templates/skillbook-episode-template.html)
- HTML 模板：[`templates/case-template.html`](templates/case-template.html)
- Case 目录说明：[`cases/README.md`](cases/README.md)
