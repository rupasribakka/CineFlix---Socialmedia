import { ArrowRight, UserRound } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'

export default function Profiles() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { profiles, selectedProfile, setSelectedProfile } = useProfile()

  useEffect(() => {
    if (!id) return
    const match = profiles.find((profile) => profile.id === id)
    if (match) {
      setSelectedProfile(match)
    }
  }, [id, profiles, setSelectedProfile])

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile)
    navigate('/browse')
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-red-400">Who’s watching?</p>
          <h1 className="mt-4 text-4xl font-black">Choose your profile</h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelectProfile(profile)}
              className={`group rounded-2xl border p-6 transition ${
                selectedProfile?.id === profile.id ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5 hover:border-red-500/40'
              }`}
            >
              <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${profile.color}`}>
                <UserRound className="h-10 w-10 text-white" />
              </div>
              <div className="text-xl font-semibold">{profile.name}</div>
              <div className="mt-3 text-sm text-zinc-400">Profile ready</div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate('/browse')}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
