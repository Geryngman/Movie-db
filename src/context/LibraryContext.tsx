import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface LibraryState {
  watchlist: number[]
  favorites: number[]
}

interface LibraryContextValue extends LibraryState {
  toggleWatchlist: (id: number) => void
  toggleFavorite: (id: number) => void
  inWatchlist: (id: number) => boolean
  isFavorite: (id: number) => boolean
}

const STORAGE_KEY = 'cinehub.library.v1'

const LibraryContext = createContext<LibraryContextValue | null>(null)

function load(): LibraryState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LibraryState>
      return {
        watchlist: Array.isArray(parsed.watchlist) ? parsed.watchlist : [],
        favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      }
    }
  } catch {
    /* ignore malformed storage */
  }
  return { watchlist: [], favorites: [] }
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LibraryState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be unavailable */
    }
  }, [state])

  const toggle = useCallback((key: keyof LibraryState, id: number) => {
    setState((prev) => {
      const list = prev[key]
      const next = list.includes(id) ? list.filter((x) => x !== id) : [id, ...list]
      return { ...prev, [key]: next }
    })
  }, [])

  const value = useMemo<LibraryContextValue>(
    () => ({
      ...state,
      toggleWatchlist: (id) => toggle('watchlist', id),
      toggleFavorite: (id) => toggle('favorites', id),
      inWatchlist: (id) => state.watchlist.includes(id),
      isFavorite: (id) => state.favorites.includes(id),
    }),
    [state, toggle],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLibrary(): LibraryContextValue {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within a LibraryProvider')
  return ctx
}
