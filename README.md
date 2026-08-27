# Minagrphx — Studio Site

A static, dependency-free portfolio site for Minagrphx. Plain HTML, CSS and vanilla JavaScript only — no build step, no framework, no server.

## Structure

```
index.html          Home
work.html            Work (portfolio grid, filterable)
about.html           About
contact.html         Contact
assets/css/style.css All styles
assets/js/main.js    All behaviour (nav, grid overlay, filtering, modal, form)
assets/img/          Favicon
```

## Editing content

- **Projects**: edit the `PROJECTS` array at the top of `assets/js/main.js`. Each entry needs a title, category, year, grid coordinate, size (`wide` / `narrow` / `tall` / `square`), summary, role, client and a `pattern` key (see `svgFor()` for the available abstract art patterns, or add your own SVG/image).
- **Real photography**: to swap the generated SVG tiles for real images, replace the `.p-cell__art` inner HTML with an `<img>` tag pointing at a file in `assets/img/`.
- **Email / socials**: update the `mailto:` links and the placeholder `#` social links in the footer and on the contact page.
- **Copy**: all headline and body copy lives directly in the HTML files.

## Signature interaction

The site exposes its own grid: click the "Grid" button (bottom right) or press **G** to toggle the underlying column/baseline guides and a coordinate-tracking crosshair cursor — a nod to the studio's own working method.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push this entire folder's contents to the repository root (or to a `/docs` folder if you prefer).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", choose the branch (e.g. `main`) and the folder (`/root` or `/docs`).
5. Save. GitHub will publish the site at `https://<username>.github.io/<repo-name>/`.

No build step is required — the files are served as-is.

## Browser support

Uses `IntersectionObserver`, CSS `clamp()`, `aspect-ratio` and `backdrop-filter`. All are supported in current versions of Chrome, Firefox, Safari and Edge. The site respects `prefers-reduced-motion` and falls back gracefully (content is simply shown, unanimated) if `IntersectionObserver` is unavailable.
