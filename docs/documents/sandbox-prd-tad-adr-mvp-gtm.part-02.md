---
title: "Reference implementation: sandbox-prd-tad-adr-mvp-gtm section 2"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "1.1.1"
date: "2026-09-12"
lang: "en-US"
owner: "Solo Founder / AI Orchestrator"
continuity_id: "PLAN-SANDBOX-PRD-TAD-ADR-MVP-GTM"
prd_revision: "1.1.1"
tad_revision: "1.1.1"
adr_revision: "1.1.1"
mvp_revision: "1.1.1"
gtm_revision: "1.1.1"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "device-cba000d3779d--planning-v27"
agent_id: "codex-01a0940a"
parent: "sandbox-prd-tad-adr-mvp-gtm.md"
guideline_revision: "2.7.0"
source_section_lines: "479-956"
---

[Combined planning owner](sandbox-prd-tad-adr-mvp-gtm.md) · `PLAN-SANDBOX-PRD-TAD-ADR-MVP-GTM@1.1.1`. This companion preserves the source section; diagrams and frontmatter projections remain owned by the combined artifact.

## Readiness Gap Matrix

*Local rung and delivered rung are separate columns; both draw from the Readiness Ladder. Priority is the highest severity among the findings linked to that workstream, or `none`.*

| Workstream | Local rung | Delivered rung | Gap | Priority | Exit criteria (VCC) |
|---|---|---|---|---|---|
| Sandbox Tier Router | `spec-complete` | `undocumented` | No Evidence Reference yet | none | AC1, AC3 pass with recorded results |
| Managed Edge Sandbox Executor | `spec-complete` | `undocumented` | Region-pinning open question unresolved | none | AC2, AC5 pass; region question closed or formally tracked |
| Self-Hosted FOSS Sandbox Executor | `spec-complete` | `undocumented` | KVM availability on Oracle ARM unconfirmed | none | AC4 pass on actual host |
| Egress Credential Boundary | `spec-complete` | `undocumented` | No Evidence Reference yet | none | AC2 passes with zero raw-secret matches |
| Cost & Telemetry Observer | `spec-complete` | `undocumented` | No Evidence Reference yet | none | AC5 passes with one row per execution |

---

## ADR-1: Sandbox Execution Tier Selection

**Status**: Accepted
**Date**: 2026-07-30

### Context

Agentic Graph's probe-tree and Hermes agents need to execute agent-generated code safely. A previously evaluated monolithic self-hosted sandbox/workspace platform failed the FOSS hard gate on license grounds, leaving an open question of what primary execution tier to adopt.

### Decision

Adopt a Managed/Serverless edge sandbox as the primary execution tier, coordinated through the existing Workers / Durable Object / D1 / R2 topology, with credential injection enforced at the network egress boundary — and require a FOSS self-hosted fallback tier (ADR-2) rather than depend on this tier alone.

### Alternatives Considered

