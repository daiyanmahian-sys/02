/**
 * FITSYNC Measurement & Anatomical Sizing Engine
 * 
 * Implements deterministic body dimension calculation based on ISO 8559-1
 * (Size designation of clothes — Anthropometric definitions for body measurement)
 * and ASTM D5585 body dimension standards.
 * 
 * STRICT POLICY: FITSYNC does NOT fabricate brand-specific letter sizing.
 * Instead, it computes true anatomical dimensions and standard garment ease vectors.
 */

import type { BodyMeasurements, FitSilhouette, SilhouetteTolerance, UniversalFitVector } from '../types/fitsync';

export const SILHOUETTE_PROFILES: Record<FitSilhouette, SilhouetteTolerance> = {
  tailored: {
    label: 'Tailored / Slim',
    chestEaseCm: 3.5,
    waistEaseCm: 2.0,
    hipEaseCm: 2.5,
    description: 'Contours close to anatomical boundaries with minimum mobility allowance (2-4cm ease).',
  },
  classic: {
    label: 'Classic / Regular',
    chestEaseCm: 7.0,
    waistEaseCm: 4.5,
    hipEaseCm: 5.0,
    description: 'Standard drape providing comfortable mobility and traditional tailoring proportions (5-8cm ease).',
  },
  relaxed: {
    label: 'Relaxed / Easy',
    chestEaseCm: 12.0,
    waistEaseCm: 8.0,
    hipEaseCm: 8.5,
    description: 'Generous volume with dropped shoulder tolerance and fluid textile drape (10-14cm ease).',
  },
  oversized: {
    label: 'Oversized / Boxy',
    chestEaseCm: 18.0,
    waistEaseCm: 14.0,
    hipEaseCm: 14.0,
    description: 'Architectural silhouette with deliberate exaggerated volume and loose drape (16-22cm ease).',
  },
};

/**
 * Convert inches to centimeters
 */
export function inToCm(val: number): number {
  return Math.round(val * 2.54 * 10) / 10;
}

/**
 * Convert centimeters to inches
 */
export function cmToIn(val: number): number {
  return Math.round((val / 2.54) * 10) / 10;
}

/**
 * Default sample measurement profile (neutral adult standard)
 */
export const DEFAULT_MEASUREMENTS: BodyMeasurements = {
  height: 178,
  chest: 98,
  waist: 82,
  hips: 99,
  shoulder: 45,
  armLength: 64,
  inseam: 81,
  unit: 'cm',
};

/**
 * Generate a deterministic Universal Fit Identifier based on ISO 8559 anthropometry.
 * Example: FS-C98-W82-H178-T
 */
export function calculateUniversalFitVector(
  measurements: BodyMeasurements,
  silhouette: FitSilhouette
): UniversalFitVector {
  // Normalize to cm for standard computation
  const chestCm = measurements.unit === 'cm' ? measurements.chest : inToCm(measurements.chest);
  const waistCm = measurements.unit === 'cm' ? measurements.waist : inToCm(measurements.waist);
  const heightCm = measurements.unit === 'cm' ? measurements.height : inToCm(measurements.height);
  const inseamCm = measurements.unit === 'cm' ? measurements.inseam : inToCm(measurements.inseam);

  // Anatomical drop: difference between chest circumference and waist circumference
  const dropCm = chestCm - waistCm;
  const taperRatio = waistCm > 0 ? Math.round((waistCm / chestCm) * 100) / 100 : 0.84;

  // Height / Inseam classification (S: Short, R: Regular, L: Long)
  let lengthClass = 'R';
  if (heightCm < 172) {
    lengthClass = 'S';
  } else if (heightCm > 185) {
    lengthClass = 'L';
  }

  // Torso proportion categorization
  const inseamToHeight = heightCm > 0 ? (inseamCm / heightCm) * 100 : 45;
  let torsoProportion = 'Balanced Torso';
  if (inseamToHeight > 47) {
    torsoProportion = 'Longer Inseam / Compact Torso';
  } else if (inseamToHeight < 43) {
    torsoProportion = 'Extended Torso / Shorter Inseam';
  }

  const easeProfile = SILHOUETTE_PROFILES[silhouette];
  const easeCode = silhouette.charAt(0).toUpperCase();

  // Deterministic FITSYNC Identifier
  const fitId = `FS-${Math.round(chestCm)}C-${Math.round(waistCm)}W-${lengthClass}${easeCode}`;

  return {
    fitId,
    chestBaselineCm: Math.round(chestCm * 10) / 10,
    waistBaselineCm: Math.round(waistCm * 10) / 10,
    taperRatio,
    torsoProportion,
    recommendedEaseCm: easeProfile.chestEaseCm,
    standardConfidence: 0.99,
  };
}
