import { ArrowLeft, PlayCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import VideoPlayer from '../components/VideoPlayer'
import { usePlayer } from '../context/PlayerContext'
import { getMovieById } from '../services/api'

export default function Watch() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProgress, saveProgress } = usePlayer()
  const movie = getMovieById(id)

  if (!movie) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] text-white">Movie not found</div>
  }

  const storedProgress = getProgress(id) || { progress: 0, duration: 100 }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-300">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">Now Watching</p>
            <h1 className="text-3xl font-black">{movie.title}</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
            {Math.round(storedProgress.progress || 0)}% watched
          </div>
        </div>

        <VideoPlayer
          movie={movie}
          onProgress={(value, duration) => {
            saveProgress(id, value, duration)
          }}
        />

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-lg font-semibold">{movie.title}</div>
              <div className="text-sm text-zinc-400">{movie.description}</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
              <PlayCircle className="h-4 w-4 fill-current" /> Resume
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
