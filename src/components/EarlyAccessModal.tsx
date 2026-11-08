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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141518]/70 backdrop-blur-xs transition-opacity"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={handleReset} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#DDD8D0] rounded-sm p-6 sm:p-8 shadow-2xl z-10 text-[#141518]">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-[#4E4B45] hover:text-[#141518] transition-colors cursor-pointer p-1 rounded-xs focus-visible:outline-2 focus-visible:outline-[#141518]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F2EFEB] border border-[#DDD8D0] flex items-center justify-center text-[#7A4B2F] mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 id="modal-title" className="font-serif text-2xl font-semibold text-[#141518] mb-2">
              Early Access Confirmed
            </h3>
            <p className="text-sm text-[#4E4B45] leading-relaxed max-w-sm mx-auto mb-4">
              {successInfo?.message || 'Your FITSYNC reservation is confirmed.'}
            </p>
            {successInfo?.position && (
              <div className="inline-block px-3 py-1 bg-[#F9F8F5] border border-[#DDD8D0] rounded-xs text-xs font-mono text-[#7A4B2F] mb-6">
                Reservation Priority: #{successInfo.position}
              </div>
            )}
            <div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#F9F8F5] bg-[#141518] rounded-xs hover:bg-[#7A4B2F] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-mono text-[#7A4B2F] uppercase tracking-widest mb-1.5">
              FITSYNC PILOT INVITATION
            </div>
            <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-[#141518] mb-2 tracking-tight">
              Reserve your measurement profile.
            </h3>
            <p className="text-xs sm:text-sm text-[#4E4B45] mb-6 leading-relaxed">
              Join the initial cohort exploring universal measurement profiles and standard garment ease translation.
            </p>

            {status === 'error' && errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xs text-xs text-red-800">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#4E4B45] mb-2">
                  I am participating as:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'shopper', label: 'Shopper' },
                    { id: 'brand', label: 'Clothing Brand' },
                    { id: 'developer', label: 'Tailor / Atelier' },
                  ].map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setUserType(role.id as 'shopper' | 'brand' | 'developer')}
                      className={`py-2 px-3 text-xs font-medium rounded-xs border transition-all cursor-pointer ${
                        userType === role.id
                          ? 'bg-[#141518] border-[#141518] text-[#F9F8F5]'
                          : 'bg-[#F9F8F5] border-[#918A80] text-[#4E4B45] hover:border-[#141518] hover:text-[#141518]'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input with WCAG 2.2 compliant border */}
              <div>
                <label htmlFor="modal-email" className="block text-xs font-mono uppercase text-[#4E4B45] mb-1.5">
                  Email Address *
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#918A80] rounded-xs focus:outline-hidden focus:border-[#141518] focus:ring-1 focus:ring-[#141518] text-[#141518] placeholder-[#918A80] transition-colors"
                />
              </div>

              {/* Brand / Company (Optional) */}
              <div>
                <label htmlFor="modal-company" className="block text-xs font-mono uppercase text-[#4E4B45] mb-1.5">
                  {userType === 'shopper' ? 'Favorite Clothing Brands (Optional)' : 'Brand, Label or Studio Name (Optional)'}
                </label>
                <input
                  id="modal-company"
                  type="text"
                  placeholder={userType === 'shopper' ? 'e.g., Norse Projects, Margaret Howell, Uniqlo' : 'e.g., Studio Tailoring Atelier'}
                  value={brandOrCompany}
                  onChange={(e) => setBrandOrCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#918A80] rounded-xs focus:outline-hidden focus:border-[#141518] focus:ring-1 focus:ring-[#141518] text-[#141518] placeholder-[#918A80] transition-colors"
                />
              </div>

              {/* Fit Challenges / Notes */}
              <div>
                <label htmlFor="modal-notes" className="block text-xs font-mono uppercase text-[#4E4B45] mb-1.5">
                  Most Common Sizing Issue (Optional)
                </label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  placeholder="e.g., Shirts that fit my neck are too wide at the waist; sleeve lengths always vary..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFFFFF] border border-[#918A80] rounded-xs focus:outline-hidden focus:border-[#141518] focus:ring-1 focus:ring-[#141518] text-[#141518] placeholder-[#918A80] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#F9F8F5] bg-[#141518] rounded-xs hover:bg-[#7A4B2F] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs focus-visible:outline-2 focus-visible:outline-[#141518]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Pilot Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-[#4E4B45] text-center pt-2">
                Privacy first. We do not sell personal measurements or share data with advertising networks.
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
