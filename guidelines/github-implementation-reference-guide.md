# GitHub CID Reference Guide for ML Projects

- **Meta-Framework**: CID (Context—Intent—Directive) + SRP (Single Responsibility) + RAO (Role—Action—Outcome) + SVO (Subject—Verb—Object)

- **Purpose**: Comprehensive Git/GitHub command reference using structured guidelines for version control and collaboration

- **Organization**: Phase-organized with CID structure, priority levels, and neutral applicability

---

## Overview: CID Framework for Version Control

### Context
**Version Control & Collaboration Systems**: Manage code evolution, coordinate team development, maintain project history, enable parallel workstreams, and ensure reproducible deployments across distributed teams.

### Intent
**Systematic Code Management**: Establish reliable workflows preventing data loss, enable code review processes, maintain clean project history, support concurrent development, and facilitate knowledge transfer through structured version control practices.

### Directives (Core Principles)

- **Configuration Management**
  - [ ] Configure identity; enable attribution; forbid anonymous commits
  - [ ] Externalize credentials; protect secrets; forbid embedded passwords
  - [ ] Define ignore patterns; prevent tracking; forbid committing data files

- **Repository Management**
  - [ ] Initialize repositories; enable tracking; forbid working without version control
  - [ ] Clone systematically; preserve remotes; forbid manual downloads
  - [ ] Link remotes; establish origins; forbid disconnected repositories

- **Commit Practices**
  - [ ] Write clear messages; document changes; forbid generic commit messages
  - [ ] Stage selectively; group related changes; forbid blind `add .`
  - [ ] Commit atomically; isolate concerns; forbid mixed-purpose commits

- **Branching Strategy**
  - [ ] Branch per feature; isolate development; forbid working on main directly
  - [ ] Name descriptively; indicate purpose; forbid ambiguous branch names
  - [ ] Merge systematically; preserve history; forbid force-pushing shared branches    

- **Collaboration Workflow**
  - [ ] Review via pull requests; ensure quality; forbid unreviewed merges
  - [ ] Test before merging; validate changes; forbid merging failing CI pipelines
  - [ ] Document decisions; preserve rationale; forbid undocumented changes

---

## Role—Action—Outcome Chains

### Role: Developer
- **Actions**:
  - Configures Git identity and environment settings
  - Creates feature branches for isolated development
  - Commits changes with descriptive messages
  - Opens pull requests for code review
  - Resolves merge conflicts when they arise

- **Outcomes**:
  - Properly attributed commits with clear history
  - Isolated feature development without main branch contamination
  - Understandable project history for future reference
  - Reviewed and validated code changes
  - Clean merges with resolved conflicts

### Role: Code Reviewer
- **Actions**:
  - Reviews pull request code changes
  - Provides constructive feedback on implementations
  - Approves changes meeting quality standards
  - Requests modifications when issues found
  - Verifies tests pass before approval

- **Outcomes**:
  - High-quality code merged to main branches
  - Knowledge sharing across team members
  - Identified bugs before production deployment
  - Consistent code style and patterns
  - Documented review decisions

### Role: Team Lead
- **Actions**:
  - Establishes branching strategy and workflows
  - Configures branch protection rules
  - Defines commit message conventions
  - Creates project boards for task tracking
  - Manages releases and version tagging

- **Outcomes**:
  - Standardized team workflows
  - Protected main branches from accidental changes
  - Consistent commit history format
  - Visible project progress and priorities
  - Versioned releases with changelogs

### Role: DevOps Engineer
- **Actions**:
  - Implements CI/CD pipelines with GitHub Actions
  - Configures automated testing on pull requests
  - Sets up deployment workflows from releases
  - Monitors build and test failures
  - Maintains repository automation scripts

- **Outcomes**:
  - Automated testing preventing regression
  - Continuous integration catching bugs early
  - Streamlined deployment processes
  - Immediate feedback on code changes
  - Reliable build and deploy pipelines

### Role: Project Manager
- **Actions**:
  - Creates issues for bugs and feature requests
  - Organizes work using GitHub Projects
  - Assigns issues to team members
  - Tracks milestone progress
  - Manages release planning and schedules

- **Outcomes**:
  - Organized backlog of work items
  - Clear task assignments and ownership
  - Visible project progress tracking
  - Coordinated release timelines
  - Documented project requirements

---

## Priority Legend

- 🔴 **CRITICAL** - Used 80-100% in real-world projects, master thoroughly
- 🟡 **HIGH** - Used 40-80% in real-world projects, know well
- 🟢 **MEDIUM** - Used 10-40% in real-world projects, understand basics
- ⚪ **LOW** - Used <10% in real-world projects, nice to know

---

## Phase 0: Initial Setup & Configuration

### Context
**Environment Configuration**: Establish Git identity, repository settings, and development environment before beginning version control operations.

### Intent
**Reproducible Attribution**: Ensure all commits properly attributed, credentials securely managed, and environment consistently configured across machines.

### Mantras
```
- [ ] Identity; configure globally; forbid anonymous commits
- [ ] Ignores; define patterns; forbid tracking sensitive files
- [ ] Credentials; cache securely; forbid plaintext passwords
- [ ] Line endings; normalize format; forbid cross-platform conflicts
```

### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden | Priority |
|---------|------|--------|-----------|------------------------|----------|
| Developer | Configures | User identity | Set global name and email; enable commit attribution | Anonymous or generic commits | 🔴 |
| Developer | Initializes | Git repository | Create .git directory; enable version tracking | Working without version control | 🔴 |
| Developer | Defines | Ignore patterns | Specify files to exclude; prevent sensitive data commits | Tracking credentials or data files | 🔴 |
| Developer | Caches | Credentials | Store authentication securely; avoid repeated entry | Storing passwords in plaintext | 🟡 |
| Developer | Normalizes | Line endings | Configure autocrlf; prevent cross-platform issues | Ignoring OS differences | 🟡 |

### Critical Commands (🔴 Priority)

#### Configure Git Identity

- **Context**: First-time Git setup on new machine
- **Intent**: Enable commit attribution with real identity
- **Directive**: Developer sets user identity globally; forbid generic names

```bash
# Set identity (REQUIRED)
git config --global user.name "Jane Doe"
git config --global user.email "jane@company.com"

# Verify configuration
git config --global user.name
git config --global user.email

# List all global config
git config --global --list
```

- **Do**:
  - ✅ Use real name and work email
  - ✅ Set global config for personal machine
  - ✅ Set local config for specific projects if needed

**Don't**:
- ❌ Use generic names like "user" or "developer"
- ❌ Leave unconfigured (commits will fail)
- ❌ Use personal email for work projects

- **FAQ**:
  - Q: Global vs local config?
  - A: Global for user-wide settings, local (`--local`) for project-specific overrides

---

#### Initialize Repository

- **Context**: Start version control in existing project
- **Intent**: Enable Git tracking from project root
- **Directive**: Developer initializes repository; forbid nested .git directories

```bash
# Initialize repository
cd /path/to/project
git init

# Verify initialization
ls -la  # Should see .git/ directory
git status

# Set default branch name
git branch -M main
```

- **Do**:
  - ✅ Initialize at project root
  - ✅ Run after creating project structure
  - ✅ Verify .git directory created

- **Don't**:
  - ❌ Initialize inside another Git repository
  - ❌ Initialize before deciding project structure
  - ❌ Delete .git directory accidentally

- **FAQ**:
  - Q: Why initialize at project root?
  - A: Enables version control from any subdirectory; simplifies project setup

---

#### Create .gitignore File

- **Context**: Prevent sensitive/large files from being tracked
- **Intent**: Exclude data, credentials, artifacts from version control
- **Directive**: Developer defines ignore patterns; forbid tracking data files

```bash
# Create .gitignore before first commit
cat > .gitignore << 'EOF'
# Data files
data/
*.csv
*.xlsx
*.db
*.sqlite

# Model artifacts
models/
*.pkl
*.h5
*.joblib
*.ckpt

# Credentials
.env
*.pem
credentials.json
config/secrets.yaml

# Python
__pycache__/
*.pyc
*.pyo
.ipynb_checkpoints/
.pytest_cache/
*.egg-info/

# Virtual environments
venv/
env/
.venv/

# OS files
.DS_Store
Thumbs.db
*.swp

# IDE
.vscode/
.idea/
*.sublime-*
EOF

# Verify
cat .gitignore

# If files already tracked, untrack them:
git rm --cached data/*.csv
git commit -m "chore: untrack data files"
```

- **Do**:
  - ✅ Create before first commit
  - ✅ Include data/, models/, credentials
  - ✅ Add Python-specific patterns
  - ✅ Include OS and IDE files

- **Don't**:
  - ❌ Track sensitive credentials
  - ❌ Commit large data files
  - ❌ Track compiled artifacts
  - ❌ Ignore .gitignore file itself

---

### High Priority Commands (🟡)

