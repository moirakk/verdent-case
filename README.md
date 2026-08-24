# Verdent Video System

This repository is for Verdent's long-term HTML video system.

The main asset is a reusable visual system plus recordable episode files.

Skillbook is the first sub-series. Future series should reuse the same Verdent
motion language instead of inventing a new look.

## Core Rule

Every video should make one useful transformation clear:

```text
unclear input -> Verdent system/skill -> usable output
```

## What Stays Here

```text
episodes/   current editable HTML episode files
versions/   saved HTML snapshots for each episode
visual-system.md
            shared Verdent video visual rules
skillbook/  Skillbook sub-series rules and episode notes
assets/     shared Verdent visual assets
scripts/    helper scripts for saving episode versions
```

No PRDs, social drafts, account analysis, or unrelated content planning belong
in this repository.

## Current Focus

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
- The visual system should stay reusable across sub-series.
- Skillbook is a sub-series, not the whole repo identity.
- The viewer should understand the transformation, not just the format.
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
- [Shared visual system](/private/tmp/verdent-case-work/visual-system.md)
- [Skillbook video system](/private/tmp/verdent-case-work/skillbook/video-system.md)
