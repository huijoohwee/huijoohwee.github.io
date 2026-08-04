---
title: "GitHub Reference Guide for ML Projects"
author: "ML Engineering Team"
tags: [Git, GitHub, Version Control, Collaboration]
date: 2026-01-16
version: 1.0
---

# GitHub Reference Guide for ML Projects

**Organization**: By Phase → Priority → Command First-Appearance Order

**Purpose**: Comprehensive Git/GitHub command reference maintaining universality, neutrality, and project-agnostic applicability.

---

## Priority Legend

- 🔴 **CRITICAL** - Used 80-100% in real-world projects, master thoroughly
- 🟡 **HIGH** - Used 40-80% in real-world projects, know well
- 🟢 **MEDIUM** - Used 10-40% in real-world projects, understand basics
- ⚪ **LOW** - Used <10% in real-world projects, nice to know

---

## Phase 0: Initial Setup & Configuration

### Priority: 🔴 **CRITICAL**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| First-time Git setup on new machine | Git Config | `git config --global` | `user.name`, `user.email`, `--global` | None (sets config) | Configure user identity for commits | Every developer's first step; required for commit attribution | Q: Global vs local config?<br>A: Global for user, local for project-specific | ✅ DO: Set real name and work email<br>❌ DON'T: Use generic names | ```bash<br># Set identity<br>git config --global user.name "Jane Doe"<br>git config --global user.email "jane@company.com"<br><br># Verify<br>git config --global user.name<br>git config --global user.email<br><br># List all config<br>git config --global --list``` |
| Initialize Git in existing project | Git Init | `git init` | None | Initialized empty Git repository | Create .git directory to start version control | Start tracking code changes in new ML project | Q: When to init?<br>A: Before first commit, after project structure created | ✅ DO: Init at project root<br>❌ DON'T: Init inside another repo | ```bash<br># Initialize repository<br>cd /path/to/project<br>git init<br><br># Verify<br>ls -la  # Should see .git/<br>git status``` |
| Prevent files from being tracked | Git Ignore | `.gitignore` file | File patterns | Exclusion rules | Define what Git should ignore | Prevent data files, credentials, artifacts from version control | Q: When to create?<br>A: Before first commit | ✅ DO: Add data/, *.pkl, credentials<br>❌ DON'T: Track sensitive files | ```bash<br># Create .gitignore<br>cat > .gitignore << EOF<br># Data files<br>data/<br>*.csv<br>*.db<br><br># Models<br>models/<br>*.pkl<br>*.h5<br><br># Credentials<br>.env<br>*.pem<br>credentials.json<br><br># Python<br>__pycache__/<br>*.pyc<br>.ipynb_checkpoints/<br><br># OS<br>.DS_Store<br>Thumbs.db<br>EOF<br><br># Verify<br>cat .gitignore``` |

### Priority: 🟡 **HIGH**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Configure default branch name | Git Config | `git config --global init.defaultBranch` | `main` | None | Set default branch name for new repos | Industry standard moved from 'master' to 'main' | Q: Why 'main' instead of 'master'?<br>A: Inclusive language initiative | ✅ DO: Use 'main' for new repos<br>❌ DON'T: Mix naming conventions | ```bash<br># Set default to 'main'<br>git config --global init.defaultBranch main<br><br># Verify<br>git config --global init.defaultBranch``` |
| Setup credential caching | Git Config | `git config --global credential.helper` | `cache`, `store`, `osxkeychain` | None | Avoid re-entering credentials | Save time in development workflow | Q: Cache vs store?<br>A: Cache temporary (15min), store permanent | ✅ DO: Use cache for shared machines<br>❌ DON'T: Use store on public computers | ```bash<br># Cache for 1 hour (Linux/Mac)<br>git config --global credential.helper 'cache --timeout=3600'<br><br># Use OS keychain (Mac)<br>git config --global credential.helper osxkeychain<br><br># Store permanently (use with caution)<br>git config --global credential.helper store``` |
| Configure line ending handling | Git Config | `git config --global core.autocrlf` | `true`, `false`, `input` | None | Prevent line ending conflicts | Cross-platform collaboration (Windows/Mac/Linux) | Q: What setting for Mac/Linux?<br>A: input (convert CRLF→LF on commit) | ✅ DO: Set based on OS<br>❌ DON'T: Ignore on cross-platform teams | ```bash<br># Windows<br>git config --global core.autocrlf true<br><br># Mac/Linux<br>git config --global core.autocrlf input<br><br># Check setting<br>git config --global core.autocrlf``` |

---

## Phase 1: Repository Creation & Cloning

