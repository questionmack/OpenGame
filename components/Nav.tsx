'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Nav() {
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        if (session.user.email === 'momolistic2008@gmail.com') setIsAdmin(true)
      }
    })
  }, [])

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-900/50 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-50">
      <a href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black text-sm font-bold">⚽</div>
        <span className="font-bold text-lg tracking-tight">OpenGame</span>
      </a>

      <div className="hidden md:flex items-center gap-6">
        <a href="/" className="text-zinc-400 text-sm hover:text-white transition">Home</a>
        <a href="/venues" className="text-zinc-400 text-sm hover:text-white transition">Venues</a>
        {user && <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white transition">My bookings</a>}
        {isAdmin && <a href="/admin" className="text-red-400 text-sm hover:text-red-300 transition">Admin</a>}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-zinc-600 text-xs">{user.email}</span>
            <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }} className="text-zinc-500 text-xs hover:text-red-400 transition">Logout</button>
          </div>
        ) : (
          <a href="/login" className="bg-emerald-500 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-emerald-400 transition">Book a game</a>
        )}
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-zinc-900 px-6 py-4 flex flex-col gap-4 md:hidden z-50">
          <a href="/" className="text-zinc-300 text-sm" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/venues" className="text-zinc-300 text-sm" onClick={() => setMenuOpen(false)}>Venues</a>
          {user && <a href="/dashboard" className="text-zinc-300 text-sm" onClick={() => setMenuOpen(false)}>My bookings</a>}
          {isAdmin && <a href="/admin" className="text-red-400 text-sm" onClick={() => setMenuOpen(false)}>Admin</a>}
          {user ? (
            <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }} className="text-red-400 text-sm text-left">Logout</button>
          ) : (
            <a href="/login" className="bg-emerald-500 text-black px-5 py-2 rounded-full text-sm font-bold text-center" onClick={() => setMenuOpen(false)}>Book a game</a>
          )}
        </div>
      )}
    </nav>
  )
}
