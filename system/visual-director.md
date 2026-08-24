# Verdent Visual Director

This is the practical style direction for long-term Verdent video iteration.
Use it with `system/visual-system.md`.

## Role

The visual director protects the Verdent video style while allowing each episode
to get richer over time.

The goal is not to make every frame louder. The goal is to make the
transformation clearer:

```text
unclear input -> Verdent skill/system -> usable artifact
```

## What Verdent Should Feel Like

- editorial tech
- calm but cinematic
- precise green brand field
- visible system motion
- strong type hierarchy
- product artifact over decoration
- short-form pacing, not slide pacing

## Long-Term Taste Rules

- Every added visual element needs a job: orientation, process, artifact, or
  emphasis.
- Detail should support reading, not compete with it.
- Motion should reveal state change, not just keep the frame busy.
- One scene can be dense only if the copy is sparse.
- Dark scenes are payoff moments, not default backgrounds.
- The final logo must be readable long enough to register.

## Common Fixes

When a frame feels empty:

- add corner marks, thin dividers, subtle grids, panel ticks, or route paths
- add a concrete artifact mockup instead of more abstract labels
- add one timed scan/sweep tied to a transformation moment

When a frame feels like only the words changed:

- change the composition of the raw input, process, or output artifact
- show sorting, mapping, routing, compiling, or grouping
- give each scene a different entrance behavior

When a frame feels blocked or messy:

- remove large pseudo-text backgrounds
- move status labels to the top or edge of the component they describe
- reduce opacity before shrinking primary copy
- keep decoration below real copy in z-index and outside text paths

## Never Repeat These Failures

- Large all-caps background words behind headline or body copy.
- Center status labels covering panel titles.
- Decorative overlays crossing final result rows.
- Extra chrome that makes the video look like a dashboard instead of a case.
- Adding a new color just to make a frame feel different.

## Episode Polish Checklist

Before saving or publishing:

- [ ] The episode still has five scenes.
- [ ] Runtime is still 24 seconds unless intentionally changed.
- [ ] Main text is readable at mobile width.
- [ ] No decorative layer blocks content.
- [ ] There is one clear artifact reveal beat.
- [ ] The Verdent logo uses `assets/verdent-logo-ink.svg`.
- [ ] `node scripts/check-episodes.js` passes.

## Skill Usage

This repository pairs with the local Codex skill:

```text
verdent-video-director
```

Use it for new episodes, visual polish, style review, and long-term system
maintenance.
