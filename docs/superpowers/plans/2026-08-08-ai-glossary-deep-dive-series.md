# AI Glossary Deep-Dive Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create seven future-dated teaching articles that expand every AI glossary topic and finish with a practical business-workflow capstone.

**Architecture:** Each Jekyll post stands alone but links back to the glossary and, where useful, to earlier articles in the series. Every article opens with a Beginner/Intermediate/Advanced/Go deeper learning table, follows with prose and practical advice, cites primary sources for technical claims, and receives a separate anti-AI-slop editorial pass.

**Tech Stack:** Jekyll-compatible Markdown, YAML front matter, primary web sources, and the existing site build.

## Global Constraints

- Use the direct teaching voice defined in `docs/superpowers/specs/2026-08-08-ai-glossary-deep-dive-series-design.md`.
- Date posts at 09:00 America/Chicago on August 10, 12, 14, 17, 19, 21, and 24, 2026.
- Include a four-row learning table in every article: Beginner, Intermediate, Advanced, and Go deeper.
- Explain each assigned glossary term and provide practical advice or an explicit reason no practical exercise fits.
- Use primary sources for changing product details, protocols, model behavior, licenses, and research claims.
- Run the anti-AI-slop-writing skill after technical and structural editing on every article.
- Recheck technical meaning after the anti-AI-slop pass.
- Link each article to the glossary at `/2026/08/08/ai-glossary-everything-you-need-to-know-about-ai.html`.
- Do not create cover images during this implementation.

---

### Task 1: How AI Models Work Without the Math

**Files:**
- Create: `_posts/2026-08-10-how-ai-models-work-without-the-math.md`

- [ ] **Step 1: Research stable primary sources**

Use model-provider documentation or original papers for tokens, language-model generation, training, inference, model cards, and open-weight inspection. Avoid temporary model rankings.

- [ ] **Step 2: Draft the article**

Use the exact Article 1 learning table and coverage from the design. Explain AI, generative AI, model, LLM, token, training, and inference. Include tokenizer and model-card exercises.

- [ ] **Step 3: Edit and verify**

Run the anti-AI-slop pass, verify links and definitions, then run `bundle exec jekyll build`. Expected: exit 0.

### Task 2: What Actually Happens When You Chat With AI

**Files:**
- Create: `_posts/2026-08-12-what-actually-happens-when-you-chat-with-ai.md`

- [ ] **Step 1: Research context and product behavior**

Use official documentation for context windows, projects or file context, memory, multimodal inputs, and prompting guidance. Separate model behavior from product features.

- [ ] **Step 2: Draft the article**

Cover chatbot, prompt, output, context, context window, memory, hallucination, and multimodal behavior. Include agent-assisted prompt writing, ambitious multi-step requests, project and file context, clean-chat comparisons, and approval boundaries.

- [ ] **Step 3: Edit and verify**

Run the anti-AI-slop pass, confirm prompting advice does not imply blind trust, verify links, and run the Jekyll build.

### Task 3: How AI Finds Information, Reasons, and Changes Behavior

**Files:**
- Create: `_posts/2026-08-14-how-ai-finds-information-reasons-and-changes-behavior.md`

- [ ] **Step 1: Research learning and retrieval methods**

Use original or official sources for RAG, embeddings, fine-tuning, reasoning, inference-time compute, reinforcement learning, and reward hacking.

- [ ] **Step 2: Draft the article**

Teach the decision among retrieval, prompting, and fine-tuning. Separate retrieval quality from answer quality and include a small semantic-search or retrieval-evaluation exercise.

- [ ] **Step 3: Edit and verify**

Run the anti-AI-slop pass, confirm the article does not treat hidden chain-of-thought as an audit log, verify citations, and run the Jekyll build.

### Task 4: Anatomy of an AI Agent

**Files:**
- Create: `_posts/2026-08-17-anatomy-of-an-ai-agent.md`

