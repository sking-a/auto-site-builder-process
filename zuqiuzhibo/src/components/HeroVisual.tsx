const signals = ["Live schedule", "Official channels", "Mobile ready"];

export function HeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-lime/20 bg-[#06140f] p-4 shadow-glow">
      <div className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_72%_24%,rgba(16,185,129,0.34),transparent_34%),linear-gradient(135deg,#10291f,#07140f_58%,#04100b)] p-5 md:min-h-[340px]">
        <svg
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 640 440"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hero-line" x1="80" y1="60" x2="560" y2="380" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A7F3D0" stopOpacity="0.72" />
              <stop offset="1" stopColor="#10B981" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <path d="M56 72H584V368H56V72Z" fill="none" stroke="url(#hero-line)" strokeWidth="2" />
          <path d="M320 72V368" fill="none" stroke="#A7F3D0" strokeOpacity="0.28" strokeWidth="2" />
          <circle cx="320" cy="220" r="64" fill="none" stroke="#A7F3D0" strokeOpacity="0.32" strokeWidth="2" />
          <path d="M56 162H144V278H56M584 162H496V278H584" fill="none" stroke="#A7F3D0" strokeOpacity="0.32" strokeWidth="2" />
          <path d="M112 72L584 368M56 368L528 72" stroke="#A7F3D0" strokeOpacity="0.08" strokeWidth="2" />
        </svg>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-lime">Match signal</p>
            <h2 className="mt-3 max-w-xs text-3xl font-black leading-tight text-white">
              Official match-day control panel
            </h2>
          </div>
          <div className="rounded-full border border-lime/30 bg-lime/12 px-3 py-1.5 text-xs font-black text-lime">
            Verified
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-white/10 bg-pitch/78 p-5 backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-mist">Today</span>
              <span className="rounded-full bg-lime px-3 py-1 text-xs font-black text-pitch">HD ready</span>
            </div>
            <div className="space-y-4">
              <FixtureRow time="19:45" league="Premier League" matchup="Local listing required" />
              <FixtureRow time="21:00" league="Champions League" matchup="Official rights holder" />
              <FixtureRow time="23:30" league="World football" matchup="Regional broadcaster" />
            </div>
          </div>

          <div className="grid content-between gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-black text-white">Official channels verified</p>
              <p className="mt-2 text-sm leading-6 text-mist">
                Confirm region, broadcaster, subscription, and device support before kickoff.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["TV", "App", "Web"].map((label) => (
                <div key={label} className="rounded-2xl border border-lime/20 bg-lime/10 p-4 text-center">
                  <span className="text-lg font-black text-lime">{label}</span>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-mist">Official</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 pt-4 sm:grid-cols-3">
        {signals.map((label) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-pitch/70 p-4 text-sm font-bold text-lime">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function FixtureRow({ time, league, matchup }: { time: string; league: string; matchup: string }) {
  return (
    <div className="grid grid-cols-[3.7rem_1fr] gap-3 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <span className="font-black text-white">{time}</span>
      <span>
        <span className="block text-sm font-black text-lime">{league}</span>
        <span className="block text-sm text-mist">{matchup}</span>
      </span>
    </div>
  );
}
