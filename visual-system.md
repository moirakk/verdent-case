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
assets/verdent-logo-ink.ai
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
