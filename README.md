# Plotter's Notebook — Homepage

A personal homepage for a computer-vision & ML engineer, built with
**vanilla HTML5, CSS3, and ES6 modules** — no frameworks, no component
libraries, no jQuery. The look is an editorial "plotter's notebook": a warm
graph-paper canvas, a distinctive Bricolage Grotesque / Hanken Grotesk type system, and a navy + magenta + cobalt
palette. The signature feature is a **live regression playground** in the hero:
click to drop data points and a least-squares line refits in real time with a
running equation and R².

> **Live site:** _TODO — paste your deployed URL here (GitHub Pages / Netlify / Vercel)._

---

## Author

**Trupal Patel** — MS Computer Science, Northeastern University.
[Homepage](https://YOUR-USERNAME.github.io/homepage/) ·
[LinkedIn](https://www.linkedin.com/in/trupal-patel-08a959268) ·
Patel.trupa@northeastern.edu

_(Replace the Homepage link with your deployed URL, and add your GitHub link.)_

## Class link

CS5610 Web Development, Northeastern University —
_TODO: paste the link to your course page here._

## Video demonstration

_TODO — paste the link to your ~3-minute narrated demo video (must be public)._

## Project objective

Build a static, front-end-only homepage that introduces me and my work,
demonstrates clean semantic HTML, organised CSS without `!important`, and
original JavaScript delivered as ES6 modules. The page must be accessible,
W3C-valid, and deployable as a public static site.

## Screenshot

![Screenshot of the homepage with the interactive regression playground](./images/screenshot.png)

> **TODO:** replace with a screenshot of your deployed page (an animated **GIF**
> is preferred — capture yourself clicking the plot to add points and watching
> the line refit). Save it as `images/screenshot.png` (or `.gif` and update the
> path); it will appear above.

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
├── images/             # SVG assets (favicon, avatar, project covers)
├── package.json        # "type": "module", scripts, dev dependencies
├── eslint.config.js    # Lint config (swap for your class config if provided)
├── .prettierrc         # Prettier formatting config
├── LICENSE             # MIT
└── README.md
```

## Instructions to build & run

No build step is required — it is a static site. To preview locally you need a
static server (ES modules must be served over HTTP, not opened via `file://`).

```bash
# 1. Install dev tooling (eslint, prettier, serve)
npm install

# 2. Serve locally at http://localhost:3000
npm start

# 3. Lint the JavaScript
npm run lint

# 4. Check / apply Prettier formatting
npm run format:check
npm run format
```

Any static server works — e.g. `python3 -m http.server` — as long as the page
is served over HTTP.

### Deploying (public page)

- **GitHub Pages:** push to a repo, then Settings → Pages → deploy from the root.
- **Netlify / Vercel:** drag the folder in, no build command, publish directory
  is the project root.

---

## Original components

Three original, hand-written vanilla-JS features (no libraries):

**1. Regression playground** (`js/regression.js`) — the hero. It draws a scatter
plot on `<canvas>`, lets you click/tap to add data points, and refits a
**least-squares line** in real time with a live equation, R², and point count.

**2. Orbital sandbox** (`js/orbit.js`) — a space-themed two-body **gravity
simulator**. Drag to launch a satellite (the drag vector sets its velocity) or
tap for a circular orbit; satellites feel the planet's gravity, trail behind
them over a starfield, and are removed when they crash or escape. Real physics
(inverse-square gravity, sub-stepped integration), theme-aware, with a static
fallback for reduced-motion users.

**3. Command palette** (`js/palette.js`) — press **⌘K / Ctrl-K** (or **/**) to
open a keyboard-driven menu on every page. Type to filter, arrow keys to move,
Enter to run. It navigates, toggles the theme, copies the email, and fires
commands into the plot and the orbit sandbox via custom events.

Each is well over five lines and uses no external code.

## Accessibility & standards

- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`);
  real `<button>` elements, never `div`/`span` stand-ins.
- Every `<img>` has a meaningful `alt`; the interactive canvas has a `role` and
  `aria-label`, and the readout is an `aria-live` status region.
- Visible keyboard focus, a skip link, and `aria` state on interactive controls.
- W3C validity target: passes <https://validator.w3.org/> with no errors.
- CSS uses classes to identify elements, CSS grid + flexbox for layout, and no
  `!important`.

---

## Use of generative AI tools

Per the assignment, here is a full disclosure of GenAI use.

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

All AI-generated content was reviewed and edited before inclusion. Replace the
persona details with your own facts and update this section to reflect exactly
what you used.

---

## Personalize this template (checklist)

Search the project for `TODO` and update:

- [ ] Your name (HTML `<title>`, `meta[name=author]`, brand, footer, LICENSE, package.json)
- [ ] `meta[name=description]` on each page
- [ ] Real email in `index.html` (`data-email` on the copy button)
- [ ] GitHub / LinkedIn links
- [ ] Project write-ups and stats with your real work
- [ ] Courses and hobbies sections on `index.html`
- [ ] `images/screenshot.png` (a GIF is preferred) for the README
- [ ] Live site URL, class link, and **video demo link** above
- [ ] Author link points to your deployed homepage
- [ ] `about.html` is your own career journey; tweak wording as you like

## License

[MIT](./LICENSE)
# Trupal-homepage
