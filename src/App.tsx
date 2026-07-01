import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import BottomNav from './components/BottomNav'
import InstallPrompt from './components/InstallPrompt'
import Home from './screens/Home'
import Search from './screens/Search'
import Watchlist from './screens/Watchlist'
import Profile from './screens/Profile'
import MovieDetail from './screens/MovieDetail'
import MovieForm from './screens/MovieForm'

export default function App() {
  const location = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset scroll position when navigating between routes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [location.pathname])

  const isDetail = location.pathname.startsWith('/movie/')

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__screen" ref={scrollRef}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/new" element={<MovieForm />} />
            <Route path="/movie/:id/edit" element={<MovieForm />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
        {!isDetail && <BottomNav />}
        <InstallPrompt />
      </div>
    </div>
  )
}