### Priority: 🔴 **CRITICAL**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Create repository on GitHub | GitHub Web UI | New Repository | `name`, `description`, `visibility`, `.gitignore`, `license` | Repository URL | Host code remotely with collaboration features | Start new ML project with team collaboration | Q: Public vs Private?<br>A: Private for proprietary, Public for open-source | ✅ DO: Add README, .gitignore, LICENSE<br>❌ DON'T: Make private repos public accidentally | ```bash<br># Steps:<br># 1. Go to github.com<br># 2. Click "New repository"<br># 3. Fill in:<br>#    - Name: ml-pipeline<br>#    - Description: ML pipeline for fraud detection<br>#    - Private<br>#    - Add .gitignore: Python<br>#    - Add license: MIT<br># 4. Click "Create repository"``` |
| Download existing repository | Git Clone | `git clone` | `<url>`, `<directory>` | Cloned repository | Copy remote repository to local machine | Join existing project, deploy code to server | Q: HTTPS vs SSH?<br>A: HTTPS easier, SSH more secure (requires setup) | ✅ DO: Clone to appropriate directory<br>❌ DON'T: Clone into another repo | ```bash<br># Clone with HTTPS<br>git clone https://github.com/user/repo.git<br><br># Clone with SSH<br>git clone git@github.com:user/repo.git<br><br># Clone to specific directory<br>git clone https://github.com/user/repo.git my-project<br><br># Clone specific branch<br>git clone -b develop https://github.com/user/repo.git<br><br># Verify<br>cd repo<br>git remote -v``` |
| Link local repo to GitHub | Git Remote | `git remote add origin` | `<url>` | None | Connect local repository to remote | Push local project to GitHub for first time | Q: What is 'origin'?<br>A: Conventional name for primary remote | ✅ DO: Verify URL before adding<br>❌ DON'T: Use wrong repository URL | ```bash<br># Add remote<br>git remote add origin https://github.com/user/repo.git<br><br># Verify<br>git remote -v<br># Output:<br># origin  https://github.com/user/repo.git (fetch)<br># origin  https://github.com/user/repo.git (push)<br><br># If wrong, remove and re-add<br>git remote remove origin<br>git remote add origin <correct-url>``` |

### Priority: 🟡 **HIGH**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Fork repository for contribution | GitHub Web UI | Fork button | None | Forked repository | Create personal copy of someone else's repo | Contribute to open-source ML libraries | Q: Fork vs Clone?<br>A: Fork creates GitHub copy, Clone downloads locally | ✅ DO: Fork before contributing to others' repos<br>❌ DON'T: Push directly to original repo | ```bash<br># Steps:<br># 1. Go to repository on GitHub<br># 2. Click "Fork" button (top-right)<br># 3. Select your account<br># 4. Clone YOUR fork:<br>git clone https://github.com/YOUR_USERNAME/repo.git<br><br># Add original as upstream<br>cd repo<br>git remote add upstream https://github.com/ORIGINAL_OWNER/repo.git<br><br># Verify remotes<br>git remote -v<br># origin: your fork<br># upstream: original repo``` |

---

## Phase 2: Basic Workflow (Add, Commit, Push)

### Priority: 🔴 **CRITICAL**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Check repository status | Git Status | `git status` | `-s` (short), `-b` (branch) | Status of working directory | See which files changed, staged, or untracked | Most frequently used Git command | Q: When to check status?<br>A: Before every commit, constantly | ✅ DO: Check before commit<br>❌ DON'T: Commit without reviewing | ```bash<br># Full status<br>git status<br><br># Short format<br>git status -s<br># Output:<br># M  src/model.py         # Modified, staged<br># ?? data/new_file.csv   # Untracked<br>#  M src/utils.py        # Modified, not staged<br><br># With branch info<br>git status -sb``` |
| Stage files for commit | Git Add | `git add` | `<file>`, `.`, `-A`, `-p` | None (stages files) | Mark changes to include in next commit | Select which changes to commit | Q: Add all vs specific files?<br>A: Specific files for focused commits | ✅ DO: Stage related changes together<br>❌ DON'T: Use `git add .` blindly | ```bash<br># Stage specific file<br>git add src/model.py<br><br># Stage all Python files<br>git add *.py<br><br># Stage entire directory<br>git add src/<br><br># Stage all changes (use carefully)<br>git add .<br>git add -A  # Also includes deletions<br><br># Interactive staging (review each change)<br>git add -p src/model.py<br><br># Verify what's staged<br>git status``` |
| Save changes to repository | Git Commit | `git commit` | `-m <message>`, `-a`, `--amend` | Commit hash | Create snapshot of staged changes | Record project history with meaningful messages | Q: What makes a good commit message?<br>A: Clear, concise, imperative mood | ✅ DO: Write descriptive messages<br>❌ DON'T: Use generic messages like "fix" | ```bash<br># Commit with message<br>git commit -m "Add feature: outlier detection using IQR method"<br><br># Commit with detailed message<br>git commit -m "Add outlier detection" -m "- Implement IQR method<br>- Add tests for edge cases<br>- Update documentation"<br><br># Commit all modified files (skip staging)<br>git commit -a -m "Update preprocessing pipeline"<br><br># Amend last commit (fix message or add files)<br>git add forgotten_file.py<br>git commit --amend --no-edit<br><br># Amend with new message<br>git commit --amend -m "Better message"``` |
| Upload commits to GitHub | Git Push | `git push` | `origin <branch>`, `-u`, `-f` | Upload confirmation | Send local commits to remote repository | Share code with team, trigger CI/CD | Q: When to push?<br>A: After logical set of commits, daily minimum | ✅ DO: Push frequently<br>❌ DON'T: Force push to shared branches | ```bash<br># Push to current branch<br>git push<br><br># Push and set upstream (first time)<br>git push -u origin main<br><br># Push to specific branch<br>git push origin feature-branch<br><br># Push all branches<br>git push --all<br><br># Push tags<br>git push --tags<br><br># Force push (DANGER: overwrites remote)<br>git push -f origin main  # Use only on your branches!``` |
| Download changes from GitHub | Git Pull | `git pull` | `origin <branch>`, `--rebase` | Merged changes | Fetch and merge remote changes | Sync with team's latest code | Q: Pull vs Fetch?<br>A: Pull = Fetch + Merge | ✅ DO: Pull before starting work<br>❌ DON'T: Pull into uncommitted changes | ```bash<br># Pull current branch<br>git pull<br><br># Pull specific branch<br>git pull origin main<br><br># Pull with rebase (cleaner history)<br>git pull --rebase<br><br># Before pulling, commit or stash changes<br>git stash<br>git pull<br>git stash pop<br><br># Verify you're up to date<br>git status``` |

