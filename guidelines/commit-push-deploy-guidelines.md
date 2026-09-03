---
title: "Commit, Push, Integrate, and Deploy Guidelines"
doc_type: "Delivery and Release Control Guideline"
version: "2.0.0"
date: "2026-08-26"
lang: "en-US"
owner: "Delivery policy"
local_rung: "runtime-ready"
delivered_rung: "production-verified"
lane: "protected-release"
universal_scope: true
status: "runtime-ready"
repository: "huijoohwee/huijoohwee.github.io"
workspaceTopology: "isolated-worktree"
integrationMethod: "squash"
required_checks:
  - "agentic-sdlc-policy-contract"
applies_to:
  - "huijoohwee/huijoohwee.github.io"
  - "huijoohwee/agentic-canvas-os"
  - "huijoohwee/agentic-graph"
  - "huijoohwee/GameXR"
  - "huijoohwee/huijoohwee"
repository_profiles:
  guideline_site: ["huijoohwee/huijoohwee.github.io", "isolated-worktree", "squash", "agentic-sdlc-policy-contract"]
  agentic_canvas_os: ["huijoohwee/agentic-canvas-os", "isolated-worktree", "squash", "test", "build", "docs-contract", "collaboration-integration", "cloud-collaboration"]
  agentic_graph: ["huijoohwee/agentic-graph", "isolated-worktree", "squash", "Integration Gate"]
  gamexr: ["huijoohwee/GameXR", "isolated-worktree", "squash", "Integration Gate"]
  generated_production: ["huijoohwee/huijoohwee", "isolated-worktree", "squash", "Runtime Readiness Gate"]
---

# Commit, Push, Integrate, and Deploy Guidelines

## Authority

Only the target-scoped protected integration controller may advance the
canonical release frontier or initiate delivery. Commit, push, integration,
and deployment are different authority transitions; success at one boundary
does not authorize the next.

This top-level repository profile declares exactly one integration method and
applies only to `huijoohwee/huijoohwee.github.io`:
`integrationMethod: squash`. It declares
`workspaceTopology: isolated-worktree` and the app-bound required check named
in `required_checks`. Each entry in `repository_profiles` is an ordered tuple
of repository, workspace topology, integration method, and one or more exact
required-check names. Direct canonical writes are forbidden.
Dirty, unversioned, or local-checkout deployment is forbidden.

The [Agentic SDLC Guidelines](./agentic-sdlc-guidelines.md) own universal task,
authority, verification, and release-control rules. The Agentic Canvas OS
`START-WORKFLOW.md` and `RELEASE-WORKFLOW.md` are the executable reference
contracts. This document owns the commit, push, protected-integration, and
delivery sequence.

## Identity and repository profile

Product identity and physical provider identity are separate:

| Surface | Current identity | Rule |
|---|---|---|
| Product | Agentic Graph (`agentic-graph`) | Use for packages, modules, generated paths, canonical routes, UI, and new runtime identifiers. |
| Source repository | `huijoohwee/agentic-graph` | Retain as an immutable provider/provenance locator until a separately authorized repository transfer. |
| Game source | `huijoohwee/GameXR` | Consume only the protected Agentic Graph integration SHA. |
| Generated production repository | `huijoohwee/huijoohwee` | Artifact-only; never a source-authoring target. |
| Canonical route | `https://airvio.co/agentic-graph` | Primary Agentic Graph route. |
| Compatibility route | `https://airvio.co/agentic-graph` | Release-A redirect/carrier only; retire through the authorized Release-B plan. |
| Game route | `https://airvio.co/gamexr` | Stable GameXR route. |

The legacy provider repository name, immutable legal notices, historical D1
migration names, and time-bounded compatibility routes are classified
provenance or migration carriers. They are not permission to reintroduce the
retired product name into active source identifiers.

## Phase 0: Inspect and admit

Before authoring:

1. Fetch provider refs without integrating them into the current checkout.
2. Prove the canonical worktree is clean and equal to the fetched canonical
   frontier.
3. Inventory every registered worktree, current remote claim, review request,
   and declared write set.
4. Admit one isolated task lane from the exact frontier with an external
   owner-only task capability and a current non-overlapping cloud claim.
5. Record the repository adapter, `workspaceTopology`,
   `integrationMethod`, semantic scope, exact paths, base SHA, fence, lease,
   and draft review locator.

