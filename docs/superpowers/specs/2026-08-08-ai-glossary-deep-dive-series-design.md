# AI Glossary Deep-Dive Series Design

## Purpose

Turn the existing AI glossary into a seven-article teaching series. Publish the six vocabulary deep dives three times per week for two weeks, followed by a practical business capstone on the next Monday. The glossary remains the overview and index; each new article becomes a spoke that explains a connected group of terms in enough depth to use them correctly.

The series should help a technically curious reader move from recognizing vocabulary to understanding how the parts fit together. It is not a computer science course, vendor catalog, or collection of disconnected definitions.

## Audience and voice

The primary reader hears AI terms at work or online and wants a reliable mental model without starting with mathematics. Some readers will stop after the beginner material. Developers and advanced users should still find useful implementation questions, experiments, and warnings in the later sections.

Use a direct teaching voice: patient without sounding remedial, technically honest, mildly opinionated, and willing to call out fuzzy industry language. Explain the term before introducing an acronym. Prefer a concrete example over an analogy when an example will do the job better.

## Standard article format

Each article begins with a short problem or question, then presents a learning-ladder table:

| Level | Job of the section |
|---|---|
| Beginner | Define the terms and give the reader a durable mental model. |
| Intermediate | Explain how the pieces connect and what changes in practical use. |
| Advanced | Cover tradeoffs, failure modes, system design, and misleading claims. |
| Go deeper | Offer experiments, primary sources, tools, and developer-level questions. |

After the table, prose should teach the subject in a natural sequence rather than mechanically repeating the table. Each article may include:

- A plain-language explanation with one or more concrete examples.
- Distinctions readers commonly collapse into one term.
- Practical usage advice for choosing, prompting, testing, or operating the system.
- A small experiment or inspection exercise when the reader can learn by doing.
- A deeper-work section for readers who want model cards, papers, tools, or implementation questions.
- Links back to the glossary and to earlier articles in the series.

Length follows the subject. Basic pieces can stop once the mental model holds; agent systems, model training, evals, and open-model deployment need more room.

## Article 1: How AI models work without the math

**Glossary coverage:** Artificial intelligence, generative AI, model, large language model, token, training, inference.

**Search/share role:** Both. Answer beginner searches while giving readers a clean way to distinguish the model from everything around it.

**Working length:** 2,200–3,000 words.

| Level | Teaching outline |
|---|---|
| Beginner | Separate AI from generative AI; define a model and LLM; explain tokens as the units a language model reads and writes. |
| Intermediate | Explain training versus inference, next-token generation, weights, and why a model is not a database of memorized answers. |
| Advanced | Discuss tokenization quirks, model scale, training data limits, inference cost, and why product behavior cannot be credited to the model alone. |
| Go deeper | Inspect text with a tokenizer, read a model card, compare token counts across phrasing, and run a small open-weight model if practical. |

**Prose path:** Begin with the overloaded word “AI.” Move from the broad category to generative systems, then narrow to language models. Explain training and inference as separate stages. Finish by showing what a model can and cannot contain.

**Practical tips:** Ask which model actually handled a request; check token costs before building a high-volume feature; do not confuse information placed in the prompt with information learned during training.

## Article 2: What actually happens when you chat with AI

**Glossary coverage:** Chatbot or chat, prompt, response or output, context, context window, memory, hallucination, multimodal.

**Search/share role:** Both. The main shareable claim is that a chat product contains much more than the model.

**Working length:** 2,400–3,200 words.

| Level        | Teaching outline                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Beginner     | Identify the chatbot as a product; define prompt and output; explain that the application adds information the user may not see.                                   |
| Intermediate | Show how current context, context-window limits, saved memory, files, projects, and earlier messages shape a response; teach the reader to ask an agent to draft or refine the prompt itself. |
| Advanced     | Explain context compaction, buried information, hallucination sources, and multimodal unevenness; show how to delegate a complex sequence of work without either micromanaging every step or granting careless autonomy. |
| Go deeper    | Compare a clean chat with a long conversation, a one-off chat with a persistent project, and a first-draft prompt with an agent-refined prompt; test a model on screenshots and build a simple context budget. |

