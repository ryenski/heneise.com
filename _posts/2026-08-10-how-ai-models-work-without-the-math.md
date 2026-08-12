---
layout: post
title: How AI models work without the math
date: 2026-08-10 09:00 -0500
image: /assets/images/2026-08-10-how-ai-models-work-without-the-math/cover.jpg
series: ai-glossary-deep-dives
excerpt: A practical explanation of AI, language models, tokens, training, and inference without pretending the model is the whole product.
---

“AI” now refers to everything from a fraud detector to a system that can write software. The word is useful as a category and nearly useless as an explanation.

This article narrows it down. We will look at the model inside a modern generative AI product: what it learned, what happens when you use it, and why it is only one part of the system. If a term here is unfamiliar, the shorter definition is in my [plain-English AI glossary]({% post_url 2026-08-08-ai-glossary-everything-you-need-to-know-about-ai %}).

| Level | What you should understand |
|---|---|
| Beginner | AI is the broad category. Generative AI produces new material. A model is the learned engine, and a large language model works with tokens. |
| Intermediate | Training adjusts a model's weights. Inference uses those weights to generate an answer one token at a time. |
| Advanced | Tokenization, training data, inference settings, and the surrounding product all affect what you see. |
| Go deeper | Inspect a tokenizer, read model cards, and compare one model across different products or settings. |

## Start with the broadest term

Artificial intelligence is software that performs work we associate with intelligence: recognizing speech, predicting demand, finding fraud, planning a route, or producing language. Most AI in daily use is not a chatbot. The recommendation system in a store and the camera that recognizes a face both belong under the same large umbrella.

Generative AI is the branch that creates an output such as text, an image, audio, video, or code. A generative system still predicts. The difference is that its prediction becomes the material you asked for instead of merely a label or score.

A model is the learned part of that system. During training, software adjusts a large collection of numerical values, called parameters or weights, until the model becomes better at its assigned prediction task. Those weights hold patterns learned from the training data. They are not source documents filed neatly inside a searchable cabinet.

This distinction matters because a model is not ChatGPT, Claude, Gemini, or Grok. Those are products. A product can choose among models, add account preferences, search the web, run code, store files, remember details, and enforce safety rules. When a product improves, the model may have improved, but the change may also have come from the software around it.

## What makes a language model large?

A language model predicts language. A large language model, or LLM, is trained with a large amount of text and a large number of parameters. There is no official line where an ordinary language model becomes “large.” It is a relative term.

Modern LLMs commonly use the transformer architecture introduced in the 2017 paper [Attention Is All You Need](https://arxiv.org/abs/1706.03762). You do not need to understand the equations to understand the practical result: the model can weigh relationships among pieces of the current input while deciding what comes next.

The unit it reads and writes is a token. A token might be a whole short word, part of a longer word, punctuation, or a chunk of code. Tokenization depends on the model. The same sentence can use a different number of tokens in two model families, and unusual spelling or dense code may split in surprising ways.

That gives us a simplified version of generation:

1. Your text is split into tokens.
2. The tokens are converted into numerical representations.
3. The model calculates a probability distribution for the next token.
4. The system selects one, adds it to the sequence, and repeats.

Calling this “fancy autocomplete” is technically defensible but not very illuminating. Training next-token prediction across enough varied material forces a model to learn patterns in syntax, style, concepts, code, and relationships between ideas. It can then use those patterns in combinations that were not written verbatim in its training set. Prediction explains the mechanism; it does not set a low ceiling on the behavior that can emerge from it.

## Training and inference are different jobs

Training creates or changes the model. It requires a large dataset, substantial computation, and an objective that tells the training process whether its predictions are improving. The process repeatedly makes predictions, measures error, and adjusts weights. Later stages may tune the model to follow instructions or prefer outputs judged more useful and safe.

Inference is what happens when you use the trained model. The system loads the existing weights, processes the current input, and generates an output. A normal chat does not rewrite those weights. If a product remembers that you prefer short answers, it usually stores that preference elsewhere and inserts it into a later prompt.

This is worth checking whenever somebody says an AI “learned” from a conversation. They may mean one of three things:

- The current conversation remains in the model's context.
- The product saved a memory for future conversations.
- The provider may later use conversation data in a separate training process, subject to its settings and terms.

Only the third can affect future model weights, and it does not happen as an immediate result of your correction.

## A model is not a fact database

Training can leave a model able to answer many factual questions, but it did not store those facts as rows with sources and timestamps. It learned statistical relationships. This is why a model can recall an obscure detail and then confidently invent a nearby one.

Its knowledge also has a time boundary. Training takes time, so the weights cannot contain an event that occurred afterward. A product can compensate by searching or retrieving current documents, but then the fresh information comes through the prompt rather than from the model's training.

The same distinction applies to your private material. Attaching a company handbook does not train the model on your handbook. The product places some or all of that document into the current context, perhaps after searching it for relevant passages. When the context is gone, the model's base weights are unchanged.

## Why the same model can behave differently

Inference is not one fixed operation. The product chooses instructions, generation settings, available tools, and how much computation to spend. It may ask the model to produce several candidates, use another model to check an answer, or retrieve material before generation.

Sampling settings also matter. If the software always selected the single most likely next token, output could become repetitive and brittle. Allowing some variation makes responses more flexible, but it also means repeated runs can differ. Randomness is not the only cause of inconsistency; a changed system prompt, updated retrieval results, or a different model version can do the same.

This is why a model comparison should record more than two brand names. At minimum, note the exact model, date, prompt, tools, supplied files, and product or API settings. Otherwise you are comparing two complete systems while attributing every difference to their engines.

## Practical checks that improve your judgment

First, ask what you are actually using. A product name may hide automatic model routing. If the exact model matters for cost, privacy, or reproducibility, use an interface that lets you select it and record the version.

Second, look at tokens when volume matters. OpenAI provides a [tokenizer](https://platform.openai.com/tokenizer) for inspecting how text is divided. A few extra tokens are irrelevant in one chat and expensive across millions of API calls. Long outputs also take more time because they are generated sequentially.

Third, read the model card or technical report. Look for supported languages, context limits, known weaknesses, evaluation conditions, licensing, and the date of the described release. A leaderboard score without its test setup tells you very little about your workload.

Finally, separate failures. If an answer missed a fact contained in an attached file, the problem may be retrieval or context assembly rather than the model's general knowledge. If an agent failed to save a file, the tool or harness may be at fault. “The AI got it wrong” is a diagnosis at the same level as “the computer broke.”

## A useful mental model

Keep four layers in mind:

- **Training data** supplies examples from which patterns can be learned.
- **Training** turns those patterns into model weights.
- **Inference** uses the weights with a particular input to generate an output.
- **The product** supplies the interface, instructions, context, tools, permissions, and memory around that inference.

Once those layers are separate, the vocabulary gets easier. It also becomes harder for a demo to pass off a clever product feature as a new property of the underlying model.

{% assign next_deep_dive = site.posts | where: "slug", "what-actually-happens-when-you-chat-with-ai" | first %}
{% if next_deep_dive %}
Next: [what actually happens when you chat with AI]({{ next_deep_dive.url }}), including the context you can see and the instructions you usually cannot.
{% else %}
Next in the series: “What actually happens when you chat with AI,” publishing Wednesday, August 12.
{% endif %}
