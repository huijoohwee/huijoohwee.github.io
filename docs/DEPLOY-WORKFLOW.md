# Deploy workflow

This repository releases through `.github/workflows/pages.yml` from exact protected `main`. The
workflow seals one Pages artifact, downloads it by provider artifact ID, and verifies every route
in an ephemeral loopback Development server before Production can start. Production deploys the
same uploaded artifact and records its public readback receipt. Development is runner-local; it
creates no persistent preview URL, external service, or additional provider resource.

1. Confirm canonical `main` equals `origin/main`.
2. Bind the exact candidate SHA from `main`.
3. Dispatch the Pages workflow with:
   `gh workflow run pages.yml --ref main -f candidate_sha=<sha> -f authorization_statement="authorize github-pages-production <sha>"`
4. Confirm the exact-artifact Development readback succeeds before the Production job starts.
5. Watch Production readback to completion and record the run URL and final conclusion.

Promotion and rollback rules:
- Development and Production are one chain with separate receipts tied to the same source SHA,
  logical artifact, provider artifact ID, and payload digest.
- Production is gated on successful Development readback; a production-only shortcut is not a valid release.
- Re-run the same controller only with a different exact `main` SHA; do not redeploy a guessed or dirty candidate.
- Rollback is a new exact protected `main` revision plus a fresh deploy receipt, not a local Git reset.

Current Pages payload boundary:
- The controller seals `index.html` and `guidelines/`.
- A change outside that payload, such as `docs/documents/`, requires a source change to the deploy controller before it can appear on the published site.
