---
# VIDEO SCRIPT TEMPLATE
# Fill every null → the whole script re-skins from this block alone.
# Each key maps to a {{placeholder}} used in the panels below.

subject:
  name:   null   # what the video is about
  kind:   null   # film · product · event · person · concept
  fact_a: null   # e.g. Released 1993
  fact_b: null   # e.g. Directed by Spielberg
  fact_c: null   # e.g. First major CGI film
  action: null   # what it did — redefined · launched · broke
  impact: null   # what changed — e.g. blockbuster cinema forever

copy:
  title:        null   # full name shown on screen
  tagline:      null   # one punchy line
  stat_a:       null   # e.g. Budget — $63 M
  stat_b:       null   # e.g. Box office — $1.046 B
  stat_c:       null   # e.g. 63 CGI shots
  quote:        null   # memorable line
  quote_credit: null   # who said it
  hashtags:     null   # full hashtag string for the post

hook:
  a:      null   # hook variant A — question
  b:      null   # hook variant B — bold claim
  c:      null   # hook variant C — stat drop
  active: null   # a · b · c  ← pick one here

cta:
  a:      null   # e.g. Follow for more
  b:      null   # e.g. Drop your fav in the comments
  active: null   # a · b  ← pick one here

voice:
  tone: null   # enthusiastic · educational · nostalgic · urgent
  pov:  null   # first_person · second_person · third_person

colours:
  primary:    null   # hex — e.g. #2D5016
  secondary:  null
  accent:     null
  text:       null   # overlay text — typically #FFFFFF
  background: null   # typically #000000

beats:
  b01:
    name:  null   # e.g. hook
    start: null   # e.g. 0s
    end:   null   # e.g. 3s
    ms:    null   # e.g. 3000
  b02:
    name:  null   # e.g. context
    start: null
    end:   null
    ms:    null
  b03:
    name:  null   # e.g. proof
    start: null
    end:   null
    ms:    null
  b04:
    name:  null   # e.g. cta
    start: null
    end:   null
    ms:    null

clips:
  c01:
    shot:    null   # visual description
    source:  null   # stock · archival · original · ai_gen
    cut_in:  null   # fade_in · cut · cross_dissolve
    cut_out: null   # cut · cross_dissolve · whip_pan
  c02:
    shot:    null
    source:  null
    cut_in:  null
    cut_out: null
  c03:
    shot:    null
    source:  null
    cut_in:  null
    cut_out: null
  c04:
    shot:    null
    source:  null
    cut_in:  null
    cut_out: null

overlay:
  b01:
    style:     null   # headline · body · stat_card · lower_third
    size:      null   # e.g. 48px
    animation: null   # slide_up · fade_in · pop · none
    position:  null   # center · lower_third · top
  b02:
    style:     null
    size:      null
    animation: null
    position:  null
  b03:
    style:     null
    size:      null
    animation: null
    position:  null
  b04:
    style:     null
    size:      null
    animation: null
    position:  null

audio:
  music:  null   # track name or description
  mood:   null   # epic · calm · tense · playful · uplifting
  bpm:    null
  sfx_01: null   # sound effect for beat 01 — e.g. whoosh
  sfx_02: null   # sound effect for beat 02
  vo_b01: null   # voiceover line for beat 01
  vo_b02: null   # voiceover line for beat 02
  vo_b03: null   # voiceover line for beat 03
  vo_b04: null   # voiceover line for beat 04
  volume: null   # master level 0–100

output:
  filename:   null   # no extension
  format:     null   # mp4 · mov · webm
  resolution: null   # e.g. 1080x1920
  fps:        null   # 24 · 30 · 60

brand:
  handle:     null   # @handle shown on closing beat
  platform:   null   # TikTok · Instagram · YouTube · LinkedIn
  disclaimer: null   # e.g. Fan content. Not affiliated with …
---

# Video Script — Canvas

Each `###` section is one **node panel**, exactly as it sits on a ComfyUI canvas.
The three-column table *is* the node: **← inputs** on the left, **settings** in the middle, **outputs →** on the right.
Every setting cell shows `{{key.path}}` — the placeholder that resolves from the YAML key of the same name.
**Edges** lines below each panel show every wire leaving it: `output port → Destination : input port`.

