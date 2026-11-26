# Release workflow

This repository's lean source-release path is one closed chain from lane completion to deploy handoff:

`START -> focused local checks -> final in-scope integration journey -> land PR -> required CI -> merge PR -> fast-forward canonical main -> finish -> deploy`

1. Start from [`START-WORKFLOW.md`](./START-WORKFLOW.md).
2. Run the smallest checks that cover the changed surface. For an in-scope mobile/responsive/offline
   journey, schedule the complete pass on the stable candidate through its existing owner. If required
   CI covers the same inputs on the exact PR candidate, wait for that run instead of duplicating the
   journey locally; otherwise run the owner's local/browser journey once before landing. Relevant
   later changes reopen affected checks, and required protected CI must still pass for the exact PR
   candidate.
3. `npm run land -- --message="<message>"`
4. Wait for the required protected check: `adlc-policy-contract`.
5. Merge the PR by squash.
6. From canonical `main`, fetch and fast-forward to `origin/main`.
7. Run `npx agentic-os finish --ref=<lane>` to record exact integration.
8. Run `npx agentic-os completion status --ref=<lane>` or `npm run reap -- --ref=<lane>` for read-only closeout status.
9. Continue with [`DEPLOY-WORKFLOW.md`](./DEPLOY-WORKFLOW.md) only after canonical `main` is current and clean.

Notes:
- Protected integration is the source release boundary.
- This consumer now aligns with current `agentic-os` cleanup policy by opting worktree projection and registration into quarantine rather than default retain.
- `completion status` and `reap` are diagnostics. They do not authorize cleanup, deployment, or rollback.
