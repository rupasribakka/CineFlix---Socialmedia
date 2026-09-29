import { Info, Play, Plus, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'

export default function MovieCard({ movie, compact = false }) {
  const navigate = useNavigate()
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  if (!movie) return null

  return (
    <article className={`group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 ${compact ? 'min-w-[170px]' : 'min-w-[220px]'}`}>
      <img
        src={movie.poster}
        alt={movie.title}
        className={`w-full object-cover transition duration-300 group-hover:scale-105 ${compact ? 'h-52' : 'h-72'}`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition group-hover:opacity-100">
        <div className="flex h-full flex-col justify-end p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-200">
            <span className="rounded bg-red-600 px-2 py-1 font-semibold">{movie.type === 'tv' ? 'TV' : 'Movie'}</span>
            <span>{movie.rating.toFixed(1)}</span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-sm font-bold text-white">{movie.title}</h3>
          <div className="mb-3 flex gap-2">
            <button onClick={() => navigate(`/watch/${movie.id}`)} className="rounded-full bg-white p-2 text-black"><Play className="h-3 w-3 fill-current" /></button>
            <button onClick={() => toggleWatchlist(movie.id)} className="rounded-full border border-white/20 bg-black/30 p-2 text-white"><Plus className="h-3 w-3" /></button>
            <button className="rounded-full border border-white/20 bg-black/30 p-2 text-white"><ThumbsUp className="h-3 w-3" /></button>
            <button onClick={() => navigate(`/movie/${movie.id}`)} className="rounded-full border border-white/20 bg-black/30 p-2 text-white"><Info className="h-3 w-3" /></button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-300">
            <span>{movie.year}</span>
            <span>{movie.genres[0]}</span>
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white">
        {isInWatchlist(movie.id) ? 'Saved' : 'Add'}
      </div>
    </article>
  )
}
