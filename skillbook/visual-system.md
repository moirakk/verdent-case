# Verdent Skillbook Visual System

## Direction

As of EP001 v2, Skillbook moved away from the original CRT/terminal treatment. The
CRT version (mint-on-black, scanlines, workflow-node diagram) is retired — it read
as a tech demo, not something people wanted to watch. The system now is an
**editorial product-launch look**: think a clean brand keynote clip, not a hacker
terminal.

The series should read as:

- a real product's launch reel
- a case file, but designed like a magazine spread, not a console
- calm, confident, high-contrast type doing the work — not glow effects

It should not read as:

- terminal / CRT / scanline / mission-control HUD
- neon cyberpunk
- a slide deck with a fade transition on every bullet

## Palette

All-green family. No off-brand cream/plum substitutions — every scene stays in the
green family, using lightness/darkness for contrast instead of switching hue:

- `#d9e6dc` sage — hook + closing scene background
- `#e6ecd9` moss — raw/messy input scene background
- `#eef5ee` mint-white — the "document" scene background (reads like paper)
- `#0f2a1e` deep green — artifact-reveal scene background (the one dark beat, for contrast)
- `#1f9d6c` brand green — logo fill, accent highlights, active states
- `#d9663f` coral — a single accent dot, the only non-green color in the system. Used once, small, as a breathing detail — not a secondary palette.

Rule: four background tones, all green-family, one accent color used sparingly. If
a new episode needs a fifth tone, it still has to read as "green" at a glance.

## Typography

- Headlines: `"Fraunces"` (serif, weights 600/700/900, italic 500 available) — this is the voice of the series. Big, confident, editorial.
- Body/labels: `Inter` for sub-copy, `"IBM Plex Mono"` for eyebrows/tags/status lines (kept from the old system — mono still signals "system status" even in the new visual language).
- Headlines should read like a headline, not a terminal print-out: normal casing, no forced uppercase on the big serif line. Uppercase + letter-spacing is reserved for eyebrows, tags, and mono labels only.

## Layout

Format:

- 9:16 portrait with a **letterbox**: top and bottom ~19% are black bars, content lives in the middle band. This is the single biggest "this looks like a real video, not a web page" move — keep it on every episode.
- Bottom bar carries the brand mark (logo + "Verdent Skillbook") on the left and a "next episode" tag on the right, revealed near the end.
- Top bar carries the case tag (`EP00X // SKILL NAME`) only — keep it minimal.
- One accent dot sits at the seam between the top bar and the content frame — small, breathing, the only warm color on screen.

Avoid:

- full-bleed content with no letterbox — it stops looking like a video
- more than one accent color on screen at once
- dense paragraphs — one headline + one short sub-line per scene, max

## Motion

This is what fixes the "stiff/lifeless" problem from EP001 v1. Hard rules:

1. **No single uniform transition for every scene.** Each scene gets its own entrance, matched to its content:
   - Hook: fast scale-in (starts ~0.94, pops to 1) — a punch, not a drift.
   - Messy/raw input: slight tilt on entry (~1deg rotate settling to 0) — form matches content, the "mess" scene is allowed to feel a touch unsettled.
   - Document/process scenes: clean, fast translateY — no personality needed, the content itself (accelerating reveal) carries the energy.
   - Artifact/payoff reveal: the biggest motion in the episode — scale up from ~0.9 with an overshoot/back-ease, paired with a one-frame white flash. This is the loudest moment on purpose.
   - Closing scene: restrained translateY. The video should land, not bounce.
2. **A continuous slow camera drift runs the whole episode** (subtle scale, ~1 -> 1.035 over the full runtime). Nothing should ever be a fully static frame.
3. **Reveal cadence should accelerate, not tick at a constant interval.** If five things reveal in sequence, their gaps should shrink (e.g. 1500 -> 1250 -> 1000 -> 800ms), not stay flat. Flat, equal-interval reveals are the single fastest way to feel like a template.
4. **Every episode needs exactly one loud beat** — a flash, a bounce, an emphasis underline sweeping under the payoff word. If nothing in the episode is louder than everything else, nothing feels like a payoff.
5. No scene may sit longer than ~1 second past its last reveal without new visible motion (carried over from the CRT-era rule — still true here).

## Logo

Use the real Verdent mark — flame/leaf silhouette with an internal S-curve
negative-space split, single flat fill in brand green (`#1f9d6c`), no gradient.
The SVG path in `episodes/ep-001-plan-mode.html` is a hand-approximation traced
from the official logo; if pixel-perfect fidelity matters for a given deliverable,
swap in the official vector asset instead of re-tracing.

## Production Standards

- Standard total runtime: **28 seconds** (`T = 28000`). Don't invent a different `T` per episode.
- Every episode file ships with the debug HUD (play / pause / replay / scrub bar), and `?t=<seconds>` must fully freeze the frame — including the continuous camera-drift animation and any other CSS `infinite` animation. Toggle a `body.frozen { animation-play-state: paused !important; }` rule; don't only freeze the JS-driven timeline.
- Fonts load from Google Fonts (`Fraunces`, `Inter`) via `<link>` tags. This means local preview in a sandboxed/offline environment will fall back to system serif/sans — that's expected, not a bug; verify real typography in an actual browser with network access.

## Episode Structure

Every episode should answer:

1. What is the case?
2. What skill is being used?
3. What messy input came in?
4. What transformation happened?
5. What artifact came out?
6. What is the next case?

End line pattern:

`One skill. One workflow. One artifact.`
