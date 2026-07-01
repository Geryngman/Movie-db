import { useMemo, useState } from 'react'
import { useMovies } from '../context/MoviesContext'
import { GENRES } from '../data/movies'
import MovieCard from '../components/MovieCard'
import { SearchIcon, FilmIcon } from '../components/icons'

export default function Search() {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return movies.filter((m) => {
      const matchesGenre = !genre || m.genres.includes(genre)
      const matchesQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some((c) => c.toLowerCase().includes(q)) ||
        m.genres.some((g) => g.toLowerCase().includes(q))
      return matchesGenre && matchesQuery
    }).sort((a, b) => b.rating - a.rating)
  }, [movies, query, genre])

  return (
    <div className="screen search">
      <header className="topbar">
        <h1 className="topbar__title">Search</h1>
      </header>

      <div className="searchbar">
        <SearchIcon width={18} height={18} className="searchbar__icon" />
        <input
          className="searchbar__input"
          type="text"
          inputMode="search"
          placeholder="Movies, directors, actors…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        {query && (
          <button className="searchbar__clear" onClick={() => setQuery('')} aria-label="Clear">
            ✕
          </button>
        )}
      </div>

      <div className="chips">
        <button
          className={`chip ${genre === null ? 'is-active' : ''}`}
          onClick={() => setGenre(null)}
        >
          All
        </button>
        {GENRES.map((g) => (
          <button
            key={g}
            className={`chip ${genre === g ? 'is-active' : ''}`}
            onClick={() => setGenre((cur) => (cur === g ? null : g))}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="search__count">
        {results.length} {results.length === 1 ? 'result' : 'results'}
      </p>

      {results.length > 0 ? (
        <div className="grid">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <FilmIcon width={40} height={40} className="empty__icon" />
          <p className="empty__title">No matches</p>
          <p className="empty__sub">Try a different title, genre or name.</p>
        </div>
      )}
    </div>
  )
}
