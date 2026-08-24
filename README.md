# Verdent Case

Verdent HTML 视频 case 的长期生产仓库。

这个仓库只服务一件事：把每一条 HTML 视频从想法、页面、录屏版本到复盘都留下可追溯记录。以后如果某次网页改动影响录屏、文案或发布时间，可以通过 Git 历史快速找回当时的版本。

## 核心原则

- 每一条 HTML 视频都是一个独立 case。
- 所有超过 15-30 分钟的有效修改都要 commit 一次。
- 录屏前必须做一次 `recording-ready` commit，冻结可回退版本。
- 旧资料保留，不删除实质内容；新 case 从 `cases/` 开始沉淀。

## 推荐目录

```text
verdent-case/
├── cases/                 # 新增 HTML 视频 case 主目录
│   └── YYYY-MM-DD-topic/
│       ├── README.md       # brief、脚本、录屏状态、发布记录
│       ├── index.html      # 当前 case 的可录屏 HTML
│       └── assets/         # 当前 case 专属素材
├── templates/              # case 模板
│   └── case-template.html
├── docs/
│   ├── workflow.md         # HTML case 工作流与 Git 规范
│   ├── verdent-2.9.0-social-copy.md
│   └── verdent-account-analysis.md
├── skillbook/              # 既有 Verdent Skillbook 资料
├── tweets/                 # 既有 tweets 内容
├── content/                # 既有内容参考资料
└── assets/                 # 共享素材
```

## 新建一条 HTML 视频 case

1. 在 `cases/` 下创建文件夹，命名为 `YYYY-MM-DD-topic`。
2. 复制 `templates/case-template.html` 到新 case 的 `index.html`。
3. 新建 `README.md`，记录目标、受众、镜头、文案、录屏状态和发布链接。
4. 第一次能打开页面时 commit：`feat: create <topic> HTML case`。
5. 每完成一个明确变化就 commit，例如 `copy: refine hero message`、`style: adjust dashboard layout`。
6. 录屏前 commit：`recording: mark <topic> as recording-ready`。
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

录屏前的关键 commit 建议固定写法：

```text
recording: mark <case-name> as recording-ready
```

## 已有资料如何使用

- `skillbook/`、`tweets/`、`content/`、`docs/` 里的既有内容全部保留，作为参考资料和内容资产。
- 新的 HTML 视频不要直接散落在旧目录里，统一进入 `cases/`。
- 如果旧资料被复用到某个视频，在该 case 的 `README.md` 里记录来源文件和用途。

## 工作流入口

- 完整流程：[`docs/workflow.md`](docs/workflow.md)
- HTML 模板：[`templates/case-template.html`](templates/case-template.html)
- Case 目录说明：[`cases/README.md`](cases/README.md)
