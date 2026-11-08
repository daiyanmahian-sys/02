interface FooterProps {
  onOpenWaitlist: () => void;
}

export default function Footer({ onOpenWaitlist }: FooterProps) {
  return (
    <footer className="w-full bg-[#F2EFEB] border-t border-[#DDD8D0] py-16 text-xs text-[#4E4B45]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#DDD8D0]">
          
          {/* Col 1: Wordmark & Purpose */}
          <div className="md:col-span-2">
            <a
              href="/"
              className="font-serif text-2xl font-semibold tracking-tight text-[#141518] flex items-center gap-2 mb-3"
            >
              <span className="inline-block w-2 h-2 bg-[#7A4B2F] rounded-xs" aria-hidden="true" />
              FITSYNC
            </a>
            <p className="text-[#4E4B45] max-w-sm leading-relaxed mb-4 text-xs">
              A universal personal measurement profile that helps clothing shoppers find consistent, appropriate sizes across different apparel brands and garment cuts.
            </p>
            <div className="text-[11px] text-[#4E4B45] font-mono">
              Measurement Baseline: Standardized Anthropometric Reference Definitions
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="font-mono text-[#141518] font-semibold uppercase tracking-wider mb-3">
              Sections
            </div>
            <ul className="space-y-2.5">
              <li>
                <a href="#how-it-works" className="hover:text-[#141518] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-sizes-differ" className="hover:text-[#141518] transition-colors">
                  Why Sizes Differ
                </a>
              </li>
              <li>
                <a href="#measurement-room" className="hover:text-[#141518] transition-colors">
                  Measurement Room
                </a>
              </li>
              <li>
                <a href="#for-brands" className="hover:text-[#141518] transition-colors">
                  For Clothing Makers
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Standards & Connect */}
          <div>
            <div className="font-mono text-[#141518] font-semibold uppercase tracking-wider mb-3">
              Principles
            </div>
            <ul className="space-y-2.5">
              <li className="text-[#4E4B45]">ISO 8559-1 Measurement Landmarks</li>
              <li className="text-[#4E4B45]">ASTM D5585 Body Dimension References</li>
              <li className="text-[#4E4B45]">Private, Opaque Profile Identifiers</li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenWaitlist}
                  className="text-[#7A4B2F] hover:underline cursor-pointer font-medium"
                >
                  Join Early Access Registry →
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#4E4B45]">
          <div>
            © {new Date().getFullYear()} FITSYNC Platform. Built with architectural tailoring precision.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Accessibility (WCAG 2.2 AA)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
