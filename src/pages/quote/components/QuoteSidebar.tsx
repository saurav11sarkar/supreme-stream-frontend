import React from 'react';
import { rugTypes } from '../data';

interface QuoteSidebarProps {
  selectedServices: string[];
  carpetExtras: Record<string, number>;
  upholsteryGrid: Record<string, { clean: number; protect: number; deodorize: number }>;
  upholsteryExtras: Record<string, number>;
  rugGrid: Record<string, { clean: number; protect: number; deodorize: number }>;
  rugExtras: Record<string, number>;
  hardwoodService: string;
  hardwoodSqFt: number;
  tileService: string;
  tileSqFt: number;
  airDuctUnits: number;
  additionalVents: number;
  dryerVentType: string;
  calcCarpet: () => number;
  calcUpholstery: () => number;
  calcRug: () => number;
  calcHardwood: () => number;
  calcTile: () => number;
  calcAirDuct: () => number;
  calcDryerVent: () => number;
  calcTotal: () => number;
  onContinue: () => void;
  canContinue: boolean;
}

const QuoteSidebar: React.FC<QuoteSidebarProps> = ({
  selectedServices,
  carpetExtras,
  upholsteryGrid,
  upholsteryExtras,
  rugGrid,
  rugExtras,
  hardwoodService,
  hardwoodSqFt,
  tileService,
  tileSqFt,
  airDuctUnits,
  additionalVents,
  dryerVentType,
  calcCarpet,
  calcUpholstery,
  calcRug,
  calcHardwood,
  calcTile,
  calcAirDuct,
  calcDryerVent,
  calcTotal,
  onContinue,
  canContinue,
}) => {
  const total = calcTotal();
  const hasSelections = selectedServices.length > 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <p className="text-gray-900 text-sm font-bold uppercase tracking-wider">YOUR QUOTE</p>
        {hasSelections && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-gray-400 text-xs hover:text-[#0066CC] transition-colors font-semibold uppercase"
          >
            Clear
          </button>
        )}
      </div>

      <div className="px-5 py-4 space-y-2 max-h-[50vh] overflow-y-auto">
        {!hasSelections && (
          <p className="text-gray-400 text-sm text-center py-6">Select and configure services to see your quote.</p>
        )}

        {selectedServices.includes('carpet-cleaning') && (
          <div className="pb-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Carpet Cleaning</span>
              <span className="font-bold text-gray-900">${calcCarpet()}</span>
            </div>
            {(carpetExtras['additional-steps'] || 0) > 0 && (
              <div className="flex justify-between text-xs text-gray-500 pl-3">
                <span>+ Extra steps</span>
                <span>${(carpetExtras['additional-steps'] || 0) * 5}</span>
              </div>
            )}
          </div>
        )}

        {selectedServices.includes('upholstery-cleaning') && calcUpholstery() > 0 && (
          <div className="pb-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Upholstery Cleaning</span>
              <span className="font-bold text-gray-900">${calcUpholstery()}</span>
            </div>
            {(upholsteryExtras['sectional-additional-ft'] || 0) > 0 && (
              <div className="flex justify-between text-xs text-gray-500 pl-3">
                <span>+ Sectional additional ft</span>
                <span>${(upholsteryExtras['sectional-additional-ft'] || 0) * 15}</span>
              </div>
            )}
          </div>
        )}

        {selectedServices.includes('area-rug-cleaning') && calcRug() > 0 && (
          <div className="pb-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Area Rug Cleaning</span>
              <span className="font-bold text-gray-900">${calcRug().toFixed(2)}</span>
            </div>
            {Object.entries(rugGrid).map(([id, counts]) => {
              const rt = rugTypes.find(r => r.id === id);
              if (!rt || (counts.clean || 0) + (counts.protect || 0) + (counts.deodorize || 0) === 0) return null;
              return (
                <div key={id} className="flex justify-between text-xs text-gray-500 pl-3">
                  <span>{rt.name} — {counts.clean || 0} clean{counts.protect > 0 ? `, ${counts.protect} protect` : ''}{counts.deodorize > 0 ? `, ${counts.deodorize} deodorize` : ''}</span>
                </div>
              );
            })}
          </div>
        )}

        {selectedServices.includes('tile-grout-cleaning') && calcTile() > 0 && (
          <div className="flex justify-between text-sm pb-2">
            <span className="text-gray-700 font-medium">Tile & Grout Cleaning</span>
            <span className="font-bold text-gray-900">${calcTile().toFixed(2)}</span>
          </div>
        )}

        {selectedServices.includes('hardwood-cleaning') && calcHardwood() > 0 && (
          <div className="flex justify-between text-sm pb-2">
            <span className="text-gray-700 font-medium">Hardwood Floor Cleaning</span>
            <span className="font-bold text-gray-900">${calcHardwood().toFixed(2)}</span>
          </div>
        )}

        {selectedServices.includes('air-duct-cleaning') && (
          <div className="flex justify-between text-sm pb-2">
            <span className="text-gray-700 font-medium">Air Duct Cleaning</span>
            <span className="font-bold text-gray-900">${calcAirDuct()}</span>
          </div>
        )}

        {selectedServices.includes('dryer-vent-cleaning') && calcDryerVent() > 0 && (
          <div className="flex justify-between text-sm pb-2">
            <span className="text-gray-700 font-medium">Dryer Vent Cleaning</span>
            <span className="font-bold text-gray-900">${calcDryerVent()}</span>
          </div>
        )}

        {selectedServices.includes('emergency-water-damage') && (
          <div className="flex justify-between text-sm pb-2">
            <span className="text-gray-700 font-medium">24-Hr Emergency Water Damage</span>
            <span className="font-bold text-amber-600 text-xs">On-site eval</span>
          </div>
        )}
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">ESTIMATED TOTAL:</span>
          <span className="text-2xl font-bold text-[#0066CC]">${hasSelections ? total.toFixed(2) : '0.00'}</span>
        </div>
        <p className="text-gray-400 text-[10px] leading-tight">* Final price may vary. $150 minimum charge applies.</p>
      </div>

      <div className="px-5 pb-5 space-y-3">
        {hasSelections && total > 0 && total < 150 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <i className="ri-error-warning-fill text-red-500 mt-0.5 flex-shrink-0 text-sm" />
            <p className="text-red-700 text-xs font-medium">Minimum payment is $150. Add more services to continue.</p>
          </div>
        )}
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="w-full bg-gray-500 text-white py-3.5 rounded-lg font-bold text-sm hover:bg-gray-600 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed uppercase tracking-wide"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default QuoteSidebar;