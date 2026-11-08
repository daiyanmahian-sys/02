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
  fitId: string; // Temporary demonstration profile reference (e.g. DEMO-7X9K2)
  bodyChestCm: number; // Bare skin body dimension
  bodyWaistCm: number;
  bodyShoulderCm: number;
  bodyHeightCm: number;
  bodyInseamCm: number;
  illustrativeEaseCm: number; // Selected silhouette ease offset
  targetGarmentChestCm: number; // Finished garment circumference (body + ease)
  targetGarmentWaistCm: number;
  garmentFlatWidthChestCm: number; // Finished garment flat width (pit-to-pit = chest / 2)
  garmentFlatWidthWaistCm: number; // Finished garment flat width (waist / 2)
  garmentShoulderWidthCm: number; // Finished garment shoulder seam allowance (shoulder + 1.5cm)
  taperRatio: number; // Body waist-to-chest ratio
  torsoProportion: string; // Proportional category
  statureCategory: string; // Short / Regular / Long stature category
  profileCompleteness: {
    providedFields: number;
    totalFields: number;
  };
  // Aliases for compatibility
  chestBaselineCm: number;
  waistBaselineCm: number;
  recommendedEaseCm: number;
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
