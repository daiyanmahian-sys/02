import { useState } from 'react';
import { Layers, Crosshair, Cpu } from 'lucide-react';

export default function CoreEngine() {
  const [imageError, setImageError] = useState(false);

  const pillars = [
    {
      number: '01',
      title: 'True Anthropometric Baseline',
      icon: Crosshair,
      description:
        'Direct bone-to-bone landmark coordinates and circumferences modeled after ISO 8559-1. Instead of vague vanity numbers, your physical torso, arm, and leg geometry are captured as immutable millimeter foundations.',
    },
    {
      number: '02',
      title: 'Pattern Ease Allocation',
      icon: Layers,
      description:
        'Garments require functional mobility ease beyond bare skin measurements. FITSYNC dynamically calculates the exact delta required for tailored, classic, relaxed, or architectural drape.',
    },
    {
      number: '03',
      title: 'Textile Tensile Dynamics',
      icon: Cpu,
      description:
        'A 100% rigid Japanese raw denim jacket fits entirely differently from a 4-way stretch merino knit. FITSYNC incorporates yarn elastane percentages and fabric recovery hysteresis into the recommendation vector.',
    },
  ];

  return (
    <section id="engine" className="py-24 border-b border-zinc-850 bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            02. The Engineering Paradigm
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Three Physical Dimensions That Define True Fit.
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Legacy retail relies on two-letter vanity labels invented in the 1950s. FITSYNC separates clothing fit into three measurable, independent physical variables.
          </p>
        </div>

        {/* 2-Column Split: Precision Asset + Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Precision Asset Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl group">
              {!imageError ? (
                <img
                  src="/src/assets/images/craft_tape_precision_1794063913464.jpg"
                  alt="Minimalist tailor tape measure and textile craftsmanship"
                  referrerPolicy="no-referrer"
                  className="w-full h-[480px] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-[480px] bg-zinc-900 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center mb-4 text-zinc-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-white">Pattern Precision</div>
                  <div className="text-xs text-zinc-400 mt-1">Millimeter Scale Calibration</div>
                </div>
              )}

              {/* Scrim Overlay */}
              <div 
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"
              />

              <div className="absolute bottom-6 left-6 right-6 text-xs text-zinc-300">
                <div className="font-mono text-zinc-400 text-[10px] uppercase tracking-wider mb-1">
                  CALIBRATION SPECIFICATION
                </div>
                <div className="font-semibold text-white text-sm">
                  Continuous Millimeter Standard
                </div>
                <p className="text-zinc-400 text-xs mt-1">
                  Replacing ambiguous small, medium, and large labels with standardized garment pattern coordinate bounds.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The 3 Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="p-6 rounded-lg border border-zinc-850 bg-zinc-900/40 hover:border-zinc-750 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="font-mono text-sm font-bold text-zinc-400 pt-0.5">
                      {pillar.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-white" />
                        <h3 className="text-base font-semibold text-white">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
