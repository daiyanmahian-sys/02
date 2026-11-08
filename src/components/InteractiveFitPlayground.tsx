import { useState, useMemo } from 'react';
import { Sliders, Shield, Info, ArrowRight, RotateCcw } from 'lucide-react';
import type { BodyMeasurements, FitSilhouette } from '../types/fitsync';
import {
  SILHOUETTE_PROFILES,
  calculateUniversalFitVector,
  inToCm,
  cmToIn,
} from '../lib/measurements';

interface InteractiveFitPlaygroundProps {
  onOpenWaitlist: () => void;
}

export default function InteractiveFitPlayground({ onOpenWaitlist }: InteractiveFitPlaygroundProps) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [silhouette, setSilhouette] = useState<FitSilhouette>('classic');

  // Stored internally in cm
  const [measurementsCm, setMeasurementsCm] = useState({
    height: 178,
    chest: 98,
    waist: 82,
    hips: 99,
    shoulder: 45,
    armLength: 64,
    inseam: 81,
  });

  const activeMeasurements: BodyMeasurements = useMemo(() => {
    if (unit === 'cm') {
      return {
        ...measurementsCm,
        unit: 'cm',
      };
    } else {
      return {
        height: cmToIn(measurementsCm.height),
        chest: cmToIn(measurementsCm.chest),
        waist: cmToIn(measurementsCm.waist),
        hips: cmToIn(measurementsCm.hips),
        shoulder: cmToIn(measurementsCm.shoulder),
        armLength: cmToIn(measurementsCm.armLength),
        inseam: cmToIn(measurementsCm.inseam),
        unit: 'in',
      };
    }
  }, [measurementsCm, unit]);

  const fitVector = useMemo(() => {
    return calculateUniversalFitVector(activeMeasurements, silhouette);
  }, [activeMeasurements, silhouette]);

  const activeProfile = SILHOUETTE_PROFILES[silhouette];

  // Helper to update specific measurement
  const updateMeasurement = (key: keyof typeof measurementsCm, displayValue: number) => {
    const cmValue = unit === 'cm' ? displayValue : inToCm(displayValue);
    setMeasurementsCm((prev) => ({
      ...prev,
      [key]: Math.max(10, Math.min(300, cmValue)),
    }));
  };

  const handleUnitToggle = (newUnit: 'cm' | 'in') => {
    setUnit(newUnit);
  };

  // Helper to format values in active unit with exact 1-decimal precision
  const formatLength = (valCm: number) => {
    if (unit === 'cm') {
      return `${valCm.toFixed(1)} cm`;
    }
    return `${cmToIn(valCm).toFixed(1)} in`;
  };

  return (
    <section id="measurement-room" className="py-20 md:py-28 border-b border-[#2D313B] bg-[#121316] text-[#F4F4F6]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C2843A] mb-3 font-semibold">
            03. The Measurement Room
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight [text-wrap:balance]">
            Explore how body dimensions translate into finished garments.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8F94A0] leading-relaxed">
            Adjust your measurements below and choose how you like clothes to fit. This interactive demonstration shows how physical body circumferences, ease allowances, and garment flat widths relate to each other.
          </p>
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Your Body Measurements (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A1C22] border border-[#2D313B] rounded-sm p-6 sm:p-8 shadow-xl">
            
            {/* Header: Title & Accessible Unit Switcher */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#2D313B]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C2843A]" />
                <span className="text-sm font-semibold text-white tracking-wide">
                  Your body measurements
                </span>
              </div>

              {/* Unit Toggle */}
              <div className="flex items-center p-1 bg-[#121316] rounded-xs border border-[#918A80]">
                <button
                  type="button"
                  onClick={() => handleUnitToggle('cm')}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded-xs transition-colors cursor-pointer ${
                    unit === 'cm'
                      ? 'bg-[#2D313B] text-white shadow-xs'
                      : 'text-[#8F94A0] hover:text-white'
                  }`}
                  aria-pressed={unit === 'cm'}
                >
                  Metric (cm)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle('in')}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded-xs transition-colors cursor-pointer ${
                    unit === 'in'
                      ? 'bg-[#2D313B] text-white shadow-xs'
                      : 'text-[#8F94A0] hover:text-white'
                  }`}
                  aria-pressed={unit === 'in'}
                >
                  Imperial (in)
                </button>
              </div>
            </div>

            {/* Silhouette Preference: How your clothes fit */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#8F94A0]">
                  How your clothes fit (Illustrative ease)
                </label>
                <span className="text-xs font-mono text-[#C2843A]">
                  +{activeProfile.chestEaseCm} cm Chest Ease
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['tailored', 'classic', 'relaxed', 'oversized'] as FitSilhouette[]).map((sil) => {
                  const prof = SILHOUETTE_PROFILES[sil];
                  const isSelected = silhouette === sil;
                  return (
                    <button
                      key={sil}
                      type="button"
                      onClick={() => setSilhouette(sil)}
                      className={`p-3 text-left rounded-xs border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2D313B] border-white text-white'
                          : 'bg-[#121316] border-[#2D313B] text-[#8F94A0] hover:border-[#918A80] hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-semibold whitespace-nowrap">{prof.label.split('/')[0]}</div>
                      <div className="text-[11px] font-mono text-[#8F94A0] mt-1">
                        +{prof.chestEaseCm}cm ease
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-[#8F94A0] italic">
                {activeProfile.description}
              </p>
            </div>

            {/* 5 Distinct Body Measurement Sliders */}
            <div className="space-y-6">
              
              {/* 1. Chest Circumference */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-[#F4F4F6]">Chest circumference</span>
                  <span className="font-mono text-white tabular-nums font-semibold bg-[#121316] px-2 py-0.5 rounded-xs border border-[#2D313B]">
                    {activeMeasurements.chest} {unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={unit === 'cm' ? 70 : 28}
                  max={unit === 'cm' ? 140 : 55}
                  step={unit === 'cm' ? 1 : 0.5}
                  value={activeMeasurements.chest}
                  onChange={(e) => updateMeasurement('chest', parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#121316] border border-[#918A80] rounded-xs appearance-none cursor-pointer accent-[#C2843A]"
                  aria-label="Chest circumference"
                />
              </div>

              {/* 2. Waist Circumference */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-[#F4F4F6]">Waist circumference</span>
                  <span className="font-mono text-white tabular-nums font-semibold bg-[#121316] px-2 py-0.5 rounded-xs border border-[#2D313B]">
                    {activeMeasurements.waist} {unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={unit === 'cm' ? 55 : 22}
                  max={unit === 'cm' ? 130 : 51}
                  step={unit === 'cm' ? 1 : 0.5}
                  value={activeMeasurements.waist}
                  onChange={(e) => updateMeasurement('waist', parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#121316] border border-[#918A80] rounded-xs appearance-none cursor-pointer accent-[#C2843A]"
                  aria-label="Waist circumference"
                />
              </div>

              {/* 3. Shoulder Span (Biacromial) */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-[#F4F4F6]">Shoulder span (Biacromial breadth)</span>
                  <span className="font-mono text-white tabular-nums font-semibold bg-[#121316] px-2 py-0.5 rounded-xs border border-[#2D313B]">
                    {activeMeasurements.shoulder} {unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={unit === 'cm' ? 36 : 14}
                  max={unit === 'cm' ? 58 : 23}
                  step={unit === 'cm' ? 1 : 0.5}
                  value={activeMeasurements.shoulder}
                  onChange={(e) => updateMeasurement('shoulder', parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#121316] border border-[#918A80] rounded-xs appearance-none cursor-pointer accent-[#C2843A]"
                  aria-label="Shoulder span"
                />
              </div>

              {/* 4. Inseam & 5. Total Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-2">
                    <span className="text-[#F4F4F6]">Inside leg (Inseam)</span>
                    <span className="font-mono text-white tabular-nums font-semibold bg-[#121316] px-2 py-0.5 rounded-xs border border-[#2D313B]">
                      {activeMeasurements.inseam} {unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unit === 'cm' ? 65 : 25}
                    max={unit === 'cm' ? 95 : 37}
                    step={unit === 'cm' ? 1 : 0.5}
                    value={activeMeasurements.inseam}
                    onChange={(e) => updateMeasurement('inseam', parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#121316] border border-[#918A80] rounded-xs appearance-none cursor-pointer accent-[#C2843A]"
                    aria-label="Inseam length"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-2">
                    <span className="text-[#F4F4F6]">Total stature (Height)</span>
                    <span className="font-mono text-white tabular-nums font-semibold bg-[#121316] px-2 py-0.5 rounded-xs border border-[#2D313B]">
                      {activeMeasurements.height} {unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={unit === 'cm' ? 145 : 57}
                    max={unit === 'cm' ? 210 : 83}
                    step={unit === 'cm' ? 1 : 0.5}
                    value={activeMeasurements.height}
                    onChange={(e) => updateMeasurement('height', parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#121316] border border-[#918A80] rounded-xs appearance-none cursor-pointer accent-[#C2843A]"
                    aria-label="Total stature"
                  />
                </div>
              </div>

            </div>

            {/* Reset Controls */}
            <div className="mt-8 pt-4 border-t border-[#2D313B] flex items-center justify-between text-xs text-[#8F94A0]">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-white">
                  {fitVector.profileCompleteness.providedFields} of {fitVector.profileCompleteness.totalFields}
                </span>
                <span>core dimensions entered</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMeasurementsCm({
                    height: 178,
                    chest: 98,
                    waist: 82,
                    hips: 99,
                    shoulder: 45,
                    armLength: 64,
                    inseam: 81,
                  });
                  setSilhouette('classic');
                }}
                className="inline-flex items-center gap-1 text-[#8F94A0] hover:text-white underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Baseline</span>
              </button>
            </div>

          </div>

          {/* Right Column: Garment Specification Breakdown & Private Reference (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#1A1C22] border border-[#2D313B] rounded-sm p-6 sm:p-7 shadow-xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#2D313B]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-xs bg-[#C2843A]" />
                  <span className="text-xs font-mono font-medium text-white uppercase tracking-wider">
                    Your private profile reference
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#8F94A0]">DEMO MODE</span>
              </div>

              {/* Temporary Demonstration Profile Reference */}
              <div className="my-6 p-4 bg-[#121316] rounded-xs border border-[#2D313B] text-center">
                <div className="text-[11px] font-mono text-[#8F94A0] mb-1">
                  TEMPORARY DEMONSTRATION IDENTIFIER
                </div>
                <div className="font-mono text-2xl font-bold tracking-widest text-white select-all">
                  {fitVector.fitId}
                </div>
                <div className="text-[11px] text-[#8F94A0] mt-2 flex items-center justify-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#C2843A]" />
                  <span>Temporary token; raw body girth numbers are not shown in the ID</span>
                </div>
              </div>

              {/* Four Clear Dimensions Breakdown */}
              <div className="space-y-3.5 text-xs">
                
                {/* 1. Body Circumference */}
                <div className="flex items-center justify-between py-2 border-b border-[#2D313B]">
                  <span className="text-[#8F94A0]">1. Body chest circumference:</span>
                  <span className="font-mono font-semibold text-white tabular-nums">
                    {formatLength(fitVector.bodyChestCm)}
                  </span>
                </div>

                {/* 2. Illustrative Ease */}
                <div className="flex items-center justify-between py-2 border-b border-[#2D313B]">
                  <span className="text-[#8F94A0]">2. Illustrative ease allowance ({silhouette}):</span>
                  <span className="font-mono font-semibold text-[#C2843A] tabular-nums">
                    +{formatLength(activeProfile.chestEaseCm)}
                  </span>
                </div>

                {/* 3. Finished Garment Circumference */}
                <div className="flex items-center justify-between py-2 border-b border-[#2D313B]">
                  <span className="text-white font-medium">3. Finished garment chest circumference:</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {formatLength(fitVector.targetGarmentChestCm)}
                  </span>
                </div>

                {/* 4. Garment Flat Width (Pit-to-pit) */}
                <div className="flex items-center justify-between py-2 border-b border-[#2D313B]">
                  <span className="text-[#8F94A0]">4. Finished garment flat width (pit-to-pit):</span>
                  <span className="font-mono font-bold text-[#F4F4F6] tabular-nums">
                    {formatLength(fitVector.garmentFlatWidthChestCm)}
                  </span>
                </div>

                {/* Waist Dimension Check */}
                <div className="flex items-center justify-between py-2 border-b border-[#2D313B]">
                  <span className="text-[#8F94A0]">Garment waist circumference:</span>
                  <span className="font-mono font-semibold text-white tabular-nums">
                    {formatLength(fitVector.targetGarmentWaistCm)}
                  </span>
                </div>

                {/* Shoulder Seam Target */}
                <div className="flex items-center justify-between py-2 border-b border-[#2D313B]">
                  <span className="text-[#8F94A0]">Garment shoulder seam reference:</span>
                  <span className="font-mono text-white tabular-nums">
                    {formatLength(fitVector.garmentShoulderWidthCm)}
                  </span>
                </div>

                {/* Proportions */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#8F94A0]">Stature & torso classification:</span>
                  <span className="font-mono text-[#F4F4F6]">
                    {fitVector.statureCategory} · {fitVector.torsoProportion.split('/')[0]}
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#2D313B]">
                <button
                  type="button"
                  onClick={onOpenWaitlist}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#141518] bg-white rounded-xs hover:bg-[#F2EFEB] transition-all cursor-pointer text-center block shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Request Early Access with this Demo Profile
                </button>
              </div>

            </div>

            {/* Explanatory Note on Illustrative Demo Assumptions */}
            <div className="p-4 bg-[#121316] border border-[#2D313B] rounded-xs text-xs text-[#8F94A0]">
              <div className="flex items-center gap-2 font-medium text-white mb-1.5">
                <Info className="w-4 h-4 text-[#C2843A] shrink-0" />
                <span>About Illustrative Ease Assumptions</span>
              </div>
              <p className="leading-relaxed text-[12px]">
                The ease values shown above are illustrative demo assumptions to explain how finished clothing differs from skin measurements. In the future platform, clothing makers will provide their actual garment measurements directly.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
