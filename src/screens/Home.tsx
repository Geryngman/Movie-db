import { useNavigate } from 'react-router-dom'
import { MOVIES } from '../data/movies'
import FeaturedHero from '../components/FeaturedHero'
import Rail from '../components/Rail'

export default function Home() {
  const navigate = useNavigate()
  const featured = MOVIES.filter((m) => m.featured)
  const trending = MOVIES.filter((m) => m.trending)
  const topRated = [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 12)
  const animation = MOVIES.filter((m) => m.genres.includes('Animation'))
  const sciFi = MOVIES.filter((m) => m.genres.includes('Sci-Fi'))

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
    </div>
  )
}
