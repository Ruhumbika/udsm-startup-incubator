<p align="center"><img src="assets/readme/cover.svg" alt="UDSM Startup Incubator Portal" width="100%"></p>

<p align="center"><img alt="HTML + CSS" src="https://img.shields.io/badge/HTML%20%2B%20CSS-142632?style=flat-square&amp;labelColor=142632&amp;color=ffca7b"> <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-142632?style=flat-square&amp;labelColor=142632&amp;color=ffca7b"> <img alt="JSON" src="https://img.shields.io/badge/JSON-142632?style=flat-square&amp;labelColor=142632&amp;color=ffca7b"></p>

[Team contributions](CONTRIBUTING.md) · [Browse the homepage](index.html)

I served as project lead and developed the homepage for this academic team project. The portal brings student startup resources into a shared frontend, with separate page assignments across the team.

### My contribution

| Contribution | Scope |
| :--- | :--- |
| **My contribution** | Project leadership and homepage development. |
| **Frontend scope** | Resource pages, filters and shared interactions. |
| **Team delivery** | Page ownership and a shared Git workflow. |

**Scope:** collaborative frontend prototype using local JSON datasets.

<details>
<summary><strong>Developer setup & technical reference</strong></summary>

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

</details>

---

Built by [Ruhumbika Mtumba John](https://github.com/Ruhumbika) with the Group 18 team · [Engineering portfolio](https://johnportifolio.rjaybarber.shop)
