# Verdent Skillbook Video Series

## Core Concept

**Project name:** Verdent Skillbook

**One-line definition:**

Verdent Skillbook is a living case library that shows how Verdent skills are used in real product workflows.

It is not:

- A flat skill list
- A prompt collection
- A one-off demo
- A pure documentation site

It is:

- A real website that can be shipped
- A long-term case library
- A productized showcase for Verdent workflows
- A continuous project where every video adds a reusable artifact

**Core narrative:**

Most AI demos show one trick. Verdent Skillbook shows the workflow.

## Website Structure

The final website should feel like a product library, not a docs folder.

### 1. Hero

**Title:**

Verdent Skillbook

**Subtitle:**

A living library of real workflows built with Verdent skills.

### 2. Workflow Lanes

Organize skills by how real product work happens:

- Plan
- Design
- Build
- Verify
- Ship
- Iterate

### 3. Featured Case

Example:

**Case 001: Turn a vague idea into a PRD**

Show:

- Workflow stage: Plan
- Skill used: PRD Generator
- Output: Product brief, MVP scope, acceptance criteria

### 4. Case Grid

Each case card should include:

- Case number
- Case title
- Workflow stage
- Skill used
- What changed
- Output artifact
- Status

### 5. Build Log

Show the project growing over time:

- Day 1: Created the PRD
- Day 2: Mapped skills into workflows
- Day 3: Designed the browsing experience
- Day 4: Built the case template

The Build Log proves Skillbook is not a one-time page. It is a living system.

## Case Page Structure

Every case page should follow the same structure:

### 1. What It Is

Explain what the skill or workflow does.

### 2. What I Use It For

Explain how it was used inside the Verdent Skillbook project.

### 3. What Changed

Show the before and after.

### 4. Output Artifacts

Examples:

- PRD
- Workflow map
- Design rules
- Case template
- Screenshots
- Deployment checklist

### 5. Acceptance Checklist

Define how we know the case is complete.

### 6. Next Step

Connect the output of this case to the next episode.

## Video Format

Each episode should be 30-40 seconds.

| Time | Content | Purpose |
|---|---|---|
| 0-3s | Hook | Grab attention |
| 3-7s | What it is | Explain the skill |
| 7-24s | What I use it for | Show the real operation |
| 24-34s | What changed | Show before/after |
| 34-40s | Next | Set up the next episode |

Each episode should focus on one visible transformation.

## Episode 1: Idea To PRD

**Title:** No More Toy AI Demos

**Core transformation:** Vague idea -> actionable PRD

**Skill:** PRD Generator

**Video goal:**

Establish the reason for the series. We are not making a fake demo. We are building a real Skillbook from scratch.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | Black screen text: `No more toy AI demos.` | "Most AI demos show one trick." |
| 3-6s | Empty project / blank page / Verdent UI | "I want to show the workflow." |
| 6-10s | Type project name: `Verdent Skillbook` | "So I'm building a real Skillbook with Verdent." |
| 10-15s | Show many skill cards | "There are a lot of skills, but people need real use cases." |
| 15-23s | Paste prompt, PRD starts generating | "First, I use PRD Generator to turn the idea into a product brief." |
| 23-32s | Scroll through PRD: audience / MVP / case format / acceptance criteria | "Now we have audience, scope, case format, and acceptance criteria." |
| 32-37s | Before/After: `make skill demos` -> `PRD + MVP + standards` | "Before: vague idea. After: something we can actually build." |
| 37-40s | End card: `Next: Skills -> Workflows` | "Next, I'll turn skills into workflows." |

### Verdent Prompt

```text
I want to build a real showcase project called Verdent Skillbook.

It should not be a simple list of skills or a toy demo. It should be a living case library that shows how Verdent skills are used in real workflows.

Please create a clear PRD for this product.

Structure it around:
1. What the product is
2. Who it is for
3. The core problem it solves
4. The MVP scope
5. What is intentionally out of scope
6. The content model for each case
7. The homepage structure
8. Acceptance criteria for the first version

Every case in the Skillbook should answer:
- What it is
- What I use it for
- What changed

Keep the PRD practical enough that we can build from it immediately.
```

### Output

- Verdent Skillbook PRD
- MVP scope
- Case content structure
- Acceptance criteria

