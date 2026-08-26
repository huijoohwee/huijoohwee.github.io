---
title: "Protected Release Guidelines Squash Attribution Recovery"
doc_type: "Recovery Evidence"
status: "source-backed"
lang: "en-US"
frontmatter_contract: "required"
failed_protected_main_sha: "0815dbad0cc09aad5d36ad36940538d090af0f5e"
failed_run_id: "32913623634"
reviewed_source_head: "d54f8244d8c86f3adf032ab73e29c3b43c137ba2"
reviewed_source_tree: "b7743406576c6127b6617bc1318ff0b80e410b39"
controller_source: "huijoohwee/agentic-canvas-os"
controller_revision: "f9663ab045ee0331c2ec5548012e8959f67bd804"
deployment_authority: "forbidden"
---

# Protected Release Guidelines Squash Attribution Recovery

Protected `main` revision `0815dbad0cc09aad5d36ad36940538d090af0f5e`
integrated the reviewed protected-release hardening from source head
`d54f8244d8c86f3adf032ab73e29c3b43c137ba2`. The source and protected
revisions have the same tree, `b7743406576c6127b6617bc1318ff0b80e410b39`.

The Guideline Contract workflow failed in
[`32913623634`](https://github.com/huijoohwee/huijoohwee.github.io/actions/runs/32913623634)
because the provider-generated squash message placed the canonical
`Agentic-Task`, `Agentic-Scope`, `Agentic-Lease-Epoch`, and
`Agentic-Mechanism` block before its separator and `Co-authored-by` trailer.
The attribution block was therefore not the final trailer block even though
the reviewed source commit retained those four trailers exactly once.

This append-only recovery records the incident on a fresh admitted lane. Its
review-ready protected integration supplies one explicit squash body so the
new canonical head has a single final attribution block. It preserves the
failed revision and reviewed bytes, does not rewrite protected history, does
not weaken the attribution checker, and grants no deployment authority.
