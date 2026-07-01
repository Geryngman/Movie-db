import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Movie } from '../types'
import { MOVIES } from '../data/movies'

// Fields a user can supply when creating or editing a movie. `id` is managed
// internally; poster/backdrop image paths are omitted (user movies use the
// gradient poster fallback), everything else is editable.
export type MovieInput = Omit<Movie, 'id' | 'posterPath' | 'backdropPath'>

interface PersistedState {
  added: Movie[] // movies the user created
  edited: Record<number, Partial<Movie>> // per-id overrides for any movie
  deleted: number[] // ids removed by the user
}

interface MoviesContextValue {
  movies: Movie[]
  getMovie: (id: number) => Movie | undefined
  addMovie: (input: MovieInput) => number
  updateMovie: (id: number, input: MovieInput) => void
  deleteMovie: (id: number) => void
  isCustom: (id: number) => boolean
}

const STORAGE_KEY = 'cinehub.movies.v1'
const MoviesContext = createContext<MoviesContextValue | null>(null)

function load(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const p = JSON.parse(raw) as Partial<PersistedState>
      return {
        added: Array.isArray(p.added) ? p.added : [],
        edited: p.edited && typeof p.edited === 'object' ? p.edited : {},
        deleted: Array.isArray(p.deleted) ? p.deleted : [],
      }
    }
  } catch {
    /* ignore malformed storage */
  }
  return { added: [], edited: {}, deleted: [] }
}

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be unavailable */
    }
  }, [state])

  // Effective catalogue: bundled + user-added, minus deleted, with edits applied.
  const movies = useMemo<Movie[]>(() => {
    const deleted = new Set(state.deleted)
    return [...MOVIES, ...state.added]
      .filter((m) => !deleted.has(m.id))
      .map((m) => ({ ...m, ...(state.edited[m.id] ?? {}) }))
  }, [state])

  const getMovie = useCallback((id: number) => movies.find((m) => m.id === id), [movies])

  const isCustom = useCallback(
    (id: number) => state.added.some((m) => m.id === id),
    [state.added],
  )

  const addMovie = useCallback((input: MovieInput) => {
    let newId = 0
    setState((prev) => {
      const maxId = [...MOVIES, ...prev.added].reduce((max, m) => Math.max(max, m.id), 0)
      newId = maxId + 1
      const movie: Movie = { ...input, id: newId }
      return { ...prev, added: [movie, ...prev.added] }
    })
    return newId
  }, [])

  const updateMovie = useCallback((id: number, input: MovieInput) => {
    setState((prev) => {
      // If it's a user-added movie, update it in place; otherwise store an override.
      if (prev.added.some((m) => m.id === id)) {
        return {
          ...prev,
          added: prev.added.map((m) => (m.id === id ? { ...m, ...input, id } : m)),
        }
      }
      return { ...prev, edited: { ...prev.edited, [id]: { ...input } } }
    })
  }, [])

  const deleteMovie = useCallback((id: number) => {
    setState((prev) => {
      const added = prev.added.filter((m) => m.id !== id)
      // Track deletions of bundled movies; user movies are simply removed.
      const wasBundled = MOVIES.some((m) => m.id === id)
      const deleted = wasBundled ? [...new Set([...prev.deleted, id])] : prev.deleted
      const { [id]: _removed, ...edited } = prev.edited
      return { added, edited, deleted }
    })
  }, [])

  const value = useMemo<MoviesContextValue>(
    () => ({ movies, getMovie, addMovie, updateMovie, deleteMovie, isCustom }),
    [movies, getMovie, addMovie, updateMovie, deleteMovie, isCustom],
  )

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMovies(): MoviesContextValue {
  const ctx = useContext(MoviesContext)
  if (!ctx) throw new Error('useMovies must be used within a MoviesProvider')
  return ctx
}
