'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ChatPage() {
  const { session_id } = useParams()
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([])
  const [newMsg, setNewMsg] = useState('')
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { session: authSession } } = await supabase.auth.getSession()
      if (!authSession) { router.push('/login'); return }
      setUser(authSession.user)

      // Get session details
      const res = await fetch(`https://gregarious-patience-production-34e8.up.railway.app/sessions/${session_id}`)
      const data = await res.json()
      setSession(data)

      // Load existing messages
      const { data: msgs } = await supabase
        .from('session_messages')
        .select('*, users(full_name, email)')
        .eq('session_id', session_id)
        .order('created_at', { ascending: true })
      setMessages(msgs || [])

      // Subscribe to new messages
      supabase
        .channel(`chat-${session_id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'session_messages',
          filter: `session_id=eq.${session_id}`,
        }, async (payload: any) => {
          const { data: newMessage } = await supabase
            .from('session_messages')
            .select('*, users(full_name, email)')
            .eq('id', payload.new.id)
            .single()
          if (newMessage) {
            setMessages(prev => [...prev, newMessage])
          }
        })
        .subscribe()
    }
    init()

    return () => { supabase.removeAllChannels() }
  }, [session_id, router])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!newMsg.trim() || sending) return
    setSending(true)
    await supabase.from('session_messages').insert({
      session_id,
      user_id: user.id,
      message: newMsg.trim(),
    })
    setNewMsg('')
    setSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <nav className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 sticky top-0 bg-[#0A0A0A]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-emerald-400 text-sm">← Back</a>
          <div>
            <h1 className="font-semibold text-sm">{session?.venue_name || 'Loading...'}</h1>
            <p className="text-zinc-500 text-xs">{session?.sport} · {session?.format} · {session?.date}</p>
          </div>
        </div>
        <div className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">
          {session?.spots_remaining !== undefined ? `${session.max_players - session.spots_remaining} players` : '...'}
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-zinc-600 text-sm py-12">
            No messages yet. Say hello to your teammates!
          </div>
        )}
        {messages.map((m: any) => {
          const isMe = m.user_id === user?.id
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] ${isMe ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-white'} rounded-2xl px-4 py-2`}>
                {!isMe && (
                  <p className="text-xs font-bold text-emerald-400 mb-1">{m.users?.full_name || 'Player'}</p>
                )}
                <p className="text-sm">{m.message}</p>
                <p className={`text-[10px] mt-1 ${isMe ? 'text-black/50' : 'text-zinc-500'}`}>{formatTime(m.created_at)}</p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-zinc-900 px-4 py-3 sticky bottom-0 bg-[#0A0A0A]">
        <div className="flex gap-2">
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message your teammates..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!newMsg.trim() || sending}
            className="bg-emerald-500 text-black w-10 h-10 rounded-full font-bold text-lg disabled:opacity-50 flex items-center justify-center"
          >
            ↑
          </button>
        </div>
      </div>
    </main>
  )
}
