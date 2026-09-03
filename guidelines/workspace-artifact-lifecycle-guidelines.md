---
title: "Workspace Artifact Lifecycle Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-08-07"
lang: "en-US"
frontmatter_contract: "required"
owner: "Workspace artifact lifecycle function"
local_rung: "dev-proven"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
provider_neutral: "true"
runtime_neutral: "true"
lifecycle_status: "proposed"
runtime_owner: "huijoohwee/agentic-graph local stdio MCP workspace-artifact runtime"
runtime_invocation: "/workspace.artifact.manage #workspace-artifact-lifecycle @artifact-operation @workspace-entry @artifact-policy @runtime-proof"
publish_policy: "Dev-only; no protected integration, Production, publication, or deployment authority"
---

# Workspace Artifact Lifecycle Guidelines

## Scope and neutrality contract

These guidelines define one bounded lifecycle for files and folders in a selected workspace. They apply regardless of product, repository, operating system, storage provider, UI framework, agent, model, or deployment target.

- **Universal**: decisions derive from explicit capability, policy, path, state, and digest inputs rather than a named product or directory convention.
- **Neutral**: `workspace`, `source`, `destination`, and `provider` are roles. A local filesystem, browser store, object store, document service, or source-control host may implement a role without changing the operation contract.
- **Agnostic**: `/`, `#`, and `@` tokens are discoverable intent metadata, not wire protocols. MCP is one replaceable adapter.
- **Modular**: planning, policy, mutation, persistence, synchronization, and presentation have distinct owners and receipts.
- **Fail closed**: missing authority, ambiguous paths, state drift, unsupported entry kinds, collisions, incomplete writes, and unverifiable read-back stop before success is reported.

## Canonical terms

| Term | Meaning |
|---|---|
| Workspace | An explicitly selected and bounded artifact root. |
| Entry | One file or folder identified by a normalized workspace-relative path. |
| External source or destination | An operator-selected path or provider reference outside the workspace boundary. |
| Plan | A read-only, deterministic description of intended effects and observed preconditions. |
| Apply | A mutation that consumes the exact current plan digest and returns read-back evidence. |
| Collision | A destination whose current kind or digest differs from the plan's expected state. |
| Trash | A recoverable removal disposition. Permanent deletion is a separate privileged policy and is not the default. |

## Single-owner architecture

| Concern | Owner | Boundary |
|---|---|---|
| Visible chooser and Launch actions | Existing `/workspace.launch` browser owner | Requests user input; does not invent a filesystem or provider protocol. |
| Parsed content intake | Existing `/source.ingest` owner | Produces typed content; does not grant destination mutation. |
| Provider synchronization | Existing `/file.sync` owner | Pulls or pushes through configured provider capability and credentials. |
| Deterministic operation planning and local apply | `workspace.artifact.lifecycle` and the two Agentic Graph local MCP tools | Bounded filesystem effects only; no network, model, token, cost, merge, or deploy authority. |
| Persistence | Selected workspace or provider adapter | Must support read-back or return an explicit unverified result. |
| Presentation | Existing Canvas, Source Files, or host UI | Projects receipts; never becomes the mutation authority. |

Do not add a second file picker, command registry, workspace state store, sync protocol, or provider abstraction. New adapters implement the same plan/apply contract behind the existing owners.

## Operation model

Every request selects exactly one operation and one entry kind. A batch is allowed only when every item is independently bounded and the whole batch has one digest.

| Operation | File behavior | Folder behavior | Minimum precondition |
|---|---|---|---|
| `inspect` | Read kind, size, modification evidence, and digest. | Read kind and bounded child manifest. | Workspace capability. |
| `create` | Create new bytes at an absent target. | Create an absent folder; parent creation must be explicit policy. | Target expected absent. |
| `update` | Replace bytes only at the expected current digest. | Change folder metadata only when the adapter supports it. | Expected kind and digest. |
| `import` | Copy selected external bytes into a workspace target. | Copy a bounded external tree from an approved adapter. | Source identity plus target expectation. |
| `export` | Copy workspace bytes to an external destination. | Copy a bounded workspace tree to an approved adapter. | Source digest plus destination expectation. |
| `trash` | Move the expected file to recoverable trash. | Move the expected bounded tree to recoverable trash. | Exact current manifest and trash capability. |
| `restore` | Restore one trash receipt to an absent or explicitly replaceable target. | Restore one trash manifest. | Exact trash receipt and collision policy. |
| `purge` | Permanently delete one trash item. | Permanently delete one trash tree. | Separate destructive policy and explicit operator authority. |

Rename and move are atomic source-plus-destination operations, not an unverified create followed by delete. Copy is import or export with both endpoints explicitly classified.

## Two-phase contract

### Plan

Planning is read-only. It normalizes paths, rejects escapes and symbolic-link traversal, inspects source and target state, applies policy and hard bounds, and returns:

- operation and entry kind;
- normalized source and destination identities;
- expected source and destination kinds, sizes, and SHA-256 digests where applicable;
- collision disposition;
- file, byte, depth, path-length, and runtime bounds;
- required capabilities and operator authority;
- deterministic `planDigest` over the complete normalized plan.

A plan is not mutation authority. A stale plan is never silently refreshed during apply.

### Apply

Apply requires the exact `planDigest`, rechecks every planned precondition immediately before mutation, performs only the listed effects, and verifies the result by read-back. Success returns an immutable receipt with:

- plan and operation identities;
- before and after digests;
- actual paths and entry kinds;
- bytes and entries affected;
- collision and rollback dispositions;
- atomicity and read-back status;
- network, model, token, cost, merge, publication, and deployment counts or explicit boundaries.

