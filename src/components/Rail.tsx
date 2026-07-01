import type { Movie } from '../types'
import MovieCard from './MovieCard'

interface RailProps {
  title: string
  movies: Movie[]
  action?: string
  onAction?: () => void
}

// A titled, horizontally-scrolling row of movie cards.
export default function Rail({ title, movies, action, onAction }: RailProps) {
  if (movies.length === 0) return null
  return (
    <section className="rail">
      <header className="rail__head">
        <h2 className="rail__title">{title}</h2>
        {action && (
          <button className="rail__action" onClick={onAction}>
            {action}
          </button>
        )}
      </header>
      <div className="rail__track">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} width={132} />
        ))}
      </div>
    </section>
  )
}