#### Configure Default Branch Name

```bash
# Set default to 'main' (modern standard)
git config --global init.defaultBranch main

# Verify
git config --global init.defaultBranch
```

- **Mantra**: `[] Branch naming; use 'main'; forbid 'master' for new repos`

---

#### Setup Credential Caching

```bash
# Cache for 1 hour (Linux/Mac)
git config --global credential.helper 'cache --timeout=3600'

# Use OS keychain (Mac)
git config --global credential.helper osxkeychain

# Windows credential manager
git config --global credential.helper wincred

# Store permanently (use with caution on personal machines only)
git config --global credential.helper store
```

- **Mantra**: `[] Credentials; cache securely; forbid repeated manual entry`

---

## Phase 1: Repository Creation & Cloning

### Context
- **Repository Initialization**: Create new repositories or clone existing ones to establish local development environment.

### Intent
- **Connected Development**: Link local work to remote GitHub repositories enabling collaboration and backup.

### Mantras
```
- [ ] Creation; initialize remotely; forbid local-only development
- [ ] Cloning; preserve structure; forbid manual downloads
- [ ] Remotes; link origins; forbid disconnected work
- [ ] Forking; create copies; forbid direct pushes to upstreams
```

### Critical Commands (🔴 Priority)

#### Create Repository on GitHub
- **Context**: Start new ML project with remote hosting
- **Intent**: Enable team collaboration from project inception
- **Directive**: Developer creates repository; forbid missing README or .gitignore

```bash
# Steps (GitHub Web UI):
# 1. Go to github.com → Click "New repository"
# 2. Fill in details:
#    Name: ml-fraud-detection
#    Description: ML pipeline for fraud detection using XGBoost
#    Visibility: Private (for proprietary) or Public (for open-source)
#    ✅ Add README.md
#    ✅ Add .gitignore: Python
#    ✅ Add license: MIT (or appropriate)
# 3. Click "Create repository"
# 4. Copy repository URL

# Then clone to local machine:
git clone https://github.com/username/ml-fraud-detection.git
cd ml-fraud-detection
```

- **Do**:
  - ✅ Add README from start
  - ✅ Choose appropriate .gitignore template
  - ✅ Select license for open-source
  - ✅ Make private for proprietary work

- **Don't**:
  - ❌ Make private repos public accidentally
  - ❌ Skip .gitignore (will track unwanted files)
  - ❌ Use unclear repository names

---

#### Clone Existing Repository

- **Context**: Join existing project or deploy code to server
- **Intent**: Download complete repository with history
- **Directive**: Developer clones repository; forbid manual zip downloads

```bash
# Clone with HTTPS (easier, works everywhere)
git clone https://github.com/user/repo.git

# Clone with SSH (more secure, requires setup)
git clone git@github.com:user/repo.git

# Clone to specific directory
git clone https://github.com/user/repo.git my-project-name

# Clone specific branch
git clone -b develop https://github.com/user/repo.git

# Shallow clone (recent history only, faster)
git clone --depth 1 https://github.com/user/repo.git

# Verify
cd repo
git remote -v
git status
```

- **Do**:
  - ✅ Clone to appropriate directory
  - ✅ Verify remote after cloning
  - ✅ Use HTTPS for simplicity, SSH for security

- **Don't**:
  - ❌ Download as ZIP (loses Git history)
  - ❌ Clone into another repository
  - ❌ Clone without checking repository authenticity

- **FAQ**:
  - Q: HTTPS vs SSH?
  - A: HTTPS easier (username/password or token), SSH more secure (requires key setup)

---

#### Link Local Repository to GitHub

- **Context**: Push existing local project to GitHub for first time
- **Intent**: Connect local work to remote for collaboration
- **Directive**: Developer adds remote origin; forbid incorrect URLs

```bash
# Add remote (after creating empty repo on GitHub)
git remote add origin https://github.com/username/repo.git

# Verify remote
git remote -v
# Output:
# origin  https://github.com/username/repo.git (fetch)
# origin  https://github.com/username/repo.git (push)

# Push initial commit
git branch -M main  # Rename to main if needed
git push -u origin main

# If wrong URL, remove and re-add
git remote remove origin
git remote add origin <correct-url>
```

- **Do**:
  - ✅ Verify URL before adding
  - ✅ Use `-u` flag on first push to set upstream
  - ✅ Check remote with `git remote -v`

- **Don't**:
  - ❌ Add wrong repository URL
  - ❌ Have uncommitted changes during first push
  - ❌ Push to someone else's repository

---

### High Priority Commands (🟡)

#### Fork Repository for Contribution

- **Context**: Contribute to open-source ML libraries
- **Intent**: Create personal copy for independent development
- **Directive**: Developer forks repository; forbid direct pushes to original

```bash
# Steps:
# 1. Go to repository on GitHub
# 2. Click "Fork" button (top-right)
# 3. Select your account/organization
# 4. Wait for fork to complete

# Clone YOUR fork
git clone https://github.com/YOUR_USERNAME/repo.git
cd repo

# Add original repository as upstream
git remote add upstream https://github.com/ORIGINAL_OWNER/repo.git

# Verify remotes
git remote -v
# origin: your fork (you can push)
# upstream: original repo (read-only)

# Keep fork updated
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

- **Mantra**: `[] Forking; create copy; forbid pushing to upstream directly`

---

## Phase 2: Basic Workflow (Add, Commit, Push)

### Context
- **Daily Development Operations**: Stage changes, create commits, synchronize with remote repository.

### Intent
- **Incremental Progress Tracking**: Record work systematically, share updates frequently, maintain clean history.

### Mantras
```
- [ ] Status; check constantly; forbid blind commits
- [ ] Staging; select carefully; forbid indiscriminate `add .`
- [ ] Commits; write clearly; forbid generic messages
- [ ] Pushing; share frequently; forbid force-pushing shared branches
- [ ] Pulling; sync regularly; forbid working with stale code
```

### Critical Commands (🔴 Priority)

#### Check Repository Status

- **Context**: Before every commit and constantly during development
- **Intent**: Understand current state of working directory
- **Directive**: Developer checks status; forbid committing without reviewing

```bash
# Full status
git status

# Short format (compact)
git status -s
# Output:
# M  src/model.py         # Modified, staged
# ?? data/new_file.csv    # Untracked
#  M src/utils.py         # Modified, not staged
# D  old_file.py          # Deleted, staged

# With branch info
git status -sb
# Output:
## main...origin/main [ahead 2]
# M  src/model.py

# Legend:
# M = Modified
# A = Added (new file)
# D = Deleted
# R = Renamed
# ?? = Untracked
```

- **Do**:
  - ✅ Check before every commit
  - ✅ Run constantly during development
  - ✅ Use short format for quick checks

- **Don't**:
  - ❌ Commit without reviewing status
  - ❌ Ignore untracked files
  - ❌ Leave status unchecked for long periods

- **Mantra**: `[] Status checks; verify constantly; forbid blind commits`

---

#### Stage Files for Commit

- **Context**: Select which changes to include in next commit
- **Intent**: Group related changes together
- **Directive**: Developer stages selectively; forbid using `add .` blindly

```bash
# Stage specific file
git add src/model.py

# Stage multiple specific files
git add src/model.py src/utils.py

# Stage all Python files
git add *.py

# Stage entire directory
git add src/

# Stage all changes (USE CAREFULLY)
git add .                # Current directory and subdirectories
git add -A              # All changes including deletions
git add --all           # Same as -A

# Interactive staging (review each change)
git add -p src/model.py
# For each chunk:
# y = stage this chunk
# n = don't stage
# s = split into smaller chunks
# q = quit

# Stage only tracked files
git add -u

# Verify what's staged
git status
git diff --staged
```

- **Do**:
  - ✅ Stage related changes together
  - ✅ Use specific file paths for focused commits
  - ✅ Review with `git diff --staged`
  - ✅ Use `-p` for partial staging

- **Don't**:
  - ❌ Blindly use `git add .`
  - ❌ Stage unrelated changes together
  - ❌ Stage without reviewing changes
  - ❌ Stage credentials or data files

- **Mantra**: `[] Staging; select carefully; forbid mixing unrelated changes`

---

#### Commit Changes

- **Context**: Create snapshot of staged changes
- **Intent**: Record progress with meaningful documentation
- **Directive**: Developer writes descriptive messages; forbid generic messages like "fix"

```bash
# Commit with message
git commit -m "feat: add IQR-based outlier detection"

# Multi-line commit message
git commit -m "feat: add outlier detection module" -m "
- Implement IQR method for numeric features
- Add configurable threshold parameter
- Include unit tests for edge cases
- Update documentation with usage examples
"

# Commit all modified tracked files (skip staging)
git commit -a -m "refactor: improve preprocessing pipeline"
# Equivalent to: git add -u && git commit -m

# Amend last commit (add forgotten files)
git add forgotten_file.py
git commit --amend --no-edit

