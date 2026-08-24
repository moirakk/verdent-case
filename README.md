# Verdent Video System

This repository has three entrances only:

```text
system/   shared visual and motion system
assets/   existing brand assets
series/   video series and their episode versions
```

The goal is to keep Verdent videos consistent over time. Skillbook is the first
series, not the whole repository.

## Current Series

```text
series/skillbook/
```

Current episode:

```text
series/skillbook/episodes/ep-001-plan-mode.html
```

Preview a frame:

```text
series/skillbook/episodes/ep-001-plan-mode.html?t=18
```

## Core Rule

Every video should make one useful transformation clear:

```text
unclear input -> Verdent system/skill -> usable output
```

## Long-Term Rules

- Keep shared visual rules in `system/`.
- Keep brand/logo assets in `assets/`.
- Keep each video series under `series/<series-name>/`.
- Keep current editable HTML files under that series' `episodes/`.
- Keep saved HTML snapshots under that series' `versions/`.
- Do not add PRDs, social drafts, account analysis, or unrelated planning files.

## Skillbook EP001

```text
PLAN MODE
Messy Ask -> Working Plan
```

Current decision:

- Skillbook is only the sub-series name.
- EP001 should prove what Plan Mode does.
- The example is still being selected before the HTML is rebuilt.
- Avoid PRD, meta explanations, and long concept slides.

## Save A Version

```text
scripts/save-episode-version.sh series/skillbook/episodes/ep-001-plan-mode.html "short note"
```

This creates a timestamped copy under:

```text
series/skillbook/versions/ep-001-plan-mode/
```

## Key Files

- [Shared visual system](/private/tmp/verdent-case-work/system/visual-system.md)
- [Skillbook EP001](/private/tmp/verdent-case-work/series/skillbook/episodes/ep-001-plan-mode.html)
