import { useState } from 'react';
import { X, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { submitWaitlist } from '../lib/supabase';
import type { WaitlistSubmission } from '../types/fitsync';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<'shopper' | 'brand' | 'developer'>('shopper');
  const [brandOrCompany, setBrandOrCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState<{ message: string; position?: number } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const entry: WaitlistSubmission = {
      email,
      userType,
      brandOrCompany: brandOrCompany.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    try {
      const res = await submitWaitlist(entry);
      setSuccessInfo(res);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Unable to reserve spot right now. Please retry.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setBrandOrCompany('');
    setNotes('');
    setSuccessInfo(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={handleReset} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#0e1017] border border-zinc-800 rounded-lg p-6 sm:p-8 shadow-2xl z-10">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 id="modal-title" className="text-xl font-bold text-white mb-2">
              Early Access Confirmed
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-sm mx-auto mb-4">
              {successInfo?.message || 'Your FITSYNC reservation is confirmed.'}
            </p>
            {successInfo?.position && (
              <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400 mb-6">
                Priority Waitlist ID: #{successInfo.position}
              </div>
            )}
            <div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-sm hover:bg-zinc-200 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
              FITSYNC PILOT INVITATION
            </div>
            <h3 id="modal-title" className="text-2xl font-bold text-white mb-2 tracking-tight">
              Reserve Early Access.
            </h3>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Join the initial cohort testing universal size translation across brand catalogs and custom atelier integrations.
            </p>

            {status === 'error' && errorMessage && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-800/80 rounded text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                  I am participating as:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'shopper', label: 'Shopper' },
                    { id: 'brand', label: 'Brand / Retail' },
                    { id: 'developer', label: 'Engineer' },
                  ].map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setUserType(role.id as 'shopper' | 'brand' | 'developer')}
                      className={`py-2 px-3 text-xs font-medium rounded border transition-all cursor-pointer ${
                        userType === role.id
                          ? 'bg-zinc-800 border-zinc-500 text-white'
                          : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded focus:outline-hidden focus:border-zinc-500 text-white placeholder-zinc-600 transition-colors"
                />
              </div>

              {/* Brand / Company (Optional) */}
              <div>
                <label htmlFor="company" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  {userType === 'shopper' ? 'Preferred Brands (Optional)' : 'Company / Brand / Storefront (Optional)'}
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder={userType === 'shopper' ? 'e.g., Norse Projects, Acronym, Lemaire' : 'e.g., Studio Atelier Inc.'}
                  value={brandOrCompany}
                  onChange={(e) => setBrandOrCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded focus:outline-hidden focus:border-zinc-500 text-white placeholder-zinc-600 transition-colors"
                />
              </div>

              {/* Notes / Fit Challenges */}
              <div>
                <label htmlFor="notes" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Biggest Fit Challenge or Goal (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder="e.g., Broad shoulders with slim waist, sleeve lengths always too short..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-950 border border-zinc-800 rounded focus:outline-hidden focus:border-zinc-500 text-white placeholder-zinc-600 transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-sm hover:bg-zinc-200 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Early Access Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-zinc-400 text-center pt-2">
                Zero spam. Your data will never be sold or shared with third-party advertisers.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