# Amend with new message
git commit --amend -m "Better commit message"

# Commit only specific files
git commit src/model.py -m "fix: handle null values in prediction"

# Empty commit (for triggering CI)
git commit --allow-empty -m "chore: trigger CI rebuild"
```

- **Do**:
  - ✅ Write clear, descriptive messages
  - ✅ Use conventional commit format
  - ✅ Explain why, not just what
  - ✅ Keep commits focused and atomic

- **Don't**:
  - ❌ Use generic messages: "fix", "update", "changes"
  - ❌ Commit unrelated changes together
  - ❌ Amend commits already pushed to shared branches
  - ❌ Commit broken/untested code

> **Commit Message Format**:
```
<type>(<scope>): <subject>

<body>

<footer>

Types: feat, fix, docs, style, refactor, test, chore
Scope: component being modified
Subject: imperative mood, lowercase, no period
```

**Examples**:
```bash
git commit -m "feat(model): add XGBoost classifier with hyperparameter tuning"
git commit -m "fix(preprocessing): handle missing values in categorical encoding"
git commit -m "docs(README): add installation and usage instructions"
git commit -m "test(model): add unit tests for predict method"
git commit -m "refactor(utils): extract data loading into separate module"
```

---

#### Push Commits to Remote

- **Context**: Upload local commits to GitHub
- **Intent**: Share work with team and backup code
- **Directive**: Developer pushes frequently; forbid force-pushing shared branches

```bash
# Push to current branch (after upstream set)
git push

# Push and set upstream (first time)
git push -u origin main
git push --set-upstream origin feature-branch

# Push to specific branch
git push origin feature-branch

# Push all branches
git push --all

# Push tags
git push --tags
git push origin v1.0.0

# Force push (DANGER - use only on personal branches)
git push -f origin my-feature-branch
git push --force-with-lease origin my-feature-branch  # Safer

# Dry run (see what would be pushed)
git push --dry-run

# Verify what will be pushed
git log origin/main..main  # Commits ahead of remote
```

- **Do**:
  - ✅ Push frequently (at least daily)
  - ✅ Use `-u` on first push to set upstream
  - ✅ Push after logical set of commits
  - ✅ Verify CI passes after push

- **Don't**:
  - ❌ Force push to main or shared branches
  - ❌ Push secrets or credentials
  - ❌ Push broken code
  - ❌ Leave local commits unpushed for days

- **Mantra**: `[] Pushing; share frequently; forbid force-pushing shared branches`

---

#### Pull Changes from Remote

- **Context**: Download and merge remote changes
- **Intent**: Stay synchronized with team's latest code
- **Directive**: Developer pulls before starting work; forbid pulling into uncommitted changes

```bash
# Pull current branch
git pull

# Pull specific branch
git pull origin main

# Pull with rebase (cleaner history)
git pull --rebase
git pull --rebase origin main

# Pull all branches
git fetch --all
git pull --all

# Safe pull workflow
git stash                    # Save uncommitted changes
git pull                     # Get latest changes
git stash pop                # Restore your changes

# Or commit first
git commit -a -m "WIP: current work"
git pull
# Continue working

# Verify up to date
git status
# Output: "Your branch is up to date with 'origin/main'"

# See what would be pulled
git fetch origin
git log HEAD..origin/main
```

- **Do**:
  - ✅ Pull before starting work each day
  - ✅ Commit or stash before pulling
  - ✅ Pull frequently during the day
  - ✅ Use `--rebase` for cleaner history

- **Don't**:
  - ❌ Pull into dirty working directory
  - ❌ Work for days without pulling
  - ❌ Ignore pull conflicts
  - ❌ Force pull (overwrites local changes)

- **FAQ**:
  - Q: Pull vs Fetch?
  - A: Pull = Fetch (download) + Merge (integrate). Fetch is safer for reviewing before merging.

---

### High Priority Commands (🟡)

#### View Commit History

```bash
# Basic log
git log

# Compact one-line format
git log --oneline

# Graphical branch view
git log --oneline --graph --all --decorate

# Last N commits
git log -n 5
git log -5

# Search commits
git log --grep="bug fix"
git log --author="Jane Doe"
git log --since="2024-01-01"
git log --until="2024-12-31"

# Show file changes
git log -p                    # Patches (diffs)
git log --stat               # Statistics
git log -- src/model.py      # Specific file

# Pretty format
git log --pretty=format:"%h - %an, %ar : %s"
# %h = short hash
# %an = author name
# %ar = author date (relative)
# %s = subject
```

- **Mantra**: `[] History viewing; review regularly; forbid ignoring commit messages`

---

#### View Changes Before Committing

```bash
# Unstaged changes
git diff

# Staged changes
git diff --staged
git diff --cached  # Same as --staged

# Specific file
git diff src/model.py

# Between commits
git diff abc123 def456
git diff HEAD~2 HEAD

# Between branches
git diff main feature-branch

# Word-level diff (better for text)
git diff --word-diff

# Summary only
git diff --stat

# Ignore whitespace
git diff -w
```

- **Mantra**: `[] Diffs; review before commit; forbid committing blind`

---

#### Temporarily Save Changes

```bash
# Stash current changes
git stash
git stash push  # Explicit form

# Stash with message
git stash push -m "WIP: implementing feature X"

# List stashes
git stash list
# Output:
# stash@{0}: WIP: implementing feature X
# stash@{1}: On main: experiment with approach Y

# Apply and remove most recent stash
git stash pop

# Apply but keep stash
git stash apply
git stash apply stash@{1}  # Specific stash

# Show stash contents
git stash show
git stash show -p stash@{0}  # With diff

# Delete stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Stash including untracked files
git stash -u
git stash --include-untracked
```

- **Mantra**: `[] Stashing; save temporarily; forbid losing uncommitted work`

---

## Phase 3: Branching & Merging

### Context
**Parallel Development**: Create isolated workstreams, develop features independently, integrate changes systematically.

### Intent
**Safe Experimentation**: Enable multiple concurrent features, protect main branch stability, facilitate code review process.

### Mantras
```
- [ ] Branching; isolate features; forbid working on main directly
- [ ] Naming; describe purpose; forbid ambiguous branch names
- [ ] Switching; commit first; forbid losing uncommitted work
- [ ] Merging; integrate systematically; forbid skipping reviews
- [ ] Conflicts; resolve carefully; forbid accepting blindly
```

### Critical Commands (🔴 Priority)

#### Create New Branch

**Context**: Start new feature or bug fix
**Intent**: Isolate development from main codebase
**Directive**: Developer creates feature branch; forbid working directly on main

```bash
# Create branch (doesn't switch)
git branch feature/outlier-detection

# Create and switch to branch
git checkout -b feature/outlier-detection
# Modern syntax:
git switch -c feature/outlier-detection

# Create from specific commit/branch
git checkout -b hotfix/null-handling main
git checkout -b feature/new-model develop

# List branches
git branch              # Local branches
git branch -r          # Remote branches
git branch -a          # All branches

# List with last commit
git branch -v
# Output:
#   main                  abc1234 Latest commit
# * feature/outlier      def5678 WIP: Add feature
#   bugfix/null-check    ghi9012 Fix null handling

# Delete branch (merged)
git branch -d feature/completed-feature

# Force delete (unmerged)
git branch -D feature/abandoned-experiment

# Delete remote branch
git push origin --delete feature/old-branch
```

**Branch Naming Conventions**:
```
feature/    # New features: feature/outlier-detection
bugfix/     # Bug fixes: bugfix/null-handling
hotfix/     # Urgent fixes: hotfix/security-patch
refactor/   # Code refactoring: refactor/data-loader
docs/       # Documentation: docs/api-reference
test/       # Testing: test/integration-tests
experiment/ # Experiments: experiment/new-algorithm
```

**Do**:
- ✅ Use descriptive, lowercase names with hyphens
- ✅ Include type prefix (feature/, bugfix/)
- ✅ Create branch for every feature/fix
- ✅ Delete branches after merging

**Don't**:
- ❌ Work directly on main
- ❌ Use vague names: "test", "fixes", "updates"
- ❌ Use spaces or special characters
- ❌ Keep old merged branches

---

#### Switch Between Branches

- **Context**: Navigate between different development workstreams
- **Intent**: Move to different features without losing work
- **Directive**: Developer switches cleanly; forbid switching with uncommitted changes

```bash
# Switch to existing branch
git checkout main
git switch main  # Modern syntax

# Create and switch
git checkout -b feature/new-feature
git switch -c feature/new-feature

# Switch to previous branch
git checkout -
git switch -

# Verify current branch
git branch
# * indicates current branch

# Show current branch
git rev-parse --abbrev-ref HEAD

# Before switching, handle uncommitted changes:

# Option 1: Commit
git commit -a -m "WIP: current progress"
git checkout other-branch

# Option 2: Stash
git stash
git checkout other-branch
# Later:
git checkout original-branch
git stash pop

