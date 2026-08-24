---
name: verdent-video-director
description: Guide long-term Verdent video style work for single-file HTML episodes, including visual polish, episode consistency, safe motion/detail additions, and repository-level video system maintenance. Use when the user asks to optimize Verdent visuals, improve Skillbook episodes, create new episodes, or preserve the Verdent video style.
metadata:
  short-description: Direct Verdent video style and episode polish
---

# Verdent Video Director

Use this skill for Verdent video-system work, especially `verdent-case` single-file HTML episodes and Skillbook-style short videos.

## First Read

When working inside a Verdent video repository, read the relevant local rules before editing:

- `system/visual-system.md` for brand, palette, timing, motion, and checklist rules.
- `system/visual-director.md` if present for the current project's practical style direction.
- The target episode HTML before changing it.
- `series/<series>/docs/` only when the request touches content strategy, sequencing, or new episode planning.

## Visual Direction

Preserve the Verdent feel:

- editorial tech, clean cinematic product motion, confident green brand field
- one visible transformation per episode: unclear input -> system/skill -> usable artifact
- 9:16 portrait, safe margins, readable type, one dominant idea per scene
- scanlines, sweep cuts, glow, system routing, geometric marks, and process panels only when they clarify state change
- final Verdent ink logo from `assets/verdent-logo-ink.svg`

Avoid the recurring failures:

- large background words or pseudo-element text that can sit behind or over real copy
- decorative overlays crossing headlines, panel labels, or result rows
- changes that only swap text while leaving scene composition unchanged
- busy HUD-like detail that competes with the main message
- one-note green-on-green pages with no hierarchy or reveal beat
- repeated identical scene transitions

## Editing Posture

When the user asks to optimize visuals, make useful edits instead of only proposing ideas. Prefer safe improvements first: spacing, hierarchy, motion timing, geometric structure, panel details, reveal cadence, logo placement, and text clearance. Make bigger layout changes when the user explicitly wants a stronger redesign or says the current frame is not working.

Before adding a visual element, decide its narrative job:

- orientation: corner marks, frames, grids
- process: scan lines, routing paths, status changes
- artifact: output card, UI mock, code panel, result table
- emphasis: underline, flash, glow, one-time reveal

If it has no job, do not add it.

## Safety Rules

Text must never be hidden by decorative layers. Keep visual detail behind the z-index of meaningful copy or outside the copy area. Avoid `content:"..."` pseudo-text for large labels unless it is tiny, local, and cannot overlap primary copy.

Respect the established Skillbook timing unless the user asks for a timing change:

- total runtime `24000`
- scenes: `0-2200`, `2200-5000`, `5000-10200`, `10200-15000`, `15000-24000`
- one major flash/reveal at the artifact scene

## Verification

After episode edits, run the repository check when available:

```bash
node scripts/check-episodes.js
```

Also inspect diffs for accidental large pseudo-text, broken logo paths, changed scene count, or missing snapshots. If the repo uses `scripts/save-episode-version.sh`, save a version after a meaningful episode edit unless the user asks not to.

## Reference

For a compact style checklist and common fixes, read `references/episode-polish.md` when doing non-trivial visual iteration or creating a new Verdent episode.
