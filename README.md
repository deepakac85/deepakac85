# Deepak Arathil Candoth — personal site

A static personal landing page for GitHub Pages. Dark editorial styling, a scroll-driven particle field, selected engineering impact, career history, and a downloadable resume. All assets are local: no build step, tracking, API keys, or external runtime requests.

## Preview

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this directory and visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a public repository named `deepakac85.github.io` under the `deepakac85` account. If it already exists, review its current content before replacing files.
2. Upload the **contents** of this directory to the repository root, preserving the `assets` folder. Include `.nojekyll`.
3. In the repository, open **Settings → Pages**. Set the source to **Deploy from a branch**, choose **main**, and choose **/ (root)**. Save.
4. Once GitHub finishes deploying, the page will be at `https://deepakac85.github.io/`.

For a project repository, use the same files and settings; the URL will include the repository name. Asset paths are relative so both layouts work.

## Customize

- `index.html`: biography, links, career timeline, selected work, SEO metadata.
- `styles.css`: palette, typography, responsive layout, decorative diagrams.
- `script.js`: particle count, scroll thresholds, drift speed, and reduced-motion behavior.
- `assets/Deepak-Arathil-Candoth-Resume.pdf`: replace to update the downloadable resume.

Engineering outcomes and career information come from the supplied resume. No public project repositories are invented. GitHub and LinkedIn links point to the provided profiles. Publishing this folder makes the included resume publicly downloadable.

## Accessibility & performance

Semantic sections, skip link, visible keyboard focus, native expandable work details, reduced-motion support, and a pause control. Decorative particles are hidden from assistive technology. The render loop stops when the field is invisible, drift is paused, or the tab is hidden. Mobile renders fewer particles; pixel density is capped at 2.

## Dependencies & credits

- Motion 12.23.24, MIT — vendored at `assets/motion.js`; see `assets/MOTION-LICENSE.txt`.
- Geist font, SIL Open Font License — `assets/GEIST-OFL.txt`.
- Newsreader font, SIL Open Font License — `assets/NEWSREADER-OFL.txt`.

Inspired by the visual direction discussed in chat; this is an original portfolio design.