1. **Managed/Serverless edge sandbox** — reference implementation: [Cloudflare Sandbox SDK](https://developers.cloudflare.com/sandbox/): Pros (native Workers/Durable Object integration via `@cloudflare/sandbox` package, active-CPU billing that scales to zero, network-layer credential injection via egress proxy, global edge placement, comprehensive API for commands/files/ports/tunnels/storage, integrated with Workers AI for AI code execution, R2-backed persistent storage via `sandbox.storage` API, browser terminal support via WebSocket with xterm.js, point-in-time backups with copy-on-write overlays, file watching via native inotify, code interpreter with rich outputs for charts/tables/images, session isolation with per-session state, built on Cloudflare Containers + Durable Objects architecture, open-source SDK at [github.com/cloudflare/sandbox-sdk](https://github.com/cloudflare/sandbox-sdk)); Cons (underlying Containers platform is proprietary, not self-hostable, requires Docker locally for deployment, 2-3 minute initial provisioning wait, region-pinning for storage/compute not yet confirmed in documentation, requires Workers Paid plan)
2. **FOSS self-hosted microVM sandbox (reference implementation, always required)** — reference implementation: Microsandbox: Pros (Apache-2.0, single-binary, genuinely self-hostable, full data-residency control); Cons (requires `/dev/kvm`/nested virtualization, adds solo-dev ops burden, no built-in edge distribution)
3. **Rejected — monolithic self-hosted workspace platform** — reference implementation: Daytona: Pros (full-featured workspace orchestration); Cons (AGPL-3.0 license — copyleft obligations fail the FOSS hard gate for a proprietary codebase)
4. **Rejected — partial-FOSS hosted sandbox** — reference implementation: E2B: Pros (Apache-2.0 SDK, microVM isolation); Cons (the orchestration/billing control plane is proprietary and hosted — this clears the FOSS gate no better than a fully-managed edge tier, while adding a second vendor dependency instead of leveraging infrastructure already in use)

### Rationale

The Managed/Serverless edge tier reuses infrastructure Agentic Graph is already committed to (~90% of OS scaffolding runs on the same provider), so it is a pragmatic exception to FOSS-first rather than a gate violation: the marginal TCO and integration cost of a *second* vendor (E2B) or a licensing-incompatible platform (Daytona) is strictly worse than extending the existing edge stack. Requiring a FOSS self-hosted fallback (ADR-2) preserves the exit path the FOSS-first principle exists to protect, without blocking the Must-tier build on standing up new self-hosted infrastructure first.

### TCO Impact

*The chosen option (Managed/Serverless) and the FOSS alternative (Provisioned/Self-Managed) are presented as separate columns; a Hybrid/Consolidated estimate is added because the self-hosted variant would share the existing Oracle ARM host already running Ollama inference.*

| Dimension | Chosen: Managed/Serverless (reference implementation: Cloudflare Sandbox SDK) | FOSS Alternative: Provisioned/Self-Managed (reference implementation: Microsandbox, standalone host) | FOSS Alternative: Hybrid/Consolidated (Microsandbox sharing the existing Oracle ARM Ollama host) | Delta / 12 months |
|---|---|---|---|---|
| Infra cost | ~$0.00002/vCPU-second, active-CPU only, scales to $0 at idle | $0 (Oracle Always Free ARM), but a *dedicated* second free-tier instance may be needed | $0 (shares the existing free-tier instance; no new spend) | ≈ $0 either way at current traffic |
| Egress cost | $0 at current low traffic (Cloudflare zero-egress posture) | $0 (self-hosted, no metered egress) | $0 | No delta |
| Token cost | $0 (harness has no model call) | $0 | $0 | No delta |
| Ops burden | Low (provider patches, scales, fails over) | High (solo-dev owns patching, backup, failover for a dedicated host) | Medium (ops burden of the one host Agentic Graph already operates, not a second one) | Managed lowest; Hybrid next |
| Vendor risk | Medium (single managed vendor for this capability) | Low | Low | Managed carries the only non-trivial risk |

### Consequences

- **Positive**: near-zero incremental infra cost; reuses existing operational muscle (Workers, Durable Objects, D1); credential-injection pattern matches the existing doc-sync architecture's single-writer leasing discipline
- **Negative**: introduces a second point of vendor dependency (beyond the existing Cloudflare commitment) for a security-sensitive capability; region-pinning for data-residency-sensitive agents is an open question
- **Neutral**: requires ADR-2's fallback tier to exist before the vendor-independence property this ADR relies on is actually true

---

## ADR-2: Self-Hosted FOSS Fallback Runtime Selection

**Status**: Accepted
**Date**: 2026-07-30

### Context

ADR-1's Managed tier is a pragmatic exception to FOSS-first, not a replacement for it. A genuinely self-hostable, permissively licensed fallback tier is required, using the Oracle Cloud ARM Ampere free-tier host that already anchors Ollama inference as its near-zero-TCO home.

### Decision

Select a KVM-probe-gated dual runtime: a microVM-based reference implementation when hardware virtualization is available on the host, and a userspace-kernel reference implementation when it is not — selected automatically by the KVM Probe, never hand-configured.

### Alternatives Considered

1. **Microvm-based FOSS runtime (primary, reference implementation, required)** — reference implementation: Microsandbox: Pros (Apache-2.0, Rust, single-binary, true VM-per-sandbox isolation comparable to Firecracker); Cons (requires `/dev/kvm`, unconfirmed on the Oracle ARM Ampere free tier)
2. **Userspace-kernel FOSS runtime (fallback)** — reference implementation: gVisor + Docker: Pros (Apache-2.0, no nested-virtualization requirement, runs on any Linux host); Cons (weaker isolation boundary than a true microVM — acceptable as a fallback, not preferred when KVM is available)
3. **Rejected — partial-FOSS hosted sandbox** — reference implementation: E2B: same rejection rationale as ADR-1 (hosted control plane is proprietary; does not clear the FOSS hard gate as a *self-hosted* fallback)
4. **Rejected — no additional isolation** — plain Docker containers: Cons (shares the host kernel; insufficient isolation for untrusted, agent-generated code)

### Rationale

Gating the choice on a runtime KVM probe rather than a static config keeps the fallback tier correct regardless of which specific Oracle ARM shape ends up hosting it, and avoids hand-authoring an assumption about nested-virtualization support that has not yet been directly verified (see PRD Open Questions).

### TCO Impact

| Dimension | Chosen: Provisioned/Self-Managed, microVM path (reference implementation: Microsandbox) | Alternative: Provisioned/Self-Managed, userspace-kernel path (reference implementation: gVisor + Docker) | Hybrid/Consolidated (either path, sharing the existing Oracle ARM Ollama host) | Delta / 12 months |
|---|---|---|---|---|
| Infra cost | $0 (Always Free ARM tier) | $0 (Always Free ARM tier) | $0 (no new host) | No delta |
| Egress cost | $0 | $0 | $0 | No delta |
| Token cost | $0 | $0 | $0 | No delta |
| Ops burden | Medium (single-binary deploy, but VM-per-sandbox lifecycle to manage) | Medium (container lifecycle, slightly simpler to operate day-to-day) | Same ops burden as whichever path is selected — no second host to maintain | No material delta between the two FOSS paths |
| Vendor risk | Low | Low | Low | No delta |

### Consequences

- **Positive**: genuinely FOSS, self-hostable exit path exists regardless of ADR-1's managed-tier decision; automatic KVM gating removes a class of misconfiguration
- **Negative**: solo-dev ops burden for the self-hosted tier, even if small; isolation strength varies by path (microVM vs userspace-kernel), which must be disclosed to any workload routed to this tier
- **Neutral**: this tier remains `Should`-tier at current traffic (see MoSCoW); it exists for vendor-independence and data-residency reasons, not because the Managed tier is currently insufficient

---

## Implementation Guidance: Cloudflare Sandbox SDK Integration

**Note**: This section provides concrete implementation patterns based on the [Cloudflare Sandbox SDK documentation](https://developers.cloudflare.com/sandbox/). Content was derived from official Cloudflare developer documentation (rephrased for compliance with licensing restrictions).

### Quick Start Pattern

**Minimal Worker Integration**:
```typescript
import { getSandbox, type Sandbox } from '@cloudflare/sandbox';

export { Sandbox } from '@cloudflare/sandbox';

type Env = {
  Sandbox: DurableObjectNamespace<Sandbox>;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Get or create sandbox instance with stable ID
    // For user-facing apps, derive ID from authenticated user
    const sandbox = getSandbox(env.Sandbox, 'agent-session-123');
    
    // Execute code with typed result
    const result = await sandbox.exec('python3 -c "print(2 + 2)"');
    
    return Response.json({
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      success: result.success
    });
  }
};
```

### Core API Patterns

**1. Command Execution with Timeout**:
```typescript
const result = await sandbox.exec(code, {
  timeoutMs: 30000,
  cwd: '/workspace'
});

if (!result.success) {
  // Handle timeout or execution failure
  console.error('Execution failed:', result.stderr);
}
```

**2. File Operations**:
```typescript
// Write file
await sandbox.writeFile('/workspace/input.json', JSON.stringify(data));

// Execute code that reads the file
const result = await sandbox.exec('python3 process.py');

// Read output file
const output = await sandbox.readFile('/workspace/output.json');
const parsed = JSON.parse(output.content);
```

**3. Session Isolation** (recommended for security):
```typescript
// Configure sandbox with isolated sessions
const sandbox = getSandbox(env.Sandbox, userId, {
  enableDefaultSession: false  // Ensures operations run in isolation
});

// Create explicit session when needed
const sessionId = await sandbox.createSession();

// Execute in isolated session
const result = await sandbox.exec('npm install', { sessionId });
```

**4. Expose Services with Preview URLs**:
```typescript
// Start a service in the sandbox
await sandbox.exec('python3 -m http.server 8000 &');

// Get preview URL
const previewUrl = await sandbox.ports.get(8000);
// Returns: https://<unique-id>.preview.cloudflare.com
```

**5. Zero-Config Tunnels** (for development):
```typescript
// Get instant *.trycloudflare.com URL
const tunnelUrl = await sandbox.tunnels.get(3000);
// Returns: https://<random>.trycloudflare.com
```

**6. Persistent Storage with R2**:
```typescript
// Mount R2 bucket as local filesystem
await sandbox.storage.mount('my-bucket', '/data');

// Access bucket data using standard file operations
const files = await sandbox.listDir('/data');
```

**7. File Watching for Hot Reload**:
```typescript
// Watch for file changes
const watcher = await sandbox.watchFiles('/workspace/**/*.js');

for await (const event of watcher) {
  console.log(`File ${event.path} was ${event.type}`);
  // Trigger rebuild or hot reload
}
```

### Configuration Pattern (`wrangler.jsonc`)

```jsonc
{
  "name": "agentic-graph-sandbox-executor",
  "main": "src/index.ts",
  "compatibility_date": "2026-07-30",
  
  "containers": [{
    "class_name": "Sandbox",
    "image": "./Dockerfile",
    "instance_type": "lite",        // or "standard" for more resources
    "max_instances": 10             // Scale based on expected concurrency
  }],
  
  "durable_objects": {
    "bindings": [{
      "class_name": "Sandbox",
      "name": "Sandbox"
    }]
  },
  
  "migrations": [{
    "tag": "v1",
    "new_sqlite_classes": ["Sandbox"]
  }]
}
```

### Dockerfile Pattern

```dockerfile
FROM python:3.11-slim

# Install Node.js for polyglot code execution
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Install common data science packages
RUN pip install --no-cache-dir \
    pandas \
    numpy \
    matplotlib \
    requests

# Create workspace directory
RUN mkdir -p /workspace
WORKDIR /workspace

# Default command (sandbox will override this)
CMD ["/bin/bash"]
```

### Deployment Workflow

```bash
# 1. Ensure Docker is running
docker info

# 2. Deploy (first time: 2-3 minutes for container provisioning)
npx wrangler deploy

# 3. Check container status
npx wrangler containers list

# 4. Test endpoint
curl https://agentic-graph-sandbox-executor.your-subdomain.workers.dev/sandbox.execute
```

### Integration with Sandbox Tier Router

**Router Adapter Pattern**:
```typescript
// src/sandbox/executors/managed-edge.ts
import { getSandbox } from '@cloudflare/sandbox';

export class ManagedEdgeSandboxExecutor {
  async execute(request: SandboxExecRequest, env: Env): Promise<SandboxExecResult> {
    const sandbox = getSandbox(
      env.Sandbox,
      request.sessionId || `session-${Date.now()}`,
      { enableDefaultSession: false }  // Force isolation
    );
    
    // Execute with timeout from request
    const result = await sandbox.exec(request.code, {
      timeoutMs: request.timeoutMs || 30000,
      cwd: '/workspace'
    });
    
    // Map to typed result schema
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      success: result.success,
      tier: 'managed-edge',
      costLog: {
        tier: 'managed-edge',
        vcpu_seconds: this.estimateVCPUSeconds(result),
        estimated_cost_usd: this.estimateCost(result),
        exit_reason: result.success ? 'completed' : 'failed'
      }
    };
  }
  
  private estimateVCPUSeconds(result: any): number {
    // Derive from execution time if available
    return result.executionTimeMs ? result.executionTimeMs / 1000 : 0;
  }
  
  private estimateCost(result: any): number {
    // Cloudflare active-CPU pricing: ~$0.00002/vCPU-second
    return this.estimateVCPUSeconds(result) * 0.00002;
  }
}
```

### Credential Injection Pattern

**Egress Boundary Implementation**:
```typescript
// src/sandbox/egress-boundary.ts
export class EgressCredentialBoundary {
  // Proxy outbound requests from sandbox
  async proxyRequest(sandboxId: string, targetUrl: string, env: Env): Promise<Response> {
    // Validate sandbox session has permission for this destination
    const policy = await this.getPolicy(sandboxId, targetUrl);
    
    if (!policy.allowed) {
      return new Response('Unauthorized', { status: 403 });
    }
    
    // Inject credential at network layer (never visible to sandbox code)
    const headers = new Headers();
    const credential = await env.SECRETS.get(policy.credentialKey);
    headers.set('Authorization', `Bearer ${credential}`);
    
    // Forward request with injected credential
    return fetch(targetUrl, { headers });
  }
}
```

### Cost & Telemetry Observer Pattern

```typescript
// src/sandbox/observer.ts
export class CostTelemetryObserver {
  async logExecution(result: SandboxExecResult, env: Env): Promise<void> {
    try {
      // Persist to D1
      await env.DB.prepare(`
        INSERT INTO sandbox_cost_log 
        (timestamp, tier, vcpu_seconds, estimated_cost_usd, exit_reason, session_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        Date.now(),
        result.tier,
        result.costLog.vcpu_seconds,
        result.costLog.estimated_cost_usd,
        result.costLog.exit_reason,
        result.sessionId
      ).run();
    } catch (error) {
      // Silent fail — log gap flagged, never blocks response
      console.error('Cost log persistence failed:', error);
    }
  }
}
```

### Testing Pattern

**Local Development** (requires Docker):
```bash
# Start local dev server
npm run dev