Unattributed dirt, ambiguous ownership, an overlapping scope, a stale fence,
or an undeclared adapter blocks mutation. Preserve another lane's bytes and
authority in place; do not move, hide, adopt, or clean them.

## Phase 1: Commit

Commit only from the admitted task worktree:

1. Revalidate the live cloud claim, task-capability proof, local lease, epoch,
   fence, branch, and expiry immediately before each edit batch.
2. Change only the exact declared paths.
3. Run the focused tests and repository contract from the same tree that will
   be committed.
4. Seal an exact change manifest. The repository-owned controller stages those
   paths explicitly and rejects missing, extra, ignored, staged, untracked, or
   mode-drifted residue.
5. Create an attributed commit whose subject, body, and trailers bind the task,
   semantic scope, lease epoch, and controller mechanism.

Do not broaden a manifest after authoring. A required new path is a
scope-expansion transition with fresh overlap proof, not an informal addition.
Do not rewrite a published shared task history.

## Phase 2: Push

Push only the fenced task ref through the repository-owned lifecycle:

1. Reconcile the immutable candidate with the current canonical frontier.
2. Push the exact task head and verify provider readback of the same object.
3. Bind the draft review request to the task branch, canonical base, exact
   head, claim, scope, manifest digest, epoch, and fence.
4. Run the named required checks on the exact review head.
5. Transition to review-ready only after the provider head and cloud claim
   agree; a push response is not proof of publication.

Never push directly to the canonical ref, force a task ref, bypass hooks, or
infer authorization from branch naming, mergeability, labels, tree equality,
or a green task-head check.

## Phase 3: Integrate and deploy

Commit and push the admitted task candidate first. Run the deploy chain only
after protected integration and release planning produce the required
receipts. Don't deploy over a red CI result. Verify every live surface before
publishing the production mirror.

### Protected integration

The protected integration controller must:

1. Re-fetch the canonical frontier and invalidate a candidate based on an
   earlier frontier.
2. Prove immutable candidate identity, admitted ownership, dependency closure,
   exact required-check success, and current integration policy.
3. Obtain the policy-permitted authenticated integration authorization for the
   exact review head.
4. Request a matched-head squash and wait for provider state `MERGED`.
5. Verify the resulting one-parent canonical commit, tree, attribution,
   required check, and containment in the fetched canonical frontier.

A provider default or enabled merge button does not select the integration
method. This profile rejects rebase-linear and merge-commit integration.

### Release Run A: immutable planning

Run A is read-only with respect to production. It:

- starts from the exact protected source and dependency SHAs;
- runs source, browser, mobile-first, offline-first, on-device, and package
  checks required by the affected surface;
- builds the production artifact once and seals every file, route, source
  revision, dependency revision, and digest;
- computes the Cloudflare Worker, Pages, D1, KV, Queue, R2, route, and generated
  mirror plan from direct authoritative observations;
- proves the generated mirror is derived output and contains no independent
  authored bytes; and
- emits the candidate, plan, attestations, evidence archive, and typed
  authorization challenge without mutating production.

For Agentic Graph production state, the authorization statement is byte-exact:

```text
authorize agentic-graph-production-state-plan <planDigest> plan-run <planRunId> artifact <artifactId> sha256 <artifactDigest>
```

Exact authenticated human authorization binds one immutable candidate and
target. A prior approval, a branch, a merge event, an environment name, a
deployment label, or approval of another digest grants no authority.

### Release Run B: controlled effects

Only the protected production job consumes Run A. It independently verifies
the downloaded artifact, both attestations, protected source head, dependency
closure, exact authorization statement, current provider state, and required
human environment approval before its first external effect.

The controller then:

1. initializes the durable journal and stable effect identities;
2. applies the authorized state transition;
3. publishes the zero-slot root Pages artifact and verifies its receipt;
4. attests the terminal payload;
5. deploys the terminal Pages artifact;
6. reconciles state by direct authoritative readback;
7. verifies public routes, health, cache, compatibility, and provenance
   carriers; and
8. publishes the exact verified generated mirror through its own protected
   branch, required check, and matched-head squash boundary.

Deploy the sealed artifact without rebuilding or retargeting it. Local commands
may inspect, plan, or verify, but cannot become an alternate Production
controller.

After any observed or unknown Worker-side effect, preserve the journal and
resume forward from the same stable effect identity. A Pages or D1 reversal
cannot claim to roll back Workers, Durable Objects, Queues, or R2. Before the
first observed production effect, a failed run may stop and require a fresh
candidate authorization.

## Delivery profiles

