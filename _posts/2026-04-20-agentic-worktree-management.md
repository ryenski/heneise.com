---
layout: post
title: Agentic worktree management
date: 2026-04-20 08:50 -0500
---
One of the hardest parts of my job is context switching. I frequently have several tasks going on at once - reviewing code submitted by other engineers (or more accurately, by their agents), writing code for my own tasks, and reviewing product requirements and scoping new work. Usually I'm not permitted to zone in on a particular issue for any great length of time, and new review requests come in constantly throughout the day. I like to jump on review requests as quickly as possible so as not to become a blocker. 

## Agentic code review
Code reviews particularly can take a lot of time. Pull requests are often very large and complex, so usually I'll spin up an agent, have it perform the initial code review, and then pick through the agentic review for the parts that actually matter. 

Most of the time agents are really good at picking out bugs and antipatterns. Letting the agent handle these small issues lets me shift my attention to looking at overall patterns in the code. 

Switching back and forth between these contexts can become a huge mental burden. 

Mac users have some really interesting tools available to make this context switching easier - Conductor, Superset, Cmux are all really beautiful and intuitive apps. 

But they're only available on the Mac. Since my work machine is Linux, I don't have that luxury. I've tried a few Linux GUIs that approach this usability, but none of them have really landed solidly for my workflow. 

## Worktrees
I've been using Git worktrees since forever, but recently with agents my worktree usage has multiplied tenfold. My code review process usually looks like this: 

1. Create a new worktree for the branch and copy the environment files (I made a little shell script that makes this easier)
2. Spin up an agent and have it do a code review
3. Clean up the worktree

Last week I discovered [worktrunk.dev](https://worktrunk.dev), which is a package of shell scripts and agent plugins that makes this process even easier. 

Worktrunk can run hooks for each part of the worktree lifecycle, so switching to a new branch and preparing the environment are now a single command, instead of several. 

Before worktrunk, switching to a review branch looked something like this:

```bash
git worktree add ../myproject-branch-name origin/branch-name
cp .env ../myproject-branch-name/.env
cd ../myproject-branch-name && bundle install
```

That's assuming I remembered the exact syntax, which I usually didn't on the first try. Then reversing it cleanly when I was done was its own little adventure.

With worktrunk, the whole sequence collapses to:

```bash
wt switch branch-name
```

Worktrunk fires whatever hooks I've defined for the `switch` lifecycle event — copying environment files, installing dependencies, anything the project needs. When the review is done, cleanup is just as clean. No leftover worktrees cluttering up my filesystem.

```bash
wt remove branch-name
```

A few other commands I've been reaching for constantly:

```bash
# show all active worktrees and their branches
wt list
# check out a new branch, switch to the worktree, run setup hooks, ready to go
wt switch --create new-branch-name
```

I'm still customizing my hooks, but even out of the box the ergonomics alone make it worth it. If you're doing agentic code reviews or any kind of multi-branch parallel work, check it out: [worktrunk.dev](https://worktrunk.dev).