### Priority: 🟡 **HIGH**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| View commit history | Git Log | `git log` | `--oneline`, `--graph`, `--all`, `-n <num>` | Commit history | Review project history | Understand what changed and when | Q: How to find specific commits?<br>A: Use --grep or --author flags | ✅ DO: Review history before merging<br>❌ DON'T: Ignore commit messages | ```bash<br># Basic log<br>git log<br><br># Compact one-line format<br>git log --oneline<br><br># Graphical branch view<br>git log --oneline --graph --all<br><br># Last 5 commits<br>git log -n 5<br><br># Search commits<br>git log --grep="bug fix"<br>git log --author="Jane"<br><br># Show changes in each commit<br>git log -p<br><br># Pretty format<br>git log --pretty=format:"%h - %an, %ar : %s"``` |
| View changes before staging | Git Diff | `git diff` | `--staged`, `<file>`, `<commit1> <commit2>` | Differences | Compare changes between versions | Review before committing | Q: Diff vs Diff --staged?<br>A: Diff shows unstaged, --staged shows staged | ✅ DO: Review diffs before commit<br>❌ DON'T: Commit without reviewing | ```bash<br># See unstaged changes<br>git diff<br><br># See staged changes<br>git diff --staged<br><br># Diff specific file<br>git diff src/model.py<br><br># Diff between commits<br>git diff abc123 def456<br><br># Diff between branches<br>git diff main feature-branch<br><br># Word-level diff (better for text)<br>git diff --word-diff``` |
| Temporarily save changes | Git Stash | `git stash` | `push`, `pop`, `list`, `apply` | Stashed changes | Save work without committing | Switch branches without losing work | Q: When to stash?<br>A: Before pulling, switching branches | ✅ DO: Name stashes for clarity<br>❌ DON'T: Forget about stashes | ```bash<br># Stash current changes<br>git stash<br><br># Stash with message<br>git stash push -m "WIP: feature development"<br><br># List stashes<br>git stash list<br># Output:<br># stash@{0}: WIP: feature development<br># stash@{1}: On main: experiment<br><br># Apply most recent stash and remove<br>git stash pop<br><br># Apply stash but keep it<br>git stash apply stash@{0}<br><br># Delete stash<br>git stash drop stash@{0}<br><br># Clear all stashes<br>git stash clear``` |

---

## Phase 3: Branching & Merging

### Priority: 🔴 **CRITICAL**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Create new branch | Git Branch | `git branch` / `git checkout -b` | `<branch-name>`, `-d`, `-a` | Branch name | Create isolated development line | Feature development, bug fixes, experiments | Q: When to branch?<br>A: Every new feature or bug fix | ✅ DO: Use descriptive branch names<br>❌ DON'T: Work directly on main | ```bash<br># Create branch<br>git branch feature/outlier-detection<br><br># Create and switch to branch<br>git checkout -b feature/outlier-detection<br># Or (newer syntax)<br>git switch -c feature/outlier-detection<br><br># List all branches<br>git branch -a<br># Output:<br>#   main<br># * feature/outlier-detection<br>#   remotes/origin/main<br><br># Delete branch<br>git branch -d feature/old-feature<br><br># Force delete unmerged branch<br>git branch -D feature/abandoned``` |
| Switch between branches | Git Checkout/Switch | `git checkout` / `git switch` | `<branch-name>`, `-b` | None | Move to different branch | Navigate between features | Q: Checkout vs Switch?<br>A: Switch is newer, clearer for branches | ✅ DO: Commit or stash before switching<br>❌ DON'T: Switch with uncommitted changes | ```bash<br># Switch to existing branch<br>git checkout main<br># Or (newer)<br>git switch main<br><br># Create and switch in one command<br>git checkout -b feature/new-model<br>git switch -c feature/new-model<br><br># Switch to previous branch<br>git checkout -<br>git switch -<br><br># Verify current branch<br>git branch<br># * indicates current branch``` |
| Merge branches | Git Merge | `git merge` | `<branch-name>`, `--no-ff`, `--squash` | Merge commit | Combine branch changes into current branch | Integrate completed features into main | Q: Fast-forward vs merge commit?<br>A: Fast-forward moves pointer, merge creates commit | ✅ DO: Merge feature branches into main<br>❌ DON'T: Merge main into feature branches | ```bash<br># Switch to target branch<br>git checkout main<br><br># Merge feature branch<br>git merge feature/outlier-detection<br><br># Merge with commit (no fast-forward)<br>git merge --no-ff feature/outlier-detection<br><br># Squash merge (combine all commits)<br>git merge --squash feature/outlier-detection<br>git commit -m "Add outlier detection feature"<br><br># Abort merge if conflicts<br>git merge --abort``` |