Repository adapters are target-specific; a check name from one repository
never satisfies another repository's profile:

| Repository | Workspace | Integration | Required checks |
|---|---|---|---|
| `huijoohwee/huijoohwee.github.io` | isolated worktree | squash | `agentic-sdlc-policy-contract` |
| `huijoohwee/agentic-canvas-os` | isolated worktree | squash | `test`, `build`, `docs-contract`, `collaboration-integration`, `cloud-collaboration` |
| `huijoohwee/agentic-graph` | isolated worktree | squash | `Integration Gate` |
| `huijoohwee/GameXR` | isolated worktree | squash | `Integration Gate` |
| `huijoohwee/huijoohwee` | isolated worktree | squash | `Runtime Readiness Gate` |

| Target | Candidate authorization | Controller | Terminal evidence |
|---|---|---|---|
| Agentic Graph and GameXR on Cloudflare | Exact Run-A plan, run, artifact, and digest statement plus protected `production` approval | Repository-owned Run B | Direct provider readback, public route checks, artifact/provenance receipts, protected generated-mirror integration |
| This guideline site's GitHub Pages surface | `authorize github-pages-production <candidateSha>` supplied in an authenticated manual dispatch | `.github/workflows/pages.yml` plus `scripts/lib/git-guidelines/pages-release-controller.mjs` | Current canonical SHA, successful required check, exact checkout, sealed file manifest and effect ID, matched gate/reconciliation receipts, full public payload verification |

The GitHub Pages workflow is manual by design. A canonical merge may make a
candidate eligible; it does not initiate delivery.

The Pages controller inventories every same-candidate dispatch and prior rerun
attempt before allowing the deploy action. Only a first proven no-effect run
may return `apply`; all ambiguous or observed effects are reconciliation-only.
The terminal step joins the exact run, provider artifact, candidate, effect,
manifest, policy, canonical public origin, and byte-verified payload receipts.

## Verification and release evidence

Every production result records:

| Evidence | Required binding |
|---|---|
| Source | Canonical repository identity and exact protected SHA |
| Dependencies | Exact protected revisions and lockfile identities |
| Artifact | Stable artifact ID, archive digest, file manifest, and attestations |
| Authorization | Authenticated actor, exact statement, candidate, target, policy, and decision time |
| Effects | Stable effect IDs, pre-state, result, direct readback, and replay status |
| Public verification | Canonical and compatibility routes, health surfaces, cache behavior, source revision, and artifact digest |
| Mirror | Generated path inventory, source/provenance digest, required check, review head, and canonical integration SHA |
| Cost | Build time, deployment duration, bytes, paid-call count, retry count, and retained resources |

Evidence must distinguish `passed`, `failed`, `blocked`, `not-required`,
and `unevaluated`. Terminal output, an HTTP request without an expected
revision, or a controller response without direct readback is not production
proof.

## Release-A compatibility and Release-B retirement

Release A may retain only manifest-classified compatibility carriers needed for
existing users or provider continuity. Each carrier requires a reason,
physical owner, verifier, and retirement condition. The canonical Agentic
Graph identity must already own active packages, code symbols, generated
paths, routes, and UI.

Release B is a fresh plan with fresh authorization after the required soak. It
may retire only carriers proved drained by direct observations. Immutable legal
notices, provider provenance, and historical migrations remain unchanged when
their governing record requires preservation.

## Cleanup

Cleanup removes only clean, integrated, completion-proven lanes. It preserves
active, parked, dirty, divergent, ambiguous, and unrelated work.

The controller must verify the merged review head, canonical containment,
terminal cloud retirement, clean detached task worktree, and exact cleanup
target before unregistering a worktree. Branch deletion, ref pruning, cache
removal, provider-resource retirement, and compatibility-route retirement are
separate effects and require their own policy eligibility.

## Stop conditions

Stop before mutation or delivery when any of these is true:

- source, dependency, candidate, artifact, plan, authorization, or target
  identity differs from the sealed value;
- required checks are missing, non-terminal, stale, or unsuccessful;
- the canonical frontier advanced after candidate sealing;
- claim, lease, epoch, fence, review, task capability, or environment approval
  is missing or stale;
- a provider effect is ambiguous and the journal cannot reconcile it;
- a production observation cannot be read directly; or
- cleanup eligibility is incomplete.

Report the typed blocker and preserved state. Never convert an incomplete
release into success by weakening a check, changing the target, rebuilding the
artifact, or deleting evidence.
