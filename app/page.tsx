async function getSessions() {
  const res = await fetch('https://gregarious-patience-production-34e8.up.railway.app/sessions/', { cache: 'no-store' })
  const data = await res.json()
  return data.sessions
}

export default async function Home() {
  const sessions = await getSessions()

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold text-green-400">⚽ OpenGame</h1>
        <button className="bg-green-400 text-black px-4 py-2 rounded-full text-sm font-bold">Book a Game</button>
      </nav>

      <div className="px-6 py-16 text-center">
        <h2 className="text-5xl font-black mb-4">The game is open.<br/>Everywhere.</h2>
        <p className="text-zinc-400 text-lg mb-8">Book football, basketball & more at top venues across Nigeria</p>
      </div>

      <div className="px-6 pb-16">
        <h3 className="text-2xl font-bold mb-6">Sessions Today</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions?.map((s: any) => (
            <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-green-400 text-black text-xs font-bold px-2 py-1 rounded-full uppercase">{s.sport}</span>
                <span className="text-zinc-400 text-sm">{s.slot}</span>
              </div>
              <h4 className="font-bold text-lg mb-1">{s.venue_name}</h4>
              <p className="text-zinc-400 text-sm mb-3">{s.venue_area}, {s.venue_city}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold">₦{s.price_ngn?.toLocaleString()}</span>
                <span className="text-zinc-400 text-sm">{s.spots_remaining} spots left</span>
              </div>
              <a href={`/book/${s.id}`} className="block w-full mt-4 bg-green-400 text-black py-2 rounded-full font-bold text-sm text-center">Book Now</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
