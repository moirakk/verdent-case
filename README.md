# Verdent Case

Long-term production repo for Verdent HTML video cases.

Current focus:

```text
Verdent Skillbook
EP001 // Plan Mode
Vague brief -> Content plan
```

Skillbook is the container. The skill is the main character.

## Open Current Episode

```text
episodes/ep-001-plan-mode.html
episodes/ep-001-plan-mode.html?t=18
```

`?t=seconds` freezes a frame for layout review.

## Core Structure

```text
episodes/   editable, recordable HTML videos
cases/      briefs, shot plans, recording status, retrospectives
skillbook/  series plan and visual/video system rules
templates/  notes for duplicating the current episode system
versions/   saved snapshots created by scripts/save-episode-version.sh
scripts/    production helpers
assets/     shared visual assets
.github/    issue and PR templates
```

Legacy reference material may still exist in `content/`, `tweets/`, and older `docs/` files. It is not the active production path.

## Current Production Files

```text
episodes/ep-001-plan-mode.html
cases/2026-08-24-skillbook-episode-001-plan-mode/README.md
skillbook/visual-system.md
skillbook/video-system.md
```

## Episode Rule

Every episode should prove:

```text
messy input -> Verdent skill -> reusable artifact
```

Do not make abstract Skillbook explainers. Show the skill doing useful work.

## Create The Next Episode

1. Duplicate `episodes/ep-001-plan-mode.html`.
2. Rename it, for example `episodes/ep-002-design-mode.html`.
3. Create a case README under `cases/YYYY-MM-DD-topic/`.
4. Replace only the episode-specific content:
   - case tag
   - skill name
   - messy input
   - process fields
   - artifact reveal
   - before / after / next
5. Check key frames with `?t=seconds`.
6. Commit before recording.

## Git Rhythm

Commit often, especially after meaningful copy or visual changes.

Recording-ready commit:

```text
recording(ep-001): mark plan mode as recording-ready
```

Save a version snapshot:

```text
scripts/save-episode-version.sh episodes/ep-001-plan-mode.html "short note"
```

## Key Docs

- [Episode workflow](docs/workflow.md)
- [Episodes folder](episodes/README.md)
- [Cases folder](cases/README.md)
- [Skillbook visual system](skillbook/visual-system.md)
- [Skillbook video system](skillbook/video-system.md)
