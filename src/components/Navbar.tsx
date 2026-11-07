/**
 * FITSYNC Top Navigation Bar
 * Follows strict Top Bar Contract: 3 zones separated by gap-8
 * Zone 1: Single text element wordmark
 * Zone 2: 4 concise single-line nav links with hover underlines
 * Zone 3: 1 primary action button
 */

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export default function Navbar({ onOpenWaitlist }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090a0f]/85 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="/"
          className="text-xl font-extrabold tracking-tight text-white hover:text-zinc-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="inline-block w-2.5 h-2.5 bg-zinc-100 rounded-xs" aria-hidden="true" />
          FITSYNC
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#calibrator"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Calibrator
          </a>
          <a
            href="#engine"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Measurement Engine
          </a>
          <a
            href="#architecture"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Architecture
          </a>
          <a
            href="#for-brands"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            For Retailers
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenWaitlist}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-zinc-100 rounded-sm hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Access
          </button>
        </div>
      </div>
    </header>
  );
}
