# Verdent Episode Polish Reference

## Frame Review Checklist

For each scene, ask:

- What changed on screen during this scene?
- Is the main copy readable without fighting the background?
- Does the scene show a problem, process, artifact, or result?
- Is the visual density appropriate for the amount of text?
- Is the Verdent logo present early and readable at the end?

## Useful Safe Enhancements

- Add corner marks or thin frame lines at the edges.
- Add small panel ticks, dividers, grid lines, or route paths.
- Animate process flow with CSS variables set in `render(t)`.
- Turn static field lists into generated rows, cards, or UI artifacts.
- Use one small accent color moment for a reveal or status, not a second palette.
- Improve hierarchy by shrinking secondary labels, not by enlarging everything.

## Red Flags

- Big all-caps background words.
- Center labels sitting over panel titles.
- Decorative text in `::before` or `::after` that is not tied to a local component.
- Motion that continues through a reading-heavy result screen.
- Logo appearing too late to register.
- Cards inside cards, decorative panels with no function, or dense HUD chrome.

## Response Pattern

When reporting visual work to the user, keep it concrete:

- what was changed visually
- which obstruction or hierarchy issue it fixes
- what checks passed
- where the latest file or snapshot is

Avoid long theoretical explanations unless the user asks for style strategy.
