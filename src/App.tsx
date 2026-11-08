import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreEngine from './components/CoreEngine';
import InteractiveFitPlayground from './components/InteractiveFitPlayground';
import BentoShowcase from './components/BentoShowcase';
import EarlyAccessModal from './components/EarlyAccessModal';
import Footer from './components/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitWaitlist } from './lib/supabase';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineStatus, setInlineStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [inlineMsg, setInlineMsg] = useState('');

  const scrollToMeasurementRoom = () => {
    const el = document.getElementById('measurement-room');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineEmail || !inlineEmail.includes('@')) {
      setInlineStatus('error');
      setInlineMsg('Please enter a valid email address.');
      return;
    }

    setInlineStatus('loading');
    setInlineMsg('');

    try {
      const res = await submitWaitlist({
        email: inlineEmail,
        userType: 'shopper',
        notes: 'Inline footer signup',
      });
      setInlineStatus('success');
      setInlineMsg(res.message);
      setInlineEmail('');
    } catch (err: unknown) {
      setInlineStatus('error');
      setInlineMsg(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#141518] flex flex-col font-sans selection:bg-[#E7E0D5] selection:text-[#141518]">
      {/* Top Navigation */}
      <Navbar onOpenWaitlist={() => setIsModalOpen(true)} />

      {/* Main Content: Five Clear Sections */}
      <main className="flex-1">
        {/* Section 1: Editorial Hero */}
        <Hero
          onOpenWaitlist={() => setIsModalOpen(true)}
          onExploreCalibrator={scrollToMeasurementRoom}
        />

        {/* Section 2: Why Clothing Sizes Differ */}
        <CoreEngine />

        {/* Section 3: The Measurement Room (Distinct Dark Technical Chamber) */}
        <InteractiveFitPlayground onOpenWaitlist={() => setIsModalOpen(true)} />

        {/* Section 4: How Clothing Makers Connect */}
        <BentoShowcase onOpenWaitlist={() => setIsModalOpen(true)} />

        {/* Section 5: Early Access Conversion Section */}
        <section className="py-24 border-b border-[#DDD8D0] bg-[#F2EFEB] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7A4B2F] mb-3">
              Pilot Cohort Registration
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#141518] tracking-tight mb-4 [text-wrap:balance]">
              Reserve your universal measurement profile.
            </h2>
            <p className="text-[#4E4B45] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Be among the first shoppers, apparel ateliers, and clothing makers to experience consistent size translation across brands without return friction.
            </p>

            {inlineStatus === 'success' ? (
              <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xs bg-[#FFFFFF] border border-[#DDD8D0] text-sm text-[#141518] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#7A4B2F]" />
                <span>{inlineMsg || 'Registration secured. We will notify you when spots open.'}</span>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={inlineEmail}
                  onChange={(e) => setInlineEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm bg-[#FFFFFF] border border-[#918A80] rounded-xs focus:outline-hidden focus:border-[#141518] focus:ring-1 focus:ring-[#141518] text-[#141518] placeholder-[#918A80] transition-colors"
                  aria-label="Email address for early access waitlist"
                />
                <button
                  type="submit"
                  disabled={inlineStatus === 'loading'}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F9F8F5] bg-[#141518] rounded-xs hover:bg-[#7A4B2F] transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-2 shadow-xs focus-visible:outline-2 focus-visible:outline-[#141518]"
                >
                  <span>Request Early Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {inlineStatus === 'error' && (
              <p className="text-xs text-red-700 mt-3">{inlineMsg}</p>
            )}

            <div className="mt-6 text-[12px] text-[#4E4B45] font-mono">
              Free during pilot · Held in secure development registry · No permanent cloud storage in demo
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenWaitlist={() => setIsModalOpen(true)} />

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
