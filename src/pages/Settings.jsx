import { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Settings() {
  const [settings, setSettings] = useState({
    autoplay: true,
    subtitles: false,
    notifications: true,
    downloads: false,
    kidsMode: false,
  })

  const update = (key) => setSettings((current) => ({ ...current, [key]: !current[key] }))

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <h1 className="mb-8 text-3xl font-black">Settings</h1>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
              <div>
                <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="text-sm text-zinc-400">Customize your viewing experience.</div>
              </div>
              <button
                onClick={() => update(key)}
                className={`relative h-7 w-12 rounded-full ${value ? 'bg-red-600' : 'bg-zinc-700'}`}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${value ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
