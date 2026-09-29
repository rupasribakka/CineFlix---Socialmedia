import { Bell, Compass, Menu, Search, User } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'

const navItems = [
  { label: 'Home', to: '/browse' },
  { label: 'Movies', to: '/movies' },
  { label: 'TV Shows', to: '/tv-shows' },
  { label: 'My List', to: '/my-list' },
  { label: 'Search', to: '/search' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { selectedProfile } = useProfile()

  const handleSignOut = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0f]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu">
            <Menu className="h-6 w-6 text-white" />
          </button>
          <div className="text-xl font-black tracking-tight text-red-500">CineFlix</div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/search')} className="rounded-full border border-white/10 p-2 text-zinc-200 hover:border-red-500">
            <Search className="h-4 w-4" />
          </button>
          <button className="rounded-full border border-white/10 p-2 text-zinc-200 hover:border-red-500">
            <Bell className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate('/profiles')}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-sm text-white"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-700 text-xs font-bold">
              {selectedProfile?.name?.[0] || 'P'}
            </div>
            <span className="hidden md:inline">{selectedProfile?.name}</span>
          </button>
          <div className="hidden md:flex items-center gap-3 text-sm text-zinc-200">
            <button onClick={() => navigate('/settings')} className="rounded-full border border-white/10 px-3 py-2 hover:border-red-500">Settings</button>
            <button onClick={handleSignOut} className="rounded-full bg-red-600 px-3 py-2 font-medium text-white hover:bg-red-500">Sign Out</button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0b0b0f] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `rounded px-2 py-2 text-sm ${isActive ? 'bg-red-600/20 text-white' : 'text-zinc-300'}`}
              >
                {item.label}
              </NavLink>
            ))}
            <button onClick={() => navigate('/settings')} className="rounded px-2 py-2 text-left text-sm text-zinc-300">Settings</button>
            <button onClick={handleSignOut} className="rounded bg-red-600 px-3 py-2 text-sm text-white">Sign Out</button>
          </div>
        </div>
      )}
    </header>
  )
}