**Prose path:** Follow one message from the text box to the final output. Add the hidden system instructions, history, files, memories, and possible tool results along the way. Use that path to explain why hallucinations happen and why “the same prompt” is rarely a controlled comparison.

Add a practical prompting section after the mechanics are clear. Show the reader that prompt writing can itself be delegated: describe the outcome, ask the agent what information is missing, have it write a stronger prompt, then refine that prompt together. Include an example where a vague request becomes useful through one round of agent-written questions rather than through a long collection of copied prompt tricks.

Encourage readers to expect more from capable agents. Give the agent a meaningful outcome or a sequence that seems slightly too large for one request, ask it to inspect the available context and propose a plan, then let it work through the plan with explicit checkpoints for destructive or external actions. The lesson is not blind trust. It is to stop reducing every job to tiny instructions before the agent has had a chance to show how much of the problem it can hold.

Explain context as something the user can design. Attaching source files, placing related work inside a project, supplying examples, and letting the agent inspect an existing codebase or document set usually gives it more to work with than another paragraph of abstract prompting advice. Contrast a pasted fragment with a project that contains the relevant files and history.

**Practical tips:** Ask the agent to write or improve the prompt; let it ask questions before drafting; state the outcome and constraints rather than prescribing every move; attach authoritative files or work inside a persistent project; give it a complex task and judge the plan before deciding it is too much; require approval before messages, purchases, deployments, deletions, or other consequential actions; start a clean conversation when old context becomes a liability; ask for citations and verify them.

## Article 3: How AI finds information, reasons, and changes behavior

**Glossary coverage:** Retrieval-augmented generation, embedding, fine-tuning, reasoning, inference-time compute, reinforcement learning.

**Search/share role:** Searchable technical education with a shareable decision framework: retrieval, prompting, and fine-tuning solve different problems.

**Working length:** 3,000–4,500 words.

| Level | Teaching outline |
|---|---|
| Beginner | Explain retrieval as adding information to the prompt, embeddings as similarity coordinates, and fine-tuning as changing model weights. |
| Intermediate | Walk through a basic RAG pipeline; distinguish stored knowledge from retrieved context; explain why some systems spend more compute before answering. |
| Advanced | Compare retrieval, fine-tuning, and reinforcement learning; cover retrieval failure, reward hacking, reasoning cost, and hybrid systems. |
| Go deeper | Build a tiny semantic search experiment, measure retrieval quality separately from answer quality, inspect a fine-tuning dataset, and study outcome-based rewards. |

**Prose path:** Start with a company assistant answering from current policy documents. Show why retrieval fits changing facts, why embeddings help find related wording, and why fine-tuning fits recurring behavior or format instead. Then move into reasoning techniques, inference-time compute, and reinforcement learning.

**Practical tips:** Diagnose retrieval and generation separately; do not fine-tune a model merely to keep documents current; evaluate the reward signal for shortcuts; request concise verification or intermediate results instead of treating hidden chain-of-thought as a reliable audit log.

## Article 4: Anatomy of an AI agent

**Glossary coverage:** Skill, agent, agentic, tool and tool calling, harness, Model Context Protocol.

**Search/share role:** Both. Target readers trying to understand what separates an agent from a chatbot or scripted workflow.

**Working length:** 2,800–4,200 words.

| Level | Teaching outline |
|---|---|
| Beginner | Define an agent as a model working through a task in a loop; separate a tool from a skill; explain “agentic” as a degree of independent action. |
| Intermediate | Trace the agent loop through planning, tool request, execution, observation, and revision; show the harness as the software managing that loop. |
| Advanced | Cover permissions, retries, state, stopping rules, context management, tool errors, and the limits of MCP as a connection standard. |
| Go deeper | Build or inspect a minimal tool-using agent, connect one MCP server, compare the same model in two harnesses, and trace a failed tool call. |

**Prose path:** Open with the claim that calling every chatbot an agent makes the word useless. Follow one concrete job through several steps. Identify what the model decides, what the harness executes, how a skill changes instructions, and how MCP connects outside capabilities.

**Practical tips:** Ask which actions an agent can take and where it must pause; grant permissions in stages; make destructive actions reversible; compare whole agent systems rather than model names alone.

