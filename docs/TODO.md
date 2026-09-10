---
title: "Workspace Todo Route"
graphId: "md:agentic-canvas-os-todo-contract"
doc_type: "Migration Route"
date: "2026-09-10"
lang: "en-US"
frontmatter_contract: "required"
status: "retired"
load_policy: "on-demand"
source_owner: "huijoohwee/.todo"
source_contract: "https://github.com/huijoohwee/.todo/blob/main/docs/TODO.md"
---

# Workspace Todo Route

Shared planning moved to private [`huijoohwee/.todo`](https://github.com/huijoohwee/.todo/blob/main/docs/TODO.md).
Clone it as `$GITHUB_ROOT/.todo`; the TODO contract, current Kanban board and immutable
`todo/YYYY-MM/<context>.md` records are owned there. This page is a compatibility route.

All 33 imported files retain their source bytes, Git blobs and hashes in the
[website migration manifest](https://github.com/huijoohwee/.todo/blob/main/migration-from-website.json).
The source snapshot is website revision `363e72ada01b83291d1dc26c89e0ee8af8e70d77`.
The old Canvas manifest remains historical provenance inside the private repository.

Run `npm run planning:check` in `.todo` for actual shared-content validation.
This website retains shared authoring guidelines and reusable validators;
its `npm run planning:check` exercises synthetic records and migration routes.
Private repository access is required; no private content is copied into public CI or the site.
