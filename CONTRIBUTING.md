# Contributing to UDSM Startup Incubator Portal

Thank you for your interest in contributing to the UDSM Startup Incubator Portal! This document will guide you through the contribution process.

## 📋 Table of Contents
- [Development Workflow](#-development-workflow)
- [Page Assignments](#-page-assignments)
- [Code Style Guidelines](#-code-style-guidelines)
- [Git Workflow](#-git-workflow)
- [Commit Message Guidelines](#-commit-message-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Local Development Setup](#-local-development-setup)
- [Testing](#-testing)
- [Code Review Process](#-code-review-process)
- [Contact](#-contact)

## 🛠 Development Workflow

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/udsm-startup-incubator.git
   cd udsm-startup-incubator
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/yourname-pagename
   # Example: git checkout -b feature/john-pitch-page
   ```

3. **Work on your assigned page**
   - Follow the project structure
   - Keep commits focused and atomic
   - Write clear commit messages

4. **Keep your branch updated**
   ```bash
   git pull origin main
   ```

5. **Push your changes**
   ```bash
   git push -u origin your-branch-name
   ```

6. **Create a Pull Request (PR)**
   - Open a PR against the `main` branch
   - Add a clear title and description
   - Reference any related issues
   - Request reviews from team members

## 📄 Page Assignments

| Page | Assigned To | Status | Branch |
|------|------------|--------|--------|
| Home Page | John Ruhumbika Mtumba (Lead) | ✅ Completed | `master` |
| Pitch Page | Timothy Amani | 📝 To Do | `feature-timothy-pitch-page` |
| Mentorship Page | Rahel Msendo | 📝 To Do | `feature-rahel-mentorship-page` |
| Funding Page | Baraka Mugisha John | 📝 To Do | `feature-baraka-funding-page` |
| Success Stories | Jaqueline Enock | 📝 To Do | `feature-jaqueline-stories-page` |
| Workshops | Emmanuel Daniel Juma | 📝 To Do | `feature-emmanuel-workshops-page` |
| Co-working Spaces | Bihindu Adam | 📝 To Do | `feature-bihindu-spaces-page` |
| Legal Guidance | Andrew Asson Malisa | 📝 To Do | `feature-andrew-legal-page` |
| Market Research | Samson Sostenes Masatu | 📝 To Do | `feature-samson-research-page` |
| Investors | Elisha Jeremiah Kulwa | 📝 To Do | `feature-elisha-investors-page` |

## 🎨 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Follow the existing indentation (2 spaces)
- Always include proper alt text for images
- Use kebab-case for file and folder names

### CSS
- Use CSS custom properties (variables) for theming
- Follow BEM (Block Element Modifier) methodology
- Mobile-first responsive design approach
- Keep selectors specific but not overly nested

### JavaScript
- Use modern ES6+ syntax
- Use `const` and `let` instead of `var`
- Use arrow functions for callbacks
- Follow the existing code style and patterns

## 🔄 Git Workflow

1. **Branch Naming Conventions**
   - `feature/yourname-pagename` - New features
   - `bugfix/description` - Bug fixes
   - `hotfix/description` - Critical production fixes
   - `docs/description` - Documentation updates

2. **Commit Message Guidelines**
   ```
   type(scope): Short description (50 chars or less)
   
   More detailed explanatory text, if necessary. Wrap it to about 72
   characters or so. In some contexts, the first line is treated as the
   subject of the commit and the rest of the text as the body.
   ```

   **Commit Types:**
   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Formatting, missing semi-colons, etc.
   - `refactor`: Code change that neither fixes a bug nor adds a feature
   - `perf`: Performance improvements
   - `test`: Adding missing tests
   - `chore`: Changes to the build process or auxiliary tools

## 🔍 Pull Request Process

1. Ensure all tests pass
2. Update the README.md with details of changes if needed
3. Ensure your code follows the style guidelines
4. Request reviews from at least two team members
5. Address all review comments
6. Get approval from at least one maintainer before merging

## Commit and Push to GitHub

### Step 1: Preview Your Changes
Before committing, always preview your changes:

```bash
# See all modified files
git status

# See exact changes in files
git diff

# To see changes in a specific file
git diff path/to/file

# To see staged changes
git diff --staged
```

### Step 2: Add and Commit Changes
```bash
# Add specific files
git add filename1 filename2

# Or add all changes
git add .

# Check what's staged
git status

# Commit with a descriptive message
git commit -m "type(scope): brief description"

# Example commit messages:
# "feat(home): add hero section with responsive design"
# "fix(nav): correct mobile menu toggle functionality"
# "style(buttons): update primary button colors"
# "docs(readme): update installation instructions"

# Push to GitHub
git push origin your-branch-name
```

### Commit Message Guidelines
Follow this format for commit messages:
```
type(scope): brief description (50 chars or less)

More detailed explanation if needed. Wrap it to about 72 characters.
- Use bullet points if needed
- Keep it clear and concise

Fixes #123  # Reference issue number if applicable
```

**Common Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests
- `chore`: Updating build tasks, package manager configs, etc.

**Examples of good commit messages:**
```
feat(home): add animated hero section with call-to-action

- Add smooth scroll animation
- Implement responsive design
- Update button styling

Fixes #45
```

```
fix(auth): resolve login form submission error

- Add form validation
- Fix API endpoint URL
- Add error handling

Closes #32
```

## � Local Development Setup

1. **Prerequisites**
   - Node.js (v16 or higher)
   - Git
   - A modern web browser

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   This will start a local development server at `http://localhost:3000`

## 🧪 Testing

- Write unit tests for new features
- Test across different browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design on various screen sizes
- Ensure accessibility standards are met

## 👥 Code Review Process

1. **Reviewers should check for:**
   - Code quality and readability
   - Adherence to project standards
   - Potential security issues
   - Performance considerations
   - Browser compatibility

2. **Review Etiquette:**
   - Be constructive and respectful
   - Explain the "why" behind suggestions
   - Keep feedback actionable
   - Acknowledge good practices

## 📅 Weekly Sync

- Every Monday at 10:00 AM EAT
- Discuss progress and blockers
- Plan for the upcoming week

## 📞 Contact

For any questions or clarifications, please contact:
- Project Lead: JOHN, RUHUMBIKA MTUMBA - ruhumbikamtumbajohn@gmail.com
- Technical Lead: Andrew Asson Malissa - andreaasson95@gmail.com

## 🙏 Thank You!

Your contributions help make the UDSM Startup Incubator Portal better for everyone. Thank you for your time and effort!

---
*Last Updated: December 25, 2025*