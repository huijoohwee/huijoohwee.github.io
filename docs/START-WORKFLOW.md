# Start workflow

Open work from a clean canonical `main`, then move immediately into one scoped lane. For this
repository, from-0-to-1 starts at one lane, not at canonical authoring.

1. `npm run doctor`
2. `npm run lane -- <scope> --write=<path[,path...]>`
3. Work only in the printed lane worktree.
4. Run the focused checks for the changed surface.
5. Continue with [`RELEASE-WORKFLOW.md`](./RELEASE-WORKFLOW.md).

This repository keeps canonical `main` as the sync surface. Normal authoring starts in a lane, not
on `main`, even for one-document changes.
