# Episodes

`episodes/` holds the current editable HTML files for Verdent videos.

Each file should be standalone and ready to screen-record in portrait format.

```text
ep-001-plan-mode.html
ep-002-design-mode.html
ep-003-ai2ui.html
```

## Episode Principle

Each sub-series is only a container. Skillbook is the first one.

The episode must show a clear Verdent transformation:

```text
unclear input -> Verdent system/skill -> usable output
```

Avoid abstract explanations. Show a real transformation.

## Naming

```text
ep-<number>-<skill-or-topic>.html
```

## Preview

Open the HTML file directly in a browser.

Use `?t=seconds` to freeze a frame for review:

```text
ep-001-plan-mode.html?t=18
```

## Versioning

Before major visual, copy, or pacing changes, save a snapshot:

```text
scripts/save-episode-version.sh episodes/ep-001-plan-mode.html "short note"
```

Snapshots live in:

```text
versions/<episode-name>/
```

## Recording Check

- Important text stays inside safe margins.
- No debug UI appears in the recording.
- The logo is visible and consistent.
- The first second identifies the series.
- The main skill value is clear by the end.
- The final frame shows the output artifact or next step.