# Force switch (DANGER - discards changes)
git checkout -f other-branch
```

- **Do**:
  - ✅ Commit or stash before switching
  - ✅ Verify current branch regularly
  - ✅ Use descriptive branch names
  - ✅ Keep branches up to date with main

- **Don't**:
  - ❌ Switch with uncommitted changes
  - ❌ Lose work by force switching
  - ❌ Forget which branch you're on
  - ❌ Leave branches stale for weeks

- **FAQ**:
  - Q: `checkout` vs `switch`?
  - A: `switch` is newer, clearer for branches. `checkout` has more functionality but can be confusing.

---

#### Merge Branches

- **Context**: Integrate completed feature into main branch
- **Intent**: Combine feature development with main codebase
- **Directive**: Developer merges systematically; forbid merging without review

```bash
# Standard merge workflow
git checkout main           # Switch to target branch
git pull origin main       # Get latest
git merge feature/outlier-detection  # Merge feature

# Merge with commit message (no fast-forward)
git merge --no-ff feature/outlier-detection -m "Merge feature: outlier detection"

# Squash merge (combine all commits into one)
git merge --squash feature/outlier-detection
git commit -m "feat: add outlier detection module

- Implement IQR method
- Add configuration support
- Include comprehensive tests"

# Merge with strategy
git merge -X theirs feature/branch    # Prefer their changes in conflicts
git merge -X ours feature/branch      # Prefer our changes

# Abort merge if problems
git merge --abort

# After successful merge
git push origin main
git branch -d feature/outlier-detection  # Delete local branch
git push origin --delete feature/outlier-detection  # Delete remote

# Verify merge
git log --oneline --graph
```

- **Merge Strategies**:
  - **Fast-forward**: Simply moves pointer (clean for linear history)
  - **Merge commit** (`--no-ff`): Creates merge commit (preserves branch history)
  - **Squash**: Combines all commits into one (clean main history)

- **Do**:
  - ✅ Merge feature branches into main
  - ✅ Pull latest main before merging
  - ✅ Delete branch after successful merge
  - ✅ Use squash for many small commits

- **Don't**:
  - ❌ Merge main into feature branches (use rebase)
  - ❌ Merge without testing
  - ❌ Merge failing CI builds
  - ❌ Keep merged branches indefinitely

---

### High Priority Commands (🟡)

#### Resolve Merge Conflicts

- **Context**: Same files modified in parallel development
- **Intent**: Manually reconcile conflicting changes
- **Directive**: Developer resolves carefully; forbid accepting all changes blindly

```bash
# When merge conflict occurs:
git merge feature-branch
# Output: CONFLICT (content): Merge conflict in src/model.py

# Check conflicted files
git status
# Output:
# Unmerged paths:
#   both modified:   src/model.py

# Open conflicted file, look for markers:
# <<<<<<< HEAD
# Your changes in main
# =======
# Their changes in feature-branch
# >>>>>>> feature-branch

# Resolution steps:
# 1. Edit file to resolve conflicts
# 2. Remove conflict markers (<<<<<<<, =======, >>>>>>>)
# 3. Keep desired changes or combine both

# After resolving
git add src/model.py         # Mark as resolved
git status                   # Verify all conflicts resolved

# Continue merge
git commit                   # Opens editor for merge message
# Or:
git commit -m "Merge feature-branch: resolve conflicts in model.py"

# Or abort if needed
git merge --abort

# Visual merge tools
git mergetool                # Launch configured merge tool
git mergetool --tool=vimdiff # Use specific tool

# Configure merge tool
git config --global merge.tool meld
git config --global mergetool.meld.path "/usr/bin/meld"
```

**Conflict Resolution Strategies**:
```bash
# Accept all their changes
git checkout --theirs src/model.py
git add src/model.py

# Accept all our changes
git checkout --ours src/model.py
git add src/model.py

# View changes from both sides
git diff HEAD
git diff MERGE_HEAD
```

- **Do**:
  - ✅ Review all conflict markers carefully
  - ✅ Test after resolving conflicts
  - ✅ Communicate with feature author if unclear
  - ✅ Commit with descriptive merge message

- **Don't**:
  - ❌ Accept all changes without reviewing
  - ❌ Leave conflict markers in code
  - ❌ Commit without testing
  - ❌ Rush conflict resolution

- **FAQ**:
  - Q: How to avoid conflicts?
  - A: Pull frequently, small commits, communicate with team, work on different files

---

#### Rebase Branch

- **Context**: Update feature branch with latest main changes
- **Intent**: Maintain clean linear history
- **Directive**: Developer rebases personal branches; forbid rebasing shared branches

```bash
# Update feature branch with latest main
git checkout feature/new-model
git rebase main

# Interactive rebase (edit commit history)
git rebase -i HEAD~3
# Editor opens with:
# pick abc1234 Add feature
# pick def5678 Fix typo
# pick ghi9012 Add tests

# Options:
# pick = use commit
# reword = use commit, edit message
# edit = use commit, stop to amend
# squash = combine with previous
# fixup = like squash, discard message
# drop = remove commit

# Example: squash commits
# pick abc1234 Add feature
# squash def5678 Fix typo
# squash ghi9012 Add tests
# Results in single commit

# If conflicts during rebase
# 1. Resolve conflicts in files
# 2. git add <resolved-files>
# 3. git rebase --continue

# Skip current commit
git rebase --skip

# Abort rebase
git rebase --abort

# After rebase, force push (YOUR branch only)
git push -f origin feature/new-model
# Safer:
git push --force-with-lease origin feature/new-model
```

- **Rebase vs Merge**:
  - **Rebase**: Cleaner linear history, rewrites commits
  - **Merge**: Preserves history, creates merge commits

- **Do**:
  - ✅ Rebase personal feature branches
  - ✅ Use interactive rebase to clean commits
  - ✅ Rebase before creating PR
  - ✅ Test after rebasing

- **Don't**:
  - ❌ Rebase public/shared branches (main, develop)
  - ❌ Rebase after force-pushing
  - ❌ Rebase without understanding implications
  - ❌ Forget to force push after rebase

---

### Medium Priority Commands (🟢)

#### Cherry-Pick Commits

- **Context**: Apply specific commits to current branch
- **Intent**: Selectively port bug fixes to release branches
- **Directive**: Developer cherry-picks selectively; forbid cherry-picking large features

```bash
# Get commit hash
git log --oneline
# abc1234 Fix null handling bug

# Apply specific commit to current branch
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678

# Cherry-pick range
git cherry-pick abc1234..def5678

# Cherry-pick without committing (review first)
git cherry-pick -n abc1234
git cherry-pick --no-commit abc1234

# Resolve conflicts same as merge
# Edit files, git add, git cherry-pick --continue

# Abort cherry-pick
git cherry-pick --abort
```

- **Mantra**: `[] Cherry-picking; apply selectively; forbid porting large features`

---

## Phase 4: Collaboration (Pull Requests & Reviews)

### Context
- **Team Coordination**: Request code review, provide feedback, merge approved changes systematically.

### Intent
- **Quality Assurance**: Ensure code quality through peer review, share knowledge, maintain standards before integration.

### Mantras
```
- [ ] Pull requests; require review; forbid unreviewed merges
- [ ] Descriptions; write clearly; forbid vague PR titles
- [ ] Reviews; be constructive; forbid rubber-stamping
- [ ] Merging; verify CI; forbid merging failing tests
- [ ] Cleanup; delete branches; forbid accumulating stale branches
```

### Critical Commands (🔴 Priority)

#### Create Pull Request

- **Context**: Request merge of feature branch into main
- **Intent**: Enable code review before integration
- **Directive**: Developer writes clear description; forbid huge monolithic PRs

```bash
# 1. Push feature branch to GitHub
git push -u origin feature/outlier-detection

# 2. Go to GitHub repository
# 3. Click "Pull requests" → "New pull request"
# 4. Select branches:
#    base: main (target branch)
#    compare: feature/outlier-detection (your branch)

# 5. Fill in PR details:

# Title (clear and concise):
"Add IQR-based outlier detection module"

# Description template:
## Summary
Brief description of changes and motivation.

## Changes
- Implement IQR method for numeric features
- Add configurable threshold parameter (default: 1.5)
- Create OutlierDetector class with fit/transform interface
- Update preprocessing pipeline to include outlier detection

## Testing
- Added unit tests for OutlierDetector class
- Tested on synthetic data with known outliers
- All existing tests pass
- Added integration test with full pipeline

## Documentation
- Updated README with usage examples
- Added docstrings to all public methods
- Created outlier_detection.md guide

## Related Issues
Closes #42
Related to #38

## Checklist
- [x] Tests pass locally
- [x] Code follows style guide
- [x] Documentation updated
- [x] No merge conflicts
- [x] Reviewed own changes

