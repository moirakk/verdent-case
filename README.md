# Verdent Skillbook

This repository is only for Verdent Skillbook HTML videos.

Skillbook is the series name. The subject of every episode is one Verdent skill:

```text
messy input -> Verdent skill -> usable output
```

## What Stays Here

```text
episodes/   current editable HTML episode files
versions/   saved HTML snapshots for each episode
skillbook/  long-term visual and video system rules
assets/     shared Verdent visual assets
scripts/    helper scripts for saving episode versions
```

No PRDs, social drafts, account analysis, or unrelated content planning belong in
this repository.

## Current Episode

```text
episodes/ep-001-plan-mode.html
```

Preview a frame:

```text
episodes/ep-001-plan-mode.html?t=18
```

## Long-Term Rules

- One episode = one primary HTML file in `episodes/`.
- Meaningful edits should be saved into `versions/`.
- The visual system should stay reusable across episodes.
- The viewer should understand what the skill does, not just what Skillbook is.
- Each episode should end with a clear output artifact.

## Save A Version

```text
scripts/save-episode-version.sh episodes/ep-001-plan-mode.html "short note"
```

This creates a timestamped copy under:

```text
versions/ep-001-plan-mode/
```

## Key Files

- [Current episode](/private/tmp/verdent-case-work/episodes/ep-001-plan-mode.html)
- [Episodes guide](/private/tmp/verdent-case-work/episodes/README.md)
- [Visual system](/private/tmp/verdent-case-work/skillbook/visual-system.md)
- [Video system](/private/tmp/verdent-case-work/skillbook/video-system.md)
