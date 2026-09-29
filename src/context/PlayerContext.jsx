import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const PlayerContext = createContext(null)
const STORAGE_KEY = 'cineflix-player-progress'

export function PlayerProvider({ children }) {
  const [progressMap, setProgressMap] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap))
  }, [progressMap])

  const saveProgress = (id, progress, duration) => {
    setProgressMap((current) => ({
      ...current,
      [id]: { progress, duration, updatedAt: Date.now() },
    }))
  }

  const getProgress = (id) => progressMap[id] || null

  const value = useMemo(
    () => ({
      progressMap,
      saveProgress,
      getProgress,
    }),
    [progressMap],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used within PlayerProvider')
  return context
}