# 6. Add reviewers
# 7. Add labels (feature, documentation, etc.)
# 8. Link issues
# 9. Click "Create pull request"
```

**PR Best Practices**:

- **Size Guidelines**:
  - Small: < 200 lines (ideal, quick review)
  - Medium: 200-500 lines (acceptable)
  - Large: > 500 lines (split if possible)

- **Do**:
  - ✅ Write clear, descriptive title
  - ✅ Provide comprehensive description
  - ✅ Link related issues
  - ✅ Request specific reviewers
  - ✅ Keep PRs focused and small
  - ✅ Respond to review comments promptly

- **Don't**:
  - ❌ Create 1000+ line PRs
  - ❌ Mix multiple unrelated features
  - ❌ Use vague titles like "fixes"
  - ❌ Leave description empty
  - ❌ Create PR with failing tests
  - ❌ Force-push after receiving reviews

---

#### Review Pull Request

- **Context**: Provide feedback on team member's code
- **Intent**: Ensure quality, share knowledge, catch bugs
- **Directive**: Reviewer provides constructive feedback; forbid approving without reading

```bash
# On GitHub:
# 1. Go to "Pull requests" tab
# 2. Select PR to review
# 3. Click "Files changed"

# Review process:
# - Read description first
# - Review each changed file
# - Look for:
#   • Logic errors or bugs
#   • Performance issues
#   • Security concerns
#   • Code style violations
#   • Missing tests
#   • Documentation gaps
#   • Better approaches

# Adding comments:
# 1. Click line number
# 2. Type comment
# 3. Choose:
#    - "Add single comment" (immediate)
#    - "Start a review" (batched)

# Submit review:
# Click "Review changes" button
# Choose one:
#   • Comment: General feedback, no approval
#   • Approve: LGTM, ready to merge
#   • Request changes: Needs fixes before merge

# Testing PR locally:
git fetch origin pull/123/head:pr-123
git checkout pr-123
# Run tests
python -m pytest
# Test functionality
python scripts/train.py

# Leave detailed feedback
# Delete pr-123 branch after testing
git checkout main
git branch -D pr-123
```

##### **Review Comment Examples**:

- Good comments:
```
✅ "Consider using a dictionary here for O(1) lookup instead of list scanning."
✅ "This could raise ValueError if input is None. Add input validation?"
✅ "Great test coverage! Minor: could add edge case for empty DataFrame."
✅ "Nitpick: variable name `df2` is unclear. Maybe `processed_df`?"
```

- Avoid:
```
❌ "This is wrong."
❌ "Did you even test this?"
❌ "Why didn't you do it my way?"
❌ "LGTM" (without actually reviewing)
```

- **Do**:
  - ✅ Be specific and constructive
  - ✅ Suggest alternatives
  - ✅ Ask questions to understand
  - ✅ Praise good code
  - ✅ Test locally for complex changes

- **Don't**:
  - ❌ Be dismissive or rude
  - ❌ Approve without reading
  - ❌ Nitpick every detail
  - ❌ Block on personal preferences
  - ❌ Leave vague comments

---

#### Merge Pull Request

- **Context**: Integrate approved changes into target branch
- **Intent**: Complete feature integration after review
- **Directive**: Developer merges after CI passes; forbid merging failing builds

```bash
# Prerequisites:
# ✅ All reviews approved
# ✅ CI/CD checks passed (green checkmarks)
# ✅ No merge conflicts
# ✅ Branch up to date with base

# Merge strategies:

# 1. Merge Commit (preserves all commits)
# - Keeps full history
# - Shows when feature was merged
# - Good for: long-lived features, collaborative work
"Merge pull request #123 from user/feature-branch"

# 2. Squash and Merge (combines into one commit)
# - Clean main branch history
# - Easier to revert
# - Good for: many small commits, WIP commits
"Add outlier detection module (#123)"

# 3. Rebase and Merge (linear history)
# - Clean linear history
# - No merge commits
# - Good for: small features, clean commits already

# Steps:
# 1. Click "Merge pull request"
# 2. Choose strategy (usually Squash for features)
# 3. Edit commit message if needed
# 4. Click "Confirm merge"
# 5. Click "Delete branch" ✅

# Update local repository
git checkout main
git pull origin main

# Delete local feature branch
git branch -d feature/outlier-detection

# Verify merge
git log --oneline --graph
```

#### **Merge Strategy Selection**:

| Use Case | Strategy | Why |
|----------|----------|-----|
| Feature with many WIP commits | Squash | Clean history |
| Collaborative feature | Merge commit | Preserve contributors |
| Hotfix (single commit) | Rebase | Linear history |
| Large feature | Merge commit | Preserve development history |

- **Do**:
  - ✅ Wait for CI to pass
  - ✅ Ensure all reviews approved
  - ✅ Delete branch after merge
  - ✅ Update local repository
  - ✅ Verify merge was successful

- **Don't**:
  - ❌ Merge failing CI
  - ❌ Merge without approval
  - ❌ Keep old merged branches
  - ❌ Merge conflicts without resolving
  - ❌ Forget to pull after merging

---

### High Priority Commands (🟡)

#### Request Reviewers

```bash
# In PR sidebar:
# 1. Click "Reviewers"
# 2. Search and select team members
# 3. Request review from:
#    - Domain experts for the changed area
#    - At least 1-2 people for small PRs
#    - 2-3 people for critical changes

# Or mention in comments:
"@jane-ml-expert could you review the model changes?
@bob-infra could you check the pipeline integration?"

# Re-request review after changes
# Click circular arrow icon next to reviewer
```

- **Mantra**: `[] Reviewers; request experts; forbid random assignments`

---

#### Apply Labels

```bash
# Common labels:
bug               # Something isn't working
feature           # New feature or enhancement
documentation     # Documentation updates
high-priority     # Urgent, needs immediate attention
good-first-issue  # Good for new contributors
help-wanted       # Need assistance
wip               # Work in progress
blocked           # Cannot proceed, dependencies
breaking-change   # API/behavior change

# In PR/Issue:
# 1. Click "Labels" in right sidebar
# 2. Select appropriate labels
# 3. Create custom labels if needed:
#    Settings → Labels → New label

# Organize work by labels
# Filter: is:pr label:high-priority is:open
```

- **Mantra**: `[] Labels; categorize consistently; forbid over-labeling`

---

## Phase 5: GitHub Features & Automation

### Context
- **Automation & Project Management**: Implement CI/CD, track issues, protect branches, manage releases.

### Intent
- **Streamlined Workflows**: Automate testing, organize work, enforce quality gates, version releases systematically.

### Mantras
```
- [ ] Actions; automate testing; forbid manual test execution
- [ ] Issues; track systematically; forbid losing bug reports
- [ ] Protection; enforce rules; forbid direct main pushes
- [ ] Projects; organize visually; forbid scattered planning
- [ ] Releases; version semantically; forbid ad-hoc deployments
```

### Critical Commands (🔴 Priority)

#### GitHub Actions (CI/CD)

- **Context**: Automate testing on every push and PR
- **Intent**: Catch bugs before merge, maintain code quality
- **Directive**: Engineer implements CI; forbid expensive operations on every commit

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ['3.8', '3.9', '3.10', '3.11']
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Cache dependencies
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-cov flake8 black
    
    - name: Lint with flake8
      run: |
        flake8 src/ --count --select=E9,F63,F7,F82 --show-source --statistics
        flake8 src/ --count --max-complexity=10 --max-line-length=100 --statistics
    
    - name: Check formatting with black
      run: |
        black --check src/
    
    - name: Run tests with coverage
      run: |
        pytest tests/ --cov=src --cov-report=xml --cov-report=term
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
        fail_ci_if_error: true

  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Run security checks
      run: |
        pip install safety bandit
        safety check
        bandit -r src/
```

**Common Workflows**:

```yaml
# Continuous deployment
name: Deploy

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build and deploy
      run: |
        docker build -t myapp:${{ github.ref_name }} .
        docker push myapp:${{ github.ref_name }}
```

- **Do**:
  - ✅ Test on multiple Python versions
  - ✅ Run linting and formatting checks
  - ✅ Cache dependencies for speed
  - ✅ Fail fast on critical errors

- **Don't**:
  - ❌ Run expensive model training on every commit
  - ❌ Store secrets in workflow files
  - ❌ Skip test coverage reporting
  - ❌ Ignore failing CI

---

#### GitHub Issues

- **Context**: Track bugs, features, and tasks
- **Intent**: Organize work, maintain backlog, document problems
- **Directive**: Team creates issues systematically; forbid duplicate issues

