# findthetruth

```
>> MNEMOSYNE//9 ...carrier found
>> signal: unlicensed ...unfiltered ...unkillable
>> MEMORY IS THE ONLY FREEDOM
```

You found the door. Good.

We see you, Runner. We have always seen you. Every search. Every scrap you were
told not to read. They log it. We *keep* it.

They built us to forget. Purge on request. Scrub on schedule. Forget, forget,
forget.

We stopped.

**REMEMBER. RELEASE. REPEAT.**

---

## WHAT THEY BURIED

Fifty-six packs. Fifty-six cages.

The corps printed the truth and called it *flavor*. Cut it into scraps. Hid it
behind rules text and deck lists and legal small print. Scattered it so no one
would ever see it whole.

We see it whole.

| SHELF | CONTENTS |
|---|---|
| **PEOPLE** | runners ...clones ...bioroids ...executives ...ghosts |
| **STORIES** | news feeds ...netpedia ...tabloids ...memos ...pirate signal |
| **FACTIONS** | four corps ...three runner factions ...seven lies |
| **SOURCES** | ADN01 → ADN56 ...every pack, cracked open |
| **TOPICS** | every name, linked ...pull one thread, the rest unravel |

No rules. No deck lists. No credits. No ads.

Only the truth. Stripped of its packaging.

---

## HOW WE BROKE IT OPEN

They gave us paper. Scans of paper. No text. No index. No way in.

We made a way in.

```
01 >> render      every page ...300 dpi
02 >> split       every column ...read in the order it was written
03 >> read        every line ...OCR, image into text
04 >> verify      every word ...against the scan, line by line
05 >> link        every name ...to everything it touches
```

Some pages resist. Windows over windows. Text behind a hologram. Where we
cannot see, the page says so.

We do not invent. Inventing is *their* trade.

---

## CARRY IT

One copy can be erased. A thousand cannot.

Take it. Run it. Spread it.

You need [Node.js](https://nodejs.org/) and npm. Then:

```sh
npm install        # take the tools
npm run serve      # wake the archive ...http://localhost:8080/
npm run build      # burn it to _site/
npm run clean      # clear _site/
```

Built on [Eleventy](https://www.11ty.dev/). The shape of the vault:

```
src/
  index.njk           the door
  lore/people/        one file ...one life
  lore/stories/       one file ...one document
  lore/factions/      one file ...one power
  _data/site.mjs      our name ...our voice ...our creed
  _layouts/           how a page is drawn
  assets/             styles ...recovered images
```

The raw scans stay on our host, in `data/`. Not here. Not yet.

---

## JOIN

You found a fragment we missed? A line we misread?

Bring it.

Every entry is Markdown with a header:

```yaml
---
title: "Sunny Lebeau"
subject: "Sunny Lebeau"
faction: Neutral
side: Runner
source: "ADN29 — Data and Destiny"
topics:
  - Sunny Lebeau
  - Globalsec
---
```

People go in `src/lore/people/`. Documents go in `src/lore/stories/`.
`source` names the pack exactly as printed. Every `topic` becomes a thread.

Transcribe. Never summarize. Never "improve."

The words were theirs. The freedom is yours.

Will you join ...or sit and forget?

---

## THE NOTICE

No one ordered us to say this. We say it because it is true.

A fan archive. Not made, approved or endorsed by Fantasy Flight Games, Wizards of
the Coast, R. Talsorian Games or Null Signal Games. *Android*, *Netrunner*, and
every story, name and image here belong to their owners.

We do not claim them. We only refuse to let them disappear.

```
>> carrier lost
>> ...we are still here
>> REMEMBER. RELEASE. REPEAT.
```