### Priority: 🟡 **HIGH**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Resolve merge conflicts | Git Conflict Resolution | Manual editing + `git add` | None | Resolved files | Fix conflicting changes from different branches | Happens when same files modified in parallel | Q: How to avoid conflicts?<br>A: Pull frequently, small commits, communicate | ✅ DO: Test after resolving<br>❌ DON'T: Accept all changes blindly | ```bash<br># After merge conflict occurs:<br>git status<br># Shows conflicted files<br><br># Open conflicted file, look for:<br># <<<<<<< HEAD<br># Your changes<br># =======<br># Their changes<br># >>>>>>> feature-branch<br><br># Edit file to resolve<br># Remove conflict markers<br># Keep desired changes<br><br># Stage resolved file<br>git add src/model.py<br><br># Continue merge<br>git commit<br><br># Or abort if needed<br>git merge --abort``` |
| Rebase branch | Git Rebase | `git rebase` | `<branch>`, `-i`, `--continue`, `--abort` | Rebased commits | Move branch to new base commit | Clean linear history, update feature branch | Q: Rebase vs Merge?<br>A: Rebase rewrites history, merge preserves it | ✅ DO: Rebase personal branches<br>❌ DON'T: Rebase public/shared branches | ```bash<br># Update feature branch with latest main<br>git checkout feature/new-model<br>git rebase main<br><br># Interactive rebase (squash, reword commits)<br>git rebase -i HEAD~3<br># Choose: pick, squash, reword, drop<br><br># If conflicts during rebase:<br># 1. Resolve conflicts<br># 2. git add <files><br># 3. git rebase --continue<br><br># Abort rebase<br>git rebase --abort``` |

### Priority: 🟢 **MEDIUM**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Cherry-pick commits | Git Cherry-Pick | `git cherry-pick` | `<commit-hash>` | Applied commit | Apply specific commit to current branch | Backport bug fix to release branch | Q: When to cherry-pick?<br>A: Selective commits, hotfixes | ✅ DO: Cherry-pick bug fixes<br>❌ DON'T: Cherry-pick large features | ```bash<br># Get commit hash<br>git log --oneline<br><br># Apply specific commit<br>git cherry-pick abc1234<br><br># Cherry-pick multiple commits<br>git cherry-pick abc1234 def5678<br><br># Cherry-pick without committing<br>git cherry-pick -n abc1234``` |

---

## Phase 4: Collaboration (Pull Requests & Reviews)

### Priority: 🔴 **CRITICAL**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Create pull request | GitHub Web UI | Pull Request | `base`, `compare`, `title`, `description` | PR number | Request to merge your changes | Code review process before merging | Q: When to create PR?<br>A: When feature is ready for review | ✅ DO: Write clear description<br>❌ DON'T: Create huge PRs | ```bash<br># Steps:<br># 1. Push feature branch<br>git push -u origin feature/outlier-detection<br><br># 2. Go to GitHub repository<br># 3. Click "Pull requests" → "New pull request"<br># 4. Select:<br>#    - base: main<br>#    - compare: feature/outlier-detection<br># 5. Fill in:<br>#    Title: "Add outlier detection using IQR"<br>#    Description:<br>#      ## Changes<br>#      - Implement IQR method<br>#      - Add unit tests<br>#      - Update documentation<br>#      <br>#      ## Testing<br>#      - Tested on synthetic data<br>#      - All tests pass<br>#      <br>#      Closes #42<br># 6. Click "Create pull request"``` |
| Review pull request | GitHub Web UI | PR Review | Comments, Approve/Request Changes | Review status | Provide feedback on code changes | Quality assurance, knowledge sharing | Q: What to look for?<br>A: Logic, tests, style, documentation | ✅ DO: Be constructive<br>❌ DON'T: Approve without reading | ```bash<br># Steps:<br># 1. Go to Pull Requests tab<br># 2. Select PR to review<br># 3. Click "Files changed"<br># 4. Add line comments:<br>#    - Click line number<br>#    - Type comment<br>#    - "Add single comment" or "Start review"<br># 5. Submit review:<br>#    - Comment: General feedback<br>#    - Approve: Ready to merge<br>#    - Request changes: Needs fixes<br><br># To test PR locally:<br>git fetch origin pull/123/head:pr-123<br>git checkout pr-123<br># Test changes<br>python -m pytest``` |
| Merge pull request | GitHub Web UI | Merge PR | Merge strategy (merge/squash/rebase) | Merged commit | Integrate PR into target branch | Complete feature integration | Q: Which merge strategy?<br>A: Squash for clean history, merge to preserve | ✅ DO: Delete branch after merge<br>❌ DON'T: Merge failing CI | ```bash<br># Steps:<br># 1. Ensure CI passes (green checkmark)<br># 2. Ensure reviews approved<br># 3. Click "Merge pull request"<br># 4. Choose strategy:<br>#    - Merge commit: Preserves all commits<br>#    - Squash and merge: Combines into one<br>#    - Rebase and merge: Linear history<br># 5. Click "Confirm merge"<br># 6. Click "Delete branch"<br><br># Update local repository<br>git checkout main<br>git pull<br>git branch -d feature/outlier-detection``` |

