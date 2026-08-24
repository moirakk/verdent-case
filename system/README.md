# System

Shared Verdent video visual system.

This folder is the long-term visual-effects entrance for all Verdent video
series. Each series can change its content, but should reuse these brand and
motion rules.

## Files

```text
visual-system.md   overall direction, timing, motion, and quality rules
visual-director.md practical long-term style judgment and polish rules
brand-lockup.html  reusable logo / lockup / motion snippets
```

## Current Standard

- 9:16 single-file HTML videos.
- Default runtime: 24 seconds.
- Controlled cyberpunk energy: scanlines, sweep cuts, glow, and system motion.
- Every scene must show an action, not only a text card.
- Process scenes should show unclear input being sorted into structure.
- The Verdent ink logo must come from `assets/verdent-logo-ink.svg`.
- Final result pages should place the larger ink logo inside the light content
  frame, not as a late separate pop-in.

## Reuse Pattern

For a new series:

```text
series/<series-name>/
  episodes/
  versions/
```

For a new episode, start from the closest existing episode and keep:

- `.ink-logo`
- `.brandmark`
- `.transition-sweep`
- changing process status labels
- one artifact reveal flash
- final result page logo
