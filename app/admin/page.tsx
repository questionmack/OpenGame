'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const ADMIN_EMAIL = 'momolistic2008@gmail.com'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, confirmed: 0, revenue: 0, users: 0, venues: 0, sessions: 0 })
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.push('/')
        return
      }

      const [bookingsRes, usersRes, venuesRes, sessionsRes] = await Promise.all([
        supabase.from('bookings').select('*, sessions(*, venues(name, city, area)), users(full_name, email)').order('created_at', { ascending: false }),
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('venues').select('id', { count: 'exact', head: true }),
        supabase.from('sessions').select('id', { count: 'exact', head: true }),
      ])

      const allBookings = bookingsRes.data || []
      const confirmed = allBookings.filter((b: any) => b.status === 'confirmed')
      const revenue = confirmed.reduce((sum: number, b: any) => sum + (b.amount_ngn || 0), 0)

      setStats({
        bookings: allBookings.length,
        confirmed: confirmed.length,
        revenue,
        users: usersRes.count || 0,
        venues: venuesRes.count || 0,
        sessions: sessionsRes.count || 0,
      })
      setBookings(allBookings.slice(0, 20))
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
        <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full">Admin</span>
      </nav>

      <div className="px-6 py-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">₦{stats.revenue.toLocaleString()}</p>
            <p className="text-zinc-600 text-xs mt-1">Revenue</p>
          </div>
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.bookings}</p>
            <p className="text-zinc-600 text-xs mt-1">Total bookings</p>
          </div>
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{stats.confirmed}</p>
            <p className="text-zinc-600 text-xs mt-1">Confirmed</p>
          </div>
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.users}</p>
            <p className="text-zinc-600 text-xs mt-1">Users</p>
          </div>
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.venues}</p>
            <p className="text-zinc-600 text-xs mt-1">Venues</p>
          </div>
          <div className="bg-[#111] border border-zinc-900 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.sessions}</p>
            <p className="text-zinc-600 text-xs mt-1">Sessions</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        <div className="bg-[#111] border border-zinc-900 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-900 text-zinc-500 text-xs">
                <th className="text-left p-3 font-medium">Player</th>
                <th className="text-left p-3 font-medium">Venue</th>
                <th className="text-left p-3 font-medium">Sport</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b: any) => (
                <tr key={b.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/30">
                  <td className="p-3">
                    <p className="font-medium text-sm">{b.users?.full_name || 'Player'}</p>
                    <p className="text-zinc-600 text-xs">{b.users?.email}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-sm">{b.sessions?.venues?.name}</p>
                    <p className="text-zinc-600 text-xs">{b.sessions?.venues?.city}</p>
                  </td>
                  <td className="p-3 text-sm">{b.sessions?.sport} · {b.sessions?.format}</td>
                  <td className="p-3 text-sm text-zinc-400">{b.sessions?.date}</td>
                  <td className="p-3 text-sm text-emerald-400 font-bold">₦{b.amount_ngn?.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                      b.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