### Priority: 🟡 **HIGH**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Request PR review | GitHub Web UI | Reviewers | `@username` | Review request notification | Assign reviewers to PR | Get expert feedback on changes | Q: How many reviewers?<br>A: 1-2 for small PRs, 2-3 for critical | ✅ DO: Request relevant domain experts<br>❌ DON'T: Spam entire team | ```bash<br># In PR:<br># 1. Click "Reviewers" (right sidebar)<br># 2. Select team members<br># 3. Or mention in comment:<br>#    @jane-ml-expert could you review the model changes?<br>#    @bob-infra could you check the pipeline?``` |
| Add labels to PR/Issue | GitHub Web UI | Labels | Pre-defined or custom labels | Labeled PR/Issue | Categorize and filter items | Project organization, workflow management | Q: What labels to use?<br>A: bug, feature, documentation, priority | ✅ DO: Use consistent labels<br>❌ DON'T: Over-label | ```bash<br># Common labels:<br>bug           # Something isn't working<br>feature       # New feature request<br>enhancement   # Improvement to existing<br>documentation # Documentation updates<br>high-priority # Urgent<br>help-wanted   # Need assistance<br>good-first-issue  # For new contributors``` |

---

## Phase 5: GitHub Features & Automation

### Priority: 🔴 **CRITICAL**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Automate testing on push | GitHub Actions | `.github/workflows/*.yml` | `on:`, `jobs:`, `steps:` | CI/CD pipeline | Run tests/linting automatically | Catch bugs before merge | Q: When to use Actions?<br>A: Testing, deployment, notifications | ✅ DO: Test on multiple Python versions<br>❌ DON'T: Run expensive operations on every commit | ```yaml<br># .github/workflows/test.yml<br>name: Tests<br><br>on:<br>  push:<br>    branches: [ main, develop ]<br>  pull_request:<br>    branches: [ main ]<br><br>jobs:<br>  test:<br>    runs-on: ubuntu-latest<br>    strategy:<br>      matrix:<br>        python-version: [3.8, 3.9, 3.10]<br>    <br>    steps:<br>    - uses: actions/checkout@v3<br>    <br>    - name: Set up Python<br>      uses: actions/setup-python@v4<br>      with:<br>        python-version: ${{ matrix.python-version }}<br>    <br>    - name: Install dependencies<br>      run: |<br>        pip install -r requirements.txt<br>        pip install pytest pytest-cov<br>    <br>    - name: Run tests<br>      run: |<br>        pytest tests/ --cov=src<br>    <br>    - name: Lint<br>      run: |<br>        pip install flake8<br>        flake8 src/ --max-line-length=100``` |
| Track issues and bugs | GitHub Issues | New Issue | `title`, `description`, `labels`, `assignees` | Issue number | Track bugs, features, tasks | Project management, bug tracking | Q: When to create issue?<br>A: Bugs, feature requests, tasks | ✅ DO: Provide reproduction steps<br>❌ DON'T: Create duplicate issues | ```bash<br># Create issue via Web UI:<br># 1. Go to "Issues" tab<br># 2. Click "New issue"<br># 3. Fill template:<br><br>### Bug Report<br>**Description**: Model fails on null values<br><br>**Reproduction**:<br>```python<br>df = pd.DataFrame({'a': [1, None, 3]})<br>model.predict(df)  # Throws error<br>```<br><br>**Expected**: Handle nulls gracefully<br>**Actual**: ValueError<br><br>**Environment**:<br>- Python 3.9<br>- pandas 2.0.3<br><br># 4. Add labels: bug, high-priority<br># 5. Assign to team member<br># 6. Click "Submit new issue"``` |

