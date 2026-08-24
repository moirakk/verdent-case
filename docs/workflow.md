# HTML Case Workflow

这份文档定义 `verdent-case` 的长期生产方式：每条 HTML 视频都能从想法追溯到录屏版本，再到发布复盘。

## 1. 立项

每条视频先创建一个 case 文件夹：

```text
cases/YYYY-MM-DD-topic/
```

然后确认主编辑 HTML 在：

```text
episodes/ep-000-topic.html
```

case 文件夹用于说明和复盘：

```text
cases/YYYY-MM-DD-topic/README.md
cases/YYYY-MM-DD-topic/assets/
```

立项时只需要写清楚四件事：

- Goal：这条视频为什么做
- Audience：给谁看
- Skill：这一集展示哪个 Verdent skill
- Transformation：输入被这个 skill 变成什么
- Core message：观众看完应该记住什么
- Desired action：观众下一步应该做什么

## 2. 制作节奏

推荐节奏：

```text
brief
↓
first HTML
↓
copy pass
↓
visual pass
↓
responsive pass
↓
recording-ready commit
↓
recording
↓
publish
↓
retrospective
```

不要等“全部完成”才 commit。Git 的价值是留下过程，而不是只保存最终稿。

## 3. Commit 规则

每次 commit 只描述一个明确变化。

推荐类型：

```text
feat: create agent dashboard HTML case
copy: tighten hero message
style: refine recording layout
asset: add dashboard screenshot
fix: prevent mobile text overlap
recording: mark agent dashboard as recording-ready
docs: add launch retrospective
```

使用建议：

- 做出第一版能打开的 HTML 后立即 commit。
- 大约 15-30 分钟有一次有效推进，就 commit 一次。
- 改文案和改视觉尽量分开 commit，方便回退。
- 录屏前必须 commit，且 commit message 使用 `recording:`。

## 4. 录屏版本规范

录屏前检查：

- 页面能本地打开
- 关键文字无错别字
- 录屏视口下没有遮挡、溢出、错位
- 使用 `?t=seconds` 检查关键帧
- 动画不会影响阅读
- 需要展示的素材已经进入仓库
- case README 已写清楚录屏目标

录屏前固定 commit：

```text
recording: mark <case-name> as recording-ready
```

然后把该 commit SHA 写入 case README：

```markdown
## Recording Version

- Recording-ready commit: <commit-sha>
- Recording date: YYYY-MM-DD
- Recording file/link:
```

这样未来任何时候都能回到录屏版本。

## 5. 分支建议

这个仓库是个人 HTML 视频生产仓库，不需要复杂 Git Flow。

默认方案：

```text
main + 高频小 commit + 录屏前冻结 commit
```

当一条 case 改动较大，或需要实验多个视觉方向时，再开分支：

```text
case/YYYY-MM-DD-topic
```

分支完成后通过 Pull Request 合回 `main`。PR 里只需要回答：

- 这条 case 做了什么
- 录屏版本 commit 是哪个
- 有哪些素材或旧资料被复用
- 是否已经发布

## 6. 旧资料使用规则

已有目录全部保留：

- `skillbook/`
- `tweets/`
- `content/`
- `docs/`
- `assets/`

这些目录可以作为参考和素材来源。新的主编辑 HTML 视频统一放进 `episodes/`，不要把新项目继续散落到旧资料目录里。`cases/` 只放说明、素材、录屏记录和复盘。

如果复用旧资料，在 case README 中记录：

```markdown
## Reused Materials

- Source: docs/verdent-account-analysis.md
- Usage: audience pain points for opening section
```

## 7. 完成定义

一条 case 完成时，至少应该满足：

- `cases/YYYY-MM-DD-topic/README.md` 已记录 brief、录屏版本、发布链接和复盘
- `episodes/ep-000-topic.html` 是最终可打开版本
- 录屏前有 `recording-ready` commit
- 发布后有一次 `docs:` 或 `recording:` commit 补充结果

完成不是“文件不再修改”，而是“这条内容已经能被追溯、复用和复盘”。
