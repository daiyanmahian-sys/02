/**
 * FITSYNC Type Definitions
 * Universal Clothing-Size Recommendation and Anatomical Calibration Platform
 */

export type MeasurementUnit = 'cm' | 'in';

export type FitSilhouette = 'tailored' | 'classic' | 'relaxed' | 'oversized';

export interface BodyMeasurements {
  height: number;
  chest: number;
  waist: number;
  hips: number;
  shoulder: number;
  armLength: number;
  inseam: number;
  unit: MeasurementUnit;
}

export interface SilhouetteTolerance {
  label: string;
  chestEaseCm: number;
  waistEaseCm: number;
  hipEaseCm: number;
  description: string;
}

export interface UniversalFitVector {
  fitId: string;
  chestBaselineCm: number;
  waistBaselineCm: number;
  taperRatio: number; // waist-to-chest drop
  torsoProportion: string;
  recommendedEaseCm: number;
  standardConfidence: number; // e.g. 0.98 based on ISO 8559 measurement completeness
}

export interface WaitlistSubmission {
  email: string;
  userType: 'shopper' | 'brand' | 'developer';
  brandOrCompany?: string;
  notes?: string;
}

export interface BrandIntegrationContract {
  specVersion: '1.0.0';
  partnerId: string;
  garmentType: 'top' | 'bottom' | 'outerwear' | 'tailored';
  cadGradingPoints: {
    pointName: string;
    toleranceMm: number;
  }[];
  supportedFabrics: {
    material: string;
    elasticRecovery: number; // 0 to 1
  }[];
}
