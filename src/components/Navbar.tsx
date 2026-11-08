import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export default function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Sizes Differ', href: '#why-sizes-differ' },
    { label: 'Measurement Room', href: '#measurement-room' },
    { label: 'For Clothing Makers', href: '#for-brands' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F9F8F5]/90 border-b border-[#DDD8D0] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Fraunces serif) */}
        <a
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight text-[#141518] hover:text-[#7A4B2F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 bg-[#7A4B2F] rounded-xs" aria-hidden="true" />
          FITSYNC
        </a>

        {/* Zone 2: Concise single-line navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4E4B45]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="hover:text-[#141518] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#141518] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action & mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenWaitlist}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F9F8F5] bg-[#141518] rounded-xs hover:bg-[#7A4B2F] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141518]"
          >
            Request Early Access
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#141518] hover:bg-[#F2EFEB] rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#141518]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Accessible Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DDD8D0] bg-[#F9F8F5] px-6 py-5 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base font-medium text-[#141518] hover:text-[#7A4B2F] py-1 border-b border-[#F2EFEB] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWaitlist();
                }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#F9F8F5] bg-[#141518] rounded-xs hover:bg-[#7A4B2F] transition-all text-center"
              >
                Request Early Access
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
