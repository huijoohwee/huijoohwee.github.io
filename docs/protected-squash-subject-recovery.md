---
title: "Protected Squash Subject Recovery"
doc_type: "Recovery Evidence"
status: "source-backed"
lang: "en-US"
frontmatter_contract: "required"
failed_protected_main_sha: "e0ca4e0e8f9b554e8b473567cf1376da1afbc21a"
failed_run_id: "31038219253"
controller_source: "huijoohwee/agentic-canvas-os"
controller_revision: "0e29bb571fa5e198318792549802dc858e226e8d"
deployment_authority: "forbidden"
---

# Protected Squash Subject Recovery

The protected `main` check failed because the squash merge subject for
`e0ca4e0e8f9b554e8b473567cf1376da1afbc21a` exceeded the repository's
72-character subject limit. The failed workflow run is
[`31038219253`](https://github.com/huijoohwee/huijoohwee.github.io/actions/runs/31038219253).

The source controller at `huijoohwee/agentic-canvas-os` revision
`0e29bb571fa5e198318792549802dc858e226e8d` now binds protected squash delivery
to the exact reviewed commit subject after validating that it is non-empty and
no longer than 72 characters.

This recovery records the corrected delivery contract. It does not bypass a
required check, weaken the subject policy, modify application code, or grant
deployment authority.
