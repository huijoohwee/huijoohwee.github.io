---
title: "Documentation maintenance template"
doc_type: "Template"
version: "1.0.0"
date: "2026-09-24"
lang: "en-US"
frontmatter_contract: "required"
owner: "Shared documentation authoring"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
---

# Documentation maintenance

When adopting this template, set the local document's identity, owner and
profile in its own YAML frontmatter. Add one `source_docs` entry pointing to
this template at an exact reviewed Git commit. Keep local notes outside the
managed region below. Enrollment and publication use the repository's owner.

<!-- agentic-os:doc-sync:start -->
## Shared maintenance contract

- Check authored YAML with the repository's strict parser and semantic profile.
- Compare template revisions from exact source commits and preserve local edits.
- Review conflicts and the full proposed diff before accepting an update.
- Require the repository's document checks for the exact source candidate.
- Record source, check and publication receipts separately from runtime proof.
<!-- agentic-os:doc-sync:end -->

## Local notes

Record repository-specific decisions here. Template updates preserve this area.
