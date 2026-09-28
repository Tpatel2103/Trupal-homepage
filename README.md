# Trupal Jageshkumar Patel's Personal Homepage

A personal homepage for a computer-vision & ML engineer, built with
**vanilla HTML5, CSS3, and ES6 modules** — no frameworks, no component
libraries, no jQuery. The look is an editorial "plotter's notebook": a warm
graph-paper canvas, a Bricolage Grotesque / Hanken Grotesk / Space Mono type
system, and a navy + magenta + cobalt palette. It ships three original,
hand-written interactive features (a regression playground, an orbital sandbox,
and a ⌘K command palette).

- **Live site:** https://tpatel2103.github.io/Trupal-homepage/
- **Repository:** https://github.com/Tpatel2103/Trupal-homepage

---

## Author

**Trupal Jageshkumar Patel** — MS Computer Science, Northeastern University.
[Homepage](https://tpatel2103.github.io/Trupal-homepage/) ·
[GitHub](https://github.com/Tpatel2103) ·
[LinkedIn](https://www.linkedin.com/in/trupal-patel-08a959268) ·
Patel.trupa@northeastern.edu

## Class link

CS5610 Web Development, Northeastern University —
https://northeastern.instructure.com/courses/261032

## Video demonstration

_TODO — paste the link to your ~3-minute narrated demo video (must be public)._
A ready-to-read script is in [`docs/Trupal_Patel_Video_Script.md`](./docs/Trupal_Patel_Video_Script.md).

## Project objective

Build a static, front-end-only homepage that introduces me and my work,
demonstrates clean semantic HTML, organised CSS without `!important`, and
original JavaScript delivered as ES6 modules. The page is accessible, W3C-valid,
and deployed as a public static site.

## Screenshot

![Screenshot of the homepage with the interactive regression playground](./images/screenshot.png)

> **TODO:** replace with a screenshot of the *deployed* page (an animated **GIF**
> is preferred — capture clicking the plot and the line refitting). Save it as
> `images/screenshot.png`; it will appear above.

---

## Deliverables

| Item | Where |
| --- | --- |
| Live site | https://tpatel2103.github.io/Trupal-homepage/ |
| Source code | this repository |
| Design document | [`docs/Trupal_Patel_Design_Document.pdf`](./docs/Trupal_Patel_Design_Document.pdf) · source: [`DESIGN.md`](./DESIGN.md) |
| Presentation | [`docs/Trupal_Patel_Presentation.pptx`](./docs/Trupal_Patel_Presentation.pptx) (import into Google Slides, make public) |
| Video script | [`docs/Trupal_Patel_Video_Script.md`](./docs/Trupal_Patel_Video_Script.md) |
| Video demo | _add public link above_ |
| Code review | GitHub Pull Request with assigned reviewer |

---

## Project structure

```
.
├── index.html          # Home page
├── projects.html       # Projects page (2nd URL)
├── about.html          # About — my career journey (written by me)
├── blog.html           # Short article (the AI-generated page)
├── css/
│   └── styles.css      # All styles: tokens, layout, components (no !important)
├── js/
│   ├── main.js         # ES6 entry module (type="module")
│   ├── regression.js   # Original component #1 (interactive least-squares plot)
│   ├── orbit.js        # Original component #2 (space gravity sandbox)
│   ├── palette.js      # Original component #3 (⌘K command palette)
│   ├── theme.js        # Light/dark theme toggle + persistence
│   ├── nav.js          # Accessible mobile navigation
│   └── contact.js      # Copy-email-to-clipboard
├── images/             # SVG assets + project/about images
├── docs/               # Design document, presentation, video script
├── package.json        # "type": "module", scripts, dev dependencies
├── eslint.config.js    # Class ESLint config (runs Prettier via ESLint)
├── .prettierrc         # Prettier formatting config
├── LICENSE             # MIT
├── DESIGN.md           # Design document (source)
└── README.md
```

## Instructions to build & run

No build step is required — it is a static site. To preview locally you need a
static server (ES modules must be served over HTTP, not opened via `file://`).

```bash
npm install          # dev tooling: eslint, prettier, serve
npm start            # serve locally at http://localhost:3000
npm run lint         # lint the JavaScript
npm run format       # apply Prettier
```

Any static server works — e.g. `python3 -m http.server` — as long as the page is
served over HTTP.

### Deploying (GitHub Pages)

Push to the repo, then **Settings → Pages → Deploy from a branch → `main` →
`/(root)`**. The live URL appears at the top of that page.

---

## Original components

Three original, hand-written vanilla-JS features (no libraries):

**1. Regression playground** (`js/regression.js`) — the hero. Click/tap the plot
to add data points; a **least-squares line** refits in real time with a live
equation, R², and point count.

**2. Orbital sandbox** (`js/orbit.js`) — a space-themed two-body **gravity
simulator**. Drag to launch a satellite (the drag vector sets its velocity) or
tap for a circular orbit; satellites feel the planet's gravity, trail over a
starfield, and are removed when they crash or escape. Real inverse-square
physics with sub-stepped integration, theme-aware, with a reduced-motion
fallback.

**3. Command palette** (`js/palette.js`) — press **⌘K / Ctrl-K** (or **/**) to
open a keyboard-driven menu on every page: navigate, jump to sections, toggle the
theme, copy the email, and fire commands into the plot and orbit sandbox.

## Accessibility & standards

- Semantic HTML5; real `<button>` elements, never `div`/`span` stand-ins.
- Every `<img>` has meaningful `alt`; canvases have `role` + `aria-label`; live
  readouts use `aria-live`.
- Visible keyboard focus, a skip link, `aria` state on controls, reduced-motion
  respected.
- Targets zero errors at <https://validator.w3.org/>.
- CSS uses classes, Grid + Flexbox, and no `!important`.

---

## Use of generative AI tools

| Item | Detail |
| --- | --- |
| Tool / model | Claude (Anthropic) |
| How it was used | Scaffolding the project, drafting the CSS/JS, and writing the article on `blog.html` |
| The AI-generated page | `blog.html` — the article text was written by the model and reviewed for accuracy |
| Written by me (not AI) | `index.html`, `projects.html`, `about.html` |

**Example prompt used for the AI page (blog):**

> "Write a short, honest blog article for a computer-vision portfolio titled
> 'Getting computer vision onto the edge'. Cover why edge deployment is hard,
> techniques like quantisation and pruning, and why latency and model size
> matter as much as accuracy. Plain, no marketing, a few short sections."

All AI-generated content was reviewed before inclusion.

---

## Submission checklist

- [x] Deployed public site (GitHub Pages)
- [x] Source on GitHub with README + MIT license
- [x] ≥ 2 authored pages + 1 AI page (index, projects, about + blog)
- [x] Original vanilla-JS features (three of them)
- [x] Organised css / js / images folders; `type: "module"`
- [x] Design document (`docs/`)
- [x] Presentation (`docs/`) — import to Google Slides and make public
- [ ] Record the ~3-min public video and paste the link above
- [ ] Replace `images/screenshot.png` with a real screenshot / GIF
- [ ] Run `npm run format` and `npm run lint`
- [ ] Validate each page at validator.w3.org
- [ ] Complete the code-review Pull Request

## License

[MIT](./LICENSE)
