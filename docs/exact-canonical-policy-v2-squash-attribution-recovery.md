---
title: "Exact Canonical Policy v2 Squash Attribution Recovery"
doc_type: "Recovery Evidence"
status: "source-backed"
lang: "en-US"
frontmatter_contract: "required"
failed_protected_main_sha: "c7c42b07640941ca2ec740a49f6ac7186aa05c82"
failed_run_id: "33301417380"
reviewed_source_head: "7f27a1439359bf4fb6702a105310e34e44b9a2c8"
reviewed_source_tree: "a95a77fc5013242de75ef568421efa931d8ff0ed"
controller_source: "huijoohwee/agentic-canvas-os"
controller_revision: "208a946e3f3961bb69e3d890498006b9dadfa228"
deployment_authority: "forbidden"
---

# Exact Canonical Policy v2 Squash Attribution Recovery

Protected `main` revision `c7c42b07640941ca2ec740a49f6ac7186aa05c82`
integrated the reviewed PR 177 source head
`7f27a1439359bf4fb6702a105310e34e44b9a2c8`. The reviewed and protected
revisions have the same tree,
`a95a77fc5013242de75ef568421efa931d8ff0ed`.

The Guideline Contract workflow failed in
[`33301417380`](https://github.com/huijoohwee/huijoohwee.github.io/actions/runs/33301417380)
because the provider-generated squash message placed the exact
`Agentic-Task`, `Agentic-Scope`, `Agentic-Lease-Epoch`, and
`Agentic-Mechanism` block before its separator and `Co-authored-by`
trailer. The required block was therefore not the final trailer block,
although the reviewed source message satisfied the attribution contract.

This append-only recovery records the incident on a fresh admitted lane. Its
protected integration must produce one final attribution block and pass its
own exact-canonical source check. It preserves the failed revision and
reviewed bytes, does not rewrite protected history, does not weaken the
attribution checker, and grants no deployment authority.
