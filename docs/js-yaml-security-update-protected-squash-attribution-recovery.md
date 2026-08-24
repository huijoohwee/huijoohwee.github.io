---
title: "js-yaml Security Update Protected Squash Attribution Recovery"
doc_type: "Recovery Evidence"
status: "source-backed"
lang: "en-US"
frontmatter_contract: "required"
failed_protected_main_sha: "593330e33533724db0ffc005a942c4207ded88e6"
failed_run_id: "32609357632"
controller_source: "huijoohwee/agentic-canvas-os"
controller_revision: "21526a2f2ee718498ca44c08a8e1eefb7e94a0fb"
deployment_authority: "forbidden"
---

# js-yaml Security Update Protected Squash Attribution Recovery

Protected `main` revision `593330e33533724db0ffc005a942c4207ded88e6`
upgraded `js-yaml` to `4.3.1`, and the repository audit subsequently reported
zero vulnerabilities. Its Guideline Contract workflow failed because the
provider-generated squash body repeated the attribution trailers from both
authored commits. The failed workflow run is
[`32609357632`](https://github.com/huijoohwee/huijoohwee.github.io/actions/runs/32609357632).

The protected integration controller at `huijoohwee/agentic-canvas-os`
revision `21526a2f2ee718498ca44c08a8e1eefb7e94a0fb` now supplies an explicit
provider squash body derived from the reviewed lease. That body contains one
and only one `Agentic-Task`, `Agentic-Scope`, `Agentic-Lease-Epoch`, and
`Agentic-Mechanism` trailer block.

This recovery records the corrected delivery contract on a fresh attributed
canonical revision. It does not bypass a required check, weaken attribution
policy, change dependency bytes, or independently grant deployment authority.
