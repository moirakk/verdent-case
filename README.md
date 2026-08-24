# Verdent Video System

Verdent video cases, visual rules, brand assets, and editable HTML episodes.

The repository is intentionally small:

```text
assets/   brand assets
system/   shared visual and motion system
series/   video series, editable episodes, and saved versions
scripts/  local maintenance helpers
skills/   reusable Codex skills for this project
```

## Preview

Open the root index:

```text
index.html
```

Open the Skillbook series index:

```text
series/skillbook/index.html
```

Current editable episodes:

```text
series/skillbook/episodes/ep-001-plan-mode.html
series/skillbook/episodes/ep-002-design.html
series/skillbook/episodes/ep-003-ai2ui.html
```

Preview a frozen frame by adding `?t=<seconds>`:

```text
series/skillbook/episodes/ep-003-ai2ui.html?t=8.6
```

## Current Series

### Skillbook

One short-form chain:

```text
Think clearly -> design clearly -> build clearly
```

| Episode | Skill | Transformation |
|---|---|---|
| EP001 | Plan Mode | messy ask -> working plan |
| EP002 | Design Mode | vague ask -> shippable design |
| EP003 | AI2UI | one image -> working UI |

Series files:

```text
series/skillbook/docs/skillbook-series-plan.md
series/skillbook/docs/skillbook-prompts.md
series/skillbook/episodes/
series/skillbook/versions/
```

## Core Rule

Every Verdent video should make one useful transformation visible:

```text
unclear input -> Verdent system/skill -> usable output
```

## Save A Version

```text
scripts/save-episode-version.sh series/skillbook/episodes/ep-003-ai2ui.html "short note"
```

This creates a timestamped copy under:

```text
series/skillbook/versions/<episode-name>/
```

and commits the editable episode plus its snapshot.

## Check Episodes

```text
node scripts/check-episodes.js
```

The check validates the current Skillbook episodes for the basics that most
often break during visual iteration: script syntax, 24s runtime, five scenes,
logo source, expected time ranges, and no large blocking pseudo-text labels.

## Long-Term Rules

- Keep shared visual rules in `system/`.
- Keep brand/logo assets in `assets/`.
- Keep each video series under `series/<series-name>/`.
- Keep current editable HTML files under that series' `episodes/`.
- Keep saved HTML snapshots under that series' `versions/`.
- Do not add PRDs, social drafts, account analysis, or unrelated planning files.
- Before publishing, run `node scripts/check-episodes.js`.

## Key Files

- [Root preview](index.html)
- [Skillbook index](series/skillbook/index.html)
- [Shared visual system](system/visual-system.md)
- [Visual director](system/visual-director.md)
- [Verdent Video Director Skill](skills/verdent-video-director/SKILL.md)
- [Brand lockup reference](system/brand-lockup.html)
- [Version helper](scripts/save-episode-version.sh)
