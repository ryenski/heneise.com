# AI Deep-Dive Cover Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create, integrate, and verify seven cover images for the August 10–24 AI glossary deep-dive series.

**Architecture:** Use the existing August 8 glossary cover as the visual reference for seven newly generated editorial collages. Store each image in a slug-matched asset directory, point each post's `image` front matter at its file, then verify dimensions, front matter, and the Jekyll build.

**Tech Stack:** OpenAI image generation, ImageMagick inspection/conversion, Jekyll, YAML front matter

## Global Constraints

- Final size: exactly 1672 × 941 pixels.
- Final format: baseline RGB JPEG named `cover.jpg`.
- Shared visual system: warm cream archival paper, clipped index cards, typed scraps, black technical linework, and sparse red pencil or ink annotations.
- No full article titles inside the images.
- Avoid glossy science fiction, glowing brains, humanoid robots, generic circuit boards, neon gradients, and fake application screens.
- Generated labels must be sparse, correctly spelled, and readable at preview size.
- Preserve unrelated worktree changes, including the existing edit to `_posts/2026-08-12-what-actually-happens-when-you-chat-with-ai.md`.

---

### Task 1: Generate the seven-image cover set

**Files:**
- Reference: `assets/images/2026-08-08-ai-glossary-everything-you-need-to-know-about-ai/cover.jpg`
- Create: `assets/images/2026-08-10-how-ai-models-work-without-the-math/cover.jpg`
- Create: `assets/images/2026-08-12-what-actually-happens-when-you-chat-with-ai/cover.jpg`
- Create: `assets/images/2026-08-14-how-ai-finds-information-reasons-and-changes-behavior/cover.jpg`
- Create: `assets/images/2026-08-17-anatomy-of-an-ai-agent/cover.jpg`
- Create: `assets/images/2026-08-19-from-one-agent-to-autonomous-systems/cover.jpg`
- Create: `assets/images/2026-08-21-open-closed-local-hosted-choosing-ai-stack/cover.jpg`
- Create: `assets/images/2026-08-24-going-beyond-chat-replacing-yourself-in-business-workflows/cover.jpg`

**Interfaces:**
- Consumes: the approved art direction and the August 8 reference image.
- Produces: seven RGB JPEG assets at 1672 × 941 for post front matter.

- [ ] **Step 1: Generate the August 10 cover**

  Use the August 8 cover as the style reference. Request a new 16:9 editorial flat-lay in which a strip of token cards enters a layered `TRAINING` file and a separate path exits through an `INFERENCE` card. Use one red correction mark to separate the two stages. Keep the cream paper field spacious; include no title, logos, people, robots, or equations.

- [ ] **Step 2: Generate the August 12 cover**

  Request a new flat-lay in the same material, light, palette, and camera angle. A small message card should pass through a stacked assembly labeled `PROMPT`, `CONTEXT`, and `TOOLS`, ending at `OUTPUT`; one partially hidden instruction card should peek from beneath the stack. Use sparse red arrows and no other text.

- [ ] **Step 3: Generate the August 14 cover**

  Request three connected paper mechanisms: retrieved document tabs, a plotted embedding map, and a weight-adjustment card. Labels may read `RETRIEVE`, `REASON`, and `TUNE`. Red editorial marks must show that retrieval adds material while tuning changes the model.

- [ ] **Step 4: Generate the August 17 cover**

  Request a circular paper-and-ink loop connecting `PLAN`, `ACT`, `OBSERVE`, and `REVISE`. Clip small tool cards around the loop, then draw a black permission boundary around the actions. The composition should explain an agent without depicting a robot or a chat window.

- [ ] **Step 5: Generate the August 19 cover**

  Request one central agent card branching to several smaller delegated task cards inside a clearly drawn sandbox boundary. Add a single red `APPROVE` gate before the final output path. Keep delegation orderly and limited rather than depicting a chaotic network.

- [ ] **Step 6: Generate the August 21 cover**

  Request a four-part paper system using a sealed box, an open file, a small local machine, and a remote hosted terminal. Sparse connector lines should distinguish `MODEL`, `PROVIDER`, `PRODUCT`, and `RUNTIME`; avoid brand names and interface screenshots.

- [ ] **Step 7: Generate the August 24 cover**

  Request a left-to-right business workflow made from clipped cards: input documents, an agent workbench, a red human approval stamp, then a finished report. The approval gate must interrupt the path before the consequential action, making human judgment visible.