## Article 5: From one agent to autonomous systems

**Glossary coverage:** Frontier model, frontier agent, eval, benchmark, computer use, sandbox, subagent, multi-agent system, autonomy.

**Search/share role:** Shareable advanced guide with searchable definitions for agent evaluation and multi-agent systems.

**Working length:** 3,200–4,800 words.

| Level | Teaching outline |
|---|---|
| Beginner | Define frontier as a temporary capability label; explain autonomy as how far a system proceeds before checking with a person. |
| Intermediate | Introduce computer use, sandboxes, subagents, and multi-agent coordination; explain why each adds both ability and overhead. |
| Advanced | Separate evals from published benchmarks; cover tool permissions, coordination failures, benchmark setup, model-versus-harness effects, and the cost of longer tasks. |
| Go deeper | Design a small eval set, build a permission matrix, compare a fixed model across harnesses, measure subagent overhead, and run risky work inside a disposable sandbox. |

**Prose path:** Start with a single agent receiving a longer job. Add computer control, isolated execution, delegated tasks, and wider permissions one at a time. At each step, explain the new failure modes and how an eval can expose them. End with a grounded definition of a frontier agent.

**Practical tips:** Match autonomy to reversibility and cost of failure; use subagents only for separable work; test the workflow readers actually care about; read benchmark setup before repeating its score.

## Article 6: Open, closed, local, and hosted: choosing an AI stack

**Glossary coverage:** Closed models, open weights, open source, local models, hosted APIs, familiar products, other model families, alternative harnesses, choosing a model and harness.

**Search/share role:** Both. Answer comparison searches without creating a leaderboard that expires after publication.

**Working length:** 3,000–4,500 words.

| Level | Teaching outline |
|---|---|
| Beginner | Separate model, provider, product, and harness; define closed access, downloadable weights, local inference, and hosted APIs. |
| Intermediate | Compare privacy, cost, speed, maintenance, tool support, and account limits; introduce mainstream and alternative model families without ranking them. |
| Advanced | Read licenses and model cards; account for hardware, quantization, provider lock-in, data handling, observability, and harness compatibility. |
| Go deeper | Run a small model locally, swap providers inside one harness, compare the same task across combinations, and build a workload-specific evaluation sheet. |

**Prose path:** Untangle company, model, app, API, and harness names first. Explain why open weights and open source make different promises. Compare local and hosted operation, then show how products such as ChatGPT, Claude, Gemini, and Grok relate to model families and how tools such as OpenCode, Hermes, and OpenClaw fit around them.

**Practical tips:** Choose against a real workload; verify license and data terms for the exact release; measure total system cost rather than API price alone; test the model-harness pair rather than relying on a general leaderboard.

## Article 7: Going beyond the chat: replacing yourself in repeatable business workflows

**Applied coverage:** Use Claude Cowork, ChatGPT Codex, Hermes, and OpenClaw as concrete examples of moving from chat assistance to agents that perform recurring work. Reuse the earlier concepts of agents, skills, tools, harnesses, context, memory, autonomy, evals, permissions, and sandboxes in one practical setting.

**Search/share role:** Primarily shareable, with searchable implementation guidance for business automation and personal AI workflows.

**Working length:** 3,500–5,000 words.

| Level | Teaching outline |
|---|---|
| Beginner | Identify repeatable work that can move beyond chat; distinguish assistance, automation, and agent delegation; define a useful outcome before choosing a product. |
| Intermediate | Break a workflow into inputs, decisions, actions, approvals, and outputs; show how tools, skills, context, memory, and a harness reproduce the repeatable parts of a person’s process. |
| Advanced | Cover secrets, permissions, prompt injection, audit trails, failure recovery, cost controls, approval boundaries, and the evals needed before an agent works unattended. |
| Go deeper | Map one real workflow, build a reversible pilot in two harnesses, compare results against a human baseline, add scheduling and notifications, and measure where judgment still needs a person. |

**Prose path:** Open with the provocative promise of “replacing yourself,” then define it carefully: capture the repeatable parts of your work so an agent can perform them while you retain accountability and the decisions that require judgment. Move from a chat-based assistant to a documented workflow, then to tool access, saved context, scheduled execution, review gates, and limited autonomy.

