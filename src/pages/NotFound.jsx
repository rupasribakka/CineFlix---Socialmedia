import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0b0f] px-4 text-center text-white">
      <div className="mb-6 text-8xl font-black text-red-500">404</div>
      <h1 className="mb-3 text-3xl font-bold">Looks like you went off script.</h1>
      <p className="mb-6 text-zinc-400">The page you are looking for does not exist.</p>
      <Link to="/browse" className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
    </div>
  )
}