- [ ] **Step 8: Normalize files and inspect the contact sheet**

  Create the seven slug directories, convert each result to baseline RGB JPEG, crop rather than stretch to 1672 × 941, and inspect all covers together.

  Run:

  ```bash
  rtk magick mogrify -colorspace sRGB -resize '1672x941^' -gravity center -extent 1672x941 -format jpg -quality 90 assets/images/2026-08-{10,12,14,17,19,21,24}-*/cover.*
  rtk magick montage assets/images/2026-08-{10,12,14,17,19,21,24}-*/cover.jpg -thumbnail 500x281 -tile 2x -geometry +12+12 /tmp/ai-deep-dive-covers.jpg
  rtk identify assets/images/2026-08-{10,12,14,17,19,21,24}-*/cover.jpg
  ```

  Expected: seven images, each reported as `1672x941`, with no garbled labels or repeated composition.

- [ ] **Step 9: Commit the image set**

  ```bash
  rtk git add assets/images/2026-08-{10,12,14,17,19,21,24}-*/cover.jpg
  rtk git commit -m "Add AI deep-dive cover series"
  ```

---

### Task 2: Connect covers to posts and verify the site

**Files:**
- Modify: `_posts/2026-08-10-how-ai-models-work-without-the-math.md`
- Modify: `_posts/2026-08-12-what-actually-happens-when-you-chat-with-ai.md`
- Modify: `_posts/2026-08-14-how-ai-finds-information-reasons-and-changes-behavior.md`
- Modify: `_posts/2026-08-17-anatomy-of-an-ai-agent.md`
- Modify: `_posts/2026-08-19-from-one-agent-to-autonomous-systems.md`
- Modify: `_posts/2026-08-21-open-closed-local-hosted-choosing-ai-stack.md`
- Modify: `_posts/2026-08-24-going-beyond-chat-replacing-yourself-in-business-workflows.md`

**Interfaces:**
- Consumes: the seven `cover.jpg` assets from Task 1.
- Produces: seven valid `image` front-matter paths consumed by Jekyll layouts and social metadata.

- [ ] **Step 1: Add each image path**

  Insert the matching `image` line after `date` in each post:

  ```yaml
  image: /assets/images/2026-08-10-how-ai-models-work-without-the-math/cover.jpg
  image: /assets/images/2026-08-12-what-actually-happens-when-you-chat-with-ai/cover.jpg
  image: /assets/images/2026-08-14-how-ai-finds-information-reasons-and-changes-behavior/cover.jpg
  image: /assets/images/2026-08-17-anatomy-of-an-ai-agent/cover.jpg
  image: /assets/images/2026-08-19-from-one-agent-to-autonomous-systems/cover.jpg
  image: /assets/images/2026-08-21-open-closed-local-hosted-choosing-ai-stack/cover.jpg
  image: /assets/images/2026-08-24-going-beyond-chat-replacing-yourself-in-business-workflows/cover.jpg
  ```

- [ ] **Step 2: Check path-to-file consistency**

  Run:

  ```bash
  rtk ruby -ryaml -e 'Dir["_posts/2026-08-{10,12,14,17,19,21,24}-*.md"].each { |post| data = YAML.safe_load(File.read(post).split("---", 3)[1], permitted_classes: [Time]); path = data.fetch("image").sub(%r{^/}, ""); abort("missing #{path}") unless File.file?(path); puts "ok #{post} -> #{path}" }'
  ```

  Expected: seven `ok` lines and exit status 0.

- [ ] **Step 3: Run the production site build**

  Run:

  ```bash
  JEKYLL_ENV=production rtk bundle exec jekyll build
  ```

  Expected: exit status 0 with the generated site written to `_site`.

- [ ] **Step 4: Review the final diff without staging unrelated edits**

  Run:

  ```bash
  rtk git diff --check
  rtk git diff -- _posts/2026-08-{10,12,14,17,19,21,24}-*.md
  rtk git status --short
  ```

  Expected: no whitespace errors; seven new `image` lines; the pre-existing August 12 content edit and unrelated Obsidian/spec files remain untouched.

- [ ] **Step 5: Leave the post edits uncommitted for user review**

  Do not commit the post changes because the August 12 post already contains user-authored edits. Report this explicitly in the handoff so the user can combine or separate that work intentionally.
