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
- controlled cyberpunk energy: scanlines, sweep cuts, glow, and system motion

They should not feel like:

- a landing page
- a slide deck
- a terminal recording
- a busy HUD
- generic cyberpunk decoration with no narrative job

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

Default short-form runtime is `24s` unless a specific episode needs a different
cut.

## Visual Language

- strong type-led composition
- controlled green palette
- large readable phrases
- sparse labels
- one dominant idea per scene
- one loud reveal beat per video
- no unnecessary meters, timers, chrome, or debug UI in the recording frame
- every scene must show an action, not only a text card
- transitions should feel edited: scan sweep, flash cut, or motion bridge
- process scenes should show transformation, such as fragments being sorted,
  routed, grouped, or converted into an output

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

## Video Feel Rules

The page must behave like a short video, not a moving slide deck.

Required beats:

- A first-second brand signal.
- A visible problem state, such as scattered fragments or unclear input.
- A processing state with changing status labels, not a single static label.
- A visible transformation from input into structure.
- A concentrated artifact reveal with one flash or impact beat.
- A visible Verdent ink logo on the final result page, preferably inside the
  content frame rather than as a separate late pop-in.

Recommended process status pattern:

```text
SORTING THE MESS
EXTRACTING STRUCTURE
PLAN READY
```

Recommended transition pattern:

```text
scene cut -> scan sweep -> next scene lands
```

Use cyberpunk effects only when they clarify state change or brand feel. Avoid
decorative visual noise that competes with the message.

## Reuse

Each sub-series can define its own labels and episode pattern, but it should reuse
the same Verdent logo treatment, palette, motion rhythm, safe margins, and output
artifact structure.

## Brand Lockup

The source logo is:

```text
../assets/verdent-logo-ink.ai
```

The HTML-ready asset is:

```text
../assets/verdent-logo-ink.svg
```

Use the SVG as a CSS mask so the logo can inherit the Verdent brand green.

Do not:

- use screenshot-based logo crops for final videos
- change any hex color outside the token list
- rewrite the motion utility functions (`smooth`, `backOut`, `env`, `clamp`)
- make the final logo appear so late that viewers cannot read it

Current EP001 lockup rule:

- Keep the small Skillbook brandmark in the bottom black bar.
- Add the larger Verdent ink logo inside the light final result page.
- Let the logo appear with the result page and remain readable.
- Do not add a separate last-moment logo pop-in that conflicts with the previous
  frame.

## Pre-Publish Checklist

Before recording or publishing any episode, verify:

- [ ] Final logo uses `assets/verdent-logo-ink.svg`, not a screenshot crop
- [ ] Only the six defined CSS variables are used for color — no new hex values
- [ ] Font stack is exactly Fraunces / Inter / IBM Plex Mono
- [ ] Total runtime and 5-scene time ranges follow the series' agreed timing plan
- [ ] Exactly one flash/reveal beat exists, aligned to the artifact scene
- [ ] Final result page has a readable Verdent ink logo inside the content frame
- [ ] Safe margins respected — no text overflow into the top/bottom 19% bars,
      test at 390px width
- [ ] `next-tag` correctly points to the next episode (or is empty on the final one)
- [ ] HUD is not visible in the recorded frame (use `?t=` freeze or `.clean`)
