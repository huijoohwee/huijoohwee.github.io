# Release workflow

This repository's lean source-release path is one closed chain from lane completion to deploy handoff:

`START -> focused local check -> land PR -> required CI -> merge PR -> fast-forward canonical main -> finish -> deploy`

1. Start from [`START-WORKFLOW.md`](./START-WORKFLOW.md).
2. Run the smallest local checks that cover the changed surface.
3. `npm run land -- --message="<message>"`
4. Wait for the required protected check: `adlc-policy-contract`.
5. Merge the PR by squash.
6. From canonical `main`, fetch and fast-forward to `origin/main`.
7. Run `npx agentic-os finish --ref=<lane>` to record exact integration.
8. Run `npx agentic-os completion status --ref=<lane>` or `npm run reap -- --ref=<lane>` for read-only closeout status.
9. Continue with [`DEPLOY-WORKFLOW.md`](./DEPLOY-WORKFLOW.md) only after canonical `main` is current and clean.

Notes:
- Protected integration is the source release boundary.
- Leanification's prune step applies only when the committed cleanup profile selects prune; this consumer currently retains lane worktrees instead.
- `completion status` and `reap` are diagnostics. They do not authorize cleanup, deployment, or rollback.
