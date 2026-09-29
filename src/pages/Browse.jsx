import Footer from '../components/Footer'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import Navbar from '../components/Navbar'
import { getFeaturedMovie, getMovies, getTrendingMovies, getPopularMovies } from '../services/api'
import { usePlayer } from '../context/PlayerContext'
import { getRecommendations } from '../utils/recommendations'

export default function Browse() {
  const movies = getMovies()
  const { progressMap } = usePlayer()

  const continueWatching = Object.entries(progressMap)
    .map(([id, value]) => ({ id, ...value, movie: movies.find((movie) => movie.id === id) }))
    .filter((item) => item.movie)
    .slice(0, 5)

  const recommendations = getRecommendations(['Sci-Fi', 'Action', 'Drama'], movies)

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <Hero movie={getFeaturedMovie()} />

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 md:px-8">
        {continueWatching.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Continue Watching</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {continueWatching.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <img src={entry.movie.poster} alt={entry.movie.title} className="mb-3 h-36 w-full rounded-xl object-cover" />
                  <div className="mb-2 flex items-center justify-between text-xs text-zinc-300">
                    <span>{entry.movie.title}</span>
                    <span>{Math.round(entry.progress || 0)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-red-500" style={{ width: `${Math.round(entry.progress || 0)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <MovieRow title="Trending Now" items={getTrendingMovies()} />
        <MovieRow title="Popular Movies" items={getPopularMovies()} />
        <MovieRow title="Top Picks For You" items={recommendations} />
        <MovieRow title="Action" items={movies.filter((movie) => movie.genres.includes('Action'))} />
        <MovieRow title="Comedy" items={movies.filter((movie) => movie.genres.includes('Comedy'))} />
        <MovieRow title="Drama" items={movies.filter((movie) => movie.genres.includes('Drama'))} />
        <MovieRow title="Sci‑Fi" items={movies.filter((movie) => movie.genres.includes('Sci-Fi'))} />
        <MovieRow title="Indian Cinema" items={movies.filter((movie) => movie.genres.includes('Indian Cinema'))} />
      </main>

      <Footer />
    </div>
  )
}
