# AI Glossary Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a plain-English, four-level AI glossary that remains useful as individual products and model versions change.

**Architecture:** Expand the existing Jekyll post as one self-contained article. Research notes stay outside the published post; primary-source links appear inline only where a named project or technical distinction needs support.

**Tech Stack:** Jekyll-compatible Markdown and YAML front matter.

## Global Constraints

- Preserve the existing post title and publication date.
- Organize terms into Basic, Intermediate, Advanced, and Going deeper sections.
- Mention ChatGPT, Claude, Gemini, Grok, OpenCode, Hermes, OpenClaw, DeepSeek, Kimi, Qwen, Llama, and Mistral without version-dependent rankings.
- Distinguish model from product, agent from workflow, skill from tool, harness from model, open weights from open source, and benchmark scores from practical usefulness.
- Aim for 2,500 to 3,000 words, favoring clarity over word count.
- Use primary sources for time-sensitive descriptions.
- Finish with a separate anti-AI-slop editorial pass.

---

### Task 1: Verify named projects and contested terminology

**Files:**
- Read: `docs/superpowers/specs/2026-08-08-ai-glossary-design.md`
- Modify: none

- [x] **Step 1: Check official documentation**

Verify how OpenCode, Hermes, and OpenClaw describe their software. Confirm the publishers of the named model families and find a primary source explaining why open weights and open source are different claims.

- [x] **Step 2: Record only article-relevant facts**

Keep the article evergreen: retain stable ownership, category, and capability descriptions; discard release numbers, current leaderboard positions, and temporary pricing.

### Task 2: Write the first draft

**Files:**
- Modify: `_posts/2026-08-08-everything-you-need-about-ai-to-know-to-sound-like-you-know-what-you-re-talking-about.md`

- [x] **Step 1: Preserve and extend front matter**

Keep `layout`, `title`, and `date`; add an evergreen excerpt that accurately describes the article.

- [x] **Step 2: Draft all four levels**

Give every term a plain-English definition, a concrete example where it helps, and enough contrast to prevent common category mistakes.

- [x] **Step 3: Add a translation guide**

Close with short explanations of common statements heard in AI discussions, without supplying canned jargon for readers to repeat.

### Task 3: Perform the anti-AI-slop edit

**Files:**
- Modify: `_posts/2026-08-08-everything-you-need-about-ai-to-know-to-sound-like-you-know-what-you-re-talking-about.md`

- [x] **Step 1: Edit vocabulary and syntax**

Remove banned phrasing, repetitive entry structures, excessive parallel construction, uniform sentence lengths, fake precision, hype, and passive filler.

- [x] **Step 2: Calibrate to the blog's voice**

Keep the writing direct, mildly opinionated, technically honest, and willing to call out fuzzy industry language.

### Task 4: Verify the finished post

**Files:**
- Verify: `_posts/2026-08-08-everything-you-need-about-ai-to-know-to-sound-like-you-know-what-you-re-talking-about.md`

- [x] **Step 1: Run editorial checks**

Check requested terms, banned phrases, link targets, em-dash count, word count, duplicate headings, trailing whitespace, and front matter.

- [x] **Step 2: Run the site's available build or content check**

Inspect the repository's documented build command and run the narrowest relevant validation. If dependencies prevent it, report the exact limitation.

- [x] **Step 3: Review the diff**

Confirm that only the target article and tracking documents changed during this work; preserve all unrelated user changes.
