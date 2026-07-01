import { NavLink } from 'react-router-dom'
import { HomeIcon, SearchIcon, BookmarkIcon, UserIcon } from './icons'

const TABS = [
  { to: '/', label: 'Home', Icon: HomeIcon, end: true },
  { to: '/search', label: 'Search', Icon: SearchIcon, end: false },
  { to: '/watchlist', label: 'Watchlist', Icon: BookmarkIcon, end: false },
  { to: '/profile', label: 'Profile', Icon: UserIcon, end: false },
]

export default function BottomNav() {
  return (
    <nav className="tabbar">
      {TABS.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `tabbar__item ${isActive ? 'is-active' : ''}`}
        >
          <Icon width={22} height={22} />
          <span className="tabbar__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
