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

Target: `28s`

Default timing:

```text
0-4.6s     Hook
4.6-9.8s   Raw / messy input
9.8-16.4s  Skill process / document mockup
16.4-21.6s Artifact reveal
21.6-28s   Before / after / next
```

Shorter platform cuts can remove the last 2-3 seconds, but the full HTML should keep the 28s master runtime.

## Visual Identity

The style is:

- editorial green letterbox
- product-launch reel
- case file, but designed like a magazine spread
- product workflow proof
- confident type-led short video

It should not feel like:

- a marketing landing page
- a documentation page
- a normal slide deck
- a busy dashboard
- terminal / CRT / scanline / mission-control HUD
- neon cyberpunk

## Brand Signals

Always include:

- Verdent app-icon style logo
- `VERDENT SKILLBOOK`
- episode ID, such as `CASE 001 // PLAN MODE`
- one clear transformation line
- one final series line
- a bottom letterbox brand lockup

Logo treatment:

- real Verdent flame/leaf silhouette
- single flat brand green fill
- no gradient
- never tiny enough to be missed
- appears in the bottom bar and can appear in the final section

## Palette

Use this palette consistently.

```css
--sage: #d9e6dc;
--moss: #e6ecd9;
--paper: #eef5ee;
--deep-green: #0f2a1e;
--brand-green: #1f9d6c;
--coral: #d9663f;
```

Rules:

- Stay in the green family across scenes.
- Use lightness and darkness for contrast instead of switching hue.
- Coral is a single small accent detail, not a second palette.
- Artifact reveal is the one dark scene.

## Typography

Use editorial typography for headlines:

```css
"Fraunces", Georgia, serif
```

Use clean sans-serif and mono for support text:

```css
Inter, "Helvetica Neue", Arial, sans-serif
"IBM Plex Mono", "SFMono-Regular", Consolas, Menlo, monospace
```

Text rules:

- Use short phrases only.
- No dense paragraphs on screen.
- One dominant phrase per scene.
- Headlines use normal casing; uppercase is reserved for eyebrows, tags, and mono labels.
- Keep mobile readability as the first constraint.

## Screen Layout

Default format:

```text
9:16 portrait
letterbox: top and bottom bars around 19%
content lives in the middle band
1080 x 1920 recording mindset
```

Layout hierarchy:

1. Main phrase or artifact name
2. Skill / mode / case label
3. Small diagnostics
4. Bottom brand / next tag

The viewer should understand the frame in under one second.

## Scene Components

Reusable components:

- `CaseLabel`
- `InputCard`
- `ProcessDocument`
- `ArtifactUnlock`
- `BeforeAfterNext`
- `LetterboxBrandBar`

Avoid adding new visual patterns unless an episode truly needs them.

## Animation Language

Use one master JavaScript timeline per HTML file.

Required:

- `const T = 28000`
- scene envelopes based on millisecond ranges
- `?t=seconds` frozen preview
- debug HUD can exist for editing, but must not obscure the recording frame
- `body.frozen` pauses CSS animations as well as JS timeline

Motion rules:

- hook must land by 4.6 seconds
- every scene needs a distinct entrance
- reveal cadence should accelerate
- artifact reveal is the one loud beat
- final scene should land, not bounce

Use:

- scale-in punch for hook
- slight tilt for messy input
- fast translateY for document/process scenes
- flash + bounce for artifact reveal
- continuous subtle camera drift

Avoid:

- slow fades that waste time
- long static text cards
- decorative motion that does not explain the workflow
- too many simultaneous labels
- terminal chrome, scanlines, HUDs, timers, and cyberpunk glow

## Episode File Rule

Every episode has exactly one primary editable HTML file:

```text
episodes/ep-001-plan-mode.html
episodes/ep-002-visual-system.html
episodes/ep-003-code-review.html
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
- [ ] Duration is 28 seconds
- [ ] Letterbox top/bottom bars are present
- [ ] Debug HUD does not obscure the recording frame
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
