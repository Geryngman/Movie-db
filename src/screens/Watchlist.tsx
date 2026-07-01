import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { MOVIES } from '../data/movies'
import MovieCard from '../components/MovieCard'
import { BookmarkIcon } from '../components/icons'

export default function Watchlist() {
  const navigate = useNavigate()
  const { watchlist } = useLibrary()

  // Preserve the order movies were added (watchlist stores newest-first).
  const movies = watchlist
    .map((id) => MOVIES.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))

  return (
    <div className="screen watchlist">
      <header className="topbar">
        <h1 className="topbar__title">Watchlist</h1>
      </header>

      {movies.length > 0 ? (
        <div className="grid">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <BookmarkIcon width={40} height={40} className="empty__icon" />
          <p className="empty__title">Nothing saved yet</p>
          <p className="empty__sub">Tap the bookmark on any film to add it here.</p>
          <button className="btn btn--primary empty__cta" onClick={() => navigate('/search')}>
            Browse movies
          </button>
        </div>
      )}
    </div>
  )
}
