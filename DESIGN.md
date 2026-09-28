# Design Document — Constellation Homepage

## 1. Project description

A static, front-end-only personal homepage for a computer-vision & machine-learning
engineer. Its job is to introduce the person, show credible proof of work, and
make it effortless to get in touch — while demonstrating clean, standards-based
HTML, CSS, and vanilla ES6.

The visual concept is a **plotter's notebook**: warm graph-paper, heavy
grotesque poster type, and a navy + magenta + cobalt palette. The hero is a
**live regression playground** — click to drop data points and a least-squares
line refits in real time. It is a literal nod to the subject matter (fitting a
model to noisy data) and gives the page a memorable identity without stock
imagery.

**Scope:** four pages (Home, Projects, About, Blog), no backend, no framework,
no component library. Home, Projects, and About are written by the author; the
Blog article is the AI-generated page. Deployed as a public static site.

**Non-goals:** blog CMS, contact form backend, authentication, analytics.

---

## 2. User personas

### Persona A — Maya, the recruiter

- **Age / role:** 34, technical recruiter at a mid-size company.
- **Context:** skims dozens of portfolios a day, often on a laptop between calls.
- **Goals:** quickly judge whether this person's skills fit an open ML role, and
  find a way to contact them.
- **Frustrations:** portfolios that bury the person's actual skills under visual
  noise, or hide the contact details.
- **Needs from the page:** a one-line summary of who this is, a scannable list of
  focus areas, and an obvious contact action.

### Persona B — Dev, the hiring engineer

- **Age / role:** 29, senior ML engineer who will interview the candidate.
- **Context:** wants substance — did this person actually ship anything?
- **Goals:** read a couple of project write-ups and check that the work is real.
- **Frustrations:** vague project cards with no outcome or decision explained.
- **Needs from the page:** project pages with the problem, the approach, and the
  result stated plainly; links to code.

### Persona C — Sam, a fellow student / peer

- **Age / role:** 22, classmate exploring how others built their homepage.
- **Context:** curious about the tech and the "creative addition."
- **Goals:** see the interactive component and understand the build.
- **Frustrations:** sites that are impressive but impossible to learn from.
- **Needs from the page:** a working, delightful demo and a clear README/repo.

---

## 3. User stories

1. **As Maya (recruiter),** I want a one-sentence summary of who this person is
   at the top of the page, so that I can decide in seconds whether to keep
   reading. _(Home hero headline + lede.)_
2. **As Maya,** I want an obvious way to copy the contact email, so that I can
   reach out without hunting. _(Copy-email button with confirmation.)_
3. **As Dev (hiring engineer),** I want to open a projects page and read what
   each project actually achieved, so that I can trust the work is real.
   _(Projects page with problem/approach/result per card.)_
4. **As Dev,** I want to jump straight to a specific project, so that I don't
   scroll past ones I don't care about. _(Anchor links from the home cards to
   `projects.html#id`.)_
5. **As Sam (peer),** I want to interact with the regression playground, so that
   I can experience the creative component. _(Click-to-add-point canvas that
   refits a least-squares line live.)_
6. **As any visitor on my phone,** I want the navigation to collapse into a menu
   I can tap, so that the site is usable on a small screen. _(Accessible mobile
   nav toggle.)_
7. **As a visitor who prefers a darker screen,** I want a dark theme I can switch
   to that is remembered, so that the page is comfortable to use. _(Persisted
   light/dark theme toggle; no ambient motion to distract.)_
8. **As a keyboard or screen-reader user,** I want visible focus, a skip link,
   and alt text, so that I can navigate without a mouse. _(Accessibility baseline.)_
9. **As a power user,** I want to jump anywhere and run actions from the keyboard,
   so that I can move through the site fast. _(⌘K / "/" command palette with
   filtering, arrow-key selection, and Enter to run.)_

---

## 4. Design tokens

- **Palette (light, default):** `--paper #f6f4ee` (warm graph paper),
  `--ink #17203a` (near-black navy), `--hot #ff2e7e` (magenta, data points &
  highlights), `--cool #1f5bd6` (cobalt, the fitted line & links).
- **Palette (dark):** `--paper #0f1320`, `--ink #f1f3f8`, `--hot #ff5b98`,
  `--cool #79a6ff`.