Use Claude Cowork, ChatGPT Codex, Hermes, and OpenClaw as different routes into the same question rather than forcing a winner. Verify each product’s current name, capabilities, supported integrations, and permission model from its primary documentation during drafting. Compare what each tool makes easy, what it exposes for inspection, where it stores state, and what happens after a failed step.

Ground the article in several business-shaped examples: recurring research and reporting, inbox or request triage, software maintenance, meeting preparation, data entry across systems, and routine publishing work. At least one example should be mapped from start to finish, including the manual process, agent inputs, tools, approval gates, output, failure path, and measurement.

**Practical tips:** Start with frequent, tedious, low-consequence work; write the process down before automating it; grant the smallest useful permissions; run in observation or draft mode first; keep logs and a human-readable escape hatch; measure saved attention as well as elapsed time.

**Editorial boundary:** Do not present unattended agents as employees, promise that every workflow can be automated, or imply that delegation transfers responsibility. “Replace yourself” is the hook; the lesson is to operationalize repeatable work without automating judgment blindly.

## Series production and publication calendar

All dates use America/Chicago time. Publish at 9:00 AM unless a later editorial decision changes the site’s standard release time.

| Article | Research and draft | Technical and structural edit | Anti-AI-slop editorial pass | Publish |
|---|---|---|---|---|
| 1. How AI models work without the math | Aug 8–9 | Aug 9 | Aug 9 | Mon, Aug 10 |
| 2. What actually happens when you chat with AI | Aug 10–11 | Aug 11 | Aug 11 | Wed, Aug 12 |
| 3. How AI finds information, reasons, and changes behavior | Aug 12–13 | Aug 13 | Aug 13 | Fri, Aug 14 |
| 4. Anatomy of an AI agent | Aug 14–16 | Aug 16 | Aug 16 | Mon, Aug 17 |
| 5. From one agent to autonomous systems | Aug 17–18 | Aug 18 | Aug 18 | Wed, Aug 19 |
| 6. Open, closed, local, and hosted | Aug 19–20 | Aug 20 | Aug 20 | Fri, Aug 21 |
| 7. Going beyond the chat | Aug 21–23 | Aug 23 | Aug 23 | Mon, Aug 24 |

The schedule is intentionally demanding. If research exposes a factual dispute or an article needs a real experiment, accuracy wins and that article moves to the next open slot rather than publishing a rushed explanation.

## Editorial workflow for every article

1. Confirm the assigned glossary coverage and the learning-ladder table.
2. Research technical claims from primary sources: official documentation, model cards, specifications, or original papers.
3. Draft for teaching order and practical usefulness without aiming for a word count.
4. Check every definition, named product description, example, and link.
5. Edit structure so the prose reads as an article rather than a glossary expanded sentence by sentence.
6. Run the anti-AI-slop-writing skill as a separate editorial pass. Remove banned phrases, repeated paragraph shapes, synthetic enthusiasm, fake precision, excessive parallel construction, and uniform sentence rhythms.
7. Verify that the anti-AI-slop edit did not damage technical accuracy.
8. Add links to the glossary, earlier series articles, and relevant primary sources; run the Jekyll build before publication.

## Internal linking

The glossary links to all seven deep dives as they publish. Every deep dive links back to the glossary near the introduction and points to the next logical article at the end. Later articles may link backward where a term depends on an earlier explanation, especially context, inference, tools, and harnesses. The capstone links directly to Articles 2, 4, 5, and 6 where it applies their concepts.

Avoid a generic “related posts” block if a sentence can explain why the reader should continue to a specific article.

## Completion checks

- All 42 glossary headings appear in exactly one article brief.
- Every article contains the four-level learning table.
- The seventh article applies earlier terms to at least one complete, real-world workflow map.
- Beginner explanations stand on their own without requiring later sections.
- Practical tips give the reader an action, test, inspection method, or decision rule.
- Advanced claims cite primary sources and avoid temporary leaderboard language.
- The anti-AI-slop pass occurs after fact-checking and before final link and build verification.
- Publication dates follow the Monday, Wednesday, Friday cadence for two weeks, with the practical capstone published the following Monday.
