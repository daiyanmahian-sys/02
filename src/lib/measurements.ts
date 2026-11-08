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
 * Generates an opaque, non-descriptive profile identifier.
 * Does not expose raw anatomical numbers (e.g. chest or waist cm) in plain text.
 * NOTE: While this protects personal measurements from visual exposure,
 * it is a reference token and does not replace cryptographic authentication.
 */
function generateOpaqueProfileId(
  chest: number,
  waist: number,
  height: number,
  inseam: number,
  silhouette: string
): string {
  // Deterministic seed based on coordinates
  const seed = (Math.round(chest) * 31 + Math.round(waist) * 17 + Math.round(height) * 7 + Math.round(inseam) * 3 + silhouette.length * 13) % 100000;
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let token = '';
  let n = seed + 48271;
  for (let i = 0; i < 5; i++) {
    token += chars.charAt(n % chars.length);
    n = Math.floor(n / chars.length) + (i + 1) * 7;
  }
  return `DEMO-${token}`;
}

/**
 * Generate a deterministic Universal Fit Identifier based on standardized anthropometric definitions.
 * Clearly separates bare-body measurements from illustrative garment ease.
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
  const shoulderCm = measurements.unit === 'cm' ? measurements.shoulder : inToCm(measurements.shoulder);

  // Anatomical drop: difference between chest circumference and waist circumference
  const dropCm = chestCm - waistCm;
  const taperRatio = waistCm > 0 ? Math.round((waistCm / chestCm) * 100) / 100 : 0.84;

  // Stature categorization based on total height
  let lengthClass = 'Regular Stature';
  if (heightCm < 172) {
    lengthClass = 'Shorter Stature';
  } else if (heightCm > 185) {
    lengthClass = 'Taller Stature';
  }

  // Torso proportion categorization based on inside leg to stature ratio
  const inseamToHeight = heightCm > 0 ? (inseamCm / heightCm) * 100 : 45;
  let torsoProportion = 'Balanced Torso Proportions';
  if (inseamToHeight > 47) {
    torsoProportion = 'Longer Inseam / Compact Torso';
  } else if (inseamToHeight < 43) {
    torsoProportion = 'Extended Torso / Shorter Inseam';
  }

  const easeProfile = SILHOUETTE_PROFILES[silhouette];
  const roundedChest = Math.round(chestCm * 10) / 10;
  const roundedWaist = Math.round(waistCm * 10) / 10;
  const roundedShoulder = Math.round(shoulderCm * 10) / 10;
  const roundedHeight = Math.round(heightCm * 10) / 10;
  const roundedInseam = Math.round(inseamCm * 10) / 10;

  // Finished garment circumferences (body + ease)
  const targetGarmentChest = Math.round((roundedChest + easeProfile.chestEaseCm) * 10) / 10;
  const targetGarmentWaist = Math.round((roundedWaist + easeProfile.waistEaseCm) * 10) / 10;

  // Flat garment widths (standard tailoring pit-to-pit = half circumference)
  const garmentFlatWidthChest = Math.round((targetGarmentChest / 2) * 10) / 10;
  const garmentFlatWidthWaist = Math.round((targetGarmentWaist / 2) * 10) / 10;
  const garmentShoulderWidth = Math.round((roundedShoulder + 1.5) * 10) / 10;

  // Temporary demonstration reference token (does not disclose raw body numbers)
  const fitId = generateOpaqueProfileId(chestCm, waistCm, heightCm, inseamCm, silhouette);

  // Measure genuine profile completeness
  const coreFields = [chestCm, waistCm, heightCm, inseamCm, shoulderCm];
  const providedCount = coreFields.filter(f => f > 0).length;

  return {
    fitId,
    bodyChestCm: roundedChest,
    bodyWaistCm: roundedWaist,
    bodyShoulderCm: roundedShoulder,
    bodyHeightCm: roundedHeight,
    bodyInseamCm: roundedInseam,
    illustrativeEaseCm: easeProfile.chestEaseCm,
    targetGarmentChestCm: targetGarmentChest,
    targetGarmentWaistCm: targetGarmentWaist,
    garmentFlatWidthChestCm: garmentFlatWidthChest,
    garmentFlatWidthWaistCm: garmentFlatWidthWaist,
    garmentShoulderWidthCm: garmentShoulderWidth,
    taperRatio,
    torsoProportion,
    statureCategory: lengthClass,
    profileCompleteness: {
      providedFields: providedCount,
      totalFields: 5,
    },
    // Backward-compatibility aliases
    chestBaselineCm: roundedChest,
    waistBaselineCm: roundedWaist,
    recommendedEaseCm: easeProfile.chestEaseCm,
  };
}
