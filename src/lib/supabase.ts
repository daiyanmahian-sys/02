/**
 * Supabase Client Integration Layer
 * 
 * Modular adapter prepared for Supabase PostgreSQL database integration.
 * When VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are supplied,
 * this client connects directly to your Supabase project. Otherwise, it gracefully
 * falls back to the backend Express API.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { WaitlistSubmission } from '../types/fitsync';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Modular helper to submit early access waitlist entries.
 * Connects to Supabase table `waitlist` if configured, otherwise routes via `/api/waitlist`.
 */
export async function submitWaitlist(entry: WaitlistSubmission): Promise<{
  success: boolean;
  message: string;
  position?: number;
}> {
  // Direct Supabase execution if configured
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: entry.email.toLowerCase().trim(),
            user_type: entry.userType,
            brand_or_company: entry.brandOrCompany || null,
            notes: entry.notes || null,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        if (error.code === '23505') {
          // unique constraint violation (duplicate email)
          return {
            success: true,
            message: 'You are already registered on the FITSYNC registry.',
          };
        }
        throw error;
      }

      return {
        success: true,
        message: 'Your early access registration is recorded in the Supabase registry.',
        position: data?.length || 1,
      };
    } catch (err: unknown) {
      console.warn('Supabase insert failed, falling back to server API:', err);
    }
  }

  // Fallback to Express backend endpoint
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to submit early access request');
  }

  return data;
}

/**
 * SQL Blueprint for Supabase Table Setup (for future migration)
 * 
 * -- Run in Supabase SQL Editor:
 * CREATE TABLE IF NOT EXISTS public.waitlist (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   email TEXT NOT NULL UNIQUE,
 *   user_type TEXT NOT NULL CHECK (user_type IN ('shopper', 'brand', 'developer')),
 *   brand_or_company TEXT,
 *   notes TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * CREATE TABLE IF NOT EXISTS public.user_fit_profiles (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES auth.users(id),
 *   unit TEXT NOT NULL CHECK (unit IN ('cm', 'in')),
 *   height NUMERIC(5,2) NOT NULL,
 *   chest NUMERIC(5,2) NOT NULL,
 *   waist NUMERIC(5,2) NOT NULL,
 *   hips NUMERIC(5,2) NOT NULL,
 *   shoulder NUMERIC(5,2) NOT NULL,
 *   arm_length NUMERIC(5,2) NOT NULL,
 *   inseam NUMERIC(5,2) NOT NULL,
 *   fit_id TEXT NOT NULL,
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 */
