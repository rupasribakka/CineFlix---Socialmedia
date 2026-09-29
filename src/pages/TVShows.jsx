import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { getMovies } from '../services/api'

const categories = ['Popular Series', 'Trending Series', 'Drama', 'Comedy', 'Crime', 'Sci-Fi', 'Documentary', 'Indian Series']

export default function TVShows() {
  const shows = getMovies().filter((movie) => movie.type === 'tv')
  const [activeCategory, setActiveCategory] = useState('Popular Series')
  const [search, setSearch] = useState('')

  const filteredShows = useMemo(() => {
    let list = [...shows]

    if (activeCategory !== 'Popular Series' && activeCategory !== 'Trending Series') {
      list = list.filter((show) => show.genres.includes(activeCategory))
    }

    if (search) {
      list = list.filter((show) => show.title.toLowerCase().includes(search.toLowerCase()))
    }

    if (activeCategory === 'Trending Series') {
      list = list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [shows, activeCategory, search])

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">TV Shows</p>
            <h1 className="text-3xl font-black">Binge-worthy series</h1>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                activeCategory === category ? 'bg-red-600 text-white' : 'border border-white/10 bg-white/5 text-zinc-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredShows.map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