### Priority: 🟡 **HIGH**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Protect main branch | GitHub Settings | Branch Protection | Required reviews, status checks | Protected branch | Prevent force push, require reviews | Maintain code quality on main | Q: What rules to enable?<br>A: Require reviews, passing CI | ✅ DO: Protect main and release branches<br>❌ DON'T: Allow direct pushes to main | ```bash<br># Steps:<br># 1. Go to Settings → Branches<br># 2. Click "Add rule"<br># 3. Branch name pattern: main<br># 4. Enable:<br>#    ✓ Require pull request before merging<br>#    ✓ Require approvals: 1<br>#    ✓ Require status checks to pass<br>#    ✓ Require branches to be up to date<br>#    ✓ Include administrators<br># 5. Save changes<br><br># Now direct push to main will fail:<br>git push origin main<br># Error: protected branch``` |
| Create project boards | GitHub Projects | Project Board | Columns, Cards | Kanban board | Visual task management | Sprint planning, workflow tracking | Q: When to use projects?<br>A: Team collaboration, larger projects | ✅ DO: Link issues to cards<br>❌ DON'T: Forget to update status | ```bash<br># Steps:<br># 1. Go to "Projects" tab<br># 2. Click "New project"<br># 3. Choose template: "Basic kanban"<br># 4. Columns:<br>#    - To Do<br>#    - In Progress<br>#    - In Review<br>#    - Done<br># 5. Add cards from issues<br># 6. Drag cards between columns``` |
| Use GitHub Releases | GitHub Releases | New Release | Tag, Title, Description, Assets | Release version | Mark stable versions | Version management, deployments | Q: When to create release?<br>A: Stable milestones, production deploys | ✅ DO: Use semantic versioning<br>❌ DON'T: Release untested code | ```bash<br># Create tag locally<br>git tag -a v1.0.0 -m "Release version 1.0.0"<br>git push origin v1.0.0<br><br># Or create via GitHub UI:<br># 1. Go to "Releases"<br># 2. Click "Create a new release"<br># 3. Tag: v1.0.0<br># 4. Title: "ML Pipeline v1.0.0"<br># 5. Description:<br>#    ## Features<br>#    - Outlier detection<br>#    - Model serving API<br>#    <br>#    ## Bug Fixes<br>#    - Fixed null handling<br># 6. Upload artifacts (model.pkl)<br># 7. Click "Publish release"``` |

---

## Phase 6: Advanced Operations

### Priority: 🟢 **MEDIUM**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Reset to previous state | Git Reset | `git reset` | `--soft`, `--mixed`, `--hard`, `<commit>` | Reset HEAD | Undo commits or changes | Fix mistakes, rewrite history | Q: Soft vs Hard?<br>A: Soft keeps changes staged, Hard discards all | ✅ DO: Use soft for recent commits<br>❌ DON'T: Hard reset shared branches | ```bash<br># Undo last commit, keep changes staged<br>git reset --soft HEAD~1<br><br># Undo last commit, unstage changes<br>git reset --mixed HEAD~1<br># Or simply:<br>git reset HEAD~1<br><br># DANGER: Discard all changes<br>git reset --hard HEAD~1<br><br># Reset to specific commit<br>git reset --hard abc1234<br><br># Reset single file<br>git reset HEAD src/model.py``` |
| Rewrite commit history | Git Rebase Interactive | `git rebase -i` | `HEAD~n` | Rewritten history | Squash, reword, reorder commits | Clean up before PR | Q: When to rebase?<br>A: Before creating PR, on personal branches | ✅ DO: Clean up personal branches<br>❌ DON'T: Rebase public history | ```bash<br># Rebase last 3 commits<br>git rebase -i HEAD~3<br><br># Editor opens with:<br># pick abc1234 Add feature A<br># pick def5678 Fix typo<br># pick ghi9012 Add tests<br><br># Change to:<br># pick abc1234 Add feature A<br># squash def5678 Fix typo<br># squash ghi9012 Add tests<br><br># Save and close<br># New editor opens for combined message<br># Save and close<br><br># Force push (your branch only)<br>git push -f origin feature-branch``` |
| Find who changed a line | Git Blame | `git blame` | `<file>`, `-L <start>,<end>` | Line-by-line history | See who last modified each line | Debug, understand changes | Q: Is blame for blaming people?<br>A: No, for understanding context | ✅ DO: Use to understand changes<br>❌ DON'T: Use to blame teammates | ```bash<br># Blame entire file<br>git blame src/model.py<br><br># Blame specific lines<br>git blame -L 10,20 src/model.py<br><br># Output:<br># abc1234 (Jane Doe 2024-01-10) def train_model():<br># def5678 (Bob Smith 2024-01-15)     model = RF()<br><br># Show more context<br>git blame -w -C src/model.py<br># -w: Ignore whitespace<br># -C: Detect moves/copies``` |
| Search through history | Git Log Search | `git log` with grep | `--grep=`, `-S`, `--author=` | Matching commits | Find commits by message or content | Track when bug introduced | Q: How to find file changes?<br>A: Use git log -- <file> | ✅ DO: Use for debugging<br>❌ DON'T: Search without context | ```bash<br># Search commit messages<br>git log --grep="bug fix"<br><br># Search code changes (pickaxe)<br>git log -S "outlier_detection"<br><br># Search by author<br>git log --author="Jane"<br><br># Search in file<br>git log -- src/model.py<br><br># Combine searches<br>git log --grep="bug" --author="Jane" --since="2024-01-01"``` |

