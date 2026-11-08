import { useState } from 'react';
import { ArrowRight, Ruler, Shield, Layers } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
  onExploreCalibrator: () => void;
}

export default function Hero({ onOpenWaitlist, onExploreCalibrator }: HeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="how-it-works" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-[#DDD8D0] bg-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Shopper Value Proposition (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Core Tagline / Brand Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#7A4B2F] mb-6 font-semibold">
              <span>MEASURE ONCE. FIND YOUR SIZE EVERYWHERE.</span>
            </div>

            {/* Approved Headline in Fraunces */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#141518] leading-[1.12] mb-6 [text-wrap:balance]">
              Clothing sizes change from brand to brand. Your measurements don’t have to.
            </h1>

            {/* Approved Supporting Copy */}
            <p className="text-base sm:text-lg text-[#4E4B45] leading-relaxed max-w-2xl mb-8">
              One brand&apos;s Medium can measure differently from another&apos;s. FITSYNC gives you a private measurement profile that can be compared against actual garment specifications, helping you make more informed clothing-size decisions.
            </p>

            {/* Primary & Secondary Action Zone */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-12">
              <button
                type="button"
                onClick={onExploreCalibrator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#F9F8F5] bg-[#141518] rounded-xs hover:bg-[#7A4B2F] transition-all cursor-pointer shadow-sm active:scale-[0.99] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141518]"
              >
                <Ruler className="w-4 h-4 text-[#F9F8F5]" />
                <span>Open the Measurement Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenWaitlist}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#141518] bg-transparent border border-[#918A80] rounded-xs hover:bg-[#F2EFEB] hover:border-[#141518] transition-all cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141518]"
              >
                <span>Request Early Access</span>
              </button>
            </div>

            {/* 3-Pillar Conceptual Clarity Strip */}
            <div className="pt-8 border-t border-[#DDD8D0] grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#4E4B45]">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141518] uppercase tracking-wider mb-1">
                  <Ruler className="w-3.5 h-3.5 text-[#7A4B2F]" />
                  <span>Your Body</span>
                </div>
                <div className="text-xs leading-relaxed text-[#4E4B45]">
                  Consistent reference points measured directly.
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141518] uppercase tracking-wider mb-1">
                  <Layers className="w-3.5 h-3.5 text-[#7A4B2F]" />
                  <span>The Garment</span>
                </div>
                <div className="text-xs leading-relaxed text-[#4E4B45]">
                  Actual finished clothing specifications and drape.
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141518] uppercase tracking-wider mb-1">
                  <Shield className="w-3.5 h-3.5 text-[#7A4B2F]" />
                  <span>The Match</span>
                </div>
                <div className="text-xs leading-relaxed text-[#4E4B45]">
                  Comparing dimensions so you choose with confidence.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Tailored Clothing Sculpture Photography in Warm Mat Frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-3 bg-[#F2EFEB] rounded-sm border border-[#DDD8D0] shadow-sm">
              <div className="relative rounded-xs overflow-hidden bg-[#141518]">
                {!imageError ? (
                  <img
                    src="/src/assets/images/hero_fashion_tailoring_1794063913439.jpg"
                    alt="FITSYNC bespoke tailored garment form demonstrating structural drape"
                    referrerPolicy="no-referrer"
                    className="w-full h-[440px] sm:h-[480px] object-cover object-center"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-[440px] bg-[#141518] flex flex-col items-center justify-center p-8 text-center text-[#F9F8F5]">
                    <Ruler className="w-8 h-8 text-[#DDD8D0] mb-3" />
                    <div className="font-serif text-lg">Architectural Tailoring Baseline</div>
                    <div className="text-xs text-[#8F94A0] mt-1 font-mono">Precision Garment Drape</div>
                  </div>
                )}
              </div>

              {/* Archival Label Tag */}
              <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-[#4E4B45]">
                <span>FITSYNC ATELIER ARCHIVE</span>
                <span>TAILORING & DRAPE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
