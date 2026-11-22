import GlitchVault from "./glitch-vault";

export default function GlitchVaultDemo() {
  return (
    <main className="relative flex w-full flex-wrap items-center justify-center gap-6 overflow-hidden p-6">
      <GlitchVault
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
        glitchColor="#0AF0F0"
        glitchRadius={120}
      >
        <div className="relative p-8 text-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          <div className="relative z-10 mb-8 flex items-center justify-center">
            <div className="group flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 shadow-lg shadow-cyan-500/20 backdrop-blur-sm transition-all duration-500 hover:scale-105">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Maya Lin"
                className="h-24 w-24 rounded-full border border-white/10 object-cover"
              />
            </div>
          </div>
          <h2 className="relative z-10 mb-2 bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-3xl font-bold tracking-wide text-transparent">
            Maya Lin
          </h2>
          <p className="relative z-10 mb-8 text-sm font-medium text-slate-300/80">
            UI/UX Designer & Developer
          </p>
          <button className="relative z-10 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 px-8 py-3 font-medium text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/25">
            View Profile
          </button>
        </div>
      </GlitchVault>

      <GlitchVault
        className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
        glitchColor="#FF6B6B"
        glitchRadius={80}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-400 to-pink-500">
              <span className="text-lg font-bold text-white">🚀</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Project Launch</h3>
              <p className="text-sm text-slate-400">Ready to deploy</p>
            </div>
          </div>
          <p className="mb-4 text-sm text-slate-300">
            Your application is ready for production deployment with all 214
            tests passing.
          </p>
          <div className="flex gap-2">
            <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600">
              Deploy Now
            </button>
            <button className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800">
              View Details
            </button>
          </div>
        </div>
      </GlitchVault>
    </main>
  );
}