**Wire colours** — 🔵 Text · 🟢 Data · 🟡 Beat · 🟣 Palette · 🔴 Audio · 🟠 Master · 🔷 Clip · 🟦 Sequence · ⬜ File

---

## Canvas flow

```
[Subject]      ──────────────────────────────────────────────────────────────► [Voiceover]
[Copy library] ──────────────────────────────────────────► [Beat 02] [Beat 03] [Post caption]
[Hook & CTA]   ────────────────────────────► [Beat 01] [Beat 04] [Voiceover] [Post caption]
[Colours]      ──────────────────────────────────────────► [Beat 01] [Beat 02] [Beat 03] [Beat 04]
[Timeline]     ────────────────────────────► [Beat 01..04] [Sound effects] [Sequence]
[Music]        ──────────────────────────────────────────────────────────────► [Audio mix]
[Sound effects]──────────────────────────────────────────────────────────────► [Audio mix]
[Voiceover]    ──────────────────────────────────────────────────────────────► [Audio mix]
[Beat 01..04]  ──────────────────────────────────────────────────────────────► [Sequence]
[Audio mix]    ──────────────────────────────────────────────────────────────► [Render]
[Sequence]     ──────────────────────────────────────────────────────────────► [Render]
[Post caption] ──────────────────────────────────────────────────────────────► [Render]
```

---

## Column 1 — Sources

*No inputs. All data originates here and flows right.*

---

### Subject

| ← Inputs | Settings | Outputs → |
|---|---|---|
| — | `{{subject.name}}` | |
| | `{{subject.kind}}` | |
| | `{{subject.fact_a}}` | |
| | `{{subject.fact_b}}` | |
| | `{{subject.fact_c}}` | |
| | `{{subject.action}}` | |
| | `{{subject.impact}}` | **subject** 🟢 |

**Edges** `subject` → Voiceover : subject in

---

### Copy library

*Every word shown on screen or in the caption comes from here.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| — | `{{copy.title}}` | **subject info** 🟢 |
| | `{{copy.tagline}}` | |
| | `{{copy.stat_a}}` | **stats** 🟢 |
| | `{{copy.stat_b}}` | |
| | `{{copy.stat_c}}` | |
| | `{{copy.quote}}` | **moments** 🟢 |
| | `{{copy.quote_credit}}` | |
| | `{{copy.hashtags}}` | **hashtags** 🔵 |

**Edges**
`subject info` → Beat 02 : subject in · Post caption : subject in
`stats` → Voiceover : stats in · Beat 02 : stats in · Beat 03 : stats in · Post caption : stats in
`moments` → Music : moments in · Post caption : moments in
`hashtags` → Post caption : hashtags in

---

### Hook & CTA

*Toggle `hook.active` or `cta.active` in the YAML to switch variants — no panel edits needed.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| — | `{{hook.a}}` | |
| | `{{hook.b}}` | |
| | `{{hook.c}}` | |
| | `{{hook.active}}` | **active hook** 🔵 |
| | `{{cta.a}}` | |
| | `{{cta.b}}` | |
| | `{{cta.active}}` | **active CTA** 🔵 |
| | `{{voice.tone}}` | |
| | `{{voice.pov}}` | **tone** 🟢 |

**Edges**
`active hook` → Voiceover : hook in · Beat 01 : text in · Post caption : hook in
`active CTA` → Voiceover : CTA in · Beat 04 : text in
`tone` → Voiceover : tone in

---

### Colours

*Single palette output fans to all four beat panels.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| — | `{{colours.primary}}` | |
| | `{{colours.secondary}}` | |
| | `{{colours.accent}}` | |
| | `{{colours.text}}` | |
| | `{{colours.background}}` | **palette** 🟣 |

**Edges** `palette` → Beat 01 : palette in · Beat 02 : palette in · Beat 03 : palette in · Beat 04 : palette in

---

## Column 2 — Timing & Audio

---

### Timeline

