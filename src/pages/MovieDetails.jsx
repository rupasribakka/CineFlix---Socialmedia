import { Clock3, Play, Plus, Star, Users } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import { useWatchlist } from '../context/WatchlistContext'
import { getMovieById, getMovies } from '../services/api'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const movie = getMovieById(id)

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black">Movie not found</h1>
          <button onClick={() => navigate('/browse')} className="mt-4 rounded-full bg-red-600 px-5 py-3 font-semibold">Back to Browse</button>
        </div>
      </div>
    )
  }

  const similar = getMovies()
    .filter((item) => item.id !== movie.id && item.genres.some((genre) => movie.genres.includes(genre)))
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <section
        className="relative overflow-hidden border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(11,11,15,0.97), rgba(11,11,15,0.7)), url(${movie.backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[220px_1fr] md:px-8">
          <img src={movie.poster} alt={movie.title} className="h-[320px] w-full rounded-2xl object-cover shadow-2xl shadow-black/50" />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-black md:text-6xl">{movie.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
              <span>{movie.year}</span>
              <span className="rounded border border-white/20 px-2 py-1 text-xs">{movie.ageRating}</span>
              <span> {movie.duration}</span>
              <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-red-500 text-red-500" />{movie.rating}</span>
            </div>
            <p className="mt-5 max-w-2xl text-base text-zinc-200">{movie.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => navigate(`/watch/${movie.id}`)} className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500"><Play className="h-4 w-4 fill-current" />Play</button>
              <button onClick={() => toggleWatchlist(movie.id)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10">
                <Plus className="h-4 w-4" />
                {isInWatchlist(movie.id) ? 'Saved' : 'My List'}
              </button>
            </div>
            <div className="mt-8 grid gap-4 text-sm text-zinc-300 sm:grid-cols-2">
              <div><span className="text-zinc-500">Genres:</span> {movie.genres.join(', ')}</div>
              <div><span className="text-zinc-500">Director:</span> {movie.director}</div>
              <div><span className="text-zinc-500">Cast:</span> {movie.cast.slice(0, 3).join(', ')}</div>
              <div><span className="text-zinc-500">Language:</span> {movie.language}</div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-6 flex items-center gap-2 text-zinc-300"><Users className="h-4 w-4" /> Cast</div>
        <div className="mb-8 flex flex-wrap gap-2">
          {movie.cast.map((actor) => (
            <span key={actor} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">{actor}</span>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">More Like This</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
