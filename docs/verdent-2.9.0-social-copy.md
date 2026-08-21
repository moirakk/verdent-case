# Verdent 2.9.0 — Social Copy Pack

**Release:** Verdent 2.9.0 — *Ship it, watch it*
**Platforms:** X · LinkedIn · Reddit · Discord
**Language:** English (see §1.6 for why)
**Prepared:** 2026-08-11

---

# Part 1 — Research Findings

## 1.1 Method & honesty note

Two evidence layers were used:

1. **Internal project files** (authoritative, already audited by this team)
2. **Live web verification** of the official accounts

Where a channel could not be verified, it is labeled **NOT VERIFIED** and the copy falls back to a documented generic convention. Nothing below is invented tone.

## 1.2 Verified official channels

All four channels are real and linked from the verdent.ai site footer / Community menu:

| Channel | Handle / URL | Verified | Notes |
|---|---|---|---|
| X | [@verdent_ai](https://x.com/verdent_ai) | ✅ Live post text read | Bio: *"Your AI technical cofounder. Builds, plans & ships — while you sleep."* 286 posts, ~1.86K followers |
| LinkedIn | [company/verdent-ai](https://www.linkedin.com/company/verdent-ai) | ✅ Two posts read verbatim | 21 employees, ~4.1K followers. Tagline: *"The future is not about typing faster, but about typing less."* |
| Reddit | [r/Verdent](https://www.reddit.com/r/Verdent/) | ⚠️ Partial — exists + one official post title/excerpt | Direct fetch returned **403 Forbidden** (Reddit blocks unauthenticated scraping). Full body text NOT retrieved |
| Discord | [discord.gg/NGjXEZcbJq](https://discord.gg/NGjXEZcbJq) | ⚠️ Server confirmed (2,975 members, 149 online) | `#announcements` content is **auth-gated — NOT VERIFIED** |

> ⚠️ **Important correction:** the brief suggested `@VerdentAI`. The real handle is **`@verdent_ai`**. The `VerdentAI` string is the *VS Code Marketplace publisher ID*, not the X handle.

## 1.3 Internal tone assets found

Searched the project with glob + grep. Note: the relevant files are **untracked/gitignored**, so a plain `*.md` glob misses them — they were found by directory listing.

| File | What it gives |
|---|---|
| `verdent-account-analysis.md` | 30-day audit of 18 real `@verdent_ai` posts, with per-post engagement data |
| `reports/verdent-content-strategy.md` (dup: `reports/v-strategy.md`) | Post templates + the mandated CTA line |
| `content/japan-visit-social-post-guide.md` | Hard official-account rules: hashtag caps, emoji policy, `we`/`our team` person |
| `agi-tweets/2026-08-*.md` | ~18 drafted posts in house voice — best available sample of sentence rhythm |

### Key rules extracted

**From `japan-visit-social-post-guide.md` (§0, §8.3, §9.2, §9.3):**
- Official account = **`we` / `our team`**, never `I` / `my`
- **X hashtags ≤ 2** (cites [X Help Center](https://help.x.com/en/using-x/how-to-use-hashtags): "no more than 2 per post"); **LinkedIn 3–5**
- X: **< 280 chars**, break into 2–3 line groups — dense text blocks read badly
- LinkedIn: **150–200 words**, 1–3 sentences per paragraph, blank line between
- Banned intensifiers: `super`, `incredibly`, `beyond excited`
- Emoji: **0** on X/LinkedIn official posts

**From `verdent-account-analysis.md` — what actually performs:**
- Original posts get **13.5K median views vs 246 for quote-RTs (~55x)** → always publish native
- Concrete numbers in the **first two lines** (the "$1.37 vs $0.32 / 76% cheaper" post hit 31.1K, the best non-promoted result)
- **Every top post carried image or video, no exceptions**
- Winners end with an **"available now" CTA** — `Try it in Verdent today.`
- Do **not** bury good material in thread replies: a demo video at reply position got 828 views under a 383K parent
- Comment volume is chronically 0–3 → **ask a question to close**
- Best window: **13:00–17:00 UTC**; avoid 04:00–08:00 UTC

## 1.4 Verbatim official voice samples

**X — `@verdent_ai`** (read live):

> "DeepSeek-V4-Flash-0731 from @deepseek_ai is now live in Verdent. The official V4-Flash release raises the reasoning ceiling and steps up agent capability significantly…"

> "A late-night desk. Every object opens something. No framework. No building step. One HTML file, 2 MB. Built with Verdent — not from one prompt, but from a conversation.⬇️"

> "We vibecoded a tiny character maker. No roadmap. No spec. One afternoon. Every buddy gets a name and a backstory it never asked for."

**Pattern:** very short declaratives, often verbless fragments. `X is now live in Verdent.` for launches. Sparse emoji only as a directional pointer (⬇️). No hashtags in any sampled post.

**LinkedIn — company/verdent-ai** (read verbatim, 2026-07-26):

> "Claude Opus 5.0 is now available in Verdent.
> Built for long-horizon agentic work and complex coding, Opus 5.0 is well suited to workflows that demand sustained reasoning, planning, tool use, and multi-step execution.
> **Teams can begin evaluating it with their existing prompts and evaluation suites—without rebuilding workflows from scratch**—while reviewing the behavioral and API changes introduced in this release.
> We're excited to see how developers and teams put it to work."

**Pattern:** same opening line as X, then widened for a **team/evaluation** frame. Note the recurring reassurance move: *"without rebuilding workflows from scratch."* Em-dashes, zero emoji, zero hashtags in the sampled posts.

**Official changelog voice** (verdent.ai/changelog — the strongest signal, this is where 2.9.0 will live):

> "The model you've been saving your credits for now costs zero credits."
> "Eco Mode used to be a backup for when your credits ran out. Now it can handle your heaviest work."
> "Pick Kimi K3 in the model selector and keep building as long as you want."

**Pattern:** **second person "you"**, before/after contrast, benefit stated in plain words. Section titles are short and rhythmic: *"Stay Clear, Stay Focused"*, *"Build Better. Faster."*, *"More Managers, More Control"* — exactly the register of *"Ship it, watch it."*

**Reddit — r/Verdent** (⚠️ title + search excerpt only, body blocked):

> Title: "GLM-5.2 is now supported in Verdent"
> Excerpt: "We just added GLM-5.2 as a new model option in Verdent. It is built for long horizon coding and agentic engineering tasks, with a 1M token…"

**Pattern (from what is visible):** lowercase-ish plain title, opens **"We just added…"** — noticeably more casual than LinkedIn's "is now available." Subreddit uses flairs (`💬 Discussion`, `Announcement`) and has organic user threads.

**Discord:** ⚠️ **NOT VERIFIED.** Server is real (2,975 members) but `#announcements` requires membership. Docs describe it as "real-time support, active community of Verdent users and team members." Discord copy below therefore uses **standard Discord announcement convention** (markdown headers, `##`/`-#`, light emoji anchors, `@everyone` optional) rather than a claimed Verdent house style.

## 1.5 Tone summary → what drives the copy

| Dimension | Verdent's actual practice |
|---|---|
| Person | `we` for the team; **`you`** for the user (changelog leans hard on `you`) |
| Sentence length | Short. Fragments allowed. Frequently 3–7 words |
| Emoji | X/LinkedIn ≈ none (rare directional ⬇️); Discord assumed OK |
| Hashtags | **None observed in sampled organic posts.** Guide caps at 2 (X) / 3–5 (LinkedIn) → stay minimal |
| Launch formula | `[Thing] is now available in Verdent.` |
| Closing CTA | `Try it in Verdent today.` |
| Signature move | Before/after contrast; "without leaving Verdent"; "without rebuilding from scratch" |
| Avoid | Hype adverbs, quote-RT style, dense paragraph blocks, burying assets in replies |

## 1.6 Language decision

**English.** The official X and LinkedIn accounts post in English; the changelog is English-first (zh-CN/zh-Hant exist as localized site routes, not as the social voice). Internal strategy docs are written in Chinese for internal reporting but explicitly specify **"所有对外文案为英文"** (all outbound copy in English). No Chinese version is attached per the brief's conditional.

---

# Part 2 — The Copy

## 2.1 X — `@verdent_ai`

> Both versions ≤ 280 chars. **Attach video** (a screen capture: prompt → published live app → generated video). Every top-performing post in the audit had media. Post 13:00–17:00 UTC.

### Version A — MAIN (single post)

```
Your app doesn't have to stop at localhost.

Verdent 2.9.0 publishes Cloud projects to a live URL anyone can visit — database, users, and analytics already wired in.

It also makes video now. Same conversation, playable result.

From idea to shipped, without leaving Verdent.
```

**275 characters** (verified). Hook is the first line and it names a real developer pain. No hashtags — matching observed practice. Media carries the proof.

*Optional hashtag variant if the social lead wants discovery (stay at 2, per X's own guidance):* append `#AgenticCoding #BuildInPublic` — but this costs ~28 chars, so trim the last line to `Idea to shipped, without leaving Verdent.`

### Version B — ALT (4-post thread)

> Thread caveat from the audit: replies get far less reach than the parent (828 views under a 383K post). So **post 1 must stand completely alone**, and the video goes on post 1, not buried later.

**1/**
```
Verdent 2.9.0 is out: Ship it, watch it.

You can now publish a Cloud project to a live URL — and generate video — without leaving Verdent.

Idea → shipped app → video, in one conversation.
```

**2/**
```
Publishing used to be the part where momentum died. Hosting, a database, auth, somewhere to read signups.

Every published Verdent app now ships with a database, a Users tab, and Analytics. Built in. Nothing to wire up.
```

**3/**
```
Video works the same way. Ask in plain language, or use the video entry in the input box.

Track the task, preview the concept, get a playable video right in the conversation. No fourth tool, no new tab.
```

**4/**
```
Also in 2.9.0: satisfaction feedback, cleaner product copy throughout, and we tucked away the New workspace entry to quiet the interface.

Try it in Verdent today.

What's the first thing you'd publish?
```

Closing question is deliberate — the audit flags comment volume of 0–3 as a ranking weakness, and every sampled post was one-directional.

---

## 2.2 LinkedIn — company/verdent-ai

### Version A — MAIN (227 words)

```
Verdent 2.9.0 is now available: Ship it, watch it.

Most tools stop at code that runs on your machine. The gap between "it works locally" and "someone else can use it" is where a surprising number of good ideas quietly die — not for lack of engineering, but for lack of hosting, a database, auth, and somewhere to see who actually signed up.

Verdent 2.9.0 closes that gap in two ways.

You can now create and publish Cloud projects directly from Verdent. An idea becomes a live app that anyone can visit, without leaving the tool. Every published app arrives with a database for your data, a Users tab showing who signs up, and Analytics on how the app is performing — built in and ready to use, not a follow-up integration project.

Verdent also supports video generation now. Start a request in plain language, follow the task status, preview the concept, and get a playable video inside the same conversation.

Why this matters for teams: the number of handoffs between "we decided to build it" and "it is live and we can see usage" drops sharply. Fewer tools to provision, fewer accounts to reconcile, fewer places for context to leak.

This release also adds satisfaction feedback and a cleaner interface throughout.

We're looking forward to seeing what teams ship with it.

#AgenticCoding #DeveloperTools #AI
```

Opens with the observed `[X] is now available` formula, keeps the "why teams care" section explicit as the brief required, mirrors the house reassurance move (*"not a follow-up integration project"* ≈ *"without rebuilding workflows from scratch"*), and closes on the sampled sign-off pattern (*"We're excited to see how developers and teams put it to work."*). 3 hashtags, inside the 3–5 rule. Zero emoji.

### Version B — ALT (185 words, sharper business frame)

```
Verdent 2.9.0 is now available.

A question worth asking about any internal tool: how long does it take to get from an idea to something a colleague can open in a browser?

For most teams the answer is measured in days, and almost none of that time is spent on the idea. It goes to provisioning, wiring a database, adding auth, and standing up a way to measure whether anyone used the thing.

Verdent 2.9.0 removes that overhead. You can create and publish Cloud projects from inside Verdent, and every published app comes with a database, a Users tab to see who signs up, and Analytics — all built in.

The release also adds video generation. Describe what you want in plain language and get a playable video in the same conversation, with task status and a concept preview along the way.

The practical effect is a shorter path from decision to feedback. Ship the app, watch how it performs, and keep iterating in one place.

Also in this release: satisfaction feedback and refined product copy across the app.

#DeveloperProductivity #AgenticCoding #AI
```

Opens on a question rather than a feature — useful A/B against Version A's problem-statement opening.

---

## 2.3 Reddit — r/Verdent

> Tone target: the observed *"We just added…"* register, not the LinkedIn one. Marketing voice gets punished on Reddit, so both versions name limits honestly. Flair: `Announcement`.

### Version A — MAIN

**Title:**
```
Verdent 2.9.0: you can now publish Cloud projects to a live URL, and generate video
```

**Body:**
```
2.9.0 is out. Two real additions and a few smaller things.

**Publishing Cloud projects**

You can create and publish a Cloud project from inside Verdent now, and end up with a live app someone else can actually open — no separate deploy step, no leaving the app.

Each published app comes with:
- a database for your data
- a Users tab, so you can see who signed up
- Analytics, so you can see if anyone is using it

The reason we did this: getting something running locally was never the hard part. The hard part was the pile of setup between "works on my machine" and "my friend can open the link." That's what this removes.

**Video generation**

Verdent can generate video now. Ask in plain language, or use the video entry in the input box. You get task status while it runs, a concept preview, then a playable video in the conversation.

**Smaller stuff**
- satisfaction feedback, so you can tell us when a result was bad
- product copy cleaned up across the app
- the New workspace entry is tucked away now — it was cluttering things for people who never used it

Worth being straight about scope: this is aimed at getting an idea in front of real users quickly. If you need a specific region, a custom domain setup, or particular compliance guarantees, check whether the built-in stack covers your case before you commit a production workload to it.

If you publish something, post the link — genuinely curious what people build. Bug reports and complaints welcome too, that's what the feedback button is for.
```

### Version B — ALT (shorter, more conversational)

**Title:**
```
2.9.0 is out — publishing to a live URL and video generation, both from inside Verdent
```

**Body:**
```
Quick rundown of what landed in 2.9.0.

**You can publish now.** Create a Cloud project in Verdent and publish it to a URL anyone can visit. It ships with a database, a Users tab to see signups, and Analytics. The point was to kill the gap between a working local build and something you can send to another person.

**Video generation.** Plain-language request, or the video entry in the input box. You watch the task status, preview the concept, and get a playable video in the thread.

**Also:** satisfaction feedback, cleaner copy across the app, and we moved the New workspace entry out of the main interface since it was mostly noise.

Honest note: the built-in database/users/analytics stack is designed to be the fast default, not a replacement for infra you've deliberately chosen. Worth a look before you move anything critical onto it.

Feedback thread — tell us what breaks.
```

---

## 2.4 Discord — `#announcements`

> ⚠️ Verdent's actual Discord announcement style could not be verified (auth-gated). Both versions follow general Discord announcement convention: markdown headers, short lines, emoji as visual anchors only, light CTA.

### Version A — MAIN

```
# 🚀 Verdent 2.9.0 — Ship it, watch it

Two big ones this release.

## 🌐 Publish Cloud projects from Verdent
Take an idea all the way to a **live app that anyone can visit** — without leaving Verdent.

Every published app comes with:
- 🗄️ **Database** — for your data
- 👥 **Users tab** — see who signs up
- 📊 **Analytics** — see how your app is doing

All built in. Nothing to wire up.

## 🎬 Video generation
Verdent does video now. Start a request in plain language, or use the video entry in the input box.
Follow the task status → preview the concept → get a playable video right in the conversation.

## ✨ Also in 2.9.0
- Added satisfaction feedback
- Polished product copy across the app
- Tucked away the New workspace entry for a cleaner interface

-# Update and give it a try. If you publish something, drop the link in the chat — and if something breaks, tell us in the feedback channel. We read all of it.
```

### Version B — ALT (tighter, less emoji)

```
# Verdent 2.9.0 is live 🚀
**Ship it, watch it.**

**Publish Cloud projects** 🌐
Create and publish a Cloud project straight from Verdent and get a live URL anyone can open. Database, Users tab, and Analytics are included from the start — no extra setup.

**Video generation** 🎬
Ask in plain language or use the video entry in the input box. Track the task, preview the concept, get a playable video in the conversation.

**Smaller improvements**
- Satisfaction feedback
- Cleaner product copy across the app
- New workspace entry tucked away to reduce clutter

> From idea to live app. And a video to prove it.

-# Already updated? Publish something and share it here 👀
```

---

# Part 3 — Recommendation

## 3.1 Recommended set

| Platform | Pick | Why |
|---|---|---|
| **X** | **Version A** (single post) + video | The audit is unambiguous: reply-position content gets a fraction of parent reach (828 vs 383K). A single strong post with video concentrates all distribution in one place. Hook line names a pain instead of announcing a version number |
| **LinkedIn** | **Version A** | Matches the verified LinkedIn structure most closely (opening formula → capability → *why teams care* → forward-looking sign-off) and hits the brief's "why this matters for developers/teams" requirement head-on |
| **Reddit** | **Version A** | The "reason we did this" paragraph and the explicit scope caveat are what buy credibility on Reddit. Version B is fine if a shorter post fits the sub's rhythm better |
| **Discord** | **Version A** | Mirrors the changelog's own three-block structure, so Discord and the changelog reinforce each other |

## 3.2 Slogan placement

- **X Version A** closes on a compressed form of the main slogan (`From idea to shipped, without leaving Verdent.`) — the full sentence is too long for 280 alongside the feature detail.
- **Discord Version B** uses the short alternate (`From idea to live app. And a video to prove it.`) as a blockquote — punchy register suits Discord.
- **LinkedIn deliberately does not use the slogan verbatim.** Marketing lines read as ad copy in-feed; the sampled LinkedIn posts contain no taglines. The idea is carried in prose instead.

## 3.3 Execution notes drawn from the audit

1. **Media is mandatory on X.** Every top-5 post had image or video. Best asset here is one screen recording: prompt → live published URL → generated video.
2. **Publish 13:00–17:00 UTC.** Four of the top five posts fell in this window; all six posts in 04:00–08:00 UTC underperformed.
3. **Native post, never a quote-RT.** 13.5K vs 246 median views.
4. **Reply to comments within the first hour.** The audit notes spam ("send me credit") dominating comment sections and depressing quality signals.
5. **Don't cross-post identical text.** X and LinkedIn share an opening formula but diverge after line one — that divergence is in the drafts above by design.
6. **Consider splitting X coverage across two days:** publishing on day 1, video generation on day 2. Both are headline-grade features and the audit warns against burying strong material. Video is also the more visually native asset for X.

## 3.4 Open items for the social lead

- **Discord tone is unverified.** Someone with server access should sanity-check Version A against the last two `#announcements` posts — particularly emoji density and whether `@everyone` is customary.
- **Hashtags:** no hashtags appeared in any sampled organic Verdent post. LinkedIn drafts include 3 (within the internal 3–5 rule); X drafts include none. Confirm which convention the team wants standardized.
- **Reddit scope caveat:** both versions state that the built-in database/users/analytics stack is a fast default rather than a replacement for deliberate infra. This is a credibility asset on Reddit — but it should be checked against what Product is willing to say publicly.
- **Link/CTA:** no download or changelog URL is embedded. Add `verdent.ai/changelog` if the team wants attribution tracking.

---

## Sources

**Internal**
- `/Users/a1234/Documents/verdent social media site/verdent-account-analysis.md`
- `/Users/a1234/Documents/verdent social media site/reports/verdent-content-strategy.md`
- `/Users/a1234/Documents/verdent social media site/content/japan-visit-social-post-guide.md`
- `/Users/a1234/Documents/verdent social media site/agi-tweets/2026-08-{05,06,10}.md`

**External (verified this session)**
- [x.com/verdent_ai](https://x.com/verdent_ai) — bio + 5 recent posts read
- [linkedin.com/company/verdent-ai](https://www.linkedin.com/company/verdent-ai) — 2 posts verbatim via search index (direct fetch login-walled)
- [verdent.ai/changelog](https://www.verdent.ai/changelog) — full changelog, v2.0.0 → v2.8.1
- [verdent.ai](https://www.verdent.ai/) — Community links, positioning
- [reddit.com/r/Verdent](https://www.reddit.com/r/Verdent/) — exists; one official post title/excerpt. **Body 403-blocked**
- [discord.gg/NGjXEZcbJq](https://discord.gg/NGjXEZcbJq) — server confirmed, 2,975 members. **Announcement content NOT accessible**
- [X Help Center — hashtags](https://help.x.com/en/using-x/how-to-use-hashtags) — ≤2 per post
- [Verdent Docs — Support & Resources](https://www.verdent.ai/docs/verdent-manager/reference/support-resources) — Discord community role
