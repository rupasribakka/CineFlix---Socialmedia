import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ProfileContext = createContext(null)

const STORAGE_KEY = 'cineflix-profiles'
const ACTIVE_KEY = 'cineflix-selected-profile'

const defaultProfiles = [
  { id: 'rupa', name: 'Rupa', color: 'from-red-500 to-rose-600' },
  { id: 'kids', name: 'Kids', color: 'from-blue-500 to-cyan-600' },
  { id: 'guest', name: 'Guest', color: 'from-purple-500 to-violet-600' },
]

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : defaultProfiles
  })

  const [selectedProfile, setSelectedProfile] = useState(() => {
    const saved = localStorage.getItem(ACTIVE_KEY)
    return saved ? JSON.parse(saved) : defaultProfiles[0]
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(selectedProfile))
  }, [selectedProfile])

  const value = useMemo(
    () => ({
      profiles,
      selectedProfile,
      setSelectedProfile,
      setProfiles,
    }),
    [profiles, selectedProfile],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('useProfile must be used within ProfileProvider')
  return context
}
