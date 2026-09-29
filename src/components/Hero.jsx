import { Info, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Hero({ movie }) {
  const navigate = useNavigate()

  if (!movie) return null

  return (
    <section
      className="relative isolate min-h-[480px] overflow-hidden border-b border-white/10"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(11,11,15,1) 0%, rgba(11,11,15,0.7) 35%, rgba(11,11,15,0.2) 100%), url(${movie.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-end px-4 py-16 md:px-8 md:py-20 lg:min-h-[560px]">
        <div className="max-w-xl space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">Featured</p>
          <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-200">
            <span>{movie.year}</span>
            <span className="rounded border border-white/20 px-2 py-1 text-xs">{movie.ageRating}</span>
            <span>{movie.duration}</span>
            <span>{movie.genres[0]}</span>
          </div>
          <p className="max-w-lg text-base text-zinc-200 md:text-lg">{movie.description}</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/watch/${movie.id}`)}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              <Play className="h-4 w-4 fill-current" />
              Play
            </button>
            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <Info className="h-4 w-4" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