## Episode 2: Skills To Workflows

**Title:** A Skill List Is Not A Workflow

**Core transformation:** Skill list -> product workflow map

**Skills:** Doc Co-Authoring, Documentation Writer

**Video goal:**

Show that Verdent skills are not isolated tools. They can be connected into real project workflows.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | Fast scroll through skill cards | "A skill list is not a workflow." |
| 3-7s | Show six stages: Plan / Design / Build / Verify / Ship / Iterate | "So I'm reorganizing skills by how real work happens." |
| 7-14s | Paste prompt into Verdent | "I ask Verdent to map every skill to a product stage." |
| 14-24s | Show mapping: PRD -> Plan, Figma -> Design, Database -> Build, Agent Browser -> Verify | "Now each skill has a role: planning, designing, building, verifying, shipping, or iterating." |
| 24-33s | Homepage workflow lanes draft | "The homepage becomes a map, not a directory." |
| 33-38s | Before/After: `skill list` -> `workflow map` | "Before: tools. After: a path." |
| 38-40s | End card: `Next: Design the experience` | "Next, I'll design the experience." |

### Verdent Prompt

```text
Using the PRD for Verdent Skillbook, help me turn the available Verdent skills into real product workflows.

Do not organize them as a flat list or by technical category only.

Organize them by how real work happens:
- Plan
- Design
- Build
- Verify
- Ship
- Iterate

For each workflow stage, include:
1. What this stage means
2. Which skills belong here
3. When someone would use these skills
4. What outputs this stage should produce
5. One example case title for the Skillbook

Please create a concise workflow map that can be used on the homepage.
```

### Output

- Workflow map
- Skill-to-stage mapping
- Homepage information architecture

## Episode 3: Workflow Map To Product UI

**Title:** Make The Showcase Feel Like A Product

**Core transformation:** Workflow map -> productized browsing experience

**Skill:** Design System Rules

**Video goal:**

Show that Verdent can turn content and structure into consistent design rules.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | Raw document list / plain structure | "A showcase should not feel like a spreadsheet." |
| 3-7s | Show `Design System Rules` | "So I use Design System Rules to shape the experience." |
| 7-15s | Generated rules: cards / tags / layout / spacing | "It defines cards, tags, status labels, layout, and mobile rules." |
| 15-25s | Homepage wireframe: Hero / workflow lanes / featured case / build log | "Now the site has a clear browsing structure." |
| 25-34s | Show case card design | "Each case card shows the stage, skill, output, and what changed." |
| 34-38s | Before/After: `notes` -> `product library UI` | "Before: notes. After: a product library." |
| 38-40s | End card: `Next: Build the template` | "Next, I'll build the case template." |

### Verdent Prompt

```text
Create design system rules for Verdent Skillbook.

Context:
Verdent Skillbook is a living case library that explains real Verdent skill workflows. It should feel like a focused product library for builders, not a marketing page and not a dense documentation site.

Please define:
1. Visual tone
2. Layout principles
3. Typography scale
4. Color usage
5. Case card design
6. Workflow tag design
7. Status labels
8. Homepage sections
9. Case detail page structure
10. Mobile layout rules

The design should support this content structure:
- What it is
- What I use it for
- What changed
- Outputs
- Skills used
- Next step

Keep the rules practical for implementation.
```

### Output

- Design system rules
- Homepage wireframe
- Case card spec

## Episode 4: One Case To Reusable Template

**Title:** A Template Turns Content Into A System

**Core transformation:** Single case -> reusable case template

**Skill:** Figma Implement Design / Frontend implementation

**Video goal:**

Show Verdent's long-term value. We are not writing one page; we are building a structure for continuously publishing cases.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | Text: `One case is content. A template is a system.` | "One case is content. A template is a system." |
| 3-7s | Show previous wireframe | "Today I turn the design into a reusable case page." |
| 7-15s | Coding / component generation | "Every case follows the same three questions." |
| 15-23s | Page sections appear: What it is / What I use it for / What changed | "What it is. What I use it for. What changed." |
| 23-31s | Outputs / Skills used / Acceptance / Next step appear | "Then it stores outputs, skills used, checks, and the next step." |
| 31-37s | Empty template -> Case 001 ready | "Now every future case starts from the same structure." |
| 37-40s | End card: `Next: Publish Case 001` | "Next, I'll publish the first real case." |

