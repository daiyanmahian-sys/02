import { useState, useMemo } from 'react';
import { Ruler, Sparkles, Sliders, ShieldCheck, Info } from 'lucide-react';
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

  // Garment finished circumference calculation (body + ease)
  const garmentChestDisplay = useMemo(() => {
    const totalCm = fitVector.chestBaselineCm + activeProfile.chestEaseCm;
    return unit === 'cm' ? `${Math.round(totalCm)} cm` : `${cmToIn(totalCm)} in`;
  }, [fitVector.chestBaselineCm, activeProfile.chestEaseCm, unit]);

  const garmentWaistDisplay = useMemo(() => {
    const totalCm = fitVector.waistBaselineCm + activeProfile.waistEaseCm;
    return unit === 'cm' ? `${Math.round(totalCm)} cm` : `${cmToIn(totalCm)} in`;
  }, [fitVector.waistBaselineCm, activeProfile.waistEaseCm, unit]);

  return (
    <section id="calibrator" className="py-24 border-b border-zinc-850 bg-[#0c0d13]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            01. Interactive Calibration Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Experience Deterministic Fit Geometry.
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Adjust your anatomical coordinates and fit preference. FITSYNC computes your continuous Fit Vector without guessing or fabricating arbitrary retail letter sizes.
          </p>
        </div>

        {/* Calibrator Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/70 border border-zinc-800 rounded-lg p-6 sm:p-8">
            {/* Header controls: Unit Switcher */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-semibold text-white">Anatomical Parameters</span>
              </div>

              {/* Unit Toggle (Functional interactive segmented control) */}
              <div className="flex items-center p-1 bg-zinc-950 rounded border border-zinc-800">
                <button
                  type="button"
                  onClick={() => handleUnitToggle('cm')}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors cursor-pointer ${
                    unit === 'cm' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Metric (cm)
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle('in')}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors cursor-pointer ${
                    unit === 'in' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Imperial (in)
                </button>
              </div>
            </div>

            {/* Silhouette Selector */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Intended Garment Silhouette / Ease Tolerance
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['tailored', 'classic', 'relaxed', 'oversized'] as FitSilhouette[]).map((sil) => {
                  const prof = SILHOUETTE_PROFILES[sil];
                  const isSelected = silhouette === sil;
                  return (
                    <button
                      key={sil}
                      type="button"
                      onClick={() => setSilhouette(sil)}
                      className={`p-3 text-left rounded border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800/90 border-zinc-500 text-white'
                          : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <div className="text-xs font-semibold whitespace-nowrap">{prof.label.split('/')[0]}</div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-1">
                        +{prof.chestEaseCm}cm ease
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-zinc-400 italic">
                {activeProfile.description}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="space-y-6">
              {/* Chest / Bust */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-zinc-300">Chest / Bust Circumference (ISO 8559 §4.2)</span>
                  <span className="font-mono text-white tabular-nums font-semibold">
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
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Natural Waist */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-zinc-300">Natural Waist Circumference</span>
                  <span className="font-mono text-white tabular-nums font-semibold">
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
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Shoulder Span */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-2">
                  <span className="text-zinc-300">Shoulder Span (Biacromial Breadth)</span>
                  <span className="font-mono text-white tabular-nums font-semibold">
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
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Inseam & Height row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-2">
                    <span className="text-zinc-300">Inseam Length</span>
                    <span className="font-mono text-white tabular-nums font-semibold">
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
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-medium mb-2">
                    <span className="text-zinc-300">Total Stature (Height)</span>
                    <span className="font-mono text-white tabular-nums font-semibold">
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
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>
            </div>

            {/* Reset / Standardize Button */}
            <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Deterministic calculation based on continuous physical dimensions</span>
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
                className="text-zinc-400 hover:text-white underline cursor-pointer"
              >
                Reset to Standard Base
              </button>
            </div>
          </div>

          {/* Real-time Vector Card & Geometry Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Output Universal Fit Vector Card */}
            <div className="bg-zinc-900 border border-zinc-700/80 rounded-lg p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-xs bg-white" />
                  <span className="text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider">
                    Universal Fit ID
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400">Spec v1.0</span>
              </div>

              {/* ID Display */}
              <div className="my-6 p-4 bg-zinc-950 rounded border border-zinc-800 text-center">
                <div className="text-xs font-mono text-zinc-400 mb-1">DETERMINISTIC VECTOR CODE</div>
                <div className="font-mono text-2xl font-bold tracking-wider text-white select-all">
                  {fitVector.fitId}
                </div>
              </div>

              {/* Garment Geometry Specifications */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Target Garment Chest Circumference:</span>
                  <span className="font-mono font-semibold text-white tabular-nums">
                    {garmentChestDisplay}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Target Garment Waist Circumference:</span>
                  <span className="font-mono font-semibold text-white tabular-nums">
                    {garmentWaistDisplay}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Anatomical Taper Drop (Chest - Waist):</span>
                  <span className="font-mono font-semibold text-white tabular-nums">
                    {Math.round(measurementsCm.chest - measurementsCm.waist)} cm
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Proportional Classification:</span>
                  <span className="font-mono font-semibold text-zinc-200">
                    {fitVector.torsoProportion}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-400">Ease Allowance Allocated:</span>
                  <span className="font-mono font-semibold text-zinc-200">
                    +{activeProfile.chestEaseCm} cm ({silhouette})
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={onOpenWaitlist}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-sm hover:bg-zinc-200 transition-all cursor-pointer text-center block"
                >
                  Reserve This Fit Profile
                </button>
              </div>
            </div>

            {/* Why No Fake Brand Guessing Explanation */}
            <div className="bg-[#0e1017] border border-zinc-800/80 rounded-lg p-5 text-xs">
              <div className="flex items-center gap-2 font-medium text-white mb-2">
                <Info className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>Why FITSYNC Refuses to Fabricate Brand Sizes</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Traditional platforms guess whether you are a “Medium” or “Large” in arbitrary brands using self-reported reviews. However, fast-fashion vanity sizing varies by up to 7.5 cm (3.0 inches) between batches of the same label. FITSYNC provides a standardized geometry vector so retailers can map directly against real CAD production grading.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