*Slices total length into four timed beats, each carrying name, start, end, and duration.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| — | `{{beats.b01.name}}` | |
| | `{{beats.b01.start}}` | |
| | `{{beats.b01.end}}` | |
| | `{{beats.b01.ms}}` | **beat 01** 🟡 |
| | `{{beats.b02.name}}` | |
| | `{{beats.b02.start}}` | |
| | `{{beats.b02.end}}` | |
| | `{{beats.b02.ms}}` | **beat 02** 🟡 |
| | `{{beats.b03.name}}` | |
| | `{{beats.b03.start}}` | |
| | `{{beats.b03.end}}` | |
| | `{{beats.b03.ms}}` | **beat 03** 🟡 |
| | `{{beats.b04.name}}` | |
| | `{{beats.b04.start}}` | |
| | `{{beats.b04.end}}` | |
| | `{{beats.b04.ms}}` | **beat 04** 🟡 |
| | `{{brand.platform}}` | **timeline bundle** 🟢 |

**Edges**
`beat 01` → Beat 01 : beat in · Sound effects : beat 01 in
`beat 02` → Beat 02 : beat in · Sound effects : beat 02 in
`beat 03` → Beat 03 : beat in
`beat 04` → Beat 04 : beat in
`timeline bundle` → Sequence : timeline in

---

### Music

| ← Inputs | Settings | Outputs → |
|---|---|---|
| moments in 🟢 ← Copy library | `{{audio.music}}` | |
| | `{{audio.mood}}` | |
| | `{{audio.bpm}}` | **score** 🔴 |

**Edges** `score` → Audio mix : score in

---

### Sound effects

| ← Inputs | Settings | Outputs → |
|---|---|---|
| beat 01 in 🟡 ← Timeline | `{{audio.sfx_01}}` | |
| beat 02 in 🟡 ← Timeline | `{{audio.sfx_02}}` | **SFX** 🔴 |

**Edges** `SFX` → Audio mix : SFX in

---

### Voiceover

*Most-connected panel — five wires in from four source panels.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| hook in 🔵 ← Hook & CTA | `{{audio.vo_b01}}` | |
| CTA in 🔵 ← Hook & CTA | `{{audio.vo_b02}}` | |
| tone in 🟢 ← Hook & CTA | `{{audio.vo_b03}}` | |
| stats in 🟢 ← Copy library | `{{audio.vo_b04}}` | |
| subject in 🟢 ← Subject | `{{voice.tone}}` | **VO** 🔴 |

**Edges** `VO` → Audio mix : VO in

---

## Column 3 — Beats & Mix

*Each beat panel fuses one video clip and one text overlay into a single composed frame.*

---

### Beat 01

| ← Inputs | Settings | Outputs → |
|---|---|---|
| beat in 🟡 ← Timeline | `{{beats.b01.name}}` | |
| | `{{beats.b01.start}}` | |
| | `{{beats.b01.end}}` | |
| | `{{beats.b01.ms}}` | |
| | `{{clips.c01.shot}}` | |
| text in 🔵 ← Hook & CTA | `{{clips.c01.source}}` | |
| palette in 🟣 ← Colours | `{{clips.c01.cut_in}}` | |
| | `{{clips.c01.cut_out}}` | |
| | `{{overlay.b01.style}}` | |
| | `{{overlay.b01.size}}` | |
| | `{{overlay.b01.animation}}` | |
| | `{{overlay.b01.position}}` | |
| | `{{audio.vo_b01}}` | **composed clip** 🔷 |

**Edges** `composed clip` → Sequence : clip 01 in

---

### Beat 02

| ← Inputs | Settings | Outputs → |
|---|---|---|
| beat in 🟡 ← Timeline | `{{beats.b02.name}}` | |
| | `{{beats.b02.start}}` | |
| | `{{beats.b02.end}}` | |
| | `{{beats.b02.ms}}` | |
| | `{{clips.c02.shot}}` | |
| subject in 🟢 ← Copy library | `{{clips.c02.source}}` | |
| stats in 🟢 ← Copy library | `{{clips.c02.cut_in}}` | |
| palette in 🟣 ← Colours | `{{clips.c02.cut_out}}` | |
| | `{{overlay.b02.style}}` | |
| | `{{overlay.b02.size}}` | |
| | `{{overlay.b02.animation}}` | |
| | `{{overlay.b02.position}}` | |
| | `{{audio.vo_b02}}` | **composed clip** 🔷 |

**Edges** `composed clip` → Sequence : clip 02 in

---

### Beat 03

