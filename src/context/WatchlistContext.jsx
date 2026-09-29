import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WatchlistContext = createContext(null)
const STORAGE_KEY = 'cineflix-watchlist'

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  const toggleWatchlist = (id) => {
    setWatchlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const isInWatchlist = (id) => watchlist.includes(id)

  const value = useMemo(
    () => ({
      watchlist,
      toggleWatchlist,
      isInWatchlist,
    }),
    [watchlist],
  )

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (!context) throw new Error('useWatchlist must be used within WatchlistProvider')
  return context
}
