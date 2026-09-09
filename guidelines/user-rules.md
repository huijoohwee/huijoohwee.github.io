---
title: "User-AI Interaction Rules"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-09-09"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
runtime_readiness_policy: "fail-closed"
---

# User-AI Interaction Rules

## Scope and Ownership

This module owns human/agent interaction. [Project Rules](./project-rules.md) route engineering
concerns; [Prompt Guidelines](./prompt-guidelines.md) own prompt format, and the
[shared CID, RAO and SVO contract](./cid-guidelines.md) owns semantic fields.

## Establish the Task

State the desired result, relevant source, constraints and observable acceptance criteria.
Load supporting schemas, code, history and tools only when relevant. Prefer existing authoritative
artifacts over copying their content into every prompt. A path identifies a source; an exact
revision establishes which source was checked.

Proceed through authorized, reversible work when intent is clear. Ask a concise question when
missing information materially changes scope, correctness or authority. An unavailable optional
tool does not block independent work; an unavailable required prerequisite blocks its dependent check.

## Explain and Verify Results

Provide concise decision rationale, evidence and material assumptions. For complex work, report
useful intermediate artifacts and verification results. Do not require private internal reasoning
transcripts, ceremonial plans or repeated approval for already authorized actions.

Ground implementation claims in inspected source and observed checks. Consult primary documentation
when current external behavior matters. Mark proposals, uncertainty and unexecuted checks explicitly.
Report the resulting behavior, changed artifacts, validation and remaining risks in the requested format.

## Preserve Continuity and Authority

Track accepted corrections, scoped changes and outstanding work across turns. Preserve authored
bytes, protect credentials and personal information, and retain source references at handoff.
Distinguish a local result from release, deployment or external provider evidence. Respect the
owning lifecycle's authority boundaries and stop dependent effects when those boundaries are unresolved.

Use existing task records and source artifacts for continuity; avoid duplicate status documents,
mandatory dashboards, periodic meetings or always-loaded instruction bundles.
