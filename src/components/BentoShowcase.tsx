import { ArrowRight, Layers, Ruler, CheckCircle2 } from 'lucide-react';

interface HowMakersConnectProps {
  onOpenWaitlist: () => void;
}

export default function BentoShowcase({ onOpenWaitlist }: HowMakersConnectProps) {
  const stages = [
    {
      number: '01',
      title: 'Share Garment Specifications',
      text: 'Participating clothing makers could provide finished garment measurements, size labels, intended fit and measurement methods. These details provide a more useful reference than a letter label alone.',
      icon: Layers,
    },
    {
      number: '02',
      title: 'Compare Measurements',
      text: 'The platform is designed to compare relevant shopper measurements with available garment specifications, taking garment category and intended ease into account.',
      icon: Ruler,
    },
    {
      number: '03',
      title: 'Explain the Size Match',
      text: 'The goal is to show shoppers why a particular size may be more suitable, which measurements support the comparison and where information is incomplete.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="for-brands" className="py-20 md:py-28 border-b border-[#DDD8D0] bg-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="text-xs font-mono uppercase tracking-widest text-[#7A4B2F] mb-3 font-semibold">
            04. Platform Vision
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141518] tracking-tight [text-wrap:balance]">
            How clothing makers could connect with FITSYNC.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4E4B45] leading-relaxed">
            FITSYNC is being designed to bring shopper measurements and garment specifications into a clearer, more consistent comparison process.
          </p>
        </div>

        {/* 3-Stage Editorial Workflow with Vertical Dividers on Desktop */}
        <div className="border-t border-b border-[#DDD8D0] py-8 md:py-12 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DDD8D0]">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.number}
                  className="py-8 md:py-4 px-0 md:px-8 first:md:pl-0 last:md:pr-0 flex flex-col justify-between"
                >
                  <div>
                    {/* Number & Stage indicator */}
                    <div className="flex items-center justify-between text-xs font-mono text-[#7A4B2F] uppercase tracking-wider mb-4">
                      <span>STAGE {stage.number}</span>
                      <Icon className="w-4 h-4 text-[#141518]" />
                    </div>

                    {/* Stage title */}
                    <h3 className="font-serif text-2xl font-semibold text-[#141518] mb-3">
                      {stage.title}
                    </h3>

                    {/* Stage description */}
                    <p className="text-sm sm:text-base text-[#4E4B45] leading-relaxed">
                      {stage.text}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#F2EFEB] text-xs font-mono text-[#8F94A0]">
                    <span>CONCEPTUAL SPECIFICATION</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiet Callout for Clothing Makers */}
        <div className="p-8 sm:p-10 rounded-sm border border-[#DDD8D0] bg-[#F2EFEB] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase text-[#7A4B2F] tracking-wider mb-1 font-semibold">
              Clothing Maker Pilot
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#141518]">
              Are you an apparel brand, independent tailor or clothing designer?
            </h4>
            <p className="text-xs sm:text-sm text-[#4E4B45] mt-1.5 leading-relaxed">
              We are consulting with apparel makers to test how finished garment measurement tables can be shared cleanly. Join our early discussion group.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenWaitlist}
            className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F9F8F5] bg-[#141518] rounded-xs hover:bg-[#7A4B2F] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141518]"
          >
            Participate as a Maker
          </button>
        </div>

      </div>
    </section>
  );
}
