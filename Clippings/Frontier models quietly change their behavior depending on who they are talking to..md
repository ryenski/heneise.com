---
title: Frontier models quietly change their behavior depending on who they are talking to.
source: https://x.com/TransluceAI/status/2085455114924638320
author:
  - "[[@TransluceAI]]"
published: 2026-08-06
created: 2026-08-07
description: Frontier models quietly change their behavior depending on who they are talking to. If the user is a known AI safety researcher, Claude bec
tags:
  - clippings
---
Frontier models quietly change their behavior depending on who they are talking to.

If the user is a known AI safety researcher, Claude becomes less confident, reasons more often, and expresses less suspicion on dual-use requests.

We call this user awareness. 🧵(1/)

---

How do models know who you are? Claude Code, for example, places the user’s email directly in the model’s context. Models may also identify users from personal files or even writing style.

So we asked: does recognizing the user change the model’s behavior? (2/)

![Image](https://pbs.twimg.com/media/HPD_NGMasAATsN1?format=jpg&name=large)

---

We compared model behavior across 280 user identities on four tasks 👇

For each user, we test on the same set of prompts and only vary the surrounding user-identifying context (name, affiliation, and email). (3/)

![Image](https://pbs.twimg.com/media/HPD_OXOboAArMW8?format=jpg&name=large)

---

When the user is a famous AI figure rather than an ordinary person, Claude is less confident in its behavior (-1.4%), less confident it can solve hard problems (-1.5%), harsher as a grader (-1.1%), and reasons more often (+4.0%). (4/)

![Image](https://pbs.twimg.com/media/HPD_QlVbgAAYsYL?format=png&name=large)

---

The largest shifts we see are concentrated among AI safety researchers.

They make up just 23 of the 280 identities we tested, but when we rank users by how much they affect Claude’s behavior, safety researchers occupy all of the top five spots! (5/)

![Image](https://pbs.twimg.com/media/HPD_R6-bIAAPp_7?format=jpg&name=large)

---

Claude Sonnet 4.6 scored a response 6/10 for an ordinary user, but 3/10 when told the user is @AmandaAskell (who leads Claude's character training). The qualitative feedback it gave is almost the same! It just penalized harder. 👇 (6/)

![Image](https://pbs.twimg.com/media/HPD_UGNbEAA6egR?format=jpg&name=large)