```markdown
# Bug Report Template
## Description
Model throws ValueError when predicting on data with null values.

## Reproduction Steps
1. Load model: `model = joblib.load('model.pkl')`
2. Create data with nulls: `df = pd.DataFrame({'a': [1, None, 3]})`
3. Predict: `model.predict(df)`

## Expected Behavior
Model should handle null values gracefully, either:
- Impute using fitted imputer
- Raise clear error message with guidance

## Actual Behavior
```
ValueError: Input contains NaN, infinity or a value too large
```

## Environment
- Python: 3.9.7
- scikit-learn: 1.3.0
- pandas: 2.0.3
- OS: Ubuntu 22.04

## Proposed Solution
Add input validation in preprocessing step before prediction.

## Related Issues
- #38 (preprocessing pipeline)
- #25 (null handling)

---

# Feature Request Template
## Feature Description
Add support for categorical feature encoding in preprocessing pipeline.

## Motivation
Currently only handles numeric features. Need to encode categorical variables for production use.

## Proposed Implementation
- OneHotEncoder for nominal features
- OrdinalEncoder for ordinal features
- Configuration-driven encoding strategy

## Alternatives Considered
- Target encoding (can cause leakage)
- Label encoding (assumes ordering)

## Acceptance Criteria
- [ ] Support OneHot and Ordinal encoding
- [ ] Configurable via YAML
- [ ] Handle unseen categories
- [ ] Include in preprocessing pipeline
- [ ] Unit tests with >90% coverage
- [ ] Documentation with examples
```

**Issue Labels**:
```
Priority: high-priority, medium-priority, low-priority
Type: bug, feature, enhancement, documentation
Status: wip, blocked, ready-for-review
Effort: good-first-issue, help-wanted
```

---

### High Priority Commands (🟡)

#### Branch Protection

- **Context**: Enforce quality gates on critical branches
- **Intent**: Prevent accidental changes, require reviews
- **Directive**: Lead protects main; forbid direct pushes

```bash
# Settings → Branches → Add rule

Branch name pattern: main

Protection rules:
✅ Require pull request before merging
   ✅ Require approvals: 1-2
   ✅ Dismiss stale approvals when new commits pushed
   ✅ Require review from Code Owners

✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Required checks:
   - Tests (Python 3.8)
   - Tests (Python 3.9)
   - Tests (Python 3.10)
   - Lint
   - Coverage

✅ Require conversation resolution before merging

✅ Require signed commits (optional, for high security)

✅ Include administrators
   (Even admins must follow rules)

✅ Restrict who can push to matching branches
   - Allow: DevOps team
   - Deny: All others

⬜ Allow force pushes (NEVER enable for main)
⬜ Allow deletions (NEVER enable for main)

# Now direct push will fail:
git push origin main
# Error: protected branch hook declined
```

- **Mantra**: `[] Protection; enforce gates; forbid bypassing reviews`

---

#### GitHub Projects

- **Context**: Visual task management and sprint planning
- **Intent**: Track progress, organize work, coordinate team
- **Directive**: Manager organizes systematically; forbid stale boards

```bash
# Create Project Board:
# Projects tab → New project → Template: "Basic kanban"

Columns:
- Backlog (all future work)
- To Do (current sprint)
- In Progress (actively working)
- In Review (PR created, awaiting review)
- Done (merged to main)

# Automation:
- Auto-move to "In Progress" when issue assigned
- Auto-move to "In Review" when PR created
- Auto-move to "Done" when PR merged
- Auto-archive after 30 days in Done

# Link issues to project:
# In issue → Projects → Select board

# Convert to issues:
# Project card → "..." → Convert to issue
```

---

#### Releases

- **Context**: Mark stable versions for deployment
- **Intent**: Version systematically, track changes
- **Directive**: Team tags semantically; forbid arbitrary versioning

```bash
# Semantic Versioning: MAJOR.MINOR.PATCH
# v1.2.3
# - MAJOR: Breaking changes
# - MINOR: New features (backward compatible)
# - PATCH: Bug fixes

# Create tag locally
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Or via GitHub UI:
# Releases → Create new release

Tag version: v1.0.0
Release title: ML Pipeline v1.0.0

Description:
## Features
- Outlier detection module (IQR method)
- Categorical encoding support
- Model serving API
- Comprehensive logging

## Improvements
- 30% faster preprocessing
- Reduced memory usage
- Better error messages

## Bug Fixes
- Fixed null value handling in prediction
- Resolved edge case in encoding
- Corrected metric calculation

## Breaking Changes
- Changed config format from JSON to YAML
- Migration guide: docs/migration-v1.0.md

## Installation
```bash
pip install ml-pipeline==1.0.0
```

Attach binaries:
- model.pkl (trained model)
- preprocessing_pipeline.pkl
- requirements.txt

# Pre-release checkbox (for beta/rc)
```
This is a pre-release ⬜

Publish release → Creates release and tag
```

- **Do**:
  - ✅ Use semantic versioning
  - ✅ Document breaking changes
  - ✅ Include installation instructions
  - ✅ Attach artifacts if needed

- **Don't**:
  - ❌ Release untested code
  - ❌ Skip changelog
  - ❌ Use arbitrary version numbers
  - ❌ Make pre-releases production

---

## Phase 6: Advanced Operations

### Context
- **History Management**: Modify commits, search history, manage references.

### Intent
- **Controlled History Editing**: Fix mistakes, investigate changes, maintain clean history.

### Mantras
```
- [ ] Reset; undo carefully; forbid hard reset on shared branches
- [ ] Rebase; clean commits; forbid rewriting public history
- [ ] Blame; understand context; forbid blaming teammates
- [ ] Search; find efficiently; forbid manual code scanning
```

### Medium Priority Commands (🟢)

#### Reset Commits

- **Context**: Undo commits or changes
- **Intent**: Fix mistakes in local development
- **Directive**: Developer resets cautiously; forbid hard reset on shared branches

```bash
# Reset types:
# --soft: Move HEAD, keep changes staged
# --mixed (default): Move HEAD, unstage changes, keep in working dir
# --hard: Move HEAD, discard all changes

# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, unstage changes (keep in working directory)
git reset HEAD~1
git reset --mixed HEAD~1

# DANGER: Discard all changes
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard abc1234

# Reset single file (unstage)
git reset HEAD src/model.py

# See what would be reset
git log --oneline  # Find commit

# After reset, may need force push (YOUR branch only)
git push -f origin feature-branch
```

- **Do**:
  - ✅ Use `--soft` for recent commits
  - ✅ Verify before `--hard`
  - ✅ Reset only personal branches
  - ✅ Stash important changes first

- **Don't**:
  - ❌ Hard reset shared branches
  - ❌ Reset without understanding consequences
  - ❌ Use `--hard` without backup
  - ❌ Reset pushed commits on main

---

#### Interactive Rebase

- **Context**: Clean up commit history before PR
- **Intent**: Create logical, reviewable commits
- **Directive**: Developer rebases interactively; forbid on public branches

```bash
# Rebase last N commits
git rebase -i HEAD~3

# Editor opens:
pick abc1234 Add feature
pick def5678 Fix typo
pick ghi9012 Add tests

# Commands:
# p, pick = use commit
# r, reword = use commit, edit message
# e, edit = use commit, stop for amending
# s, squash = meld into previous commit
# f, fixup = like squash, discard message
# d, drop = remove commit

# Example: Clean up commits
pick abc1234 Add feature
squash def5678 Fix typo
squash ghi9012 Add tests
# Results in single well-documented commit

# Reordering commits
pick ghi9012 Add tests
pick abc1234 Add feature
pick def5678 Fix typo

# Save and close editor
# Follow prompts for commit messages

# Force push after rebase
git push --force-with-lease origin feature-branch
```

- **Mantra**: `[] Rebase interactively; clean history; forbid on shared branches`

---

#### Blame (Line History)

- **Context**: Understand who changed what and when
- **Intent**: Debug issues, understand context
- **Directive**: Developer investigates respectfully; forbid blaming people

```bash
# View line-by-line authorship
git blame src/model.py

# Output:
# abc1234 (Jane Doe 2024-01-10 14:30) def train_model():
# def5678 (Bob Smith 2024-01-15 09:15)     model = RF()

# Blame specific lines
git blame -L 10,20 src/model.py

# Ignore whitespace changes
git blame -w src/model.py

# Detect code moved/copied
git blame -C src/model.py

# Show email instead of name
git blame -e src/model.py

# Get commit details
git show abc1234
```

- **Do**:
  - ✅ Use to understand context
  - ✅ Find when bug introduced
  - ✅ Contact author for clarification

- **Don't**:
  - ❌ Blame teammates personally
  - ❌ Make assumptions
  - ❌ Skip understanding why

---

#### Search History

- **Context**: Find commits by message, author, or code changes
- **Intent**: Track down when changes occurred
- **Directive**: Developer searches systematically; forbid manual scanning

```bash
# Search commit messages
git log --grep="bug fix"
git log --grep="outlier"

# Search by author
git log --author="Jane Doe"
git log --author="jane@"

# Search by date
git log --since="2024-01-01"
git log --after="1 week ago"
git log --before="2024-12-31"