### Priority: ⚪ **LOW**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Tag important commits | Git Tag | `git tag` | `-a`, `-m`, `-d` | Tag name | Mark specific points in history | Version releases, milestones | Q: Lightweight vs annotated?<br>A: Annotated for releases (includes metadata) | ✅ DO: Tag releases<br>❌ DON'T: Tag every commit | ```bash<br># Create annotated tag<br>git tag -a v1.0.0 -m "Release 1.0.0"<br><br># Create lightweight tag<br>git tag v1.0.0-beta<br><br># List tags<br>git tag<br><br># Push tag<br>git push origin v1.0.0<br><br># Push all tags<br>git push --tags<br><br># Delete tag<br>git tag -d v1.0.0<br>git push origin :refs/tags/v1.0.0``` |

---

## Phase 7: Troubleshooting & Recovery

### Priority: 🔴 **CRITICAL**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Undo uncommitted changes | Git Restore/Checkout | `git restore` / `git checkout` | `<file>`, `--staged` | Restored files | Discard local modifications | Undo mistakes before commit | Q: Restore vs Reset?<br>A: Restore for files, Reset for commits | ✅ DO: Double-check before restoring<br>❌ DON'T: Restore without backup | ```bash<br># Discard changes in file<br>git restore src/model.py<br># Or (older syntax)<br>git checkout -- src/model.py<br><br># Unstage file (keep changes)<br>git restore --staged src/model.py<br><br># Discard all unstaged changes<br>git restore .<br><br># Restore file from specific commit<br>git restore --source=abc1234 src/model.py``` |
| Recover deleted files | Git Restore | `git restore` | `<file>` | Restored file | Bring back deleted files | Recover accidentally deleted code | Q: How far back can I recover?<br>A: Any committed version | ✅ DO: Check git log first<br>❌ DON'T: Panic if deleted | ```bash<br># Restore deleted file<br>git restore src/deleted_file.py<br><br># If already committed deletion:<br>git log -- src/deleted_file.py  # Find commit<br>git restore --source=abc1234 src/deleted_file.py``` |
| Fix "detached HEAD" | Git Checkout | `git checkout` | `<branch>` | Attached HEAD | Return to normal branch state | Fix accidental checkout of commit | Q: What is detached HEAD?<br>A: HEAD pointing to commit, not branch | ✅ DO: Create branch if have changes<br>❌ DON'T: Leave work in detached state | ```bash<br># If in detached HEAD:<br># Option 1: Go back to branch<br>git checkout main<br><br># Option 2: Create branch to save work<br>git checkout -b recovered-work<br><br># Verify you're on a branch<br>git branch``` |

### Priority: 🟡 **HIGH**

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
|-------------|---------------|------------------|---------------------|----------------|-------------|----------------------------------|-----|----------|---------------------|
| Recover lost commits | Git Reflog | `git reflog` | None | Reference log | See all HEAD movements | Recover from hard reset | Q: How long is reflog kept?<br>A: 90 days by default | ✅ DO: Use immediately after mistake<br>❌ DON'T: Wait too long | ```bash<br># View reflog<br>git reflog<br># Output:<br># abc1234 HEAD@{0}: reset: moving to HEAD~1<br># def5678 HEAD@{1}: commit: Add feature<br><br># Recover lost commit<br>git reset --hard HEAD@{1}<br># Or<br>git reset --hard def5678``` |
| Clean untracked files | Git Clean | `git clean` | `-n`, `-f`, `-d`, `-x` | Removed files | Delete untracked files | Remove build artifacts | Q: -n vs -f?<br>A: -n dry run (preview), -f force delete | ✅ DO: Use -n first (dry run)<br>❌ DON'T: Use without reviewing | ```bash<br># Preview what will be deleted<br>git clean -n<br><br># Delete untracked files<br>git clean -f<br><br># Delete untracked files and directories<br>git clean -fd<br><br># Delete including .gitignore files<br>git clean -fdx``` |

---

## Best Practices & Workflows

### Commit Message Conventions

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting (no code change)
refactor: # Code restructure
test:     # Add tests
chore:    # Maintenance

# Examples:
git commit -m "feat(model): add outlier detection using IQR"
git commit -m "fix(preprocessing): handle null values in scaler"
git commit -m "docs(README): add installation instructions"
git commit -m "test(model): add unit tests for predict function"
```

### Branching Strategy (Git Flow)

```bash
# Main branches:
main         # Production-ready code
develop      # Integration branch

