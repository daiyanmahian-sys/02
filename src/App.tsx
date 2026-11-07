import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveFitPlayground from './components/InteractiveFitPlayground';
import CoreEngine from './components/CoreEngine';
import BentoShowcase from './components/BentoShowcase';
import ForBrandsAndDevs from './components/ForBrandsAndDevs';
import EarlyAccessModal from './components/EarlyAccessModal';
import Footer from './components/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitWaitlist } from './lib/supabase';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineStatus, setInlineStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [inlineMsg, setInlineMsg] = useState('');

  const scrollToCalibrator = () => {
    const el = document.getElementById('calibrator');
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
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenWaitlist={() => setIsModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenWaitlist={() => setIsModalOpen(true)}
          onExploreCalibrator={scrollToCalibrator}
        />

        {/* Interactive Anatomical Calibrator */}
        <InteractiveFitPlayground onOpenWaitlist={() => setIsModalOpen(true)} />

        {/* 3 Pillars of Sizing Physics */}
        <CoreEngine />

        {/* Systems Architecture & Bento Showcase */}
        <BentoShowcase />

        {/* Retail Brands & Developers Integration */}
        <ForBrandsAndDevs onOpenWaitlist={() => setIsModalOpen(true)} />

        {/* Pre-Footer Lead Conversion Strip */}
        <section className="py-20 border-b border-zinc-850 bg-[#0c0d13] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              Phase 1 Deployment Pilot
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 [text-wrap:balance]">
              Standardize Your Fit Across the Web.
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Be among the first shoppers, apparel ateliers, and retailers to experience continuous sizing geometry without return anxiety or vanity guesswork.
            </p>

            {inlineStatus === 'success' ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded bg-zinc-900 border border-zinc-700 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{inlineMsg || 'Registration secured. We will notify you when spots open.'}</span>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={inlineEmail}
                  onChange={(e) => setInlineEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm bg-zinc-950 border border-zinc-800 rounded focus:outline-hidden focus:border-zinc-500 text-white placeholder-zinc-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={inlineStatus === 'loading'}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded hover:bg-zinc-200 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {inlineStatus === 'error' && (
              <p className="text-xs text-red-400 mt-3">{inlineMsg}</p>
            )}

            <div className="mt-4 text-[11px] text-zinc-400">
              No credit card required · Open ISO standard · Encrypted profile storage
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
