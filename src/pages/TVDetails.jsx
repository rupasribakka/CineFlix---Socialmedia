import { Clock3, Play, Plus, Star, Tv } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import { useWatchlist } from '../context/WatchlistContext'
import { getMovieById, getMovies } from '../services/api'

export default function TVDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const show = getMovieById(id)

  if (!show) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] text-white"><h1>TV show not found</h1></div>
  }

  const similar = getMovies()
    .filter((item) => item.type === 'tv' && item.id !== show.id && item.genres.some((genre) => show.genres.includes(genre)))
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <section
        className="relative overflow-hidden border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(11,11,15,0.97), rgba(11,11,15,0.7)), url(${show.backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[220px_1fr] md:px-8">
          <img src={show.poster} alt={show.title} className="h-[320px] w-full rounded-2xl object-cover" />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-black md:text-6xl">{show.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
              <span>{show.year}</span>
              <span className="rounded border border-white/20 px-2 py-1 text-xs">{show.ageRating}</span>
              <span>{show.duration}</span>
              <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-red-500 text-red-500" />{show.rating}</span>
            </div>
            <p className="mt-5 max-w-2xl text-base text-zinc-200">{show.description}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => navigate(`/watch/${show.id}`)} className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500"><Play className="h-4 w-4 fill-current" />Play</button>
              <button onClick={() => toggleWatchlist(show.id)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white"><Plus className="h-4 w-4" />{isInWatchlist(show.id) ? 'Saved' : 'My List'}</button>
            </div>
            <div className="mt-8 grid gap-4 text-sm text-zinc-300 sm:grid-cols-2">
              <div><span className="text-zinc-500">Genres:</span> {show.genres.join(', ')}</div>
              <div><span className="text-zinc-500">Director:</span> {show.director}</div>
              <div><span className="text-zinc-500">Seasons:</span> {show.seasons}</div>
              <div><span className="text-zinc-500">Episodes:</span> {show.episodes}</div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Season 1</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((episode) => (
              <div key={episode} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-24 w-40 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 font-black text-xl">E{episode}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Episode {episode}</h3>
                    <button className="rounded-full border border-white/10 px-3 py-1 text-xs">Play</button>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">This episode dives deeper into the hidden signal threatening the city and the people trying to hold it together.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
