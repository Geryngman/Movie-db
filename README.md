# 🎬 CineHub

An elegant, mobile-first **movie database app** — discover, search and track films
in a cinematic dark interface. Built with React, TypeScript and Vite.

<p align="center">
  <em>Home · Search · Movie detail · Watchlist · Profile</em>
</p>

## ✨ Features

- **Discover** — an auto-advancing featured hero plus curated rails (Trending,
  Top rated, Animation, Sci-Fi).
- **Search** — instant filtering by title, director, cast or genre, with genre chips.
- **Movie detail** — backdrop, poster, rating, runtime, overview, director & cast,
  and a "More like this" rail.
- **Watchlist & Favorites** — save films with a tap; persisted locally so they
  survive reloads.
- **Profile** — your stats and favorites at a glance.
- **Designed like a native app** — bottom tab bar, phone frame on desktop,
  full-bleed on mobile, smooth transitions, safe-area aware.
- **Works offline** — every poster/backdrop has an elegant gradient fallback, so
  the UI stays polished with or without a network.

## 🧱 Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev/build
- [React Router](https://reactrouter.com/) for navigation
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
├── components/       reusable UI (Poster, MovieCard, Rail, hero, nav, icons)
├── screens/          Home, Search, Watchlist, Profile, MovieDetail
├── context/          LibraryContext — watchlist/favorites + localStorage
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