If any precondition drifts, apply returns `blocked` and performs no planned write. If a host cannot make a multi-entry batch atomic, it must either use a staging-and-swap strategy or reject the batch before mutation.

## Path and content safety

- Use normalized workspace-relative paths inside the workspace. Reject empty names, absolute workspace targets, traversal, control characters, alternate separators, URI-like path prefixes, `.git`, and platform-reserved names.
- Resolve every existing path component without following symbolic links. Reject symbolic links, shortcuts, aliases, mounts, devices, sockets, and other non-regular kinds unless a separately registered adapter owns that kind.
- External local paths are permitted only when the operator supplies the exact path to a local-only host capability. They are never catalog defaults or remotely callable secrets.
- Enforce declared maxima for path bytes, files, per-file bytes, total bytes, depth, runtime, and response bytes before allocation or mutation.
- Treat text as bytes for integrity. Encoding detection or normalization is a separate transformation operation and must produce a new digest.
- Reject likely credentials and sensitive files unless an explicit security policy and destination classification permit them.

## Collision, atomicity, and recovery

Default collision policy is `fail`. `replace` requires the expected existing digest; `version` requires a deterministic, operator-visible destination; `skip` must be explicit and recorded per item.

Write file content to a same-filesystem temporary sibling, flush as supported, compare the staged digest, then atomically rename. Read the published target and compare its digest before reporting success. Clean up only the caller-owned temporary artifact after exact identity proof.

Do not overwrite, stash, reset, delete, or adopt unrelated work. Preserve an interrupted transaction through its receipt and recovery handle. A retry with the same idempotency key and unchanged plan must replay the same result; a changed intent requires a new plan.

## Authority and policy

| Class | Examples | Required authority |
|---|---|---|
| Read-only | inspect, list bounded manifest, plan | Workspace read capability. |
| Reversible mutation | create, update, import, export, move, trash, restore | `@operator`, current workspace write capability, current plan digest. |
| Destructive mutation | purge, unversioned replace without recoverable prior bytes | Separate destructive policy and explicit operator confirmation. |
| External effect | provider push, publication, protected integration, deployment | The owning provider/release contract in addition to this lifecycle; never implied here. |

Credentials remain in the host or provider owner. Plans, receipts, logs, prompts, and paths exposed to models must not contain credential bytes.

## Invocation and discovery contract

One canonical invocation tuple represents this lifecycle:

`/workspace.artifact.manage #workspace-artifact-lifecycle @artifact-operation @workspace-entry @artifact-policy @runtime-proof`

Add `@operator` for every mutation. The canonical skill is `workspace.artifact.lifecycle`.

The local MCP adapter exposes exactly two tools:

| Tool | Role |
|---|---|
| `agentic-graph.workspace_artifact.plan` | Read-only normalization, inspection, policy, bounds, and deterministic plan digest. |
| `agentic-graph.workspace_artifact.apply` | Digest-fenced local mutation and read-back receipt. |

Tool names, aliases, skill names, and bindings resolve to the same operation vocabulary. Do not create operation-specific slash aliases or provider-specific semantic tags.

## MCP and skill result boundary

The v1 local runtime may implement a strict subset of the universal operation table. Unsupported operations return `blocked` with `capability_unavailable`; documentation must not relabel them as implemented. The initial runtime owns bounded file import plus the generic create, create-folder, update, export, and trash-file primitives needed to prove the common lifecycle. Recursive folder transfer, restore, and purge remain blocked until their independent policy and recovery proofs exist.

The runtime is local-only and deterministic. It performs zero network calls, zero model calls, zero input/output tokens, and zero cost. Its receipts do not prove browser projection, provider sync, protected integration, publication, Production, or deployment.

## Verification contract

Focused proof must cover:

- schema closure and exact tool registration;
- deterministic planning and replay;
- workspace containment and external-path classification;
- traversal, symbolic-link, non-regular entry, `.git`, reserved-name, and bounds rejection;
- absent-target creation, expected-digest update, import, export, folder creation, recoverable trash, collision refusal, and read-back;
- stale plan, source drift, target drift, partial-write, and cleanup ownership failures;
- local stdio MCP discovery and invocation;
- unchanged source bytes for import and zero network/model/token/cost.

## Requested import verification

The initial E2E import binds these exact local sources and repository targets:

| Source | Target | SHA-256 | Bytes |
|---|---|---:|---:|
| `$HOME/Downloads/media-gaming-development-guidelines.md` | `guidelines/media-gaming-development-guidelines.md` | `6f3b0ee6414c528d5cffedd15d234895e97df64839759b9272d851e85482f83c` | 43967 |
| `$HOME/Downloads/media-gaming-development-template.md` | `template/media-gaming-development-template.md` | `0a97ec93189285c6b9217127edf361168b777d96ff4e541ed8f0fbfa83ed74a9` | 15238 |

The import succeeds only when each source and target digest is equal and the target repository's focused documentation check passes. This receipt proves local Dev import only; protected integration and publication remain separate.

## Validation checklist

- [ ] Workspace root and capability are explicit.
- [ ] Operation, entry kind, paths, policy, and bounds are closed and normalized.
- [ ] Plan is read-only and content-addressed.
- [ ] Apply revalidates source, destination, authority, and plan digest.
- [ ] Mutation is atomic or rejected before writing.
- [ ] Read-back matches the receipt.
- [ ] Unrelated work and existing owners remain untouched.
- [ ] Unsupported capability is reported as blocked.
- [ ] Network, model, token, cost, merge, publication, and deployment boundaries are explicit.
- [ ] Focused tests and requested source/target digests pass.

