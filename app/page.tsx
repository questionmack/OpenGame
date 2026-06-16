'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [sessions, setSessions] = useState<any[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('https://gregarious-patience-production-34e8.up.railway.app/sessions/')
      .then(r => r.json())
      .then(d => setSessions(d.sessions || []))

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email === 'momolistic2008@gmail.com') setIsAdmin(true)
    })
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
      <div className="relative overflow-hidden min-h-[520px] flex flex-col">
        <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3Eog04FYV9id8ty6bDjk4VMbdKU/hf_20260616_075502_4acfa48d-e3fa-4e80-8670-ce4b0bd08d08.png" alt="" className="absolute inset-0 w-full h-full object-cover object-[center_25%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />

        <nav className="relative z-10 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">⚽</div>
            <span className="font-semibold text-base tracking-tight drop-shadow-lg">OpenGame</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#sessions" className="text-white/70 text-sm hover:text-white transition hidden md:block drop-shadow-lg">Sessions</a>
            <a href="#howitworks" className="text-white/70 text-sm hover:text-white transition hidden md:block drop-shadow-lg">How it works</a>
            <a href="/dashboard" className="text-white/70 text-sm hover:text-white transition hidden md:block drop-shadow-lg">My bookings</a>
            {isAdmin && <a href="/admin" className="text-red-400 text-sm hover:text-red-300 transition hidden md:block">Admin</a>}
            <a href="/login" className="bg-emerald-500 text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-emerald-400 transition">Book a game</a>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-emerald-400 text-xs tracking-[3px] uppercase font-bold mb-3 drop-shadow-lg">Nigeria&apos;s pickup sports platform</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-5 drop-shadow-xl">
            The game is open.<br/>Everywhere.
          </h1>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#sessions" className="bg-emerald-500 text-black px-8 py-3.5 rounded-full text-sm font-bold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20">Find a session</a>
            <a href="#howitworks" className="border border-white/30 text-white px-8 py-3.5 rounded-full text-sm hover:bg-white/10 transition backdrop-blur-sm">How it works</a>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 py-6 border-b border-zinc-900">
        <div className="text-center">
          <p className="text-xl font-bold">11</p>
          <p className="text-zinc-600 text-xs">Venues</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">5</p>
          <p className="text-zinc-600 text-xs">Cities</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">6</p>
          <p className="text-zinc-600 text-xs">Sports</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-emerald-400">₦2.5k</p>
          <p className="text-zinc-600 text-xs">Per session</p>
        </div>
      </div>

      <div id="sessions" className="px-6 pb-16 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Today&apos;s sessions</h2>
          <span className="text-emerald-500 text-sm cursor-pointer hover:underline">View all →</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sessions.map((s: any) => (
            <a href={`/book/${s.id}`} key={s.id} className="bg-[#111] border border-zinc-900 rounded-xl overflow-hidden hover:border-zinc-700 transition group block">
              {s.venue_photos?.[0] && (
                <div className="h-36 overflow-hidden">
                  <img src={s.venue_photos[0]} alt={s.venue_name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{
                    background: sportColor[s.sport] || '#10B981',
                    color: '#000',
                  }}>{s.sport}</span>
                  <span className="text-zinc-600 text-[11px]">{s.slot} · {s.start_time?.slice(0,5)}</span>
                </div>
                <h3 className="font-semibold text-sm mb-0.5 group-hover:text-emerald-400 transition">{s.venue_name}</h3>
                <p className="text-zinc-600 text-xs mb-3">{s.venue_area}, {s.venue_city}</p>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-500 font-bold text-sm">₦{s.price_ngn?.toLocaleString()}</span>
                  <span className="text-zinc-600 text-[11px]">{s.spots_remaining} spots left</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div id="howitworks" className="px-6 pb-16">
        <h2 className="text-lg font-semibold mb-6 text-center">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-400 text-xl font-bold">1</span>
            </div>
            <h3 className="font-semibold text-sm mb-2">Pick a session</h3>
            <p className="text-zinc-500 text-xs">Browse games by sport, venue, city, or time slot</p>
          </div>
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-400 text-xl font-bold">2</span>
            </div>
            <h3 className="font-semibold text-sm mb-2">Pay & confirm</h3>
            <p className="text-zinc-500 text-xs">Secure payment via Paystack — ₦2,500 per session</p>
          </div>
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-emerald-400 text-xl font-bold">3</span>
            </div>
            <h3 className="font-semibold text-sm mb-2">Show up & play</h3>
            <p className="text-zinc-500 text-xs">Get venue details, join the WhatsApp group, and ball out</p>
          </div>
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
