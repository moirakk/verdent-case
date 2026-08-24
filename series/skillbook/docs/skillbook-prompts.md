# Verdent Skillbook — 沟通 Prompt 文档

用于后续和 AI（Claude / Verdent 内部工具等）沟通制作任务时直接复制使用。

---

## Prompt 1：新建一集 episode HTML

```
基于 series/skillbook/episodes/ep-001-plan-mode.html 的结构和视觉系统，
新建一集 Skillbook episode。

系统规则：
- 复用 system/visual-system.md 定义的色板、字体、动效节奏
- 复用 EP001 的 5 段场景结构（hook / raw input / 处理 / artifact 揭晓 / before-after）
- 复用 EP001 的时间轴比例：0-3.2s / 3.2-6.8s / 6.8-12.4s / 12.4-17s / 17-24s
- 总时长 24s，--T 设为 24000
- 9:16 画幅，安全边距沿用 9% padding
- 不新增任何未在系统里定义的颜色或字体

本集内容：
- 集号：EP00X
- Skill 名称：<填写>
- 一句话转化：<模糊输入> → <可用产出>
- hook 文案：<两行大字>
- raw input 引用：<一句话 + 3个tag>
- 处理场景字段：<4-5个字段名 + 状态文案序列>
- artifact 标题：<两行，第二行强调>
- chip 标签：<4个>
- before/after/next 三行文案
- next-tag：指向下一集或留空（系列最后一集）

输出：完整单文件 HTML，直接替换 episodes/ 下对应文件。
```

---

## Prompt 2：调整节奏/时长

```
把 series/skillbook/episodes/ep-00X-xxx.html 的总时长从 <当前秒数> 调整到 <目标秒数>。

要求：
- 5段场景的时间占比保持不变，按比例整体缩放
- --T 变量、JS 里的 T 常量、ranges 数组、fieldStarts、statusSteps、
  flash 揭晓时机、chip stagger、underline 揭晓时机、resultRows 时机、
  endline 时机、next-tag 时机，全部按比例同步调整，不能有遗漏
- 调整后自查：每个时间点是否都落在其所属场景的时间窗口内
```

---

## Prompt 3：修改视觉效果（不改结构，只改细节）

```
在不改变 series/skillbook 系列的整体结构（5段场景、时间轴比例、色板顺序）前提下，
调整以下视觉细节：

- <具体要改的地方，比如：artifact揭晓的闪光强度、字段弹入的回弹幅度、
  chip的间距、标题字号、某个场景的进场动效手法等>

约束：
- 不引入 system/visual-system.md 之外的新颜色
- 不破坏移动端安全边距（文字不能溢出 9% padding 之外）
- 保持"每个场景进场手法不同"的原则，不要让全片变成同一个节奏
```

---

## Prompt 4：批量检查一集是否符合系列规范

```
检查 series/skillbook/episodes/ep-00X-xxx.html 是否符合以下系列规范，
逐条给出是否通过 + 问题定位：

1. 总时长是否为 24s（--T:24000 且 JS T=24000）
2. 5段场景时间占比是否与 EP001 一致（0-3.2 / 3.2-6.8 / 6.8-12.4 / 12.4-17 / 17-24）
3. 色板顺序是否为 sage → cream → canvas → plum → sage
4. 是否只有一次"揭晓闪光"，且落在 artifact 场景开场
5. 文字是否在 390px 宽度下不溢出安全边距
6. next-tag 文案是否正确指向系列下一集（或末集留空）
7. 字体是否仅使用 Fraunces / Inter / IBM Plex Mono
```

---

## Prompt 5：case 说明文档生成（用于沉淀到 cases/ 或 docs/）

```
为 series/skillbook/episodes/ep-00X-xxx.html 生成一份 case 说明，包含：

- 目标受众
- 一句话转化
- 发布平台与文案方向
- 录屏状态（未录制 / 已录制待发 / 已发布）
- 发布链接（发布后补充）
- 复盘要点（发布后补充：完播率、互动、是否需要迭代）

输出为 Markdown，保存到对应位置。
```
