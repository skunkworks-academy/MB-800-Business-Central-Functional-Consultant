## Skunkworks Academy HTML course

Public course route: https://microsoft.skunkworksacademy.com/MB-800/

The HTML frontend is maintained in `web/`. It renders the existing lab Markdown,
YAML metadata and downloads without changing the original Jekyll index, theme or
Microsoft Learning packaging pipeline. `web/microsoft-hub.css` is a snapshot of
the Microsoft hub stylesheet; retain its branding and the canonical Academy v10
navigation loader when updating the frontend.

### Build and validate

Requires Node.js 20+ and Python 3:

Use `python3` instead of `python` below if that is your Python 3 executable.

```sh
npm ci --ignore-scripts
npm run build
python web/validate-course.py site
python -m http.server 8000 --directory site
```

Open http://localhost:8000/ to preview. The output is portable static HTML in
`site/` (ignored by Git); no browser JavaScript is required to read the course.
The `Validate MB-800 course site` workflow builds, checks and uploads it on PRs.
This repository does not have GitHub Pages enabled; the public route is served
by the Microsoft hub's existing Pages workflow.

### Publish a content update

1. Build and validate this repository at the desired commit.
2. Copy the **contents** of `site/` into the Microsoft repository's `MB-800/`
   directory, removing obsolete generated files within that directory only.
3. Record the source commit in `MB-800-SOURCE.md` in the Microsoft repository.
4. Run that repository's existing `npm run build` from `AZ-400/web` and its
   `python scripts/validate-course.py AZ-400/web/out/MB-800` check.
5. Merge the course source PR, then the Microsoft publication PR. Its existing
   Pages workflow publishes `/MB-800/`; no DNS or Pages setting changes are needed.

The checked-in publication snapshot makes deployment reproducible and avoids
cross-repository credentials or fetching a moving branch at build time.

---

# MB-800: Business Central Functional Consultant

- **[Download Latest Student Handbook and AllFiles Content](../../releases/latest)**
- **Are you a MCT?** - Have a look at our [GitHub User Guide for MCTs](https://microsoftlearning.github.io/MCT-User-Guide/)
- **Need to manually build the lab instructions?** - Instructions are available in the [MicrosoftLearning/Docker-Build](https://github.com/MicrosoftLearning/Docker-Build) repository

## What are we doing?

- To support this course, we will need to make frequent updates to the course content to keep it current with the Azure services used in the course.  We are publishing the lab instructions and lab files on GitHub to allow for open contributions between the course authors and MCTs to keep the content current with changes in the Azure platform.

- We hope that this brings a sense of collaboration to the labs like we've never had before - when Azure changes and you find it first during a live delivery, go ahead and make an enhancement right in the lab source.  Help your fellow MCTs.

## How should I use these files relative to the released MOC files?

- The instructor handbook and PowerPoints are still going to be your primary source for teaching the course content.

- These files on GitHub are designed to be used in conjunction with the student handbook, but are in GitHub as a central repository so MCTs and course authors can have a shared source for the latest lab files.

- It will be recommended that for every delivery, trainers check GitHub for any changes that may have been made to support the latest Azure services, and get the latest files for their delivery.

## What about changes to the student handbook?

- We will review the student handbook on a quarterly basis and update through the normal MOC release channels as needed.

## How do I contribute?

- Any MCT can submit a pull request to the code or content in the GitHub repro, Microsoft and the course author will triage and include content and lab code changes as needed.

- You can submit bugs, changes, improvement and ideas.  Find a new Azure feature before we have?  Submit a new demo!

## Notes

### Classroom Materials

It is strongly recommended that MCTs and Partners access these materials and in turn, provide them separately to students.  Pointing students directly to GitHub to access Lab steps as part of an ongoing class will require them to access yet another UI as part of the course, contributing to a confusing experience for the student. An explanation to the student regarding why they are receiving separate Lab instructions can highlight the nature of an always-changing cloud-based interface and platform. Microsoft Learning support for accessing files on GitHub and support for navigation of the GitHub site is limited to MCTs teaching this course only.
