import { useState } from 'react';
import { Code2, Check, Copy, ArrowUpRight } from 'lucide-react';

interface ForBrandsAndDevsProps {
  onOpenWaitlist: () => void;
}

export default function ForBrandsAndDevs({ onOpenWaitlist }: ForBrandsAndDevsProps) {
  const [activeTab, setActiveTab] = useState<'brand' | 'dev'>('brand');
  const [copied, setCopied] = useState(false);

  const brandSpecJson = `{
  "$schema": "https://fitsync.org/schemas/v1/pattern-grade.json",
  "garmentId": "sku_blazer_tailored_042",
  "patternType": "outerwear_single_breasted",
  "dimensionalTolerances": {
    "chestMm": { "min": 960, "max": 1020, "optimal": 985 },
    "waistMm": { "min": 800, "max": 850, "optimal": 825 },
    "shoulderMm": { "min": 440, "max": 465, "optimal": 452 },
    "armLengthMm": { "min": 630, "max": 655, "optimal": 642 }
  },
  "fabricProperties": {
    "composition": "98% Virgin Wool, 2% Elastane",
    "stretchCoefficient": 0.04,
    "recoveryIndex": 0.96
  }
}`;

  const devApiJson = `// REST / GraphQL Query
curl -X POST https://api.fitsync.org/v1/verify-fit \\
  -H "Authorization: Bearer fs_live_secret_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "fitId": "FS-98C-82W-RC",
    "targetSku": "sku_blazer_tailored_042",
    "silhouettePreference": "classic"
  }'

// Response: Real pattern alignment confirmation
{
  "fitMatch": "optimal",
  "confidenceScore": 0.984,
  "easeDifferentialMm": { "chest": +65, "waist": +45 },
  "patternZoneStatus": {
    "shoulder": "exact",
    "chest": "optimal_drape",
    "waist": "comfortable"
  }
}`;

  const currentContent = activeTab === 'brand' ? brandSpecJson : devApiJson;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="for-brands" className="py-24 border-b border-zinc-850 bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            04. Integration Specification
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Empower Your Brand with Standardized Sizing.
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Stop relying on customer surveys and static PDF sizing charts. Connect your CAD pattern grading tables directly to FITSYNC&apos;s universal verification API.
          </p>
        </div>

        {/* Code & Spec Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Benefits & Integration Workflow (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-lg border border-zinc-850 bg-zinc-900/40">
              <h3 className="text-base font-semibold text-white mb-2">
                For Retail Apparel Brands
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Publish your garment CAD patterns once. Shoppers browsing your storefront automatically see their deterministic fit outcome without wondering whether your brand runs tight or large.
              </p>
              <div className="mt-4 pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400 space-y-1.5">
                <div>✓ Shopify App Store Plugin Ready</div>
                <div>✓ Headless Commerce API (REST + GraphQL)</div>
                <div>✓ Zero customer measurement storage required</div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-zinc-850 bg-zinc-900/40">
              <h3 className="text-base font-semibold text-white mb-2">
                For Independent Tailors & Ateliers
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Accept bespoke and made-to-measure orders with standardized ISO anthropometry coordinates, reducing consultation back-and-forth and alterations.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenWaitlist}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-sm hover:bg-zinc-200 transition-all cursor-pointer shadow-md"
              >
                <span>Partner with FITSYNC</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Code Inspector (7 cols) */}
          <div className="lg:col-span-7 rounded-lg border border-zinc-800 bg-[#06070a] overflow-hidden shadow-2xl">
            {/* Tab header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-zinc-400" />
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('brand')}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      activeTab === 'brand' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    pattern-grade.json
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dev')}
                    className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                      activeTab === 'dev' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    api-verify.sh
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-zinc-200" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Content */}
            <div className="p-5 overflow-x-auto text-xs font-mono text-zinc-300 leading-relaxed bg-[#06070a]">
              <pre className="selection:bg-zinc-800">
                <code>{currentContent}</code>
              </pre>
            </div>

            {/* Footer status */}
            <div className="px-5 py-2.5 bg-zinc-950/80 border-t border-zinc-850 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Standard: FITSYNC-SPEC-V1.0</span>
              <span>Open Specification</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