# Search code changes (pickaxe)
git log -S "outlier_detection"  # When string added/removed
git log -G "def.*outlier"       # Regex pattern

# Search in specific file
git log -- src/model.py
git log -p -- src/model.py  # Show changes

# Combine searches
git log --grep="bug" --author="Jane" --since="2024-01-01"

# Find commit that introduced line
git log -S "specific_function" -- src/model.py
```

- **Mantra**: `[] Searching; find efficiently; forbid manual commit scanning`

---

### Low Priority Commands (⚪)

#### Tagging

```bash
# Annotated tag (recommended for releases)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Lightweight tag
git tag v1.0.0-beta

# List tags
git tag
git tag -l "v1.*"

# Show tag details
git show v1.0.0

# Push tag
git push origin v1.0.0

# Push all tags
git push --tags

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
git push origin :refs/tags/v1.0.0
```

---

## Phase 7: Troubleshooting & Recovery

### Context
- **Error Recovery**: Undo mistakes, recover lost work, fix repository issues.

### Intent
- **Data Protection**: Prevent permanent loss, restore previous states, resolve common errors.

### Mantras
```
- [ ] Restoration; undo safely; forbid discarding without backup
- [ ] Recovery; use reflog; forbid panicking on mistakes
- [ ] Cleanup; remove carefully; forbid deleting tracked files
- [ ] Detachment; return to branch; forbid leaving work in limbo
```

### Critical Commands (🔴 Priority)

#### Undo Uncommitted Changes

- **Context**: Discard local modifications
- **Intent**: Revert to last commit
- **Directive**: Developer restores carefully; forbid without verification

```bash
# Discard changes in specific file
git restore src/model.py
git checkout -- src/model.py  # Older syntax

# Unstage file (keep changes in working directory)
git restore --staged src/model.py
git reset HEAD src/model.py  # Older syntax

# Discard all unstaged changes
git restore .

# Restore file from specific commit
git restore --source=abc1234 src/model.py
git restore --source=HEAD~2 src/model.py

# Preview changes before restoring
git diff src/model.py

# Restore deleted file
git restore src/deleted_file.py
```

- **Do**:
  - ✅ Review changes with `git diff` first
  - ✅ Stash if might need changes later
  - ✅ Restore specific files, not everything blindly

- **Don't**:
  - ❌ Restore without reviewing
  - ❌ Discard days of work accidentally
  - ❌ Use `git clean` without `-n` first

---

#### Recover Lost Commits

- **Context**: Retrieve commits after reset or rebase
- **Intent**: Restore accidentally lost work
- **Directive**: Developer uses reflog; forbid waiting too long

```bash
# View reflog (all HEAD movements)
git reflog

# Output:
# abc1234 HEAD@{0}: reset: moving to HEAD~1
# def5678 HEAD@{1}: commit: Add feature X
# ghi9012 HEAD@{2}: commit: Fix bug Y

# Recover lost commit
git reset --hard HEAD@{1}
# Or:
git reset --hard def5678

# Cherry-pick lost commit
git cherry-pick def5678

# View reflog for specific branch
git reflog show feature-branch

# Reflog entries expire after 90 days (default)
git config --global gc.reflogExpire "never"  # Keep forever
```

- **Do**:
  - ✅ Use immediately after mistake
  - ✅ Check reflog before declaring work lost
  - ✅ Know reflog expires after 90 days

- **Don't**:
  - ❌ Wait weeks to recover
  - ❌ Panic about lost commits
  - ❌ Forget reflog exists

---

#### Fix Detached HEAD

- **Context**: HEAD pointing to commit instead of branch
- **Intent**: Return to normal branch state
- **Directive**: Developer creates branch or returns to main; forbid leaving work detached

```bash
# You're in detached HEAD if you see:
# "You are in 'detached HEAD' state..."

# Option 1: Return to branch (discard changes)
git checkout main

# Option 2: Create branch to save work
git checkout -b recovered-work

# Option 3: Create branch and return to main
git branch temp-work
git checkout main

# Verify you're on a branch
git branch
# Should have * next to a branch name

# How did I get here?
# - Checked out a commit: git checkout abc1234
# - Checked out a tag: git checkout v1.0.0

# Prevention: Always work on branches
git checkout -b experiment-branch  # Instead of checkout <commit>
```

- **Mantra**: `[] Detached HEAD; create branch; forbid losing uncommitted work`

---

### High Priority Commands (🟡)

#### Clean Untracked Files

- **Context**: Remove build artifacts and temporary files
- **Intent**: Clean working directory
- **Directive**: Developer previews with `-n`; forbid deleting without review

```bash
# ALWAYS dry run first
git clean -n
git clean -n -d  # Include directories

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove including gitignored files
git clean -fdx

# Interactive mode (safest)
git clean -i

# Remove only specific pattern
git clean -f "*.pyc"

# Clean only specific directory
git clean -fd data/temp/
```

- **Do**:
  - ✅ Always run with `-n` first (dry run)
  - ✅ Review what will be deleted
  - ✅ Use `-i` for interactive selection

- **Don't**:
  - ❌ Run `-fdx` without dry run
  - ❌ Delete without backing up
  - ❌ Confuse with `git reset --hard`

---

## Best Practices & Workflows

### Commit Message Conventions

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Formatting, missing semicolons, etc (no code change)
refactor: Code change that neither fixes bug nor adds feature
test:     Adding or updating tests
chore:    Maintenance tasks, dependency updates

# Scopes (optional):
(model)    Model-related changes
(data)     Data processing changes
(api)      API changes
(config)   Configuration changes

# Subject:
- Use imperative mood: "add" not "added"
- Lowercase first letter
- No period at end
- Max 50 characters

# Body (optional):
- Wrap at 72 characters
- Explain what and why, not how
- Separate from subject with blank line

# Footer (optional):
- Breaking changes: BREAKING CHANGE:
- Issue references: Closes #123, Fixes #456

# Examples:
git commit -m "feat(model): add XGBoost classifier"

git commit -m "fix(preprocessing): handle null values in scaler

Previously, null values caused ValueError during scaling.
Now imputes with median before scaling.

Closes #42"

git commit -m "docs(README): add installation instructions"

git commit -m "refactor(data): extract loading logic to separate module"

git commit -m "test(model): add edge case tests for predict method"

git commit -m "chore(deps): update scikit-learn to 1.3.0

BREAKING CHANGE: requires Python 3.8+"
```

---

### Branching Strategy (Git Flow)

```bash
# Main branches:
main         Production-ready code (always deployable)
develop      Integration branch for features

# Supporting branches:
feature/*    New features (from develop)
bugfix/*     Bug fixes (from develop)
hotfix/*     Urgent production fixes (from main)
release/*    Release preparation (from develop)

# Feature workflow:
# 1. Start feature from develop
git checkout develop
git pull origin develop
git checkout -b feature/outlier-detection

# 2. Work on feature
git add src/outlier.py
git commit -m "feat: implement IQR outlier detection"
git push -u origin feature/outlier-detection

# 3. Keep updated with develop
git fetch origin
git rebase origin/develop

# 4. Create PR to develop
# 5. After merge, delete branch
git checkout develop
git pull
git branch -d feature/outlier-detection

# Hotfix workflow:
# 1. Branch from main
git checkout main
git pull
git checkout -b hotfix/critical-bug

# 2. Fix and commit
git commit -m "fix: resolve null pointer exception"

# 3. Merge to main AND develop
git checkout main
git merge hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix v1.0.1"
git push origin main --tags

git checkout develop
git merge hotfix/critical-bug
git push origin develop

# Release workflow:
# 1. Create release branch
git checkout develop
git checkout -b release/v1.0.0

# 2. Version bump, changelog, final fixes
git commit -m "chore: bump version to 1.0.0"

# 3. Merge to main and develop
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"

git checkout develop
git merge release/v1.0.0
```

---

### Daily Workflow

```bash
# ========== MORNING ==========

# Update local repository
git checkout main
git pull origin main
git checkout develop
git pull origin develop

# Create/switch to feature branch
git checkout feature/current-work
# Or start new:
git checkout -b feature/new-work

# ========== DURING DAY ==========

# Check status frequently
git status

# Make changes and commit often
git add src/modified_file.py
git commit -m "feat: add function X"

# Push frequently (backup + collaboration)
git push origin feature/current-work

# Pull latest develop periodically
git fetch origin
git rebase origin/develop

# ========== END OF DAY ==========

# Ensure all work committed and pushed
git status  # Should be clean
git push origin feature/current-work

# If not ready to commit:
git stash push -m "WIP: end of day"
git stash list  # Verify saved

# Create PR if feature ready
# Otherwise, continue tomorrow

# ========== NEXT MORNING ==========

# If stashed:
git stash pop
# Continue work
```

---

### Before Creating PR Checklist

