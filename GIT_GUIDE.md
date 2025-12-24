# Git Guide for UDSM Startup Incubator

This guide provides essential Git commands and workflows for the UDSM Startup Incubator project.

## Table of Contents
- [Getting Started](#-getting-started)
- [Basic Workflow](#-basic-workflow)
- [Branch Management](#-branch-management)
- [Undoing Changes](#-undoing-changes)
- [Remote Repositories](#-remote-repositories)
- [Collaboration](#-collaboration)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/[username]/udsm-startup-incubator.git
cd udsm-startup-incubator
```

### Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 🔄 Basic Workflow

### Check Status
```bash
git status
```

### Stage Changes
```bash
git add filename.html       # Stage specific file
git add .                   # Stage all changes
git add -A                  # Stage all changes including deletions
```

### Commit Changes
```bash
git commit -m "feat: add navigation to pitch page"
```

### Push Changes
```bash
git push origin your-branch-name
```

## 🌿 Branch Management

### Create and Switch to New Branch
```bash
git checkout -b feature/yourname-pagename
```

### List All Branches
```bash
git branch           # Local branches
git branch -a        # All branches (including remote)
```

### Switch Between Branches
```bash
git checkout branch-name
```

### Delete Branch
```bash
git branch -d branch-name     # Safe delete (only if merged)
git branch -D branch-name     # Force delete
```

## ⏪ Undoing Changes

### Discard Unstaged Changes
```bash
git restore filename         # Discard changes in working directory
git restore .                # Discard all unstaged changes
```

### Unstage File
```bash
git restore --staged filename
```

### Amend Last Commit
```bash
git commit --amend           # Edit last commit message
git commit --amend --no-edit # Add changes to last commit
```

### Reset to Previous Commit
```bash
git reset --hard HEAD^       # Discard last commit and all changes
git reset --soft HEAD^       # Undo commit but keep changes staged
```

## 🌐 Remote Repositories

### Add Remote
```bash
git remote add origin https://github.com/username/repo.git
```

### Fetch and Pull
```bash
git fetch origin
git pull origin main         # Pull latest changes from main
git pull origin your-branch  # Pull latest changes from your branch
```

### Update Your Branch with Main
```bash
git checkout main
git pull origin main
git checkout your-branch
git merge main
```

## 👥 Collaboration

### Fork and Clone (For Contributors)
1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/udsm-startup-incubator.git
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-owner/udsm-startup-incubator.git
   ```
4. Sync your fork:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git push origin main
   ```

### Resolve Merge Conflicts
1. Open the files with conflicts
2. Look for `<<<<<<<`, `=======`, and `>>>>>>>` markers
3. Edit the files to resolve conflicts
4. Add the resolved files:
   ```bash
   git add filename
   ```
5. Complete the merge:
   ```bash
   git commit -m "Merge branch 'main' into your-branch"
   ```

## 🏆 Best Practices

### Commit Messages
- Use the format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Keep the first line under 50 characters
- Use present tense ("add" not "added")

### Branch Naming
- `feature/yourname-pagename` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates

### Frequency
- Commit often, push regularly
- Keep commits focused and atomic
- Never commit sensitive information

## 🚨 Troubleshooting

### View Logs
```bash
git log --oneline          # Compact view
git log --graph --oneline  # Visual branch history
```

### Recover Deleted Branch
```bash
git reflog                 # Find the commit hash
git checkout -b branch-name commit-hash
```

### Reset to Remote Branch
```bash
git fetch origin
git reset --hard origin/your-branch
```

### Clean Untracked Files
```bash
git clean -n  # Preview files to be removed
git clean -f  # Remove untracked files
```

## 📚 Additional Resources
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---
*Last Updated: December 24, 2025*