import { useNavigate } from 'react-router-dom'
import { useMovies } from '../context/MoviesContext'
import FeaturedHero from '../components/FeaturedHero'
import Rail from '../components/Rail'
import { PlusIcon } from '../components/icons'

export default function Home() {
  const navigate = useNavigate()
  const { movies } = useMovies()
  const featured = movies.filter((m) => m.featured)
  const trending = movies.filter((m) => m.trending)
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 12)
  const animation = movies.filter((m) => m.genres.includes('Animation'))
  const sciFi = movies.filter((m) => m.genres.includes('Sci-Fi'))

  return (
    <div className="screen home">
      <header className="topbar topbar--home">
        <div>
          <p className="topbar__greeting">Good evening</p>
          <h1 className="topbar__brand">CineHub</h1>
        </div>
        <button className="topbar__avatar" onClick={() => navigate('/profile')}>
          EK
        </button>
      </header>

      <FeaturedHero movies={featured} />

      <Rail
        title="Trending now"
        movies={trending}
        action="See all"
        onAction={() => navigate('/search')}
      />
      <Rail title="Top rated" movies={topRated} />
      <Rail title="Animation" movies={animation} />
      <Rail title="Science fiction" movies={sciFi} />

      <button
        className="fab"
        onClick={() => navigate('/movie/new')}
        aria-label="Add a movie"
      >
        <PlusIcon width={24} height={24} />
      </button>
    </div>
  )
}
