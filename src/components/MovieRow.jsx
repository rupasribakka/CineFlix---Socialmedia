import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import MovieCard from './MovieCard'

export default function MovieRow({ title, items = [] }) {
  const ref = useRef(null)

  const scroll = (direction) => {
    if (ref.current) {
      const amount = direction === 'left' ? -500 : 500
      ref.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="rounded-full border border-white/10 bg-white/5 p-2 text-white hover:border-red-500"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => scroll('right')} className="rounded-full border border-white/10 bg-white/5 p-2 text-white hover:border-red-500"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} compact />
        ))}
      </div>
    </section>
  )
}
