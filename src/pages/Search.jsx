import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { searchMovies } from '../services/api'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => searchMovies(query), [query])

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">Search</p>
            <h1 className="text-3xl font-black">Find movies, shows, and more</h1>
          </div>
          <SearchBar value={query} onChange={setQuery} placeholder="Search movies, shows and actors..." />
        </div>

        {query && results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center text-zinc-300">
            No results found for “{query}”.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