| ← Inputs | Settings | Outputs → |
|---|---|---|
| beat in 🟡 ← Timeline | `{{beats.b03.name}}` | |
| | `{{beats.b03.start}}` | |
| | `{{beats.b03.end}}` | |
| | `{{beats.b03.ms}}` | |
| | `{{clips.c03.shot}}` | |
| stats in 🟢 ← Copy library | `{{clips.c03.source}}` | |
| palette in 🟣 ← Colours | `{{clips.c03.cut_in}}` | |
| | `{{clips.c03.cut_out}}` | |
| | `{{overlay.b03.style}}` | |
| | `{{overlay.b03.size}}` | |
| | `{{overlay.b03.animation}}` | |
| | `{{overlay.b03.position}}` | |
| | `{{audio.vo_b03}}` | **composed clip** 🔷 |

**Edges** `composed clip` → Sequence : clip 03 in

---

### Beat 04

| ← Inputs | Settings | Outputs → |
|---|---|---|
| beat in 🟡 ← Timeline | `{{beats.b04.name}}` | |
| | `{{beats.b04.start}}` | |
| | `{{beats.b04.end}}` | |
| | `{{beats.b04.ms}}` | |
| | `{{clips.c04.shot}}` | |
| text in 🔵 ← Hook & CTA | `{{clips.c04.source}}` | |
| palette in 🟣 ← Colours | `{{clips.c04.cut_in}}` | |
| | `{{clips.c04.cut_out}}` | |
| | `{{overlay.b04.style}}` | |
| | `{{overlay.b04.size}}` | |
| | `{{overlay.b04.animation}}` | |
| | `{{overlay.b04.position}}` | |
| | `{{audio.vo_b04}}` | |
| | `{{brand.handle}}` | **composed clip** 🔷 |

**Edges** `composed clip` → Sequence : clip 04 in

---

### Audio mix

*Three audio channels converge into one stereo master.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| score in 🔴 ← Music | `{{audio.volume}}` | |
| SFX in 🔴 ← Sound effects | | |
| VO in 🔴 ← Voiceover | | **master mix** 🟠 |

**Edges** `master mix` → Render : audio in

---

## Column 4 — Assembly

---

### Sequence

*Four clips and the timeline bundle converge into one ordered video.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| clip 01 in 🔷 ← Beat 01 | order: 01 → 02 → 03 → 04 | |
| clip 02 in 🔷 ← Beat 02 | | |
| clip 03 in 🔷 ← Beat 03 | | |
| clip 04 in 🔷 ← Beat 04 | | |
| timeline in 🟢 ← Timeline | | **sequence** 🟦 |

**Edges** `sequence` → Render : video in

---

### Post caption

*Six inputs converge into one ready-to-paste post caption.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| hook in 🔵 ← Hook & CTA | `{{hook.active}}` | |
| subject in 🟢 ← Copy library | `{{copy.title}}` | |
| stats in 🟢 ← Copy library | `{{copy.tagline}}` | |
| moments in 🟢 ← Copy library | `{{copy.quote}}` | |
| hashtags in 🔵 ← Copy library | `{{copy.quote_credit}}` | |
| disclaimer in 🔵 ← Brand | `{{copy.hashtags}}` | |
| | `{{brand.disclaimer}}` | **caption** 🔵 |

**Edges** `caption` → Render : caption in

---

## Column 5 — Output

---

### Render

*Terminal panel — nothing flows past here.*

| ← Inputs | Settings | Outputs → |
|---|---|---|
| video in 🟦 ← Sequence | `{{output.filename}}` | |
| audio in 🟠 ← Audio mix | `{{output.format}}` | |
| caption in 🔵 ← Post caption | `{{output.resolution}}` | **video file** ⬜ |
| | `{{output.fps}}` | **caption** 🔵 |

---

## Post caption

`{{hook.active}}` · `{{copy.title}}` — `{{copy.tagline}}`

*"{{copy.quote}}"* — {{copy.quote_credit}}

`{{copy.hashtags}}`

*`{{brand.disclaimer}}`*

---

## Before you render

- [ ] Every `null` in the YAML is filled
- [ ] `hook.active` and `cta.active` each point to `a`, `b`, or `c`
- [ ] Every beat has a shot, source, and VO line
- [ ] Sequence, Audio mix, and Post caption all wire into Render
