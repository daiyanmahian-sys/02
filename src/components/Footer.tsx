interface FooterProps {
  onOpenWaitlist: () => void;
}

export default function Footer({ onOpenWaitlist }: FooterProps) {
  return (
    <footer className="w-full bg-[#07080c] border-t border-zinc-850 py-16 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-850">
          
          {/* Col 1: Wordmark & Mission */}
          <div className="md:col-span-2">
            <a
              href="/"
              className="text-lg font-bold tracking-tight text-white flex items-center gap-2 mb-3"
            >
              <span className="inline-block w-2 h-2 bg-white rounded-xs" aria-hidden="true" />
              FITSYNC
            </a>
            <p className="text-zinc-400 max-w-sm leading-relaxed mb-4 text-xs">
              Universal clothing-size recommendation and anatomical calibration platform. Bridging human physical geometry with global apparel pattern grading.
            </p>
            <div className="text-[11px] text-zinc-400 font-mono">
              Architecture: Modular React + TypeScript · Prepared for Supabase & GitHub
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="font-mono text-zinc-300 font-semibold uppercase tracking-wider mb-3">
              Platform
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#calibrator" className="hover:text-zinc-200 transition-colors">
                  Interactive Calibrator
                </a>
              </li>
              <li>
                <a href="#engine" className="hover:text-zinc-200 transition-colors">
                  Measurement Engine
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-zinc-200 transition-colors">
                  Systems Architecture
                </a>
              </li>
              <li>
                <a href="#for-brands" className="hover:text-zinc-200 transition-colors">
                  Brand Integration Spec
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Standards & Connect */}
          <div>
            <div className="font-mono text-zinc-300 font-semibold uppercase tracking-wider mb-3">
              Standards
            </div>
            <ul className="space-y-2">
              <li className="text-zinc-400">ISO 8559-1 Anthropometry</li>
              <li className="text-zinc-400">ASTM D5585 Body Standard</li>
              <li className="text-zinc-400">Zero-Vanity Sizing Policy</li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenWaitlist}
                  className="text-white hover:underline cursor-pointer font-medium"
                >
                  Join Early Access Waitlist →
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} FITSYNC Platform Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-zinc-400">Terms of Protocol</span>
            <span>·</span>
            <span className="hover:text-zinc-400">Security Disclosures</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
