---
layout: post
title: Are my skills making Claude Dumber?
date: 2026-05-15 09:35 -0500
image: /assets/images/2026-05-15-are-my-skills-making-claude-dumber/cover-2.png
excerpt: More instruction is not always more intelligence. Sometimes it is just a more expensive way to make a smart agent act dumb.
---

I think I made Claude worse by trying to make it better.

I came late to the SKILLS.md game. Once I saw what skills could do, I went all in. I installed every skill I could find. I read them like I was looking for a secret manual. Then I started making my own.

The first ones were huge.

Technically, Claude made them under my direction, which probably made the problem worse. I asked for comprehensive workflows, edge cases, decision trees, examples, anti-patterns, checklists, and guardrails. I was building megalith skills: one skill to rule them all, loaded with everything I thought the agent might need.

It felt responsible. It felt professional. It felt like I was turning the agent into a better engineer.

Then I noticed something annoying: sometimes I got better output when I did not use the skills at all.

That did not make sense to me at first. The whole point of a skill is to give the model more relevant context. More context should mean better work, right?

Not necessarily.

Then I started reading [Matt Pocock's](https://x.com/mattpocockuk) [skills](https://github.com/mattpocock/skills/), and the contrast was embarrassing. They were short. Almost aggressively short. Instead of trying to encode every possible move, they gave the agent a job, a posture, and a few constraints.

That made the issue obvious: my skills were not making Claude smarter. They were taking a senior engineer and handing it a laminated checklist for an intern.

Every extra paragraph in a skill is not free. It enters the context. It competes for attention. It tells the agent, "This is the shape of the solution." If the instructions are too detailed, the model stops exercising judgment and starts performing compliance.

That is useful when compliance is the point. Sometimes you really do need a strict recipe. Once the work is shaped, a less powerful model (like Sonnet or Haiku) can reliably execute it. **<mark>But the highest level of coding work - the planning, shaping, prototyping, and architecture - is not recipe-following.</mark>** It is diagnosis, taste, tradeoffs, local context, and knowing when the obvious instruction is actually the wrong move.

We keep treating frontier agents like junior developers who need hand-holding through every step. But Opus 4.7 and GPT 5.5 are not juniors. They are much closer to senior developers with a strange interface. If you give a senior engineer a clear outcome and the right context, they can figure out the path. If you bury them in procedural instructions, you may get more obedience and less insight.

That was my mistake. I was trying to transfer competence into the model through instructions. But the competence was already there. What I needed was alignment, vocabulary, and taste.

The best workflow I have found is almost the opposite of what I started with: use docs to define the domain, grill the plan until the terms and outcomes are clear, prototype when the shape is uncertain, and then let the agent choose the implementation.

Skills should not be giant brains strapped onto the model. They should be small steering mechanisms.

The contrarian take is this: the better the model gets, the less you should try to micromanage it.

More instruction is not always more intelligence. Sometimes it is just a more expensive way to make a smart agent act dumb.
