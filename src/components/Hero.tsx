import { useState } from 'react';
import { ArrowRight, Ruler, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
  onExploreCalibrator: () => void;
}

export default function Hero({ onOpenWaitlist, onExploreCalibrator }: HeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden border-b border-zinc-850">
      {/* Background subtle radial gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Proposition and Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">
              <span>Universal Sizing Protocol</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>ISO 8559-1 Anthropometry</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>ASTM D5585</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 [text-wrap:balance]">
              The Universal Sizing Layer for Modern Apparel.
            </h1>

            {/* Value Proposition */}
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl mb-8">
              Eliminate arbitrary vanity sizing and sizing guesswork. FITSYNC converts your genuine anatomical measurements into an open, deterministic Fit Vector that translates seamlessly across global garment patterns and retail cuts.
            </p>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenWaitlist}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-black bg-white rounded-sm hover:bg-zinc-200 transition-all cursor-pointer shadow-lg active:scale-[0.99] whitespace-nowrap shrink-0"
              >
                <span>Request Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCalibrator}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-700/80 rounded-sm hover:text-white hover:border-zinc-500 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Ruler className="w-4 h-4 text-zinc-400" />
                <span>Launch Interactive Calibrator</span>
              </button>
            </div>

            {/* Adjacent Proof & Standards strip */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-6 text-zinc-400">
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">0%</div>
                <div className="text-xs text-zinc-400 mt-1">Guessed letter sizes</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">1.0mm</div>
                <div className="text-xs text-zinc-400 mt-1">Pattern grading precision</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white tabular-nums">100%</div>
                <div className="text-xs text-zinc-400 mt-1">Open vector specification</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Focal Anchor & Live Fit Card HUD (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              {/* Image asset with guaranteed fallback */}
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_fashion_tailoring_1794063913439.jpg"
                  alt="FITSYNC architectural tailoring and dimensional fit silhouette"
                  referrerPolicy="no-referrer"
                  className="w-full h-[460px] object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-[460px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center mb-4 text-zinc-400">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-white">Anatomical Tailoring Baseline</div>
                  <div className="text-xs text-zinc-400 mt-1">ISO 8559-1 Vector Geometry</div>
                </div>
              )}

              {/* Scrim Overlay */}
              <div 
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"
              />

              {/* Live Fit Card Floating HUD */}
              <div className="absolute bottom-4 left-4 right-4 p-5 bg-[#0e1017]/90 backdrop-blur-md rounded-md border border-zinc-700/60 shadow-xl">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-zinc-300" />
                    <span className="text-xs font-mono font-medium tracking-wide text-zinc-300 uppercase">
                      Universal Fit Card
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-white tracking-wider">
                    FS-98C-82W-RC
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
                    <span className="block text-[10px] text-zinc-400 uppercase">Chest</span>
                    <span className="font-mono text-zinc-200 font-semibold tabular-nums">98.0 cm</span>
                  </div>
                  <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
                    <span className="block text-[10px] text-zinc-400 uppercase">Waist</span>
                    <span className="font-mono text-zinc-200 font-semibold tabular-nums">82.0 cm</span>
                  </div>
                  <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
                    <span className="block text-[10px] text-zinc-400 uppercase">Shoulder</span>
                    <span className="font-mono text-zinc-200 font-semibold tabular-nums">45.0 cm</span>
                  </div>
                  <div className="bg-zinc-900/80 p-2 rounded border border-zinc-800">
                    <span className="block text-[10px] text-zinc-400 uppercase">Inseam</span>
                    <span className="font-mono text-zinc-200 font-semibold tabular-nums">81.0 cm</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>Silhouette: Classic Ease (+7cm)</span>
                  <span>Taper Drop: 16cm</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