- [ ] **Step 1: Research agent architecture**

Use official MCP documentation and primary harness documentation to confirm tool calling, skills, agent loops, permissions, and connection boundaries.

- [ ] **Step 2: Draft the article**

Cover skill, agent, agentic behavior, tool calling, harness, and MCP. Trace one multi-step task through decision, request, execution, observation, revision, and stopping.

- [ ] **Step 3: Edit and verify**

Run the anti-AI-slop pass, verify that tools and skills remain distinct, confirm MCP is described as a connection standard rather than a safety system, and run the Jekyll build.

### Task 5: From One Agent to Autonomous Systems

**Files:**
- Create: `_posts/2026-08-19-from-one-agent-to-autonomous-systems.md`

- [ ] **Step 1: Research agent evaluation and autonomy**

Use original benchmark or eval documentation, official computer-use and sandbox documentation, and primary sources for subagent or multi-agent behavior.

- [ ] **Step 2: Draft the article**

Cover frontier model, frontier agent, eval, benchmark, computer use, sandbox, subagent, multi-agent system, and autonomy. Include a permission matrix and a small workload-specific eval design.

- [ ] **Step 3: Edit and verify**

Run the anti-AI-slop pass, remove leaderboard-dependent claims, confirm that more agents are not presented as inherently better, and run the Jekyll build.

### Task 6: Open, Closed, Local, and Hosted

**Files:**
- Create: `_posts/2026-08-21-open-closed-local-hosted-choosing-ai-stack.md`

- [ ] **Step 1: Research access models and product categories**

Use the Open Source AI Definition, exact model licenses or model cards, and official documentation for named products, model families, APIs, local operation, and alternative harnesses.

- [ ] **Step 2: Draft the article**

Separate model, provider, product, and harness. Cover closed models, open weights, open source, local models, hosted APIs, familiar products, alternative models, alternative harnesses, and workload-specific selection.

- [ ] **Step 3: Edit and verify**

Run the anti-AI-slop pass, verify every named product against current primary documentation, avoid a universal ranking, and run the Jekyll build.

### Task 7: Going Beyond the Chat

**Files:**
- Create: `_posts/2026-08-24-going-beyond-chat-replacing-yourself-in-business-workflows.md`

- [ ] **Step 1: Research current agent products**

Verify Claude Cowork, ChatGPT Codex, Hermes, and OpenClaw using official product documentation available at drafting time. Record stable categories and workflows rather than version trivia.

- [ ] **Step 2: Draft the capstone**

Use “replace yourself” as a provocative hook, then teach responsible process capture and delegation. Map at least one business workflow from manual steps through agent inputs, tools, approvals, outputs, failure recovery, and measurement.

- [ ] **Step 3: Edit and verify**

Run the anti-AI-slop pass, confirm the article retains human accountability and permission boundaries, verify current product claims, and run the Jekyll build.

### Task 8: Link the Series and Verify Publication Behavior

**Files:**
- Modify: `_posts/2026-08-08-ai-glossary-everything-you-need-to-know-about-ai.md`
- Verify: all seven new `_posts/*.md` files

- [ ] **Step 1: Add the deep-dive index**

Add a short “Deep dives” section to the glossary with links to all seven future-dated article URLs and one-sentence descriptions.

- [ ] **Step 2: Add contextual cross-links**

Ensure later articles link to earlier explanations only where the dependency helps the reader. Every article must link to the glossary.

- [ ] **Step 3: Run editorial checks**

Check all assigned terms, tables, banned wording, future dates, internal links, duplicate headings, trailing whitespace, and front matter.

- [ ] **Step 4: Build with future posts enabled**

Run `bundle exec jekyll build --future`. Expected: exit 0 and all seven future-dated article pages present under `_site/2026/08/`.

- [ ] **Step 5: Review the complete diff**

Confirm only the seven posts, glossary index, and plan tracking changed during implementation. Preserve unrelated workspace edits.
