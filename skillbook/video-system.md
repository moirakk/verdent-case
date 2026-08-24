# Verdent Skillbook Sub-Series

This is the sub-series rulebook for Verdent Skillbook.

Use the shared [Verdent Motion System](../visual-system.md) for the visual
language. Skillbook only defines the content pattern: each episode records one
Verdent skill and the useful output it creates.

## Core Format

Every episode should prove this sentence:

```text
Messy input -> Verdent skill -> usable output
```

Do not make generic product demos. Do not make abstract Skillbook explainers.
Each episode should feel like watching Verdent turn something unclear into
something usable.

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

Shorter platform cuts can remove the last 2-3 seconds, but the full HTML should
keep the 28s master runtime.

## Skillbook Identity

Skillbook should feel like:

- a record of one skill in action
- a short transformation proof
- practical enough that a builder understands the value immediately
- part of Verdent's broader video system

It should not feel like:

- a Skillbook introduction
- a feature dictionary
- a PRD
- a normal tutorial
- a generic product demo

## Brand Signals

Always include:

- Verdent app-icon style logo
- `VERDENT SKILLBOOK`
- episode ID, such as `CASE 001 // PLAN MODE`
- one clear transformation line
- one final skill/output line
- a bottom letterbox brand lockup

Logo treatment:

- real Verdent flame/leaf silhouette
- single flat brand green fill
- no gradient
- never tiny enough to be missed
- appears in the bottom bar and can appear in the final section

Use the shared color, type, logo, and motion rules in `../visual-system.md`.

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

The file you edit and record should live in `episodes/`.

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

## Episode Spine

The first three episodes can form a simple skill chain:

```text
EP 001 // PLAN MODE
MESSY ASK -> WORKING PLAN

EP 002 // DESIGN
PLAN -> VISUAL SYSTEM

EP 003 // AI2UI
REQUIREMENTS -> EDITABLE UI
```

The exact examples can change. The structure should not.
