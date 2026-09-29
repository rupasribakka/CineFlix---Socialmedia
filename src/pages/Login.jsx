import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('demo@cineflix.com')
  const [password, setPassword] = useState('demo123')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = login(email, password)

    if (success) {
      navigate('/profiles')
      return
    }

    setError('Invalid email or password. Try the demo login credentials.')
  }

  const handleDemoLogin = () => {
    setEmail('demo@cineflix.com')
    setPassword('demo123')
    const success = login('demo@cineflix.com', 'demo123')
    if (success) navigate('/profiles')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.25),_transparent_35%),linear-gradient(135deg,#09090b,#101113_40%,#141618)] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl shadow-red-950/30 backdrop-blur-md md:p-8">
        <div className="mb-8 text-center">
          <div className="text-3xl font-black tracking-tight text-red-500">CineFlix</div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Email</label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              <Mail className="h-4 w-4 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Password</label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              <LockKeyhole className="h-4 w-4 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                placeholder="********"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-zinc-400">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-zinc-400">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-red-500" />
              Remember me
            </label>
            <button type="button" className="text-red-400 hover:text-red-300">Forgot password?</button>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500">Sign In</button>
          <button type="button" onClick={handleDemoLogin} className="w-full rounded-xl border border-red-500/40 bg-red-500/10 py-3 font-semibold text-red-300 transition hover:bg-red-500/20">Demo Login</button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          New to CineFlix?{' '}
          <Link to="/login" className="text-red-400">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
