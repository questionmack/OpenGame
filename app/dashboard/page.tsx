'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      setUser(session.user)

      const { data: userBookings } = await supabase
        .from('bookings')
        .select('*, sessions(*, venues(name, city, area))')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      setBookings(userBookings || [])
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-50">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">⚽</div>
          <span className="font-semibold text-base tracking-tight">OpenGame</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm">{user?.email}</span>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} className="text-zinc-500 text-sm hover:text-red-400 transition">Logout</button>
        </div>
      </nav>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-8 text-center">
            <p className="text-zinc-500 mb-4">No bookings yet</p>
            <a href="/" className="bg-emerald-500 text-black px-6 py-2 rounded-full text-sm font-bold">Find a session</a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.map((b: any) => (
              <div key={b.id} className="bg-[#111] border border-zinc-900 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-base">{b.sessions?.venues?.name || 'Venue'}</h3>
                    <p className="text-zinc-500 text-sm">{b.sessions?.venues?.area}, {b.sessions?.venues?.city}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                    b.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{b.status}</span>
                </div>
                <div className="flex gap-6 text-sm text-zinc-500">
                  <span>{b.sessions?.sport} · {b.sessions?.format}</span>
                  <span>{b.sessions?.date}</span>
                  <span>{b.sessions?.start_time?.slice(0,5)} - {b.sessions?.end_time?.slice(0,5)}</span>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-900">
                  <span className="text-emerald-500 font-bold">₦{b.amount_ngn?.toLocaleString()}</span>
                  {b.status === 'confirmed' && (
                    <a href={`/chat/${b.session_id}`} className="bg-emerald-500 text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-400 transition">Team Chat</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