# In another terminal, test execution
curl -X POST http://localhost:8787/sandbox.execute \
  -H "Content-Type: application/json" \
  -d '{
    "code": "python3 -c \"print(2 + 2)\"",
    "timeoutMs": 5000
  }'
```

**Integration Test Pattern**:
```typescript
// test/sandbox-router.test.ts
import { describe, it, expect } from 'vitest';

describe('Sandbox Tier Router', () => {
  it('should route to managed tier and return typed result', async () => {
    const request = {
      code: 'echo "Hello, Sandbox"',
      language: 'bash',
      timeoutMs: 5000
    };
    
    const result = await router.execute(request);
    
    expect(result.success).toBe(true);
    expect(result.stdout).toContain('Hello, Sandbox');
    expect(result.tier).toBe('managed-edge');
    expect(result.costLog.tier).toBe('managed-edge');
  });
});
```

### Resource Links

- [Cloudflare Sandbox SDK Overview](https://developers.cloudflare.com/sandbox/)
- [API Reference](https://developers.cloudflare.com/sandbox/api/)
- [Getting Started Guide](https://developers.cloudflare.com/sandbox/get-started/)
- [GitHub Repository](https://github.com/cloudflare/sandbox-sdk)
- [Pricing Documentation](https://developers.cloudflare.com/sandbox/platform/pricing/)
- [Resource Limits](https://developers.cloudflare.com/sandbox/platform/limits/)
- [Workers AI Code Interpreter Tutorial](https://developers.cloudflare.com/sandbox/tutorials/workers-ai-code-interpreter/)
- [Discord Community](https://discord.cloudflare.com/)

**Attribution**: Implementation patterns derived from Cloudflare Sandbox SDK official documentation at [developers.cloudflare.com/sandbox](https://developers.cloudflare.com/sandbox/), rephrased for license compliance.

---

## Conformance & Alignment Note

This document is submitted at the **Phase 2 (TAD Authoring)** gate. No Evidence References exist yet — nothing here has been implemented or run — so every component and rung is honestly `spec-complete` / `undocumented`, not asserted higher. Per the Evidence Reference rules, a readiness rung is a *derived* value; the Phase 3 alignment check (run by an evaluator mechanism distinct from whoever authors the implementation — e.g. a CI gate or an autonomous coding agent's completion-condition check, never the same participant self-grading their own output) has not yet run against this document, so:

- **Coverage ratio**: not yet computed — pending the independent Phase 3 evaluator run
- **Finding set**: not yet generated — no `blocker` findings can be claimed as zero until that run occurs
- **Known open items requiring resolution before Phase 3 sign-off**: the three Open Questions in the PRD (region pinning, concurrency ceiling, KVM availability), and the unresolved Evidence References listed in the Readiness Gap Matrix

Re-run the alignment check once AC1–AC5 have recorded Evidence References, and compare the resulting finding set against this baseline (currently empty, by construction) per the Phase 4 regression rule.

## Planning revision — reference implementation

All five roles below consume `PLAN-SANDBOX-PRD-TAD-ADR-MVP-GTM@1.1.1`. Existing source and runtime observations retain their original revisions and scope; this documentation update renews no deployment or demand evidence. The guideline is [v2.7.0](https://github.com/huijoohwee/huijoohwee.github.io/blob/e8d2a10a8d3e5735c43edf350a22523df05fdf91/guidelines/prd-tad-adr-mvp-gtm-guidelines.md); the shared maturity rubric loads on demand.

| Role | Owning content at this revision |
|---|---|
| PRD | [Feature: Sandbox Execution Layer](sandbox-prd-tad-adr-mvp-gtm.part-01.md#feature-sandbox-execution-layer) |
| TAD | [Architecture: Sandbox Execution Layer](sandbox-prd-tad-adr-mvp-gtm.part-01.md#architecture-sandbox-execution-layer) |
| ADR | [Architectural Decisions](sandbox-prd-tad-adr-mvp-gtm.part-01.md#architectural-decisions) |
| MVP | [MVP — reference implementation](sandbox-prd-tad-adr-mvp-gtm.part-02.md#mvp--reference-implementation) |
| GTM | [GTM — reference implementation](sandbox-prd-tad-adr-mvp-gtm.part-02.md#gtm--reference-implementation) |

## MVP — reference implementation

Reuse the minimum scope, acceptance conditions and component owners identified above. The demonstration must follow the documented entry, permitted action, durable outcome and readback, including its stated failure/recovery path. Use `npm run check` for its actual coverage and the named feature checks in the specification; attach exact source, command, result and authoring/mirror/delivery surface to each VCC before advancing readiness. A source locator or structural check alone proves no user outcome.

Record the observed steps and elapsed time against the existing TTV target. If no target or invocation is stated, the demonstration remains unverified until the document owner supplies it. All four experience criteria are **unassessed** in this authoring review: Core Requirements & Functionality, Innovation & Theme Alignment, Technical Execution & Integration, and Usefulness & Agentic Experience. No scored user observation is attached to this revision; the document owner must capture a timed pilot and criterion-specific evidence.

## GTM — reference implementation

Use the stated persona and pain hypothesis to test one priced pilot in the existing user environment. Keep the documented free/self-serve workflow as the comparison; additional hosting, channels or agent roles require an evidenced constraint or buyer need. Record the buyer’s workaround, frequency, accepted outcome, offered price, observed response and support minutes before ranking a commercial winner. Demand, collected payment and repeat use remain unvalidated by this documentation review; mechanism evidence keeps its narrower original scope. Measure tokens, cash expense and maintenance separately for each proposed deployment model. Feed actual pilot outcomes into a successor Context using the shared four-column planning record.

## Planning gaps — reference implementation

Source review is bounded to repository `e8d2a10a8d3e5735c43edf350a22523df05fdf91`. No feature implementation artifact was independently bound by this document review; implementation disposition remains **unverified** pending the document owner’s source-to-VCC check.
Experience observations, current VCC execution and buyer/payment evidence are unverified here. This is a bounded planning update, not a full-guideline conformance verdict; historical conformance percentages above apply only to their recorded profile and revision.
