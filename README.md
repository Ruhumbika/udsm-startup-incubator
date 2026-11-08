# UDSM Startup Incubator Portal

A collaborative academic frontend project for presenting startup resources to University of Dar es Salaam students. Built by Group 18 with separate page assignments and a shared Git workflow.

**Focus:** responsive frontend development, reusable JavaScript modules and team collaboration.

## Project scope

This repository contains HTML pages, CSS, JavaScript and local JSON datasets. It is a frontend prototype rather than a deployed backend service. The source does not establish a production authentication system, transactional database or live funding platform.

## Included areas

- Startup idea and pitch submission interfaces.
- Mentorship and funding information.
- Investor directory and filtering interfaces.
- Workshops, research, legal resources, spaces and startup stories.
- Shared navigation, validation, counters and calculator modules.

## Contribution context

The project contribution guide records Ruhumbika's lead/homepage assignment alongside the other team members' page assignments. See [CONTRIBUTING.md](CONTRIBUTING.md) for that context; this repository represents collaborative work.

## Stack

HTML, CSS, JavaScript and JSON. GitHub Actions provides repository checks. The checked-in workflow verifies repository files and the absence of `.gitmodules`; it is not an application test suite.

## Run locally

```bash
git clone https://github.com/Ruhumbika/udsm-startup-incubator.git
cd udsm-startup-incubator
python3 -m http.server 8000
```

Open `http://localhost:8000`. Serving over HTTP allows the pages to load their local JSON and JavaScript resources.

## Repository guide

| Path | Contents |
| --- | --- |
| [`index.html`](index.html) | Homepage |
| [`pages/`](pages/) | Topic pages |
| [`styles/`](styles/) | Shared and page-specific styles |
| [`js/`](js/) | Page behaviour and interactions |
| [`scripts/`](scripts/) | Shared frontend modules |
| [`data/`](data/) | Local JSON datasets |
| [`.github/workflows/`](.github/workflows/) | Repository automation |

The included [LICENSE](LICENSE) applies to the repository.
