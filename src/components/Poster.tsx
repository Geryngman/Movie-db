import { useState } from 'react'
import type { Movie } from '../types'
import { posterUrl } from '../lib/images'

interface PosterProps {
  movie: Movie
  className?: string
  size?: 'w342' | 'w500'
}

// Renders a poster image with an elegant gradient + title fallback used when the
// image is missing or fails to load (e.g. offline). This keeps the grid tidy.
export default function Poster({ movie, className, size = 'w500' }: PosterProps) {
  const url = posterUrl(movie.posterPath, size)
  const [failed, setFailed] = useState(false)
  const showImage = url && !failed

  return (
    <div
      className={`poster ${className ?? ''}`}
      style={{
        background: `linear-gradient(150deg, ${movie.posterColor[0]}, ${movie.posterColor[1]})`,
      }}
    >
      {showImage ? (
        <img
          src={url}
          alt={movie.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="poster__img"
        />
      ) : (
        <div className="poster__fallback">
          <span className="poster__fallback-title">{movie.title}</span>
          <span className="poster__fallback-year">{movie.year}</span>
        </div>
      )}
    </div>
  )
}