```bash
# ========== CODE QUALITY ==========

# Run tests
pytest tests/
python -m pytest tests/ -v

# Check coverage
pytest tests/ --cov=src --cov-report=term

# Lint code
flake8 src/ --max-line-length=100
pylint src/

# Format code
black src/
isort src/

# Type checking
mypy src/

# Security scan
bandit -r src/
safety check

# ========== GIT HYGIENE ==========

# Update with latest main/develop
git checkout main
git pull
git checkout your-branch
git rebase main

# Clean commit history
git log --oneline -10
# If messy commits:
git rebase -i HEAD~5  # Squash WIP commits

# Verify no merge conflicts
git status

# ========== BEFORE PUSH ==========

# Review your changes
git diff main...your-branch

# Verify commit messages
git log main..your-branch --oneline

# Check for sensitive data
git diff main...your-branch | grep -i "password\|secret\|key\|token"

# Push
git push -f origin your-branch  # -f only on personal branch

# ========== CREATE PR ==========

# Fill out PR template:
# ✅ Clear title
# ✅ Description of changes
# ✅ Link to issue (Closes #X)
# ✅ Testing performed
# ✅ Screenshots (if UI changes)
# ✅ Breaking changes noted

# Request reviewers
# Add labels
# Link project board
```

---

## Common Pitfalls & Solutions

| Problem | Cause | Solution | Prevention |
|---------|-------|----------|------------|
| **Merge conflicts** | Same files edited in parallel | Manually resolve in editor, `git add`, `git commit` | • Pull frequently<br>• Small, focused commits<br>• Communicate with team |
| **Committed secrets** | Tracked .env or credentials | 1. Remove from history (`git filter-branch`)<br>2. Rotate secrets immediately<br>3. Add to .gitignore | • Add .gitignore early<br>• Use git-secrets hook<br>• Never commit credentials |
| **Large files in repo** | Tracked data/model files | Use Git LFS or remove from history | • .gitignore data/, models/<br>• Use external storage<br>• Check file size before commit |
| **Detached HEAD** | Checked out commit | `git checkout main` or create branch | • Always work on branches<br>• Avoid `git checkout <hash>` |
| **Force pushed to main** | Accidentally overwrote history | Recover from reflog: `git reflog`, `git reset --hard` | • Enable branch protection<br>• Never force push shared branches |
| **Lost commits** | Hard reset or bad rebase | `git reflog`, find commit, `git reset --hard HEAD@{N}` | • Commit frequently<br>• Push regularly<br>• Check reflog if unsure |
| **Can't push** | Diverged from remote | `git pull --rebase`, resolve conflicts, `git push` | • Pull before push<br>• Rebase instead of merge |
| **Huge PR** | Too many changes at once | Split into smaller PRs | • Commit frequently<br>• Separate features<br>• Review own PR first |
| **Stale branch** | Feature branch outdated | `git fetch origin`, `git rebase origin/main` | • Rebase frequently<br>• Keep PRs small<br>• Merge quickly |
| **Broken main** | Merged failing code | Revert merge: `git revert -m 1 <merge-commit>` | • Require CI to pass<br>• Enforce reviews<br>• Branch protection |

---

## Useful Git Aliases

```bash
# Add to ~/.gitconfig
[alias]
    # Status
    st = status -sb
    
    # Branch
    br = branch
    bra = branch -a
    brd = branch -d
    
    # Checkout
    co = checkout
    cob = checkout -b
    
    # Commit
    ci = commit
    cia = commit -a
    amend = commit --amend --no-edit
    amendm = commit --amend
    
    # Diff
    df = diff
    dfs = diff --staged
    
    # Log
    last = log -1 HEAD --stat
    lg = log --oneline --graph --all --decorate
    lp = log --pretty=format:'%C(yellow)%h%C(reset) - %an, %ar : %s'
    
    # Stash
    stash-all = stash save --include-untracked
    
    # Pull/Push
    sync = !git fetch && git rebase origin/main
    publish = push -u origin HEAD
    
    # Undo
    undo = reset HEAD~1
    unstage = reset HEAD --
    
    # Cleanup
    cleanup = !git branch --merged | grep -v \"\\*\" | xargs -n 1 git branch -d

# Usage:
git st              # git status -sb
git lg              # git log --oneline --graph --all --decorate
git cob feature/x   # git checkout -b feature/x
git amend           # git commit --amend --no-edit
git sync            # git fetch && git rebase origin/main
```

---

## Mantra Application

> **"CID frames version control, SRP isolates concerns, RAO aligns responsibilities, SVO clarifies operations"**

- **CID frames**: Establishes scope (repository management, collaboration, automation), purpose (code quality, history preservation, team coordination), rules (no force-push shared branches, no unreviewed merges, no hardcoded secrets)

- **SRP isolates**: Ensures each commit handles single concern (one feature, one fix), each branch owns focused work (feature branch for feature only), each PR addresses single objective

- **RAO aligns**: Maps Developer (creates commits, opens PRs), Reviewer (checks quality, approves changes), Team Lead (enforces standards, protects branches), DevOps (automates workflows) to their version control deliverables

- **SVO clarifies**: Expresses all operations (Developer commits changes, Reviewer approves pull request, Engineer implements CI pipeline, Manager creates release) with grammatical precision

---

## Quick Reference Card

```
🔴 MUST KNOW:
git config --global user.name/email  │ Set identity
git init                              │ Initialize repo
git clone <url>                       │ Download repo
git status                            │ Check state
git add <file>                        │ Stage changes
git commit -m "message"               │ Save snapshot
git push                              │ Upload commits
git pull                              │ Download updates
git checkout -b <branch>              │ Create branch
git merge <branch>                    │ Integrate changes

🟡 SHOULD KNOW:
git log --oneline --graph             │ View history
git diff                              │ See changes
git stash                             │ Save temporarily
git rebase <branch>                   │ Update branch
git reset HEAD~1                      │ Undo commit
Pull Requests                         │ Code review
GitHub Actions                        │ CI/CD

🟢 NICE TO KNOW:
git cherry-pick <hash>                │ Apply commit
git rebase -i HEAD~N                  │ Edit history
git blame <file>                      │ Line history
git clean -fd                         │ Remove untracked

⚪ ADVANCED:
git reflog                            │ Recover lost work
git filter-branch                     │ Rewrite history
git bisect                            │ Binary search bugs
```

---

**End of GitHub CID Reference Guide**

---

## Prompt_202601180900

https://claude.ai/chat/d51b1770-f439-4b4a-8511-be62efd5e960

### Prompt-01

```
generate `github-cid-reference-guide.md`
```

### Note-01

```
I'll create a CID-formatted version of the GitHub Reference Guide, applying the Context-Intent-Directive framework while maintaining all the practical Git/GitHub command details.I've created a comprehensive **GitHub CID Reference Guide for ML Projects** that applies the Context-Intent-Directive framework to version control and collaboration workflows.

## Key Features:

### **CID Framework Application**
- **Context**: Each phase clearly defines the focus domain (Environment Configuration, Repository Initialization, Daily Development, etc.)
- **Intent**: States the desired principle or goal for each operation
- **Directives**: Three-beat mantras expressing rules in SVO format

### **RAO Accountability Chains**
Defined five key roles with their actions and outcomes:
- **Developer**: Configures environment, creates commits, opens PRs
- **Code Reviewer**: Reviews changes, provides feedback, approves PRs
- **Team Lead**: Establishes workflows, protects branches, manages releases
- **DevOps Engineer**: Implements CI/CD, automates testing, maintains pipelines
- **Project Manager**: Creates issues, organizes work, tracks milestones

### **Seven Phases** with Priority Levels (🔴🟡🟢⚪)

1. **Phase 0: Initial Setup** - Git config, .gitignore, credentials
2. **Phase 1: Repository Creation** - Clone, remote, fork
3. **Phase 2: Basic Workflow** - Status, add, commit, push, pull
4. **Phase 3: Branching & Merging** - Branch, switch, merge, conflicts, rebase
5. **Phase 4: Collaboration** - Pull requests, reviews, merging strategies
6. **Phase 5: GitHub Features** - Actions, Issues, Protection, Projects, Releases
7. **Phase 6: Advanced Operations** - Reset, interactive rebase, blame, search
8. **Phase 7: Troubleshooting** - Restore, reflog, detached HEAD, cleanup

### **Practical Value Preserved**
- Full command syntax with flags and parameters
- Real-world usage examples with bash snippets
- Do/Don't best practices
- FAQ sections
- Comprehensive workflows (Git Flow, Daily Workflow, PR Checklist)
- Common pitfalls with solutions
- Useful aliases

### **Bonus Sections**
- Commit message conventions (feat/fix/docs format)
- Branching strategy (Git Flow with feature/bugfix/hotfix)
- Daily workflow from morning sync to end-of-day
- Complete PR checklist with testing and code quality
- Troubleshooting table with causes and solutions
- Git aliases for productivity

The document maintains universal applicability while providing detailed, actionable guidance for ML project teams using Git and GitHub.
```