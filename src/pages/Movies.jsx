import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { getMovies } from '../services/api'

const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Indian Cinema']

export default function Movies() {
  const movies = getMovies().filter((movie) => movie.type === 'movie')
  const [activeGenre, setActiveGenre] = useState('All')
  const [sortBy, setSortBy] = useState('Popular')
  const [search, setSearch] = useState('')

  const filteredMovies = useMemo(() => {
    let list = [...movies]

    if (activeGenre !== 'All') {
      list = list.filter((movie) => movie.genres.includes(activeGenre))
    }

    if (search) {
      list = list.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
    }

    switch (sortBy) {
      case 'Highest Rated':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'Newest':
        list.sort((a, b) => b.year - a.year)
        break
      case 'A-Z':
        list.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [movies, activeGenre, search, sortBy])

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">Movies</p>
            <h1 className="text-3xl font-black">Discover films</h1>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                activeGenre === genre ? 'bg-red-600 text-white' : 'border border-white/10 bg-white/5 text-zinc-300'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="mb-8 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          >
            <option>Popular</option>
            <option>Highest Rated</option>
            <option>Newest</option>
            <option>A-Z</option>
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
