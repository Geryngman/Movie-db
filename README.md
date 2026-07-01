# 🎬 CineHub

An elegant, mobile-first **movie database app** — discover, search and track films
in a cinematic dark interface. Built with React, TypeScript and Vite.

**▶ Live app: https://geryngman.github.io/Movie-db/** — open it on your phone and
install it to your home screen (see [Install it as an app](#-install-it-as-an-app)).

<p align="center">
  <em>Home · Search · Movie detail · Watchlist · Profile</em>
</p>

## ✨ Features

- **Discover** — an auto-advancing featured hero plus curated rails (Trending,
  Top rated, Animation, Sci-Fi).
- **Search** — instant filtering by title, director, cast or genre, with genre chips.
- **Movie detail** — backdrop, poster, rating, runtime, overview, director & cast,
  and a "More like this" rail.
- **Full CRUD** — add your own movies (floating **+** button on Home), edit any
  movie, and delete them (with confirmation). All additions, edits and deletions
  are saved locally and layered over the built-in catalogue.
- **Watchlist & Favorites** — save films with a tap; persisted locally so they
  survive reloads.
- **Profile** — your stats and favorites at a glance.
- **Designed like a native app** — bottom tab bar, phone frame on desktop,
  full-bleed on mobile, smooth transitions, safe-area aware.
- **Installable (PWA)** — add it to your home screen and launch it full-screen
  like a native app, with an offline-capable service worker.
- **Works offline** — the app shell is precached, and every poster/backdrop has
  an elegant gradient fallback, so the UI stays polished with or without a network.

## 📲 Install it as an app

CineHub is a **Progressive Web App**, so it installs straight from the browser —
no app store required. It's already hosted for you on GitHub Pages.

### On an Android phone (Chrome)

1. Open **https://geryngman.github.io/Movie-db/** in Chrome.
2. Tap the **Install** banner at the bottom (or the **⋮** menu → **Install app** /
   **Add to Home screen**).
3. Confirm **Install**. CineHub now has its own icon in your app drawer and
   launches full-screen like a native app.

### On an iPhone/iPad (Safari)

1. Open the link in **Safari**.
2. Tap the **Share** button → **Add to Home Screen** → **Add**.

### On a computer (Chrome/Edge)

Open the link and click the **install icon** in the address bar.

### Hosting it yourself

Every push to the app branch triggers `.github/workflows/deploy.yml`, which builds
the app and publishes `dist/` to GitHub Pages automatically. To run it locally
instead:

```bash
npm run build && npm run preview
```

## 🧱 Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev/build
- [React Router](https://reactrouter.com/) for navigation
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) for the installable PWA
- No UI framework — a hand-crafted CSS design system (`src/index.css`)

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # preview the production build
```

Open the app in your browser and, for the best experience, use your browser's
device toolbar (mobile view) — or just resize the window narrow.

## 📁 Project structure

```
src/
├── components/       reusable UI (Poster, MovieCard, Rail, hero, nav, icons, install prompt)
├── screens/          Home, Search, Watchlist, Profile, MovieDetail, MovieForm
├── context/          MoviesContext — CRUD store; LibraryContext — watchlist/favorites
├── data/movies.ts    curated film catalogue
├── lib/images.ts     TMDB image URL helpers
├── types.ts          shared types
├── App.tsx           routing + phone shell
└── index.css         design tokens + all styling
```

## 🖼️ Movie data

The app ships with a curated catalogue of acclaimed films in `src/data/movies.ts`.
Poster and backdrop images are loaded from TMDB's public image CDN; when an image
is unavailable, each film falls back to a bespoke gradient so the interface always
looks intentional.

### Swapping in a live API

The image helpers in `src/lib/images.ts` already target TMDB. To go fully live you
can replace the static `MOVIES` array with calls to the
[TMDB API](https://developer.themoviedb.org/) (requires a free API key) — the
component layer only depends on the `Movie` type, so screens won't need to change.

---

Built with care for a smooth, elegant mobile experience.
