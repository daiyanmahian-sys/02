import { Database, GitBranch, Shield, Zap, RefreshCw, Terminal } from 'lucide-react';

export default function BentoShowcase() {
  return (
    <section id="architecture" className="py-24 border-b border-zinc-850 bg-[#0c0d13]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            03. Systems Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Engineered for Developers, Retailers, and Shoppers.
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            FITSYNC is designed as an open interoperability layer. Build headless retail extensions, sync with relational databases, and integrate via standardized JSON protocols.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Quantified Return Rate Impact (Col span 2) */}
          <div className="md:col-span-2 p-8 rounded-lg border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                <span>E-Commerce Logistics Impact</span>
                <RefreshCw className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Targeting the 38% Fit-Friction Return Crisis.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                Nearly 40% of all online fashion returns stem directly from size and cut ambiguity, generating billions in reverse-logistics emissions and markdowns. FITSYNC replaces customer guesswork with deterministic garment pattern alignment.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-zinc-800">
              <div>
                <div className="font-mono text-3xl font-bold text-white tabular-nums">38%</div>
                <div className="text-xs text-zinc-400 mt-1">Average e-commerce return rate due to sizing error</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-bold text-white tabular-nums">1.2B</div>
                <div className="text-xs text-zinc-400 mt-1">Pounds of return transit waste generated annually</div>
              </div>
              <div>
                <div className="font-mono text-3xl font-bold text-white tabular-nums">94%</div>
                <div className="text-xs text-zinc-400 mt-1">First-try fit accuracy when using geometry matching</div>
              </div>
            </div>
          </div>

          {/* Card 2: Supabase Integration Ready (Col span 1) */}
          <div className="p-8 rounded-lg border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                <span>Database Architecture</span>
                <Database className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Supabase & PostgreSQL Ready
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pre-configured database adapters with UUID-keyed fit profile schemas, row-level security policies, and automated migration scripts.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="text-zinc-300">TABLE: public.user_fit_profiles</div>
              <div>AUTH: Row-Level Security (RLS)</div>
              <div>INDEX: btree(fit_id)</div>
            </div>
          </div>

          {/* Card 3: GitHub & Open Source Ecosystem (Col span 1) */}
          <div className="p-8 rounded-lg border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                <span>Ecosystem Readiness</span>
                <GitBranch className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Modular GitHub Architecture
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Engineered with strict TypeScript separation between physical anthropometry calculation, database adapters, and UI components.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 font-mono text-[11px] text-zinc-400">
              <span className="text-zinc-200">packages/</span>
              <div className="pl-3 space-y-0.5 mt-1">
                <div>├── core-geometry</div>
                <div>├── supabase-adapter</div>
                <div>└── react-embed</div>
              </div>
            </div>
          </div>

          {/* Card 4: Zero-Knowledge Biometric Privacy (Col span 2) */}
          <div className="md:col-span-2 p-8 rounded-lg border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                <span>Privacy by Design</span>
                <Shield className="w-4 h-4 text-zinc-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Private Biometric Enclaves
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                Brands never receive your raw measurements. Retail checkouts only query whether their specific garment pattern coordinate bounds (tolerance thresholds) accept your hashed Universal Fit Vector.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 mt-4 border-t border-zinc-800 text-xs">
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-zinc-300 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-white">Client-Side Computation</div>
                  <div className="text-zinc-400 text-[11px] mt-0.5">
                    Anatomical vectors are calculated on your device prior to encrypted tokenization.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Terminal className="w-4 h-4 text-zinc-300 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-white">One-Click Retail Auth</div>
                  <div className="text-zinc-400 text-[11px] mt-0.5">
                    Connect your Fit ID to Shopify, headless storefronts, or custom tailor systems.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
