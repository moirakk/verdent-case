# HTML Video Cases

`cases/` 是未来所有 HTML 视频的主目录。每个 case 都应该是一个可以独立打开、独立录屏、独立复盘的文件夹。

## 命名规则

```text
YYYY-MM-DD-topic
```

示例：

```text
2026-08-24-agent-dashboard-demo
2026-09-02-verdent-skillbook-episode-002
```

命名建议：

- 日期使用开始制作或正式立项的日期。
- topic 用英文小写和连字符，方便链接、查找和部署。
- 不要用 `final`、`new`、`test` 这类以后无法判断内容的名字。

## 单个 case 的推荐结构

```text
cases/YYYY-MM-DD-topic/
├── README.md
├── index.html
└── assets/
```

`README.md` 用来记录：

- 这条视频要表达什么
- 面向谁
- 页面和镜头如何推进
- 录屏前冻结在哪个 commit
- 发布到哪里
- 复盘结论是什么

`index.html` 是实际录屏页面。

`assets/` 放当前 case 独有素材。可以复用根目录 `assets/` 的共享素材，但需要在 case README 里说明来源。

## Case README 模板

```markdown
# <Case Title>

## Brief

- Goal:
- Audience:
- Core message:
- Desired action:

## Production Status

- [ ] Brief ready
- [ ] First HTML version
- [ ] Copy checked
- [ ] Visual checked
- [ ] Responsive checked
- [ ] Recording-ready commit created
- [ ] Recorded
- [ ] Published
- [ ] Retrospective written

## Recording Version

- Recording-ready commit:
- Recording date:
- Recording file/link:

## Shot Plan

1. Opening:
2. Main demo:
3. Key proof:
4. Closing:

## Reused Materials

- Source:
- Usage:

## Publish Links

- X/Twitter:
- LinkedIn:
- YouTube/TikTok/Other:

## Retrospective

- What worked:
- What to improve:
- Follow-up case:
```
