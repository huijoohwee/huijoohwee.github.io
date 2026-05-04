# Prompt Template

---

`npm run dev`

```
# UPDATE Dev to Prod -> PUSH to `airvio.co/knowgrph`
- (FIX) Prod looks different from Dev

## CONTEXT: Dev (`/Users/huijoohwee/Documents/GitHub/knowgrph`) -> Prod (`/Users/huijoohwee/Documents/GitHub/huijoohwee/knowgrph` ) -> Cloudflare (`airvio.co/knowgrph`)

## EXPLORER -> Source Files -> "Initialization-file": (ENHANCE, switching of files)
- `/Users/huijoohwee/Documents/GitHub/knowgrph/README.md` (Canvas View: Toolbar -> 2D Renderer (D3) AND Document Modes (Frontmatter Mode));   
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo.md` (Canvas View: Toolbar -> 2D Renderer (Flow Editor) AND Document Modes (Frontmatter Mode))

## AVOID, CLEANUP, FORBID churn, conflict, duplicate, freeze, infinite loop, hardcode, legacy, re-calculation, re-computation, re-rendering, stale; REUSE shared semantic-key helper, NEUTRALIZE from root/source/upstream (FORBID bug/issue exist at first place; layer local/downstream patches/stacking aliases; NO NEED backward compatibility by remapping legacy; REMOVE 100% legacy/stale/conflicting codes/hardcode fixtures/tests); REDUCE the hot-path cost without changing behavior, USE semantic signatures (NOT raw array identities), cache node/edge lookups per graph revision; only when widget mode is actually active -> BUILD the large widget bundle
```

---


Toolbar -> Workspace View (Editor Workspace, Multi-dimensional Table), EXPLORER, Source Files, TOC, Split (JSON, Markdown, Viewer), MainPanel Integrations, MainPanel Maps, MainPanel Graph Fields, FloatingPanel Props Panel, Geo, Interaction, Renderer-related legacy/stale/conflicting/test  `/Users/huijoohwee/Documents/GitHub/knowgrph`  codes 

2D Renderer (D3, Flowchart, Flow Canvas, Design, Flow Editor) AND Document Modes (Document Structure Mode, Keyword Mode, Frontmatter Mode, Multi-dimensional Table Mode), FloatingPanel Props Panel, Nodes, Widgets, Rich Media Panels, Edges, Groups/Clusters

---

# ENHANCE E2E Ingestion -> Parsing -> Rendering Pipeline of Widgets (Text, Image, Video), Rich Media Panels, Edges
- CONSOLIDATE other rich media-/iframe-variants into Widget-with-floating-toolbar variant into Rich Media Panels (KEEP only Widget-with-floating-toolbar variant), after consolidate, REMOVE other non-Widget-with-floating-toolbar variant)-related

## Canvas (2D Renderer (Flow Editor)) AND (Document Modes (Frontmatter Mode)) AND MainPanel Integrations, MainPanel Maps, MainPanel Graph Fields, FloatingPanel Props Panel
- test-validation   `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo.md` ;

## AVOID, CLEANUP, FORBID churn, conflict, duplicate, freeze, infinite loop, hardcode, legacy, re-calculation, re-computation, re-rendering, stale; REUSE shared semantic-key helper, NEUTRALIZE from root/source/upstream (FORBID bug/issue exist at first place; layer local/downstream patches/stacking aliases; NO NEED backward compatibility by remapping legacy; REMOVE 100% legacy/stale/conflicting codes/hardcode fixtures/tests); REDUCE the hot-path cost without changing behavior, USE semantic signatures (NOT raw array identities), cache node/edge lookups per graph revision; only when widget mode is actually active -> BUILD the large widget bundle

---

```
EXTRACT repeated sequence into one helper that bundles filesystems persistence plus the shared writeback commit, while leaving the per-view content generation local
```

---

```
# Dev ( `/Users/katrina/Documents/GitHub/singabldr` ) -> Prod ( `/Users/katrina/Documents/GitHub/huijoohwee/singabldr` ) -> Cloudflare (`airvio.co/singabldr`) 

## refer to, FORBID copy, in-repo FIX, ENHANCE, FINETUNE  map voxel vibe

## CODE HYGIENE 
 - Lean MVP, SSOT, MECE, single-responsibility; <600 lines/file, <500kB chunks 
 - Meaningful names (no abbrev except i/j/k); comment why, not what 
 - No deep nesting, duplication, circular deps, hardcodes, silent failures 
 
 ## ARCHITECTURE 
 - Centralize config/constants; reuse shared utilities 
 - Appropriate data structures, abstraction, early returns 
 - Parallelise where possible; defer computation; release resources promptly 
 
 ## PIPELINE 
 - Optimize: batch, cache, chunk, virtualize, shard, lazy-load 
 - Ensure thread safety; prevent race conditions 
 
 ## CONFLICTS & STALE CODE 
 - Neutralize from root/upstream; forbid downstream patches/alias remapping 
 - Remove 100% legacy/stale/conflicting code; no backward-compat shims 
 
 ## VALIDATION 
 - Test focused diffs only; no indefinite full-codebase runs 
 - Resolve issues; verify no regressions 
 
 ## AVOID, CLEANUP, FORBID churn, conflict, duplicate, freeze, infinite loop, hardcode, legacy, re-calculation, re-computation, re-rendering, stale; REUSE shared semantic-key helper, NEUTRALIZE from root/source/upstream (FORBID bug/issue exist at first place; layer local/downstream patches/stacking aliases; NO NEED backward compatibility by remapping legacy; REMOVE 100% legacy/stale/conflicting codes/hardcode fixtures/tests); REDUCE the hot-path cost without changing behavior, USE semantic signatures (NOT raw array identities), cache node/edge lookups per graph revision; only when widget mode is actually active -> BUILD the large widget bundle
 ```