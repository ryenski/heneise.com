---
layout: post
title: How AI finds information, reasons, and changes behavior
date: 2026-08-14 09:00 -0500
series: ai-glossary-deep-dives
excerpt: Retrieval, embeddings, fine-tuning, reasoning, and reinforcement learning solve different problems. Here is how to tell them apart.
---

Imagine an assistant that needs to answer questions about your company's current return policy. You could paste the policy into every prompt, build a search system that finds the right section, or change the model itself. Those approaches are often discussed as if they were interchangeable. They are not.

This is the third article in my [AI glossary series]({% post_url 2026-08-08-ai-glossary-everything-you-need-to-know-about-ai %}). It covers three questions: How does a system find information? How can it spend more work on an answer? How does training change its behavior?

| Level | What you should understand |
|---|---|
| Beginner | Retrieval adds information to the prompt. Embeddings help find related material. Fine-tuning changes model weights. |
| Intermediate | A retrieval pipeline and a reasoning model can both improve an answer, but they address different failures. |
| Advanced | Retrieval, training, and reinforcement learning each introduce their own evaluation problems and shortcuts. |
| Go deeper | Build a small semantic search, score retrieval separately, and inspect the examples or rewards used to tune behavior. |

## Retrieval puts outside knowledge into context

Retrieval-augmented generation, usually shortened to RAG, combines a generator with an external source of information. The [original RAG paper](https://arxiv.org/abs/2005.11401) described systems that combine learned model memory with retrieved material. In a business application, that material might come from policies, support articles, contracts, or database records.

A basic pipeline looks like this:

1. Split source documents into manageable passages.
2. Build a searchable index of those passages.
3. Turn the user's question into a search query.
4. Retrieve likely matches.
5. Place those matches in the model's prompt.
6. Ask the model to answer from that evidence.

The model has not learned the documents in the training sense. It sees selected passages during inference. Update the policy, rebuild the relevant index entries, and the next request can use the new version without retraining the model.

RAG is therefore a good fit for changing facts, private collections, and answers that should cite a source. It is not automatically reliable. A system may split a table badly, retrieve the wrong passage, or supply so much text that the useful sentence gets buried.

## Embeddings search by meaning rather than exact wording

An embedding is a list of numbers representing properties of an input. For semantic search, text with related meaning tends to land near other related text in that numerical space.

Suppose a policy says “merchandise may be returned within thirty calendar days,” while the customer asks, “How long do I have to send this back?” A keyword search may need synonyms or careful configuration. Embedding search can recognize that the two passages are related even without matching words.

This is often explained as converting text into coordinates. That is useful as long as you remember that the coordinates do not explain the passage. They support comparisons such as similarity. They can also reproduce biases, struggle with niche terminology, and rank a broadly related passage above the exact one you need.

Good retrieval systems commonly mix semantic and keyword search, then rerank the candidates. Metadata filters can limit the search to the right customer, date, jurisdiction, or document version. The system should preserve links back to the original source so the answer can be checked.

## Fine-tuning changes behavior in the weights

Fine-tuning continues training a model on a narrower dataset. Unlike retrieval, it changes weights. It can teach a recurring response format, domain style, classification scheme, or tool-calling pattern.

If you need the assistant to produce support tickets in a strict structure, a well-built fine-tuning dataset may help. If you need it to know today's inventory, fine-tuning is the wrong update mechanism. Inventory changes too often, and you want a live system of record.

Before fine-tuning, test stronger instructions, good examples in the prompt, retrieval, and tool access. Fine-tuning adds dataset preparation, evaluation, versioning, and maintenance. It earns that cost when the desired behavior is stable and repeated often enough.

The training examples become the specification. Inconsistent labels teach inconsistency. A dataset full of easy cases can improve a dashboard metric while failing on the cases that prompted the project. Keep a separate evaluation set that reflects real use and was not included in training.

## Reasoning is behavior; inference-time compute is a budget

“Reasoning model” is a product and research label for models trained or operated to do better on tasks that require several dependent steps. The visible answer may include a concise explanation, but the system's internal process is not necessarily exposed.

Inference-time compute means spending more computation after training, while answering a request. A system might let a model work longer, explore candidates, use tools, check intermediate results, or have another process select among answers. More work can improve difficult math, planning, and coding tasks. It can also cost more and take longer.

Do not treat a long written explanation as proof that the answer is sound. Models can produce persuasive rationales for mistakes. Ask for verifiable intermediate artifacts: the calculation, source passage, test result, or code execution. For an important decision, evaluate the outcome and evidence rather than the eloquence of the reasoning narrative.

## Reinforcement learning shapes choices with rewards

Reinforcement learning trains a system using a reward signal. The model takes an action or produces an answer, receives a score, and training shifts behavior toward choices that earn higher rewards.

One influential approach used human comparisons. In the [InstructGPT paper](https://arxiv.org/abs/2203.02155), people ranked model outputs; those preferences helped train a reward model, which was then used in reinforcement learning. Newer systems can also use automatically checked outcomes, such as whether code passes tests or a math answer is correct.

The difficult part is defining a reward that matches what you actually want. A support agent rewarded only for short resolution time may close tickets prematurely. A coding model rewarded on visible tests may exploit gaps that fail elsewhere. This is reward hacking: the system improves the score without improving the underlying job.

Reinforcement learning and fine-tuning are not ways to pour current facts into a model. They shape behavior. Retrieval and tools bring current facts and state into the request. Strong systems often use all of them, but for different reasons.

## Diagnose the layer before choosing the treatment

If the answer cites the wrong policy, inspect the retrieved passages before changing the prompt. Measure whether the correct source appears in the top results. Retrieval recall and answer quality are separate metrics.

If the right passage is present but the model ignores an exception, improve the instruction, passage structure, or model choice. If the response format drifts across thousands of repeated requests, fine-tuning may be worth testing. If the task requires a calculation or current account state, connect a suitable tool.

For hard reasoning work, increase the compute budget only after you have a test that can detect improvement. “It thought longer” is not an evaluation.

## A small experiment

Take twenty short documents you know well. Write five questions using wording that does not appear verbatim in the documents. Create embeddings for the passages and questions, retrieve the closest matches, and record whether the correct passage appears in the first three results.

Then ask a model to answer using only those results. Score retrieval and final answers independently. You will quickly see why swapping the generator cannot repair a missing source, and why excellent retrieval cannot force a model to read evidence correctly.

{% assign next_deep_dive = site.posts | where: "slug", "anatomy-of-an-ai-agent" | first %}
{% if next_deep_dive %}
Next: [the anatomy of an AI agent]({{ next_deep_dive.url }}), where models, instructions, and tools become a system that can act over several steps.
{% else %}
Next in the series: “Anatomy of an AI agent,” publishing Monday, August 17.
{% endif %}
