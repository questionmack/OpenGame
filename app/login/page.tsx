'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleAuth = async () => {
    setLoading(true)
    setError('')
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email to confirm your account!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <main className="relative min-h-screen text-white flex items-center justify-center px-6 overflow-hidden" style={{ backgroundColor: '#14201A' }}>
      {/* Glow circles */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,200,83,0.18) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(26,214,95,0.14) 0%, transparent 70%)' }} />
      <div className="absolute top-[40%] right-[10%] w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,214,0,0.07) 0%, transparent 70%)' }} />

      <div className="relative w-full max-w-sm">
        <h1 className="text-3xl font-black mb-2 text-center">⚽ OpenGame</h1>
        <p className="text-zinc-400 text-center mb-8">{isSignup ? 'Create your account' : 'Welcome back'}</p>

        <div className="flex flex-col gap-4 mb-6">
          <input className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500" placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button onClick={handleAuth} disabled={loading || !email || !password} className="w-full py-4 rounded-full font-bold text-lg disabled:opacity-50 mb-4" style={{ backgroundColor: '#1AD65F', color: '#06210F' }}>
          {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Login'}
        </button>

        <p className="text-center text-zinc-400 text-sm">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignup(!isSignup)} className="ml-1 font-bold" style={{ color: '#1AD65F' }}>
            {isSignup ? 'Login' : 'Sign up'}
          </button>
        </p>
      </div>
    </main>
  )
}
