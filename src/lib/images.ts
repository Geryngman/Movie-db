// Helpers for building TMDB image URLs from a stored path.
// These use TMDB's public image CDN — no API key required for images.
const TMDB_IMG = 'https://image.tmdb.org/t/p'

export function posterUrl(path?: string, size: 'w342' | 'w500' = 'w500'): string | undefined {
  if (!path) return undefined
  return `${TMDB_IMG}/${size}${path}`
}

export function backdropUrl(path?: string, size: 'w780' | 'w1280' = 'w1280'): string | undefined {
  if (!path) return undefined
  return `${TMDB_IMG}/${size}${path}`
}