- **Type:** Bricolage Grotesque (characterful display), Hanken Grotesk (highly
  legible body), Space Mono (data labels, equations, nav — only where it is
  genuinely data).
- **Accent strategy:** two accents with distinct jobs — magenta = data,
  cobalt = the model. Deliberately avoids the cream-and-terracotta and
  single-acid-accent-on-black defaults.
- **Signature devices:** a graph-paper background grid, hard 1.5px ink borders,
  and offset drop-shadows (a plotted, printed feel rather than soft SaaS cards).

## 5. Design mockups (wireframes)

### Home (desktop)

```
┌───────────────────────────────────────────────────────────┐
│  ✦ Trupal Patel      Home  Projects  About  Contact   ☀  ☰   │  sticky nav
├───────────────────────────────────────────────────────────┤
│  data · machine learning · MLOps    ┌───────────────────┐   │
│  I fit models to the messy          │ least-squares  [x]│   │  HERO
│  real world.                        │   .·  ·/          │   │
│  [ See my work ] [ Get in touch ]   │  · /·   (live plot)│  │
│                                     │ y=0.6x+12  R²=.94 │   │
│                                     └───────────────────┘   │
├───────────────────────────────────────────────────────────┤
│  ABOUT                                                       │
│  [portrait]   paragraph …                                   │
│               ┌────────┐ ┌────────┐ ┌────────┐              │
│               │  4+    │ │  12    │ │  3     │  stats grid   │
│               └────────┘ └────────┘ └────────┘              │
├───────────────────────────────────────────────────────────┤
│  FOCUS AREAS   [card] [card] [card] [card]   (auto-fit grid)│
├───────────────────────────────────────────────────────────┤
│  FEATURED PROJECTS   [cover]     [cover]     [cover]         │
│                      title       title       title          │
├───────────────────────────────────────────────────────────┤
│  CONTACT   [ Copy email address ]  GitHub  LinkedIn         │
├───────────────────────────────────────────────────────────┤
│  © 2026 Trupal Patel            Built with vanilla HTML/CSS/JS │
└───────────────────────────────────────────────────────────┘
```

### Home (mobile)

```
┌───────────────────────┐
│ ✦ Trupal Patel    ☀  ☰  │
├───────────────────────┤
│  · live plot ·        │
│  headline             │
│  lede                 │
│  [ See my work ]      │
│  [ Get in touch ]     │
├───────────────────────┤
│  ABOUT (stacked)      │
│  [portrait]           │
│  paragraph            │
│  [stat] [stat] [stat] │  (1 col)
├───────────────────────┤
│  cards (1 col) …      │
└───────────────────────┘
tap ☰ → nav list drops down
```

### Projects (desktop)

```
┌───────────────────────────────────────────────┐
│  Projects                                       │
│  intro line                                     │
├───────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐                   │
│  │  cover    │  │  cover    │                    │
│  │  title    │  │  title    │   grid, auto-fill  │
│  │  result   │  │  result   │                    │
│  │  tags     │  │  tags     │                    │
│  │  Code · … │  │  Code · … │                    │
│  └───────────┘  └───────────┘                   │
└───────────────────────────────────────────────┘
```

> For submission, export these as image mockups (Figma / Excalidraw) and place
> them in `images/` if your rubric wants visual mockups; the ASCII wireframes
> above document the intended layout and responsive behaviour.

---

## 6. Design rationale (self-critique)

- **One bold element, quiet everywhere else:** the regression playground is the
  single memorable moment; every other section is calm, bordered, and consistent
  so the hero stands out.
- **Structure encodes meaning:** section labels are written as function calls
  (`about()`, `focus()`, `projects()`) — an on-theme affordance for a data page,
  not generic `01 / 02 / 03` numbering, since the sections are not a sequence.
- **Motion is purposeful:** there is no ambient animation at all; the only motion
  is the plot responding to your clicks (and button hovers). This avoids the
  scattered scroll-reveal effects that read as generated, and it means
  `prefers-reduced-motion` users lose nothing.
- **Chanel's rule:** cut anything that only decorates. The graph paper, borders,
  and offset shadows each signal "plotted/printed"; the palette stays to three
  inks plus paper.
