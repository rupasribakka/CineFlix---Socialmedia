import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import { useWatchlist } from '../context/WatchlistContext'
import { getMovies } from '../services/api'

export default function MyList() {
  const { watchlist } = useWatchlist()
  const movies = getMovies().filter((movie) => watchlist.includes(movie.id))

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">My List</p>
          <h1 className="text-3xl font-black">Saved titles</h1>
        </div>

        {movies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center text-zinc-300">
            Your list is empty. Add movies and shows you want to watch later.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
