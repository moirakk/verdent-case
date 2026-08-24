# Episodes

`episodes/` is the main editing and recording folder for Verdent Skillbook videos.

Every episode should be one standalone HTML file:

```text
episodes/ep-001-plan-mode.html
episodes/ep-002-visual-system.html
episodes/ep-003-case-template.html
```

Use this folder when you want to edit or record an episode.

Use `cases/` for supporting notes, README files, recording history, and retrospective material.

## Naming

```text
ep-<number>-<short-topic>.html
```

Examples:

```text
ep-001-plan-mode.html
ep-002-visual-system.html
ep-003-case-template.html
```

## Version Snapshots

When you want to preserve a version before or after a meaningful change, run:

```text
scripts/save-episode-version.sh episodes/ep-001-plan-mode.html "refine pacing"
```

It creates:

```text
versions/ep-001-plan-mode/ep-001-plan-mode-vYYYYMMDD-HHMM.html
```

and creates a Git commit with a clear episode name.

## Recording URL

Open the file directly in a browser:

```text
episodes/ep-001-plan-mode.html?clean=1
```

Freeze a frame for review:

```text
episodes/ep-001-plan-mode.html?t=16
```
