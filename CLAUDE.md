# jason9075.github.io — CLAUDE.md

Personal demo gallery. Vanilla JS, no framework. Built with Vite, deployed to GitHub Pages via GitHub Actions.

## Commands

```bash
just dev      # Vite dev server → http://localhost:8080
just build    # production build → dist/
just preview  # preview dist/ locally
just install  # npm install --ignore-scripts (NixOS workaround)
```

All `just` commands call `node --require ./scripts/fix-noexec.cjs` before Vite to work around NixOS noexec restrictions on `/home`. Never invoke `npx vite` directly.

## Directory structure

```
index.html                   # 21-line shell; uses <!-- include: --> directives
src/
  core/
    main.js                  # entry point: imports CSS, calls initGallery()
    core.css                 # all styles (Nord palette)
  data/
    demos.js                 # DEMOS array + GROUPS array
    thumbs.js                # THUMBS object: slug → (accent) => SVG string
  pages/
    header/header.html       # <header> fragment (hero, search, filter chips)
    main/main.html           # <main> fragment (compass rail + content div)
    footer/footer.html       # <footer> fragment
    gallery/gallery.js       # all render functions + event listeners; exports initGallery()
public/
  assets/icons/              # favicons (served as /assets/icons/*)
scripts/
  fix-noexec.cjs             # copies esbuild binary to /tmp; required on NixOS
.github/workflows/deploy.yml # push to master → npm ci → build → deploy Pages
```

## How HTML assembly works

`vite.config.js` defines `htmlAssemblePlugin`. At build time (and dev HMR), it replaces `<!-- include: ./path/to/fragment.html -->` in `index.html` with the file contents. The three fragments map to the three visible regions of the page.

## How to add a new demo

**1. Add an entry to `src/data/demos.js` → `DEMOS` array:**

```js
{
  slug: 'my-demo',          // kebab-case, unique
  group: '3d',              // '3d' | 'vision' | 'math' | 'cs'
  title: 'My Demo Title',
  desc: 'One-sentence description.',
  href: 'https://jason9075.github.io/My-Demo/',
  tags: ['tag1', 'tag2'],
},
```

**2. Add a thumbnail generator to `src/data/thumbs.js` → `THUMBS` object:**

```js
'my-demo': (accent) => {
  // accent = group color hex string, e.g. '#8FBCBB'
  // Must return a self-contained SVG string
  return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
    <rect width="320" height="180" fill="#2E3440"/>
    <!-- draw something using ${accent} -->
  </svg>`;
},
```

If a slug has no entry in `THUMBS`, a plain dark rectangle is shown.

## How to add a new group

Edit both constants in `src/data/demos.js`:

```js
// GROUPS array — order determines display order
{ id: 'new-id', label: 'Display Name', color: '#HEXCOL', short: 'Short' },
```

`short` is shown in the compass rail and card overlay badge. `color` is passed as `accent` to thumbnail generators.

## Render pipeline

`gallery.js` is pure DOM manipulation — no framework, no virtual DOM.

- `render()` — rebuilds chips, rail, and content sections from current `state`
- `state = { q, activeGroup }` — updated by search input and chip clicks
- `setupObserver()` — `IntersectionObserver` that highlights the active rail item while scrolling
- Cards are generated as HTML strings via `renderCard()` and injected with `innerHTML`

Do not split `gallery.js` further. The file is intentionally self-contained.

## Styles

`src/core/core.css` uses CSS custom properties from the [Nord palette](https://www.nordtheme.com/):

| Variable | Value    | Role                  |
|----------|----------|-----------------------|
| `--n0`   | `#2E3440`| page background       |
| `--n1`   | `#3B4252`| card background       |
| `--n4`   | `#D8DEE9`| body text             |
| `--n6`   | `#ECEFF4`| headings              |
| `--n8`   | `#88C0D0`| links / accent        |
| `--n13`  | `#EBCB8B`| search highlight mark |

Group accent colors (`#8FBCBB`, `#B48EAD`, `#EBCB8B`, `#A3BE8C`) are defined in `GROUPS`, not in CSS.

## Deployment

Push to `master` → GitHub Actions runs `.github/workflows/deploy.yml`:
1. `npm ci`
2. `npm run build` (outputs `dist/`)
3. Uploads `dist/` as Pages artifact and deploys

GitHub Pages source must be set to **GitHub Actions** (not branch deploy) in repo Settings → Pages.

`base: '/'` in `vite.config.js` — this is the root `github.io` site, not a project subpath.

## Constraints

- No npm runtime dependencies. `devDependencies` is Vite only.
- No TypeScript, no JSX, no framework — vanilla ES modules throughout.
- `npm install` must always use `--ignore-scripts` to prevent esbuild postinstall from failing on NixOS noexec mounts.
