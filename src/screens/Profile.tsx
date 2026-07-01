import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useMovies } from '../context/MoviesContext'
import MovieCard from '../components/MovieCard'
import { HeartIcon } from '../components/icons'

export default function Profile() {
  const navigate = useNavigate()
  const { watchlist, favorites } = useLibrary()
  const { getMovie } = useMovies()

  const favMovies = favorites
    .map((id) => getMovie(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))

  const watched = favorites.length + watchlist.length
  const hours = Math.round(
    favMovies.reduce((sum, m) => sum + m.runtime, 0) / 60,
  )

  return (
    <div className="screen profile">
      <header className="topbar">
        <h1 className="topbar__title">Profile</h1>
      </header>

      <div className="profile__card">
        <div className="profile__avatar">EK</div>
        <div className="profile__id">
          <p className="profile__name">Movie Buff</p>
          <p className="profile__email">ekgeryng@gmail.com</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="stat__value">{favorites.length}</span>
          <span className="stat__label">Favorites</span>
        </div>
        <div className="stat">
          <span className="stat__value">{watchlist.length}</span>
          <span className="stat__label">Watchlist</span>
        </div>
        <div className="stat">
          <span className="stat__value">{watched}</span>
          <span className="stat__label">Tracked</span>
        </div>
        <div className="stat">
          <span className="stat__value">{hours}h</span>
          <span className="stat__label">Favorited</span>
        </div>
      </div>

      <section className="rail">
        <header className="rail__head">
          <h2 className="rail__title">Your favorites</h2>
        </header>
        {favMovies.length > 0 ? (
          <div className="grid">
            {favMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        ) : (
          <div className="empty empty--inline">
            <HeartIcon width={34} height={34} className="empty__icon" />
            <p className="empty__title">No favorites yet</p>
            <p className="empty__sub">Heart a film to see it here.</p>
            <button className="btn btn--ghost empty__cta" onClick={() => navigate('/')}>
              Discover movies
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