### Verdent Prompt

```text
Build the reusable case page template for Verdent Skillbook.

Use the design system rules and PRD we created.

The case page should include:
1. Case title
2. Workflow stage
3. Skills used
4. Short summary
5. What it is
6. What I use it for
7. What changed
8. Output artifacts
9. Acceptance checklist
10. Next case link

Also create a reusable data structure for cases so future cases can be added consistently.

Please implement this in the existing project using the current codebase conventions.
```

### Output

- Case detail page
- Reusable case data structure
- Case template

## Episode 5: Publish Case 001

**Title:** The First Real Skill Case

**Core transformation:** PRD output -> first official Skillbook case

**Skill:** PRD Generator

**Video goal:**

Show that the website is self-contained and self-explaining. The first case is the workflow that created the Skillbook PRD.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | `Case 001: Idea -> PRD` | "Case 001 is where Skillbook starts." |
| 3-7s | Left side: `make skill demos` | "The original idea was vague." |
| 7-14s | Right side: PRD output | "PRD Generator turned it into audience, scope, format, and acceptance criteria." |
| 14-24s | Fill Case 001 page with the three-part structure | "Then I published that workflow as the first Skillbook case." |
| 24-33s | Show What it is / What I use it for / What changed | "Now the case teaches the exact process that created the project." |
| 33-38s | Before/After: `idea` -> `published case` | "Before: an idea. After: a reusable example." |
| 38-40s | End card: `Next: AI tests the site` | "Next, Verdent tests the site." |

### Verdent Prompt

```text
Create Case 001 for Verdent Skillbook.

Case title:
Turn a vague idea into a product PRD

Skill used:
PRD Generator

Workflow stage:
Plan

Use this structure:
1. What it is
2. What I used it for
3. What changed
4. Output artifacts
5. Acceptance checklist
6. Next step

Context:
The original vague idea was: "make some skill demos."
Using PRD Generator, we turned it into Verdent Skillbook: a living library of real Verdent skill use cases.

Make the case concise, concrete, and useful for someone who wants to understand when to use PRD Generator.

Also add this case to the Skillbook case list and homepage featured case section.
```

### Output

- Case 001 page
- Homepage featured case
- First real case

## Episode 6: AI Tests The Site

**Title:** Don't Tell Me It Works. Show Me.

**Core transformation:** Subjective completion -> screenshots and acceptance proof

**Skills:** Agent Browser, Screenshot, Delivery Acceptance

**Video goal:**

Show that Verdent can inspect a website like a real user instead of only generating code.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | Text: `Don't tell me it works. Show me.` | "Don't tell me it works. Show me." |
| 3-7s | Show local website homepage | "I use Verdent to test Skillbook like a visitor." |
| 7-14s | Acceptance checklist | "The checks are simple: homepage, workflows, case page, and mobile." |
| 14-24s | Automated path: homepage -> workflow -> Case 001 | "Verdent opens the site, browses workflows, and opens Case 001." |
| 24-31s | Mobile screenshot | "Then it checks the mobile layout." |
| 31-36s | Pass/fail checklist | "The result is screenshots, checks, and fixes." |
| 36-40s | End card: `Next: Ship it publicly` | "Next, I'll ship it publicly." |

### Verdent Prompt

```text
Test Verdent Skillbook like a real visitor.

Use the acceptance criteria from the PRD and Case 001.

Please verify:
1. The homepage loads correctly
2. Workflow stages are visible
3. The featured case is visible
4. Case 001 opens correctly
5. The case page includes:
   - What it is
   - What I use it for
   - What changed
   - Outputs
   - Skills used
   - Next step
6. The layout works on desktop
7. The layout works on mobile
8. There are no obvious visual overlaps or broken states

Capture screenshots for the important states.

Return:
- Pass/fail checklist
- Screenshots captured
- Issues found
- Recommended fixes
```

### Output

- QA screenshots
- Pass/fail checklist
- Fix list

## Episode 7: Local To Live URL

**Title:** Local Demos Don't Count

**Core transformation:** Local demo -> public URL

**Skills:** Vercel Deploy, Deploy Diagnosis, CI Helper

**Video goal:**

