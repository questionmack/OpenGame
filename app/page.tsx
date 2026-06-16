'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [sessions, setSessions] = useState<any[]>([])

  useEffect(() => {
    fetch('https://gregarious-patience-production-34e8.up.railway.app/sessions/')
      .then(r => r.json())
      .then(d => setSessions(d.sessions || []))
  }, [])

  const sportColor: Record<string, string> = {
    football: '#10B981',
    basketball: '#F59E0B',
    volleyball: '#8B5CF6',
    swimming: '#3B82F6',
    tennis: '#EC4899',
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">⚽</div>
          <span className="font-semibold text-base tracking-tight">OpenGame</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#sessions" className="text-zinc-500 text-sm hover:text-white transition hidden md:block">Sessions</a>
          <a href="/venues" className="text-zinc-500 text-sm hover:text-white transition hidden md:block">Venues</a>
          <a href="/login" className="bg-emerald-500 text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-emerald-400 transition">Book a game</a>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A] z-10" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://d8j0ntlcm91z4.cloudfront.net/user_3Eog04FYV9id8ty6bDjk4VMbdKU/hf_20260616_075502_4acfa48d-e3fa-4e80-8670-ce4b0bd08d08.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 0.35,
        }} />
        <div className="relative z-20 px-6 py-28 text-center">
          <p className="text-emerald-500 text-xs tracking-[3px] uppercase font-bold mb-3">Nigeria&apos;s pickup sports platform</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-5">
            The game is open.<br/>Everywhere.
          </h1>
          <p className="text-zinc-400 text-base mb-8 max-w-md mx-auto">
            Football, basketball & more at premium venues across Lagos, Abuja, Kano, Ibadan & Port Harcourt
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#sessions" className="bg-emerald-500 text-black px-8 py-3.5 rounded-full text-sm font-bold hover:bg-emerald-400 transition">Find a session</a>
            <button className="border border-zinc-700 text-zinc-300 px-8 py-3.5 rounded-full text-sm hover:border-zinc-500 hover:text-white transition">How it works</button>
          </div>
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-center">
              <p className="text-2xl font-bold">11</p>
              <p className="text-zinc-600 text-xs">Venues</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">5</p>
              <p className="text-zinc-600 text-xs">Cities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">6</p>
              <p className="text-zinc-600 text-xs">Sports</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-500">₦2.5k</p>
              <p className="text-zinc-600 text-xs">Per session</p>
            </div>
          </div>
        </div>
      </div>

      <div id="sessions" className="px-6 pb-16 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Today&apos;s sessions</h2>
          <span className="text-emerald-500 text-sm cursor-pointer hover:underline">View all →</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sessions.map((s: any) => (
            <div key={s.id} className="bg-[#111] border border-zinc-900 rounded-xl p-4 hover:border-zinc-700 transition group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{
                  background: sportColor[s.sport] || '#10B981',
                  color: '#000',
                }}>{s.sport}</span>
                <span className="text-zinc-600 text-[11px]">{s.slot} · {s.start_time?.slice(0,5)}</span>
              </div>
              <h3 className="font-semibold text-sm mb-0.5 group-hover:text-emerald-400 transition">{s.venue_name}</h3>
              <p className="text-zinc-600 text-xs mb-3">{s.venue_area}, {s.venue_city}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-emerald-500 font-bold text-sm">₦{s.price_ngn?.toLocaleString()}</span>
                <span className="text-zinc-600 text-[11px]">{s.spots_remaining} spots left</span>
              </div>
              <a href={`/book/${s.id}`} className="block w-full bg-emerald-500 text-black text-center py-2 rounded-full text-sm font-bold hover:bg-emerald-400 transition">Book now</a>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-zinc-900 px-6 py-8">
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
