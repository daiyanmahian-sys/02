import { useState } from 'react';
import { Ruler } from 'lucide-react';

export default function CoreEngine() {
  const [imageError, setImageError] = useState(false);

  const ledgerItems = [
    {
      number: '01',
      title: 'Brand Size Charts',
      text: 'Different brands use different sizing conventions and garment specifications. A Medium from one brand may have different chest, shoulder and length measurements from a Medium elsewhere.',
    },
    {
      number: '02',
      title: 'Body vs. Garment Measurements',
      text: 'Your body measurements describe your proportions. Garment measurements describe the finished clothing. The difference between them determines how closely or loosely a garment fits.',
    },
    {
      number: '03',
      title: 'Cut and Ease',
      text: 'The intended silhouette affects how a garment sits on your body. Tailored, regular and relaxed cuts can behave differently even when their basic measurements are similar.',
    },
  ];

  return (
    <section id="why-sizes-differ" className="py-20 md:py-28 border-b border-[#DDD8D0] bg-[#F2EFEB]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="text-xs font-mono uppercase tracking-widest text-[#7A4B2F] mb-3 font-semibold">
            02. Sizing Principles
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141518] tracking-tight [text-wrap:balance]">
            Why clothing sizes differ from label to label.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4E4B45] leading-relaxed">
            Clothing sizes are not standardized units like centimetres or kilograms. Understanding what influences fit helps you make more informed clothing choices.
          </p>
        </div>

        {/* Editorial Composition: Archival Photography + Information Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Macro Tailor Tape Photography (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-3 bg-[#FFFFFF] rounded-sm border border-[#DDD8D0] shadow-sm">
              <div className="relative rounded-xs overflow-hidden bg-[#141518]">
                {!imageError ? (
                  <img
                    src="/src/assets/images/craft_tape_precision_1794063913464.jpg"
                    alt="Precision tailor measuring tape draped over textured suiting fabric"
                    referrerPolicy="no-referrer"
                    className="w-full h-[420px] sm:h-[460px] object-cover object-center"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-[420px] bg-[#141518] flex flex-col items-center justify-center p-8 text-center text-[#F9F8F5]">
                    <Ruler className="w-8 h-8 text-[#DDD8D0] mb-3" />
                    <div className="font-serif text-lg">Physical Measurement Standard</div>
                    <div className="text-xs text-[#8F94A0] mt-1 font-mono">Millimeter Tape Calibration</div>
                  </div>
                )}
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-[#4E4B45]">
                <span>BENCHMARK SPECIMEN</span>
                <span>PHYSICAL DIMENSIONS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Information Ledger (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-[#DDD8D0] border-t border-b border-[#DDD8D0]">
            {ledgerItems.map((item) => (
              <div
                key={item.number}
                className="py-7 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-baseline"
              >
                {/* Number marker */}
                <div className="sm:col-span-2">
                  <span className="font-mono text-sm font-bold text-[#7A4B2F]">
                    {item.number}
                  </span>
                </div>

                {/* Subheading & explanation */}
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141518] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#4E4B45] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
