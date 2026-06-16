'use client'
import { useEffect, useState } from 'react'

export default function VenuesPage() {
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cityFilter, setCityFilter] = useState('all')

  useEffect(() => {
    fetch('https://gregarious-patience-production-34e8.up.railway.app/venues/')
      .then(r => r.json())
      .then(d => { setVenues(d.venues || []); setLoading(false) })
  }, [])

  const cities = ['all', ...new Set(venues.map((v: any) => v.city))]
  const filtered = cityFilter === 'all' ? venues : venues.filter((v: any) => v.city === cityFilter)

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-50">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">⚽</div>
          <span className="font-semibold text-base tracking-tight">OpenGame</span>
        </a>
        <div className="flex items-center gap-6">
          <a href="/" className="text-zinc-500 text-sm hover:text-white transition hidden md:block">Sessions</a>
          <a href="/dashboard" className="text-zinc-500 text-sm hover:text-white transition hidden md:block">My bookings</a>
          <a href="/login" className="bg-emerald-500 text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-emerald-400 transition">Book a game</a>
        </div>
      </nav>

      <div className="px-6 py-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Venues</h1>
        <p className="text-zinc-500 text-sm mb-6">{venues.length} venues across {new Set(venues.map((v: any) => v.city)).size} cities in Nigeria</p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {cities.map((city: string) => (
            <button key={city} onClick={() => setCityFilter(city)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${cityFilter === city ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
              {city === 'all' ? 'All cities' : city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v: any) => (
            <div key={v.id} className="bg-[#111] border border-zinc-900 rounded-xl overflow-hidden hover:border-zinc-700 transition group">
              <div className="h-48 overflow-hidden">
                <img
                  src={v.photo_urls?.[0] || 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80'}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e: any) => e.target.src='https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80'}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base mb-1 group-hover:text-emerald-400 transition">{v.name}</h3>
                <p className="text-zinc-500 text-sm mb-3">{v.area}, {v.city}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {v.sports?.map((sport: string) => (
                    <span key={sport} className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-500/20 text-emerald-400">{sport}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-zinc-900">
                  <span className="text-zinc-500">{v.surface}</span>
                  {v.capacity && <span className="text-zinc-500">{v.capacity.toLocaleString()} capacity</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-zinc-900 px-6 py-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black text-[10px]">⚽</div>
            <span className="text-zinc-600 text-sm">OpenGame © 2026</span>
          </div>
          <p className="text-zinc-700 text-xs italic">The game is open. Everywhere.</p>
        </div>
      </footer>
    </main>
  )
}
