# AI Glossary Article Design

## Purpose

Write an approachable glossary for readers who hear AI terminology at work or online but do not need a computer science lesson. The article should give them enough working vocabulary to follow a conversation, ask sensible questions, and recognize when two related terms do not mean the same thing.

## Voice and format

The article will use the direct, conversational voice of the existing blog. A brief, slightly cheeky introduction will acknowledge the title's promise, then get to the definitions. Each entry will explain the term in plain English, give a concrete example when useful, and say why the distinction matters. Entries should remain short enough to scan.

Product names will serve as familiar landmarks rather than recommendations. ChatGPT, Claude, Gemini, and Grok will appear without model-version details so the piece stays useful as products change.

## Structure

### 1. Basic: what everybody needs to know

Cover AI, model, large language model (LLM), chatbot or chat, prompt, response or output, token, training, inference, hallucination, multimodal, and skill.

### 2. Intermediate: enough to follow current AI conversations

Cover agent, agentic, context, context window, memory, tool calling, harness, Model Context Protocol (MCP), retrieval-augmented generation (RAG), reasoning, embedding, and fine-tuning.

### 3. Advanced: terms used in agent development

Cover frontier model, frontier agent, eval, benchmark, inference-time compute, reinforcement learning, computer use, sandbox, subagent, multi-agent system, and autonomy. Explain these at a conceptual level without implementation details or mathematics.

### 4. Going deeper: the wider ecosystem

Explain the differences among a model, model provider, consumer product, and agent harness. Cover open weights versus closed models, including the fact that open weights and open source are not interchangeable. Briefly compare local models with hosted APIs.

Use OpenCode, Hermes, and OpenClaw as examples of harnesses after verifying how each project describes itself. Mention alternative model families such as DeepSeek, Kimi, Qwen, Llama, and Mistral. Explain that model choice usually involves tradeoffs among cost, speed, privacy, context size, tool use, and task-specific ability; avoid a time-sensitive ranking.

### Closing

End with a compact translation guide for common statements heard in AI discussions. It should help readers decode the speaker's meaning rather than hand them canned phrases to repeat.

## Editorial constraints

- Aim for roughly 2,500 to 3,000 words, but favor clarity over hitting a number.
- Keep definitions evergreen and verify time-sensitive product descriptions against primary sources.
- Avoid hype, unexplained jargon, invented anecdotes, and claims that one model or harness is universally best.
- Make important distinctions explicit: model versus chatbot, agent versus workflow, skill versus tool, harness versus model, open weights versus open source, and benchmark performance versus practical usefulness.
- Link to primary project or company sources where a named product needs attribution.

## Completion checks

- Every requested term appears in the appropriate tier.
- A nontechnical reader can understand each definition without reading later sections first.
- Named products are described accurately as of publication without version-dependent claims.
- The Markdown front matter remains valid for the existing Jekyll site.
- The article reads like a glossary with a point of view, not a vendor catalog or textbook chapter.