Show the shipping loop. Most AI demos stop locally; this one becomes public.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | localhost URL | "Local demos don't count." |
| 3-7s | Deployment panel / Verdent prompt | "So I use Verdent to deploy Skillbook." |
| 7-15s | Build running | "It checks the project and starts the release." |
| 15-24s | If error: error -> diagnosis -> fix | "If deployment breaks, Verdent turns the error into a fix." |
| 24-32s | Live URL opens | "Now Skillbook has a real public URL." |
| 32-37s | Launch checklist | "Build checked. Site live. First case published." |
| 37-40s | End card: `Next: Make it repeatable` | "Next, I'll make it repeatable." |

### Verdent Prompt

```text
Prepare Verdent Skillbook for public deployment.

Please:
1. Check whether the project builds successfully
2. Identify any missing environment variables or deployment blockers
3. Fix build issues if they appear
4. Prepare a deployment checklist
5. Deploy the project publicly
6. If deployment fails, diagnose the error and suggest or apply the fix
7. Verify the live URL after deployment

Return:
- Build status
- Deployment status
- Live URL
- Any issues fixed
- Final launch checklist
```

### Output

- Live URL
- Deployment status
- Launch checklist

## Episode 8: Showcase To Living Library

**Title:** Make It Repeatable

**Core transformation:** One-time showcase -> sustainable case library

**Skills:** Delivery Acceptance, Git Commit, PR Creator

**Video goal:**

Show that Verdent Skillbook can keep growing after the first version.

### Timeline

| Time | Visual | Voiceover |
|---|---|---|
| 0-3s | Text: `A showcase is useful once. A system is useful every week.` | "A showcase is useful once. A system is useful every week." |
| 3-8s | Live Skillbook | "Now I need a repeatable way to add cases." |
| 8-16s | New case checklist | "Every case needs a stage, three questions, outputs, and checks." |
| 16-25s | Case 002 draft: Agent Browser | "So I draft Case 002 using the same structure." |
| 25-32s | Delivery Acceptance check | "Verdent checks whether it is ready to publish." |
| 32-37s | Case 002 appears on site / PR summary | "Now Skillbook can grow one workflow at a time." |
| 37-40s | End card: `Season 2: one real case every week` | "Season two: one real Verdent case every week." |

### Verdent Prompt

```text
Turn Verdent Skillbook from a one-time showcase into a repeatable publishing system.

Please create a standard process for adding new skill cases.

Include:
1. New case checklist
2. Required fields for every case
3. Acceptance criteria before publishing
4. Suggested case naming convention
5. Workflow stage options
6. Output artifact requirements
7. Review checklist
8. Commit message format
9. PR description template

Then create a draft for Case 002:
Case title:
Test a website like a real user

Skill used:
Agent Browser + Screenshot + Delivery Acceptance

Workflow stage:
Verify

Use the same structure:
- What it is
- What I use it for
- What changed
- Output artifacts
- Acceptance checklist
- Next step
```

### Output

- New case checklist
- Case 002 draft
- Repeatable publishing workflow

## Shared Context Prompt

Use this at the beginning of each episode if Verdent needs the project context again:

```text
We are building Verdent Skillbook, a living case library that shows how Verdent skills work in real product workflows.

Every case should follow this structure:
- What it is
- What I use it for
- What changed
- Output artifacts
- Acceptance checklist
- Next step

The goal is to avoid toy demos and show how Verdent helps move a real project forward over time.

For this episode, focus only on the next concrete step. Keep the output practical, visible, and reusable.
```

## Tweet Format

Use this structure for each post:

```text
Building Verdent Skillbook from scratch.

Not a toy demo.
A living library of real workflows built with Verdent skills.

Episode [X]:
[Before state] -> [After state]

Skill used:
[Skill name]

What changed:
[Concrete output]
```

Example:

```text
Building Verdent Skillbook from scratch.

Not a toy demo.
A living library of real workflows built with Verdent skills.

Episode 1:
Vague idea -> Product PRD

Skill used:
PRD Generator

What changed:
We now have the audience, MVP scope, case structure, and acceptance criteria.
```

## Core Lines

Use these throughout the series:

```text
Most AI demos show one trick.
Verdent Skillbook shows the workflow.
```

```text
Not prompts.
Reusable workflows.
```

```text
Every episode leaves behind a real artifact.
```

