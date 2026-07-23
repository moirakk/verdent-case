---
name: verdent-social-growth
description: Turn Verdent changelogs, model notices, product briefs, build demos, campaign ideas, and status updates into verified, platform-native social content and production briefs. Use for Verdent X, Discord, LinkedIn, Reddit, Instagram, or TikTok copy; release and model announcements; daily editorial content; poster or video briefs; publication QA; social SOP work; or post-publication learning. Produce public copy in English and internal analysis in the user's language.
---

# Verdent Social Growth

Operate Verdent social content as a controlled release workflow. Optimize for clarity, credibility, and usefulness before engagement.

## Route the request

Choose one mode from the brief. Do not blend modes unless the user asks for a campaign package.

1. `product-release`: a Verdent version or feature release.
2. `model-launch`: a new model, model family, access tier, or provider update.
3. `builder-story`: a project, demo, use case, Build in Public post, or creator story.
4. `editorial`: a practical tip, product insight, industry observation, or Verdent point of view.
5. `service-notice`: downtime, recovery, changed access, known issue, or urgent correction.
6. `partner-campaign`: coordinated copy, mentions, assets, timing, or repost plans with another company.

Use `product-release` and `model-launch` for formal announcements. Never apply provocative editorial tactics to them by default.

## Apply the source hierarchy

Use claims only from the highest available source:

1. PM or product confirmation for release scope, availability, timing, UI behavior, and public boundaries.
2. Model provider first-party documentation for model capabilities and specifications.
3. Approved internal tests for Verdent-specific performance claims, with test conditions and permission to publish.
4. Historical Verdent posts for tone and formatting only, never as proof that an old product claim remains current.
5. Industry observations for editorial framing, clearly presented as observation rather than product fact.

Never turn a missing fact into a plausible-sounding sentence. Do not use third-party summaries as the sole source for model specifications or performance comparisons.

## Execute the workflow

### 1. Preserve and classify the input

Keep the full source text. Extract:

- primary subject and content mode
- version/model/provider
- launch time and access state
- one primary user value
- no more than three supporting capabilities
- concrete use cases
- claim evidence and source
- assets and video availability
- partner plan, embargo, hidden UI, and other public boundaries
- requested platforms, accounts, and CTA destination

If the input contains multiple unrelated model families or releases, recommend separate tasks. Combine them only when there is an approved umbrella announcement and a clear shared headline.

### 2. Build a fact gate

Start every response with three internal sections:

1. `Publish blockers`: facts that make publication unsafe or inaccurate.
2. `Confirm before publishing`: important unknowns that do not prevent drafting.
3. `Confirmed basis`: the facts and sources safe to use.

Use these statuses for material claims:

- `CONFIRMED`: supported by an approved source.
- `PENDING`: mentioned but not confirmed for publication.
- `NOT PROVIDED`: absent from the brief.
- `DO NOT USE`: confidential, embargoed, inconsistent, or explicitly excluded.

Drafting is allowed with pending fields. Publication language is not. If release status is not confirmed, label the package `DRAFT — DO NOT PUBLISH` and do not write `available now`, `is live`, `now supports`, or equivalent language.

### 3. Choose the message before writing

Define one sentence each:

- `What changed`
- `Why it matters`
- `Who it helps`
- `What the reader should do`

For formal releases, lead with what changed. For builder stories, lead with the result or visual moment. For editorial, lead with a defensible insight grounded in approved experience.

### 4. Generate only requested deliverables

Read [platform-guides.md](references/platform-guides.md) whenever producing platform copy. Read [production-briefs.md](references/production-briefs.md) when a poster, image, carousel, Reel, TikTok, or demo video is involved.

Default formal release package:

- X
- Discord announcement
- LinkedIn
- Reddit title and body
- poster brief
- video brief only when video material exists

Default daily content package:

- X
- Instagram
- TikTok
- visual or video brief

Generate copy only for enabled platforms. Do not mechanically shorten one master post. Rebuild each platform from the same confirmed fact base.

All public-facing copy must be English unless the user explicitly requests another public language. Internal blockers, rationale, and QA may use the user's language.

### 5. Run publication QA

Read [safety-and-qa.md](references/safety-and-qa.md) and apply every hard rule. When files are available, run:

```bash
node scripts/lint-content.mjs --platform <x|discord|linkedin|reddit|instagram|tiktok> --status <confirmed|pending> <file>
```

Fix hard failures and rerun. Treat automated lint as an aid, not product approval.

### 6. Return a production-ready package

Use this order:

1. `Release readiness`: READY, DRAFT — DO NOT PUBLISH, or BLOCKED.
2. `Publish blockers`.
3. `Confirm before publishing`.
4. `Core message`.
5. Requested platform copy, clearly separated.
6. Poster/visual brief.
7. Video brief if applicable.
8. `QA result`: facts, claims, privacy, language, formatting, CTA, and platform checks.

Do not hide uncertainty inside polished copy. Use `[CONFIRM: ...]` placeholders only in internal drafts and remove them before publication.

## Maintain the system

After publication, capture the URL, time, format, asset type, impressions/views, meaningful engagement, and a short qualitative note. Compare like with like: release posts against releases, build demos against build demos. Update platform guidance only after repeated evidence, not one unusually strong or weak post.

Read [observed-voice.md](references/observed-voice.md) when calibrating Verdent's current voice or revising the SOP. It is a dated baseline, not a permanent truth.