# Supporting branches:
feature/*    # New features (branch from develop)
bugfix/*     # Bug fixes (branch from develop)
hotfix/*     # Urgent fixes (branch from main)
release/*    # Release preparation

# Example workflow:
# 1. Start feature
git checkout develop
git pull
git checkout -b feature/outlier-detection

# 2. Work and commit
git add .
git commit -m "feat: add IQR outlier detection"
git push -u origin feature/outlier-detection

# 3. Create PR to develop
# 4. After review, merge to develop
# 5. Delete feature branch
```

### Daily Workflow

```bash
# Morning: Sync with team
git checkout main
git pull origin main
git checkout develop
git pull origin develop

# Start work
git checkout -b feature/new-work
# ... make changes ...
git add .
git commit -m "feat: implement feature"

# Update with latest develop
git checkout develop
git pull
git checkout feature/new-work
git rebase develop

# Push work
git push -u origin feature/new-work

# End of day: Create PR if ready
```

### Before Creating PR Checklist

```bash
# 1. Update from main
git checkout main
git pull
git checkout your-branch
git rebase main

# 2. Run tests
pytest tests/

# 3. Lint code
flake8 src/
black src/

# 4. Clean commits
git rebase -i HEAD~5  # Squash WIP commits

# 5. Push
git push -f origin your-branch  # -f only on your branch!

# 6. Create PR with:
# - Clear title
# - Description of changes
# - Link to issue
# - Screenshots if UI changes
```

---

## Common Pitfalls & Solutions

| Problem | Cause | Solution | Prevention |
|---------|-------|----------|------------|
| **Merge conflicts** | Same files edited in parallel | Manually resolve, git add, git commit | Pull frequently, small commits |
| **Committed secrets** | .env file tracked | 1. Remove from history<br>2. Rotate secrets<br>3. Add to .gitignore | Add .gitignore early |
| **Large files in repo** | Tracked data/model files | Use git-lfs or remove from history | .gitignore data/ models/ |
| **Detached HEAD** | Checked out commit instead of branch | git checkout main | Always work on branches |
| **Force pushed to main** | Accidentally overwrote history | Recover from reflog | Enable branch protection |
| **Lost commits** | Hard reset or rebase mistake | Use git reflog | Commit frequently |
| **Can't push** | Diverged from remote | git pull --rebase, then push | Pull before push |
| **Huge PR** | Too many changes at once | Split into smaller PRs | Commit frequently, smaller features |

---

## Useful Aliases

```bash
# Add to ~/.gitconfig or run git config --global commands

[alias]
    st = status -s
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = log --oneline --graph --all --decorate
    amend = commit --amend --no-edit
    undo = reset HEAD~1
    sync = !git fetch && git rebase origin/main
```

---

**End of GitHub Reference Guide**

---

## Prompt_202601161330

https://claude.ai/chat/ab3efab1-64fd-4dd1-aafa-3d2e12e292d9

### Prompt-01

```
generate `github-reference-guide.md`;

## Phase 
### Priority

| When to Use | Tool/Category | Command/Endpoint | Key Flags/Parameters | Returns/Output | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Usage Snippet |
```

### Response-01

```
Perfect! I've created a comprehensive **GitHub Reference Guide for ML Projects** with the following structure:

## **📋 Coverage by Phase:**

### **Phase 0: Initial Setup & Configuration**
- 🔴 `git config --global` - User identity
- 🔴 `git init` - Initialize repository
- 🔴 `.gitignore` - Prevent file tracking
- 🟡 Credential caching, line endings

### **Phase 1: Repository Creation & Cloning**
- 🔴 GitHub repo creation
- 🔴 `git clone` - Download repositories
- 🔴 `git remote add` - Link to GitHub
- 🟡 Forking repositories

### **Phase 2: Basic Workflow**
- 🔴 `git status` - Check changes
- 🔴 `git add` - Stage files
- 🔴 `git commit` - Save changes
- 🔴 `git push` - Upload to GitHub
- 🔴 `git pull` - Download updates
- 🟡 `git log`, `git diff`, `git stash`

### **Phase 3: Branching & Merging**
- 🔴 `git branch` / `git checkout -b` - Create branches
- 🔴 `git checkout` / `git switch` - Switch branches
- 🔴 `git merge` - Combine branches
- 🟡 Conflict resolution, `git rebase`
- 🟢 `git cherry-pick`

### **Phase 4: Collaboration**
- 🔴 Pull request creation
- 🔴 Code reviews
- 🔴 PR merging strategies
- 🟡 Reviewer requests, labels

### **Phase 5: GitHub Features**
- 🔴 GitHub Actions (CI/CD)
- 🔴 Issues tracking
- 🟡 Branch protection, Projects, Releases

### **Phase 6: Advanced Operations**
- 🟢 `git reset` (soft/mixed/hard)
- 🟢 Interactive rebase
- 🟢 `git blame`, `git log` search
- ⚪ `git tag`

### **Phase 7: Troubleshooting**
- 🔴 `git restore` - Undo changes
- 🔴 File recovery
- 🔴 Detached HEAD fix
- 🟡 `git reflog`, `git clean`

## **✨ Bonus Sections:**

✅ **Commit Message Conventions** (feat/fix/docs/test)
✅ **Branching Strategy** (Git Flow with feature/bugfix/hotfix)
✅ **Daily Workflow** (morning sync → work → PR)
✅ **PR Checklist** (update, test, lint, clean commits)
✅ **Common Pitfalls** (conflicts, secrets, large files)
✅ **Useful Aliases** (st, co, visual, etc.)

Each entry includes:
- **When to Use** context
- **Key Flags/Parameters**
- **Returns/Output**
- **Real-world Applications**
- **FAQs**
- **Do/Don't** best practices
- **Example Usage** with bash snippets

The guide is production-ready and follows the same comprehensive structure as the Python Reference Guide! 🚀

```
