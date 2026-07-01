import { useParams, useNavigate } from 'react-router-dom'
import { getMovie, MOVIES } from '../data/movies'
import { useLibrary } from '../context/LibraryContext'
import { backdropUrl } from '../lib/images'
import Poster from '../components/Poster'
import Rail from '../components/Rail'
import {
  ChevronLeftIcon,
  StarIcon,
  ClockIcon,
  BookmarkIcon,
  CheckIcon,
  HeartIcon,
} from '../components/icons'

function runtimeLabel(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const movie = getMovie(Number(id))
  const { inWatchlist, toggleWatchlist, isFavorite, toggleFavorite } = useLibrary()

  if (!movie) {
    return (
      <div className="screen">
        <div className="empty">
          <p className="empty__title">Movie not found</p>
          <button className="btn btn--primary empty__cta" onClick={() => navigate('/')}>
            Go home
          </button>
        </div>
      </div>
    )
  }

  const saved = inWatchlist(movie.id)
  const faved = isFavorite(movie.id)
  const bg = backdropUrl(movie.backdropPath)

  const similar = MOVIES.filter(
    (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g)),
  ).slice(0, 12)

  return (
    <div className="screen detail">
      <div
        className="detail__backdrop"
        style={{
          background: bg
            ? `linear-gradient(180deg, rgba(11,11,18,0.25) 0%, rgba(11,11,18,0.6) 55%, #0b0b12 100%), url(${bg}) center/cover no-repeat, linear-gradient(160deg, ${movie.posterColor[0]}, ${movie.posterColor[1]})`
            : `linear-gradient(160deg, ${movie.posterColor[0]}, ${movie.posterColor[1]})`,
        }}
      >
        <button className="iconbtn detail__back" onClick={() => navigate(-1)} aria-label="Back">
          <ChevronLeftIcon width={24} height={24} />
        </button>
        <button
          className={`iconbtn detail__fav ${faved ? 'is-active' : ''}`}
          onClick={() => toggleFavorite(movie.id)}
          aria-label="Favorite"
        >
          <HeartIcon width={22} height={22} />
        </button>
      </div>

      <div className="detail__head">
        <Poster movie={movie} className="detail__poster" size="w342" />
        <div className="detail__headinfo">
          <h1 className="detail__title">{movie.title}</h1>
          <p className="detail__tagline">{movie.tagline}</p>
          <div className="detail__facts">
            <span className="detail__fact detail__fact--rating">
              <StarIcon width={13} height={13} />
              {movie.rating.toFixed(1)}
            </span>
            <span className="detail__fact">
              <ClockIcon width={13} height={13} />
              {runtimeLabel(movie.runtime)}
            </span>
            <span className="detail__fact">{movie.year}</span>
          </div>
        </div>
      </div>

      <div className="detail__genres">
        {movie.genres.map((g) => (
          <span key={g} className="tag">
            {g}
          </span>
        ))}
      </div>

      <button
        className={`btn btn--block ${saved ? 'btn--saved' : 'btn--primary'}`}
        onClick={() => toggleWatchlist(movie.id)}
      >
        {saved ? <CheckIcon width={18} height={18} /> : <BookmarkIcon width={18} height={18} />}
        {saved ? 'In your watchlist' : 'Add to watchlist'}
      </button>

      <section className="detail__section">
        <h2 className="detail__h2">Overview</h2>
        <p className="detail__overview">{movie.overview}</p>
      </section>

      <section className="detail__section">
        <h2 className="detail__h2">Director</h2>
        <p className="detail__director">{movie.director}</p>
      </section>

      <section className="detail__section">
        <h2 className="detail__h2">Cast</h2>
        <div className="castlist">
          {movie.cast.map((c) => {
            const initials = c
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')
            return (
              <div key={c} className="cast">
                <div className="cast__avatar">{initials}</div>
                <span className="cast__name">{c}</span>
              </div>
            )
          })}
        </div>
      </section>

      {similar.length > 0 && (
        <div className="detail__similar">
          <Rail title="More like this" movies={similar} />
        </div>
      )}
    </div>
  )
}
