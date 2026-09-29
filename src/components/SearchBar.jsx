import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search titles, genres, cast...' }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
      />
    </div>
  )
}
