# Verdent Motion System

This is the shared visual system for Verdent HTML videos.

It should work across multiple sub-series, including Skillbook, launch videos,
workflow breakdowns, feature cases, and future experiments.

## Direction

Verdent videos should feel like:

- editorial tech
- clean cinematic product motion
- confident green brand field
- sharp transformation proof
- designed for portrait short-form feeds

They should not feel like:

- a landing page
- a slide deck
- a terminal recording
- a busy HUD
- generic cyberpunk decoration

## Brand Structure

Every video needs:

- Verdent logo or icon
- a first-second brand signal
- one clear transformation line
- one main output artifact
- a final brand lockup

Sub-series labels, such as `VERDENT SKILLBOOK`, are secondary. They identify the
container, but the visual system belongs to Verdent.

Logo source:

```text
../assets/verdent-logo-ink.ai
```

Use this as the source reference when creating flattened SVG or PNG logo assets
for HTML videos.

## Format

```text
9:16 portrait
25-30 seconds
safe margins for mobile
single-file HTML
direct browser recording
```

Default runtime is `28s` unless a specific episode needs a different cut.

## Visual Language

- strong type-led composition
- controlled green palette
- large readable phrases
- sparse labels
- one dominant idea per scene
- one loud reveal beat per video
- no unnecessary meters, timers, chrome, or debug UI in the recording frame

## Palette

Core colors:

```css
--sage: #d9e6dc;
--moss: #e6ecd9;
--paper: #eef5ee;
--deep-green: #0f2a1e;
--brand-green: #1f9d6c;
--coral: #d9663f;
```

Rules:

- Green is the brand field.
- Use light/dark contrast before adding new hues.
- Coral is a tiny accent, not a second palette.
- Dark scenes should be reserved for payoff moments.

## Typography

Recommended:

```css
headline: "Fraunces", Georgia, serif;
body: Inter, "Helvetica Neue", Arial, sans-serif;
system: "IBM Plex Mono", "SFMono-Regular", Consolas, Menlo, monospace;
```

Rules:

- Headlines use normal casing.
- Uppercase is for labels and system tags.
- Avoid dense paragraphs.
- Text must never overflow the portrait frame.

## Motion

Each video should have:

- a fast hook
- distinct motion per scene
- accelerating reveal cadence
- one major payoff beat
- subtle continuous drift
- a calm final landing

Avoid long static frames and repeated identical transitions.

## Reuse

Each sub-series can define its own labels and episode pattern, but it should reuse
the same Verdent logo treatment, palette, motion rhythm, safe margins, and output
artifact structure.

## Brand Lockup (canonical reference)

The exact logo SVG, chrome structure, color tokens, motion utility functions, and
final-lockup animation are frozen in:

```text
system/brand-lockup.html
```

This file is not meant to run standalone. It is the single source of truth for
everything marked `LOCKED` below. When building a new episode, copy the `LOCKED`
blocks from that file byte-for-byte. Only the blocks marked `PER-EPISODE` may
change per video.

Do not:

- edit the logo `<path>` data
- change any hex color outside the token list
- rewrite the motion utility functions (`smooth`, `backOut`, `env`, `clamp`)
- invent a different final-lockup timing or curve per episode

## Final Brand Lockup Requirement

Every episode must end with an explicit brand lockup beat, not just a persistent
small logo. Concretely: in the final 700ms before loop, the `.brandmark` element
scales up slightly and brightens, using the exact curve defined in
`system/brand-lockup.html`. This satisfies the "final brand lockup" requirement
from the Brand Structure section above — a persistent small chrome logo alone
does not count as a lockup moment.

## Pre-Publish Checklist

Before recording or publishing any episode, verify:

- [ ] Logo SVG path matches `system/brand-lockup.html` exactly (diff it)
- [ ] Only the six defined CSS variables are used for color — no new hex values
- [ ] Font stack is exactly Fraunces / Inter / IBM Plex Mono
- [ ] Total runtime and 5-scene time ranges follow the series' agreed timing plan
- [ ] Exactly one flash/reveal beat exists, aligned to the artifact scene
- [ ] Final brand lockup animation is present and uses the locked curve
- [ ] Safe margins respected — no text overflow into the top/bottom 19% bars,
      test at 390px width
- [ ] `next-tag` correctly points to the next episode (or is empty on the final one)
- [ ] HUD is not visible in the recorded frame (use `?t=` freeze or `.clean`)
