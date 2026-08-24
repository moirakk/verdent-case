# Verdent Skillbook Video System

This is the long-term video system for recording Verdent Skillbook episodes.

Verdent Skillbook videos are not normal landing pages and not static slides. Each episode is a cinematic case-file transmission that combines:

- a short hook
- a Verdent skill or mode
- a real messy input
- a visible workflow transformation
- a reusable output artifact
- a next episode bridge

## Core Format

Every episode should prove this sentence:

```text
Real input -> Verdent skill -> reusable artifact
```

Do not make generic product demos. Do not make abstract feature explainers.

Each episode should feel like watching Verdent process a case.

## Standard Duration

Target: `25-30s`

Default timing:

```text
0-1s    Verdent Skillbook identity
1-4s    Skill transformation hook
4-7s    Messy input
7-10s   Skill extracts structure
10-18s  Skill execution
18-21s  Artifact reveal
21-25s  Before / after / next
```

Shorter platform cuts can remove the last 2-3 seconds, but the full HTML should remain 25-30 seconds.

## Visual Identity

The style is:

- black-green CRT terminal
- cyberpunk but restrained
- mission-control case file
- product workflow proof
- cinematic single-screen transmission

It should not feel like:

- a marketing landing page
- a documentation page
- a normal slide deck
- a busy dashboard
- generic hacker neon

## Brand Signals

Always include:

- Verdent app-icon style logo
- `VERDENT SKILLBOOK`
- episode ID, such as `CASE 001 // PLAN MODE`
- one clear transformation line
- one final series line
- a subtle Verdent leaf watermark or recurring phosphor signal

Logo treatment:

- black rounded-square app icon
- glowing mint / aqua leaf mark
- subtle rim light
- never tiny enough to be missed
- appears in the final section and can appear during boot

## Palette

Use this palette consistently.

```css
--black: #020403;
--deep: #06120f;
--panel: #071512;
--signal: #49dca4;
--strong: #7dffe0;
--accent: #39f6ad;
--cyan: #1fd6ff;
--dim: #1f7c68;
--warn: #ffb545;
--red: #ff5347;
```

Rules:

- Black must dominate.
- Green glow should identify the system, not cover every surface.
- Cyan is for rare highlights, active routes, or logo gradients.
- Amber/red are only for warning, messy input, or interruption moments.

## Typography

Use terminal typography for labels and system text:

```css
"IBM Plex Mono", "SFMono-Regular", Consolas, Menlo, monospace
```

Use a clean sans-serif only for large hero lines:

```css
Inter, "Helvetica Neue", Arial, sans-serif
```

Text rules:

- Use short phrases only.
- No paragraphs on screen.
- No explanatory text that can be shown visually.
- One dominant phrase per scene.
- Keep mobile readability as the first constraint.

## Screen Layout

Default format:

```text
9:16 portrait
1080 x 1920 recording mindset
safe margin: 8%
```

Layout hierarchy:

1. Main phrase or artifact name
2. Skill / mode / case label
3. Small diagnostics
4. Status line

The viewer should understand the frame in under one second.

## Scene Components

Reusable components:

- `CaseLabel`
- `VerdentIntro`
- `InputCard`
- `SkillCore`
- `WorkflowNode`
- `ArtifactUnlock`
- `BeforeAfterNext`
- `VerdentEndCard`

Avoid adding new visual patterns unless an episode truly needs them.

## Animation Language

Use one master JavaScript timeline per HTML file.

Required:

- `const T = 25000` to `30000`
- scene envelopes based on millisecond ranges
- `?t=seconds` frozen preview
- no visible preview controls inside the recording frame

Motion rules:

- Verdent identity must land within 1 second
- hook must land by 4 seconds
- nodes should light sequentially
- artifact reveal should be the strongest moment
- final logo should feel like a clean lock-up

Use:

- fade + slide
- type-in text
- neon line pulses
- CRT flicker
- scanlines
- grain
- vignette
- subtle camera push

Avoid:

- slow fades that waste time
- long static text cards
- decorative motion that does not explain the workflow
- too many simultaneous labels
- top bars, timers, bottom status strips, or debug controls in the recorded frame

## Episode File Rule

Every episode has exactly one primary editable HTML file:

```text
episodes/ep-001-plan-mode.html
episodes/ep-002-visual-system.html
episodes/ep-003-case-template.html
```

Case folders can hold README, notes, and references, but the file you edit and record should live in `episodes/`.

## Version Naming

When an episode changes, create a version snapshot:

```text
versions/ep-001-plan-mode/ep-001-plan-mode-vYYYYMMDD-HHMM.html
```

Commit messages should include the episode:

```text
video(ep-001): refine plan mode pacing
recording(ep-001): mark plan mode as recording-ready
```

## Recording-Ready Checklist

Before recording:

- [ ] File is a single HTML page
- [ ] Duration is 25-30 seconds
- [ ] No preview controls appear inside the recording frame
- [ ] `?t=seconds` works for preview
- [ ] Verdent logo appears clearly
- [ ] Important text sits inside safe margins
- [ ] No paragraphs or unnecessary labels remain
- [ ] Final frame includes next episode bridge
- [ ] Git commit exists before recording

## Series Spine

Recommended first episodes:

```text
EP 001 // PLAN MODE
MESSY ASK -> WORKING PLAN

EP 002 // VISUAL SYSTEM
RAW DIRECTION -> RECORDABLE STYLE

EP 003 // CASE TEMPLATE
ONE VIDEO -> REUSABLE FORMAT

EP 004 // SCRIPT MODE
MESSY NOTES -> SHARP SCRIPT

EP 005 // HTML BUILD
SCRIPT -> RECORDABLE PAGE

EP 006 // RECORDING CHECK
GOOD PAGE -> POSTABLE CLIP

EP 007 // DISTRIBUTION
ONE CASE -> X / IG / TIKTOK POSTS

EP 008 // FEEDBACK LOOP
POST RESULT -> NEXT CASE
```

The exact skills can change. The structure should not.
