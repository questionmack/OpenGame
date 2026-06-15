'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function BookPage() {
  const { session_id } = useParams()
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`https://gregarious-patience-production-34e8.up.railway.app/sessions/${session_id}`)
      .then(r => r.json())
      .then(d => setSession(d))
  }, [session_id])

  const handleBook = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: { session: authSession } } = await supabase.auth.getSession()
      if (!authSession) {
        router.push('/login')
        return
      }
      const res = await fetch('https://gregarious-patience-production-34e8.up.railway.app/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authSession.access_token}`
        },
        body: JSON.stringify({ session_id })
      })
      const data = await res.json()
      if (data.access_code) {
        window.location.href = `https://checkout.paystack.com/${data.access_code}`
      } else {
        setError(data.detail || 'Payment failed')
      }
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  if (!session) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 max-w-lg mx-auto">
      <a href="/" className="text-green-400 text-sm mb-6 block">← Back</a>
      <h1 className="text-3xl font-black mb-2">{session.venue_name}</h1>
      <p className="text-zinc-400 mb-1">{session.venue_area}, {session.venue_city}</p>
      <p className="text-zinc-400 mb-6">{session.sport} · {session.format} · {session.slot}</p>

      <div className="bg-zinc-900 rounded-2xl p-5 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-zinc-400">Price per player</span>
          <span className="text-green-400 font-bold">₦{session.price_ngn?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Spots remaining</span>
          <span className="font-bold">{session.spots_remaining}</span>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <button onClick={handleBook} disabled={loading} className="w-full bg-green-400 text-black py-4 rounded-full font-bold text-lg disabled:opacity-50">
        {loading ? 'Processing...' : `Pay ₦${session.price_ngn?.toLocaleString()} with Paystack`}
      </button>
    </main>
  )
}
