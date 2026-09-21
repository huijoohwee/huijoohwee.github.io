---
title: "Agent Experience Maturity Rubric"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-09-12"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.0.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Agent experience maturity rubric

## Scope and provenance

This module owns the four-criterion, five-point agent experience rubric. Load it when defining or
reviewing an MVP demonstration. It supplements the [readiness ladder](prd-tad-adr-mvp-gtm-readiness.md),
[monetization rules](prd-tad-adr-mvp-gtm-guidelines.md#monetization) and domain-specific capability ladders;
it does not replace them. Ratings describe observed quality, not release authorization or market demand.

Source supplied for this revision: `joohwee/undocumented-draft/maturity-level-rubric.md`, SHA-256
`79543922a03c67d539d16a1fc53f470d232790ed43d67470090d9228a4de94ed`. The matrix preserves all four criterion names, questions and twenty descriptors;
only layout and numeric column labels change. The original draft stays intact as provenance. This module
is the maintained owner; consumers link here instead of copying it or loading the private draft at runtime.

## Rating matrix

| Criterion | What we are looking for | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Core Requirements & Functionality | Does the project deliver a working agent inside a place where people already work, talk, or live?<br>Does the core workflow function end to end? | The project does not run or does not demonstrate a functional agent. | Parts of the project run, but the core workflow or environment integration is incomplete. | A basic end-to-end agent works in the intended environment, with limitations or bugs. | The project works reliably and demonstrates a complete agent experience with only minor issues. | The project is robust, reliable, and fully functional within its intended environment. |
| Innovation & Theme Alignment | Does the project explore a compelling new place or interaction for agents? Does the environment materially improve what the agent can do? | The project is essentially a generic chatbot or automation; the selected environment is irrelevant. | The agent appears in an eligible environment, but the environment mostly serves as a wrapper. | The project clearly addresses the theme, and its environment adds meaningful value. | The environment shapes the core workflow and enables an original agent experience. | The project reveals a surprising new agent pattern whose central value could not be reproduced in a standalone chatbox. |
| Technical Execution & Integration | Consider the code, architecture, reliability, tool use, data handling, and depth of integration with the selected environment. | Little or no technical execution is evident; the submission is primarily conceptual or mocked. | The implementation is basic, unstable, or relies on superficial integrations. | The project demonstrates solid technical execution and working integrations, with some rough edges. | The project is well engineered, reliable, and integrates its tools, data, and environment effectively. | The project demonstrates exceptional engineering, including robust orchestration, thoughtful failure handling, and a deeply integrated architecture. |
| Usefulness & Agentic Experience | Does the project create clear value for its intended users?<br>Is the agent intuitive, effective, and appropriate for the environment in which it operates? | The use case is unclear, and the agent provides little meaningful value or interaction. | The project addresses a recognizable use case, but the agent’s contribution is limited or largely resembles basic prompt and response. | The project is useful, the interaction is understandable, and the agent performs meaningful actions with reasonable user control. | The project solves a clear problem, and the agent feels native to its environment while creating a strong interaction between people and AI. | The project unlocks substantial value through an agent experience designed specifically for its environment, using context intelligently while remaining clear and controllable. |

## Assessment contract

- Report a vector of four independent ratings, each an integer 1–5 or `unassessed` (`null` in JSON).
  Missing observations mean unassessed, never 1 or an inferred success. Do not average ratings into readiness.
- State the actual user, job, domain object and environment. Interpret “theme” as the selected user job
  and environment; novelty cannot outrank a painful, evidenced need or justify unnecessary agent behavior.
- An evaluator selects the descriptor supported by observed behavior and records its rationale. These
  are ordinal descriptors, not cumulative tests: score 1 describes failure, so passing score 1 is not a
  prerequisite for score 3. A separately declared capability ladder still requires contiguous checks.
- Join every rating to `continuity_id@revision`, exact source revisions, environment, observation time,
  named check or study, result and evidence reference. Record one owner and next check for each gap.
  Authoring a requirement, locating code or passing a structural validator cannot score an experience.
- Keep expected outcomes in the PRD, source/interface ownership in TAD, material choices in ADR,
  demonstration results in MVP and acquisition/WTP/collected payment in GTM. Reuse the same CID/RAO/SVO
  chain and evidence references; one assessment table is enough, without five reports or a new dashboard.
- Reassess affected criteria on source, environment, user-job or evidence-validity changes. Retain prior
  observations as history. A current failure or invalidated observation can lower a rating; never keep
  a prior high score merely because a document was baselined.
- Reuse `unproven-claim` for unsupported scores, `stale-evidence` for expired joins,
  `unresolved-rubric-gap` for missing owners/next checks, and `blended-status` for conflated readiness.
  The [finding owner](prd-tad-adr-mvp-gtm-verification.md) defines severity and recording.

The [assessment validator](../scripts/lib/maturity-rubric.mjs) checks this bounded record shape and
reference joins. It does not authenticate evidence, judge prose, execute a check or grant a release.

### Serialized assessment fields

The existing grounding record embeds one `maturity` object. Its strict fields are `continuity_id`,
`revision`, `environment`, `evaluated_at` (canonical UTC with milliseconds), `ratings`, and `observations`.
`ratings` follows the four matrix rows in order; each row carries `criterion`, `score`, `evidence`
(observation IDs), `rationale`, `owner` (repository ID) and `next_check`.
Each observation declares `id`, `criterion`, evaluator-selected `score`, the same continuity/revision
and environment, `observed_at`, `expires_at`, `check`, `result`, `reference`, `evaluator`, `sources`
(repository/revision pairs from the snapshot), and `kind: experience`. At most 20 observations and
20 unique evidence IDs per row are accepted; text fields are bounded to 2 KiB. Empty evidence requires
`score: null`; a scored row requires matching, current observations. Sources and experience observations
are distinct. These fields supplement the existing evidence join; they do not redefine CID or readiness.

## MVP to GTM use

Choose one reachable payer and one repeated, expensive task in an environment they already use.
Use the existing [rapid sprint](adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md) and
[economics owner](prd-tad-adr-mvp-gtm-economics.md), with these assessment handoffs:

| Handoff | Smallest useful evidence | Decision |
|---|---|---|
| Problem → priced offer | Actual workaround, frequency, cost, buyer, offered price, observed response | Prioritize WTP evidence; an interview planned for later stays unvalidated |
| Offer → vertical MVP | One entry → grounded choice → permitted action → durable outcome → readback | Define failure, cancellation, retry and recovery checks alongside the happy path |
| MVP → pilot | Time-boxed demonstration in the user's environment; all four ratings with gaps | Use 3 as a suggested pilot quality target, not an automatic launch gate |
| Pilot → paid acceptance | Accepted outcome, actual payment reference, observed support and delivery costs | Separate mechanism-proven, demand-validated and collected revenue |
| Paid acceptance → repeat use | Repeat outcome, bounded operating cost and owner runtime/recovery evidence | Expand only where demand or measured bottlenecks warrant it |

Suggested targets are advisory. Product VCCs decide readiness: even four 5s cannot excuse an open
payment, isolation, recovery or delivery gate. Do not require novelty scores of 4–5 for a useful MVP.
Capture latency, time-to-first-value, tool/model calls, cache behavior, retry cost, resource bounds and
support minutes only where they inform the selected job. Link existing telemetry instead of adding collectors.

## Commerce grounding — reference implementation

The [existing grounding snapshot](../schema/AgenticRAG/prd-tad-adr-mvp-gtm-grounding.json) records source
owners, exact revisions and checks across the seven repositories. Its `maturity` assessment deliberately
leaves all four ratings unassessed: inspected implementation and tests are reusable starting points,
but this snapshot contains no evaluator-observed agent experience. Follow the linked
[codebase grounding](prd-tad-adr-mvp-gtm-codebase-grounding.md) for the commercial slice and external inspiration.

For an agentic marketplace, the domain object is a buyer intent, reviewed offer, authorized payment and
receipt. Demonstrate discovery → review → authorization → fulfillment/settlement → receipt → replay,
then measure paid acceptance and repeat use. A local simulated payment is mechanism evidence only.
On mobile/web/offline paths, cached reads and drafts remain usable; reconnect must refresh offers and
permissions before any money effect. A retry after a lost response must return the existing result.
