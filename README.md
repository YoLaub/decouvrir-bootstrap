# Découvrir Bootstrap

Course companion site for a one-day Bootstrap 5.3 introduction (CDA training): one page
per topic, with live HTML/CSS editors whose preview runs Bootstrap, plus a self-check.

Live site (once published): https://yolaub.github.io/decouvrir-bootstrap/

## Develop

```bash
npm install
npm run dev     # copies Bootstrap into public/vendor, then starts the dev server
npm test        # unit tests (preview document builder, page navigation)
npm run build   # static site in dist/
```

Bootstrap is self-hosted (`scripts/copy-vendor.mjs` copies the files from `node_modules`
at build time), so the course keeps working on a network that blocks CDNs. Each preview
is a sandboxed `iframe` built from the learner's HTML.
Pushing to `main` deploys through GitHub Actions.

## Adding a page

Create `src/pages/<slug>.astro` and add the slug to `src/lib/pages.ts`, which drives the
index and the previous/next navigation.

## Sprint Agence (hands-on activity)

The activity lives under `/tp/`: a hub, rounds 0 to 2 chained with previous/next buttons,
and two pages released on demand (`manche-3`, `jeu-des-erreurs`) that are linked from
nowhere, so the trainer shares the URL when the round starts (see `src/lib/tp.ts`).
Answer keys, scoring and observation grid are trainer-only and never committed here;
a test guards the pages against those words. Pages carry `noindex`.
