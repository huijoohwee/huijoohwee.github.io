# Deploy workflow

This repository deploys through `.github/workflows/pages.yml` from exact protected `main`. There is
no separate Dev surface today, so this deploy workflow is Prod-only until the repo adds another
target with its own exact receipt.

1. Confirm canonical `main` equals `origin/main`.
2. Bind the exact candidate SHA from `main`.
3. Dispatch the Pages workflow with:
   `gh workflow run pages.yml --ref main -f candidate_sha=<sha> -f authorization_statement="authorize github-pages-production <sha>"`
4. Watch the exact run to completion.
5. Record the run URL and final conclusion as the deployment receipt.

Promotion and rollback rules:
- The workflow authorizes and deploys one exact `main` revision to GitHub Pages production.
- If the repository later adds a Dev surface, Dev and Prod remain one deploy chain with separate receipts rather than a second release workflow.
- Re-run the same controller only with a different exact `main` SHA; do not redeploy a guessed or dirty candidate.
- Rollback is a new exact protected `main` revision plus a fresh deploy receipt, not a local Git reset.

Current Pages payload boundary:
- The controller seals `index.html` and `guidelines/`.
- A change outside that payload, such as `docs/documents/`, requires a source change to the deploy controller before it can appear on the published site.
