import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '../types'
import { backdropUrl } from '../lib/images'
import { StarIcon, PlayIcon } from './icons'

interface FeaturedHeroProps {
  movies: Movie[]
}

// Auto-advancing hero carousel showcasing featured films.
export default function FeaturedHero({ movies }: FeaturedHeroProps) {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (movies.length <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % movies.length), 5000)
    return () => clearInterval(t)
  }, [movies.length])

  if (movies.length === 0) return null
  const movie = movies[index]
  const bg = backdropUrl(movie.backdropPath, 'w780')

  return (
    <section className="hero" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div
        className="hero__bg"
        style={{
          background: bg
            ? `linear-gradient(180deg, rgba(11,11,18,0) 25%, #0b0b12 100%), url(${bg}) center/cover no-repeat, linear-gradient(150deg, ${movie.posterColor[0]}, ${movie.posterColor[1]})`
            : `linear-gradient(150deg, ${movie.posterColor[0]}, ${movie.posterColor[1]})`,
        }}
      />
      <div className="hero__content">
        <span className="hero__badge">Featured</span>
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__meta">
          <StarIcon width={13} height={13} className="hero__star" />
          {movie.rating.toFixed(1)} · {movie.year} · {movie.genres[0]}
        </p>
        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/movie/${movie.id}`)
            }}
          >
            <PlayIcon width={16} height={16} />
            Details
          </button>
        </div>
      </div>
      <div className="hero__dots">
        {movies.map((m, i) => (
          <button
            key={m.id}
            className={`hero__dot ${i === index ? 'is-active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setIndex(i)
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
