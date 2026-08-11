---
layout: post
title: Open, closed, local, and hosted
subtitle: How to choose an AI stack
date: 2026-08-21 09:00 -0500
series: ai-glossary-deep-dives
excerpt: Separate model, provider, product, and harness, then choose among closed APIs, open weights, and local inference for the work you actually have.
---

AI comparisons become confusing because a company name can refer to a lab, a model family, an app, and an API. Then somebody runs that model inside an independent agent harness and describes the combination as though it were one product.

This deeper layer of the [AI glossary]({% post_url 2026-08-08-ai-glossary-everything-you-need-to-know-about-ai %}) is about choosing parts without relying on a leaderboard that will be stale next month.

| Level | What you should understand |
|---|---|
| Beginner | A model, provider, product, and harness are separate layers. Open weights, open source, local, and hosted make different promises. |
| Intermediate | Privacy, cost, speed, maintenance, tool support, and account rules vary across the stack. |
| Advanced | Licenses, model cards, quantization, hardware, observability, and provider data terms matter more than the word “open.” |
| Go deeper | Run a small local model, swap providers in one harness, and compare combinations on your own workload. |

## Name the layer first

A **model** is the trained numerical system. A **provider** operates models and exposes them through an API or service. A **product** is the application a person uses. A **harness** manages prompts, context, tools, agent loops, and permissions around a model.

One company may provide every layer. ChatGPT is an OpenAI product that uses OpenAI models and services. Claude, Gemini, and Grok have similar relationships with Anthropic, Google, and xAI. Product features and model features still should not be collapsed. Web search, saved projects, a code runner, and memory may belong to the product around the model.

Independent harnesses make the layers visible. [OpenCode](https://opencode.ai/docs) is a coding agent that can connect to different providers. [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) is a broader personal-agent harness with tools, skills, memory, and messaging connections. [OpenClaw](https://docs.openclaw.ai/agent) supplies a runtime and agent loop for general-purpose work. Each can change models without becoming an entirely different category of software.

## Closed access

A closed model is available through its owner's product or API without downloadable weights. The provider handles training infrastructure, inference hardware, updates, and scaling. You get an account and an interface.

That is often the fastest route to strong capability. It also puts you under the provider's prices, rate limits, availability, model retirement policy, and data terms. A model update can change behavior even if your code does not change.

Closed does not mean insecure, and hosted does not mean your data is used for training. Those questions depend on the exact service, plan, settings, and contract. Read the terms that apply to your account rather than carrying assumptions from a consumer chat app into an enterprise API.

## Open weights are not automatically open source

An open-weight release makes the learned parameters downloadable under a license. Depending on that license, you may run, adapt, or redistribute the model. You still may not receive the training dataset, training code, or enough information to reproduce how the weights were made.

The [Open Source AI Definition](https://opensource.org/ai/open-source-ai-definition) sets a higher bar: freedom to use, study, modify, and share, plus access to the preferred form for modification. The Open Source Initiative explicitly distinguishes that from merely releasing weights.

Read the exact release license. A model family can contain versions with different permissions. Check commercial use, redistribution, acceptable-use restrictions, attribution, patent terms, and any obligations that activate at scale. “Available on a download page” is not a license analysis.

## Local and hosted describe operation

Local inference means the model runs on hardware you control. That could be a laptop, office workstation, or your own servers. It can work offline, keep inputs inside a controlled environment, and avoid per-token API billing.

You take responsibility for hardware, model loading, updates, monitoring, and performance. Large models may need expensive accelerators and substantial memory. Quantization reduces the numerical precision of weights so a model uses less memory and may run faster, usually with some tradeoff in quality.

Local is not synonymous with private. The harness may send telemetry, use hosted embeddings, call web services, or route selected requests to an API. Trace the complete data path.

A hosted API makes the provider operate inference. It is easier to scale and gives access to models too large for ordinary local hardware. Total cost depends on input, output, tool calls, retries, storage, and engineering time, not only the published token rate.

Many useful stacks are hybrid: local processing for sensitive extraction, a hosted model for difficult reasoning, and direct tools for current business data.

## The model market is larger than the familiar apps

OpenAI, Anthropic, Google, and xAI make the familiar ChatGPT, Claude, Gemini, and Grok products. Other model families include [DeepSeek](https://www.deepseek.com/), Kimi from [Moonshot AI](https://platform.kimi.ai/docs/models), [Qwen](https://qwenlm.github.io/), [Llama](https://ai.meta.com/llama/get-started/), and models from [Mistral AI](https://mistral.ai/models/).

Some releases have downloadable weights; some are accessible through hosted services; terms vary by version. The point of naming them is not to create an alternative league. It is to remind you that provider choice is real, and that a family name does not tell you its license, size, context window, or suitability for your job.

## Harness choice can outweigh model choice

For coding, a strong harness needs accurate file operations, command execution, version-control awareness, useful error reporting, and context management across a repository. For a personal business agent, scheduling, messaging, memory, credential handling, and approval controls may matter more.

Claude Code and Codex are harnesses as well as products associated with their makers' models. OpenCode favors provider flexibility. Hermes and OpenClaw aim at broader personal and connected workflows. Compare what they can inspect, which models they support, how tools and skills are configured, where state is stored, and how permissions are enforced.

Do not assume a provider-neutral harness makes every model interchangeable. Models differ in tool-calling formats, instruction following, context handling, speed, and cost. The harness may have been tuned around one family.

## Choose from a workload, not an identity

Write down ten to fifty representative tasks. Include ordinary cases, difficult inputs, and failures that would be expensive. Define what counts as a correct result and which actions require approval.

Then test complete combinations. Record model version, provider, harness, settings, latency, cost, tool failures, and human corrections. A local model that needs frequent rescue may cost more than a hosted model. A slightly weaker model in a harness with excellent retrieval may win on your documents.

Ask these questions before committing:

- Can we legally use this exact release for our purpose?
- Where do prompts, files, tool results, and logs travel?
- Can we export our prompts, skills, evals, and data?
- What happens when the provider removes a model?
- Can we observe tool calls and recover failed work?
- What hardware and maintenance does local operation require?

There is no permanent best stack. There is a stack whose tradeoffs fit a particular workload today and a testing process that lets you change it later.

{% assign next_deep_dive = site.posts | where: "slug", "going-beyond-chat-replacing-yourself-in-business-workflows" | first %}
{% if next_deep_dive %}
Next: [going beyond chat]({{ next_deep_dive.url }}), where these choices become a repeatable business system.
{% else %}
Next in the series: “Going beyond the chat,” publishing Monday, August 24.
{% endif %}
