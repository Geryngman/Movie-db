import { useNavigate } from 'react-router-dom'
import type { Movie } from '../types'
import Poster from './Poster'
import { StarIcon } from './icons'

interface MovieCardProps {
  movie: Movie
  width?: number
}

// A poster tile used in horizontal rails and grids.
export default function MovieCard({ movie, width }: MovieCardProps) {
  const navigate = useNavigate()
  return (
    <button
      className="movie-card"
      style={width ? { width } : undefined}
      onClick={() => navigate(`/movie/${movie.id}`)}
      aria-label={`${movie.title} (${movie.year})`}
    >
      <Poster movie={movie} className="movie-card__poster" size="w342" />
      <div className="movie-card__meta">
        <span className="movie-card__title">{movie.title}</span>
        <span className="movie-card__sub">
          <StarIcon width={12} height={12} className="movie-card__star" />
          {movie.rating.toFixed(1)} · {movie.year}
        </span>
      </div>
    </button>
  )
}
