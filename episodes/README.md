# Episodes

`episodes/` is the main editing and recording folder for Verdent Skillbook videos.

Every episode should be one standalone HTML file:

```text
episodes/ep-001-plan-mode.html
episodes/ep-002-visual-system.html
episodes/ep-003-code-review.html
```

Use this folder when you want to edit or record an episode.

Use `cases/` for supporting notes, README files, recording history, and retrospective material.

## Series Rule

Skillbook is the container. The skill is the main character.

Each episode must show one Verdent skill producing a useful artifact from a real messy input.

Do not make episodes about "introducing Skillbook" or "showing Verdent skills" in the abstract.

Use this structure:

```text
messy input -> Verdent skill -> reusable artifact
```

EP001 example:

```text
Vague brief -> Plan Mode -> content plan
```

## Naming

```text
ep-<number>-<short-topic>.html
```

Examples:

```text
ep-001-plan-mode.html
ep-002-visual-system.html
ep-003-code-review.html
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
episodes/ep-001-plan-mode.html
```

Freeze a frame for review:

```text
episodes/ep-001-plan-mode.html?t=16
```

Before recording, check key frames:

```text
t=0.6    brand identity
t=1.5    hook
t=4.2    messy input
t=8      extraction
t=12     skill running
t=18.5   artifact unlock
t=22     final result
```

No visible debug controls, timers, or top/bottom status bars should appear in the recording frame.
