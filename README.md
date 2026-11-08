# UDSM Startup Incubator Portal

An academic team project that brings startup resources, mentorship information and student venture tools into a single frontend portal.

I served as project lead and developed the homepage. The team worked on separate page assignments through a shared Git workflow.

## Project scope

Frontend prototype built with HTML, CSS, JavaScript and local JSON datasets.

## Included areas

- Startup idea and pitch submission interfaces.
- Mentorship and funding information.
- Investor directory and filtering interfaces.
- Workshops, research, legal resources, spaces and startup stories.
- Shared navigation, validation, counters and calculator modules.

## Contribution context

Page ownership and team responsibilities are recorded in [CONTRIBUTING.md](CONTRIBUTING.md).

## Stack

HTML, CSS, JavaScript and JSON, with GitHub Actions for repository structure checks.

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
