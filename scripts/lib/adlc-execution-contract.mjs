import assert from "node:assert/strict";
import { assertOrderedPhrases, contractSlice } from "./adlc-contract-input.mjs";

export function checkExecutionContract({
  source, productionReleaseLifecycle, conformanceRuntime, integrationOrder, antiPatternGuards, normalizedProductionReleaseLifecycle
}) {
  const requiredSections = [
    "## Scope & Neutrality Contract",
    "## Boundary with the Authoring Set",
    "## Task Model",
    "### Collaboration Identity & Scoped Lane Admission",
    "### Orchestration-Reasoned Completion-Time Estimation",
    "## Human-in-the-Loop Gates",
    "## Global Release-Control Rule",
    "## Dependency-Ordered Integration",
    "## Atomic Lane Convergence",
    "## End-to-End Release Lifecycle Protocol",
    "## Runtime Readiness Enforcement",
    "## Execution Conformance Findings",
    "## Validation Checklist",
  ];

  for (const heading of requiredSections) {
    assert.equal(
      source.split(heading).length - 1,
      1,
      `${heading} must occur exactly once`,
    );
  }

  assert.match(
    source,
    /^- `task-model` — task identity, minimum-resource core-value granularity, dependency graph, orchestration-reasoned completion-time estimation, and state vocabulary$/m,
    "module index must expose orchestration-reasoned completion-time estimation",
  );
  const taskModel = contractSlice(
    source,
    "## Task Model",
    "## Human-in-the-Loop Gates",
    "task model",
  );
  const completionEstimate = contractSlice(
    taskModel,
    "### Orchestration-Reasoned Completion-Time Estimation",
    "### State Vocabulary",
    "orchestration-reasoned completion-time estimation",
  ).trimEnd();
  const completionEstimateLines = completionEstimate.split("\n");
  assert.equal(
    completionEstimateLines.length,
    5,
    "completion-time estimation must remain one heading plus four directives",
  );
  assert.equal(
    completionEstimateLines.filter(line => line === "### Orchestration-Reasoned Completion-Time Estimation").length,
    1,
  );
  assert.equal(
    completionEstimateLines.filter(line => line.startsWith("- ")).length,
    4,
    "completion-time estimation must contain exactly four directive bullets",
  );
  for (const requirement of [
    "dependency-closed outcome work breakdown structure (WBS)",
    "every transitive predecessor",
    "duration range with its evidence or explicit assumption",
    "WBS critical path",
    "dependency and write-scope disjointness",
    "resource, evaluator, and coordination capacity",
    "overhead (orchestration, setup, and handoff), external waits, independent verification, expected rework, and explicit contingency",
    "completion range, confidence, critical path, capacity and concurrency evidence, assumptions, external dependencies, and evaluation time",
    "simplest auditable method proportionate to uncertainty and consequence",
    "no estimator, duration unit, or contingency percentage is universal",
    "evidence invalidates an assumption or changes the critical path",
    "retains the prior forecast and records the triggering evidence, range delta, confidence change, and reason",
    "`orchestration-estimate-unfounded`",
  ]) {
    assert.match(
      completionEstimate,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `completion-time estimation must include ${requirement}`,
    );
  }
  for (const term of ["GitHub", "Cloudflare", "Agentic Graph", "Agentic Canvas OS", "huijoohwee", "airvio.co", "provider", "vendor"]) {
    assert.doesNotMatch(
      completionEstimate,
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `completion-time estimation must remain adapter-neutral: ${term}`,
    );
  }
  assert.match(
    source,
    /^\| Task model \| `orchestration-estimate-unfounded` \| `major` \|$/m,
    "finding vocabulary must classify orchestration-estimate-unfounded as a major Task model finding",
  );
  assert.match(
    source,
    /^- \[ \] \*\*Orchestration completion-time estimate grounded and current\*\*: the dependency-closed outcome WBS, critical path under evidenced concurrency and capacity, overhead, external waits, verification, rework, contingency, range, confidence, assumptions, and every evidence-triggered reforecast are recorded$/m,
    "pre-execution checklist must require a current grounded completion-time estimate",
  );

  const releaseStart = source.indexOf("## End-to-End Release Lifecycle Protocol");
  const convergenceStart = source.indexOf("## Atomic Lane Convergence");
  assert.ok(
    convergenceStart >= 0 && releaseStart > convergenceStart,
    "atomic lane convergence must precede the release seam",
  );
  const convergencePolicy = source.slice(convergenceStart, releaseStart);
  for (const term of ["GitHub", "Cloudflare", "Agentic Graph", "Agentic Canvas OS", "huijoohwee", "origin/main"]) {
    assert.doesNotMatch(
      convergencePolicy,
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `atomic lane convergence must not contain adapter term ${term}`,
    );
  }
  for (const requirement of [
    "one atomic top-level convergence controller",
    "replaceable internal phase adapters",
    "Stable Plan Identity",
    "observational noise excluded",
    "one exact Operator authorization",
    "require new authorization only when",
    "Retain or renew current authority",
    "successor creation plus task-bound authority continuation in one atomic transition",
    "coordination-only content revisions",
    "projection-only blocker",
    "minimal active set",
    "at most one mutation-capable projection",
    "`unresumable-run`",
    "`duplicate-release-controller`",
    "zero file diff alone does not prove that unique value-bearing history is disposable",
    "protected review and integration adapter",
    "Forbid unrecoverable discard",
    "without force",
    "prune only stale worktree-registration and remote-tracking metadata",
    "canonical local ref equals the canonical remote ref",
  ]) {
    assert.match(
      convergencePolicy,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `atomic lane convergence must include ${requirement}`,
    );
  }
  for (const requirement of [
    "Isolation is a safety boundary, not a retention policy",
    "Minimal active set",
    "not-applicable",
    "never from a preset count",
    "at most one mutation-capable workspace projection",
    "retire(claim)",
    "coordination state in its authoritative metadata or ledger projection",
    "archived and explicitly non-authoritative",
    "without blocking unrelated disjoint work",
  ]) {
    assert.match(
      convergencePolicy,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `atomic lane convergence must include ${requirement}`,
    );
  }
  const runtimeReadinessStart = source.indexOf("## Runtime Readiness Enforcement");
  assert.ok(
    releaseStart >= 0 && runtimeReadinessStart > releaseStart,
    "the release seam must precede runtime-readiness enforcement",
  );
  const releaseSeam = source.slice(releaseStart, runtimeReadinessStart);
  const neutralReleaseProtocol = productionReleaseLifecycle;
  const findingsStart = source.indexOf("## Execution Conformance Findings");
  assert.ok(
    runtimeReadinessStart >= 0 && findingsStart > runtimeReadinessStart,
    "runtime-readiness enforcement must precede its finding vocabulary",
  );
  const runtimeReadinessPolicy = source.slice(runtimeReadinessStart, findingsStart);
  assert.match(
    runtimeReadinessPolicy,
    /\.\/adlc-conformance-runtime\.md/,
    "runtime-readiness policy must name its behavioral conformance companion",
  );

  for (const term of [
    "GitHub",
    "Cloudflare",
    "Agentic Graph",
    "Agentic Canvas OS",
    "huijoohwee",
    "airvio.co",
    "origin/main",
    "turn:end",
    "localhost",
  ]) {
    assert.doesNotMatch(
      neutralReleaseProtocol,
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `normative release protocol must not contain adapter term ${term}`,
    );
  }

  for (const requirement of [
    "Release Frontier",
    "Adapter port",
    "Source authority",
    "State reconciler",
    "Deployment Receipt",
    "State Reconciliation Receipt",
    "immutable deployment origin",
    "authoritative state readback",
    "returning-client cache or service-worker convergence",
    "readiness markers or equivalent identity evidence to be byte-identical",
    "cancel or retire the stale unapproved run",
    "Remove only clean, integrated, completion-proven task lanes",
    "No transport substitutes for another",
    "Byte-identical inputs and evaluation time produce byte-identical findings and receipt digests",
  ]) {
    assert.match(
      normalizedProductionReleaseLifecycle,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `production-release lifecycle module must include ${requirement}`,
    );
  }

  for (const requirement of [
    "protected integration as Integration Receipt authority only",
    "exact final Release Frontier",
    "State Reconciliation",
    "transport",
    "clean, integrated, completion-proven task lanes",
  ]) {
    assert.match(
      releaseSeam,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `release seam must include ${requirement}`,
    );
  }

  for (const term of [
    "GitHub",
    "Cloudflare",
    "Agentic Graph",
    "Agentic Canvas OS",
    "huijoohwee",
    "airvio.co",
    "origin/main",
    "localhost",
  ]) {
    assert.doesNotMatch(
      runtimeReadinessPolicy,
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `runtime-readiness policy must not contain adapter term ${term}`,
    );
  }

  for (const requirement of [
    "typed inputs and outputs",
    "bounded orchestration",
    "independent evaluation",
    "one immutable source revision",
    "complete dependency closure",
    "source validation, canonical runtime, protected integration, and deployed proof as separate claims",
    "repository-owned stage gates",
    "operation-derived evidence",
    "digest-bound receipts for admission, review, integration, runtime, candidate, authorization, deployment, and publication",
    "`npx`, `latest`, or dynamic resolution",
    "deterministic evaluator command that exits zero only when every required proof joins",
    "`runtime-readiness-unproven` at `blocker` severity",
  ]) {
    assert.match(
      runtimeReadinessPolicy,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `runtime-readiness policy must include ${requirement}`,
    );
  }

  for (const term of [
    "GitHub",
    "Cloudflare",
    "Agentic Graph",
    "Agentic Canvas OS",
    "huijoohwee",
    "airvio.co",
    "origin/main",
    "localhost",
  ]) {
    assert.doesNotMatch(
      conformanceRuntime,
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `conformance-runtime module must not contain adapter term ${term}`,
    );
  }

  for (const requirement of [
    "operation-derived evidence",
    "Policy Identity",
    "`policyRevision`",
    "`policyDigest`",
    "admission -> review -> integration -> runtime -> candidate -> authorization -> deployment -> publication",
    "Digest-Bound Stage Receipt",
    "`predecessorReceiptDigest`",
    "Every join compares run, policy, evaluator, source, dependency closure, stage order, evidence digest, and predecessor receipt digest",
    "Full-Stage Fail-Closed Invariants",
    "Byte-identical inputs produce identical findings, verdicts, and receipt digests",
    "Partial-Scope Claim Boundary",
    "`enforcedStages`",
    "`unevaluatedStages`",
    "cannot claim end-to-end conformance",
    "`npx`, a mutable `latest` selector",
    "none may establish policy identity",
  ]) {
    assert.match(
      conformanceRuntime,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `conformance-runtime module must include ${requirement}`,
    );
  }

  for (const term of [
    "GitHub",
    "Cloudflare",
    "Agentic Graph",
    "Agentic Canvas OS",
    "huijoohwee",
    "airvio.co",
    "origin/main",
    "localhost",
  ]) {
    assert.doesNotMatch(
      integrationOrder,
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `integration-order module must not contain adapter term ${term}`,
    );
  }

  for (const receipt of [
    "Overlap Preservation Receipt",
    "Overlap Disposition Receipt",
    "Integration Receipt",
    "Runtime Review Receipt",
    "Candidate Manifest",
    "Authorization Interaction Receipt",
    "Human Authorization Receipt",
    "Deployment Receipt",
    "State Reconciliation Receipt",
    "Live Verification Receipt",
    "Publication Receipt",
    "Rollback Receipt",
  ]) {
    assert.match(neutralReleaseProtocol, new RegExp(receipt), `receipt chain must include ${receipt}`);
  }

  assert.match(normalizedProductionReleaseLifecycle, /Preserve unrelated or overlapping work in its owning lane/);
  assert.match(normalizedProductionReleaseLifecycle, /Review is not authorization/);
  assert.match(normalizedProductionReleaseLifecycle, /Bind the interaction transport and any browser dependency as evidence/);
  assert.match(normalizedProductionReleaseLifecycle, /Re-fetch all protected authorities and revalidate the current Runtime Review Receipt/);

  for (const finding of [
    "`parallel-scope-collision`",
    "`stale-collaboration-fence`",
    "`canonical-base-drift`", "`scope-admission-collision`", "`unattributed-lane-ambiguity`",
    "`admission-snapshot-stale`", "`unsafe-candidate-target`", "`local-only-cross-device-lease`",
    "`collateral-lane-mutation`", "`admission-runtime-conflation`", "`candidate-lane-orphaned`",
    "`canonical-control-bypass`", "`redundant-active-projection`", "`terminal-lane-residual`", "`coordination-revision-churn`",
    "`dependency-closure-drift`",
    "`authorization-evidence-unjoined`",
    "`authorization-interaction-unjoined`",
    "`duplicate-release-controller`",
    "`production-authorization-drift`",
    "`post-authorization-rebuild`",
    "`state-reconciliation-unverified`",
    "`immutable-origin-unverified`",
    "`public-route-unverified`",
    "`client-cache-convergence-unverified`",
    "`publication-before-live-verification`",
    "`cleanup-ownership-unproven`",
    "`integration-order-cycle`",
    "`integration-before-dependency`",
    "`canonical-frontier-unverified`",
    "`duplicate-change-reintegrated`",
    "`stale-candidate-frontier`",
    "`runtime-readiness-unproven`",
    "`orchestration-estimate-unfounded`",
  ]) {
    assert.match(source, new RegExp(finding), `finding vocabulary must include ${finding}`);
  }

  const antiPatternSeam = contractSlice(
    source,
    "## Anti-Pattern Guards",
    "## Mantra Application",
    "anti-pattern guards",
  );
  assert.match(antiPatternSeam, /\.\/adlc-anti-pattern-guards\.md/);
  const antiPatternTable = antiPatternGuards
    .split("\n")
    .filter(line => line.startsWith("|"));
  assert.deepEqual(antiPatternTable, [
    "| Prohibited pattern | Required correction |",
    "|---|---|",
    "| An Implementer marking its own task complete; a `done` state any role may set; a verdict derived from state the Evaluator cannot see | `verified` as the only success state, set only by an Evaluator that is a distinct mechanism, judging surfaced output only |",
    "| Tasks invented at task-authoring time to cover behaviour the specification never stated | Every task derived from a VCC; a behaviour gap returned to the authoring loop as a specification defect |",
    "| Picking among several equally-ready candidates by convenience, recency, or an unstated preference, with no recorded reason | Hard constraints gate a bounded Constraints ↔ Argumentation ↔ Outranking loop; changed evidence reopens affected checks, preserves incomparability, and records a supported choice or unresolved decision |",
    "| Tasks dispatched with no token, iteration, wall-clock, or context bound; bounds raised mid-run to rescue a failing task | All four bounds stated before dispatch with a circuit-breaker; overruns trigger re-decomposition, not a larger bound |",
    "| Session-wide capability grants; an agent widening its own permissions mid-task; a standing approval for irreversible operations | Narrowest sufficient class granted per task; escalation via `blocked` and re-dispatch; an explicit Operator decision per irreversible occurrence |",
    "| Tasks that reach a mirror or delivery surface, or transmit project content outward, because it was convenient | Execution confined to the authoring lane; promotion is the Deploy Boundary's job and never a task |",
    "| Success asserted without a named check and a recorded result; a check named after the fact to match what happened | Named check stated before dispatch, run during the task, and its result surfaced in the Implementer's own output |",
    "| Behavioral defects fixed without a failing witness; a general correctness claim unsupported by a meaningful check | A behavioral defect needs a bounded failing witness and passing result; use property tests when a general invariant and meaningful generated cases justify them |",
    "| Long runs that cannot resume, discovering the context boundary by losing work at it | Run state persisted after every terminal transition; checkpoint before the context bound; resume from persisted state, not memory |",
    "| Operator decisions inferred, defaulted, simulated, or accepted through a non-interactive confirmation flag because the run would otherwise stall | Absent decisions produce `blocked`; the configured interaction adapter records the exact human challenge response before the authority adapter can authorize |",
    "| A green merge automatically deploying the current protected ref, one interaction transport treated as universal, or a release rebuilding after human approval | Protected integration emits no deployment authority; the configured interaction and authority adapters record one authenticated exact-candidate decision, and the controller deploys those reviewed bytes without rebuild |",
    "| Reusing approval after source, dependency, policy, target, artifact, or manifest drift because a mutable ref still has the same name | Any identity mismatch invalidates approval and restarts convergence, review, candidate binding, and authorization |",
    "| Two devices dispatching the same target concurrently, or handing off mutable local state between users | One target-and-candidate idempotency key, one fenced controller, and handoff only through immutable revisions and joined receipts |",
    "| Treating provider-specific branch names, commands, approval products, or hosting services as universal lifecycle semantics | A provider-neutral receipt protocol with concrete behavior isolated in replaceable reference implementation adapters |",
    "| The same effect split across successive recovery controllers, each demanding fresh authorization after creating the next projection-only blocker | One stable atomic convergence run reuses its bounded effect authorization, continues authority with successors, and stops as a controller defect if terminal projection cannot converge |",
    "| Asking an Operator to relay a machine token, digest, nonce, or successor command for an unchanged recorded decision | Derive and transport encodings internally; re-prompt only after material decision drift |",
    "| A task list with cycles, or a wave whose tasks write the same artifact concurrently | Acyclic dependency graph; wave membership checked for write disjointness before dispatch |",
    "| A completion date produced from activity guesses or unlimited parallelism, with overhead, waits, verification, rework, contingency, or assumptions hidden | The Orchestrator derives a dependency-closed outcome WBS and evidenced critical-path and capacity basis, records range, confidence, assumptions, and time components, and reforecasts on invalidating evidence |",
  ]);

  function assertExactCanonicalReceiptContract(globalPolicy, integrationPolicy) {
    const directive = globalPolicy
      .split("\n")
      .find(line => line.startsWith("- Resolve protected-integration authorization"));
    assert.ok(directive, "global exact-canonical directive must exist");
    for (const clause of [
      "topology-bound exact-canonical Integration Receipt",
      "absent or still nonterminal duplicate post-integration canonical-source run",
      "reviewed or protected-refreshed candidate revision and tree",
      "declared integration method and exact parent list",
      "deferred automatic-integration requester, method, title, and body; actual merger identity and merge time",
      "collaboration claim, review transition, integration receipt, terminal retirement, ledger revision and digest, and operation identity",
      "newest terminal source run, suite, and check chain",
      "declared protected-refresh rollup and remote collaboration-check identity and projection",
      "canonical tree to equal the adapter-declared deterministic transformation of the exact protected base tree plus the admitted reviewed delta",
      "for squash, additionally require parents exactly `[protected base]`",
      "candidate tree to equal the canonical tree",
      "provider-neutral functional event class `review-record-closed` or `operation-dispatch`",
      "isolate every concrete wire-event mapping in a replaceable reference adapter outside this universal contract",
      "never infer association from inferred or non-authoritative review association metadata",
      "newest terminal failure for the same canonical source invalidates the receipt",
      "provider observation read-only and non-mutating",
      "synthesizing, updating, rolling up, cancelling, or otherwise mutating checks",
    ]) {
      assert.ok(directive.includes(clause), `global exact-canonical directive must include ${clause}`);
    }

    const evidenceSection = integrationPolicy.slice(
      integrationPolicy.indexOf("## Required Evidence"),
      integrationPolicy.indexOf("## Findings"),
    );
    const evidenceRows = new Map(
      evidenceSection
        .split("\n")
        .filter(line => /^\| [^|-].* \|$/.test(line))
        .map(line => line.slice(2, -2).split(" | ")),
    );
    const requiredRows = new Map([
      ["Exact-canonical receipt subject", "Repository adapter and policy revision; immutable closed review locator; candidate revision and tree; protected base revision and tree; canonical revision and tree"],
      ["Exact-canonical receipt topology", "Declared method and exact parent list; canonical tree equals the adapter-declared deterministic transformation of the exact protected base tree plus admitted reviewed delta; squash parents exactly `[protected base]` and candidate tree must equal the canonical tree"],
      ["Exact-canonical receipt authority", "Integration controller; deferred automatic-integration requester, method, title, and body; actual merger identity and merge time; collaboration claim, review transition, integration receipt, terminal retirement, ledger revision and digest, and operation identity"],
      ["Exact-canonical receipt checks", "Newest terminal source run, suite, and check chain for the exact reviewed or protected-refreshed candidate; declared protected-refresh rollup and remote collaboration-check identity and projection; fresh required-check context, evaluator application, and strictness policy"],
      ["Exact-canonical receipt association", "Functional event class `review-record-closed` or `operation-dispatch`; wire mapping isolated outside the universal contract; no inferred or non-authoritative association metadata; read-only non-mutating observation; no check mutation"],
    ]);
    for (const [evidence, identity] of requiredRows) {
      assert.equal(evidenceRows.get(evidence), identity, `${evidence} must retain its closed identity contract`);
    }
    for (const clause of [
      "stop and retry the same idempotent convergence step unless one topology-bound receipt already satisfies every closed subject, topology, authority, check-chain, association, and no-mutation predicate below",
      "Keep provider wire grammar outside this universal contract and inside a replaceable reference adapter",
      "never infer association through inferred or non-authoritative review association metadata",
      "never synthesize, update, roll up, cancel, or otherwise mutate a check",
    ]) {
      assert.ok(integrationPolicy.includes(clause), `integration-order module must include ${clause}`);
    }
    assertOrderedPhrases(integrationPolicy, [
      "newest terminal source run, suite, and check chain",
      "absent or still nonterminal duplicate post-integration run",
      "newest terminal failure",
    ], "exact-canonical evidence precedence");
  }

  assertExactCanonicalReceiptContract(source, integrationOrder);
  for (const [from, to] of [
    ["absent or still nonterminal duplicate post-integration canonical-source run", "any duplicate post-integration canonical-source run"],
    ["canonical tree to equal the adapter-declared deterministic transformation of the exact protected base tree plus the admitted reviewed delta", "canonical tree may contain additional bytes"],
    ["provider-neutral functional event class `review-record-closed` or `operation-dispatch`", "any provider event"],
    ["deferred automatic-integration requester, method, title, and body; actual merger identity and merge time", "one unqualified integration actor"],
    ["declared protected-refresh rollup and remote collaboration-check identity and projection", "declared protected-refresh rollup"],
    ["never infer association from inferred or non-authoritative review association metadata", "infer association from review metadata"],
    ["newest terminal failure for the same canonical source invalidates the receipt", "newest terminal failure may be ignored"],
    ["provider observation read-only and non-mutating", "provider observation may mutate checks"],
  ]) {
    assert.throws(
      () => assertExactCanonicalReceiptContract(source.replaceAll(from, to), integrationOrder),
      { name: "AssertionError" },
      `global exact-canonical checker must reject weakened clause: ${from}`,
    );
  }
  for (const [from, to] of [
    ["parents exactly `[protected base]`", "one parent"],
    ["candidate tree must equal the canonical tree", "candidate tree may differ from the canonical tree"],
    ["canonical tree equals the adapter-declared deterministic transformation of the exact protected base tree plus admitted reviewed delta", "canonical tree may contain additional bytes"],
    ["newest terminal source run, suite, and check chain", "any successful source check"],
    ["no inferred or non-authoritative association metadata", "inferred association metadata allowed"],
    ["no check mutation", "check mutation allowed"],
    ["stop and retry the same idempotent convergence step unless one topology-bound receipt already satisfies every closed subject, topology, authority, check-chain, association, and no-mutation predicate below", "continue without a complete receipt"],
  ]) {
    assert.throws(
      () => assertExactCanonicalReceiptContract(source, integrationOrder.replaceAll(from, to)),
      { name: "AssertionError" },
      `exact-canonical checker must reject weakened clause: ${from}`,
    );
  }
}
