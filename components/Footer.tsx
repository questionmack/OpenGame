export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-black text-[10px]">⚽</div>
              <span className="font-bold text-sm">OpenGame</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed">Nigeria&apos;s pickup sports platform. Book football, basketball & more at premium venues.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Platform</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-zinc-600 text-xs hover:text-white transition">Sessions</a>
              <a href="/venues" className="text-zinc-600 text-xs hover:text-white transition">Venues</a>
              <a href="/dashboard" className="text-zinc-600 text-xs hover:text-white transition">My bookings</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Cities</h4>
            <div className="flex flex-col gap-2">
              <span className="text-zinc-600 text-xs">Lagos</span>
              <span className="text-zinc-600 text-xs">Abuja</span>
              <span className="text-zinc-600 text-xs">Kano</span>
              <span className="text-zinc-600 text-xs">Ibadan</span>
              <span className="text-zinc-600 text-xs">Port Harcourt</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Sports</h4>
            <div className="flex flex-col gap-2">
              <span className="text-zinc-600 text-xs">Football</span>
              <span className="text-zinc-600 text-xs">Basketball</span>
              <span className="text-zinc-600 text-xs">Volleyball</span>
              <span className="text-zinc-600 text-xs">Tennis</span>
              <span className="text-zinc-600 text-xs">Swimming</span>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-zinc-700 text-xs">© 2026 OpenGame. All rights reserved.</span>
          <p className="text-zinc-800 text-xs italic">The game is open. Everywhere.</p>
        </div>
      </div>
    </footer>
  )
}
