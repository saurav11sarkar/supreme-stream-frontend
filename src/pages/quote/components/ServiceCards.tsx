import React, { useState } from 'react';
import Stepper from './Stepper';
import { allServices, upholsteryPieceTypes, rugTypes, hardwoodServices, tileServices, dryerVentOptions, carpetRoomTypes } from '../data';

interface CarpetGridItem {
  clean: number;
  protect: number;
  deodorize: number;
}

interface UpholsteryGridItem {
  clean: number;
  protect: number;
  deodorize: number;
}

interface RugGridItem {
  clean: number;
  protect: number;
  deodorize: number;
}

interface ServiceCardsProps {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  carpetGrid: Record<string, CarpetGridItem>;
  setCarpetGrid: React.Dispatch<React.SetStateAction<Record<string, CarpetGridItem>>>;
  carpetExtras: Record<string, number>;
  setCarpetExtras: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  upholsteryGrid: Record<string, UpholsteryGridItem>;
  setUpholsteryGrid: React.Dispatch<React.SetStateAction<Record<string, UpholsteryGridItem>>>;
  upholsteryExtras: Record<string, number>;
  setUpholsteryExtras: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  rugGrid: Record<string, RugGridItem>;
  setRugGrid: React.Dispatch<React.SetStateAction<Record<string, RugGridItem>>>;
  rugExtras: Record<string, number>;
  setRugExtras: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  hardwoodService: string;
  setHardwoodService: React.Dispatch<React.SetStateAction<string>>;
  hardwoodSqFt: number;
  setHardwoodSqFt: React.Dispatch<React.SetStateAction<number>>;
  tileService: string;
  setTileService: React.Dispatch<React.SetStateAction<string>>;
  tileSqFt: number;
  setTileSqFt: React.Dispatch<React.SetStateAction<number>>;
  airDuctUnits: number;
  setAirDuctUnits: React.Dispatch<React.SetStateAction<number>>;
  additionalVents: number;
  setAdditionalVents: React.Dispatch<React.SetStateAction<number>>;
  dryerVentType: string;
  setDryerVentType: React.Dispatch<React.SetStateAction<string>>;
}

const ServiceCards: React.FC<ServiceCardsProps> = (props) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleService = (id: string) => {
    props.setSelectedServices(prev => {
      const has = prev.includes(id);
      if (has) {
        setExpanded(e => { const n = new Set(e); n.delete(id); return n; });
        return prev.filter(x => x !== id);
      }
      setExpanded(e => new Set(e).add(id));
      return [...prev, id];
    });
  };

  const isActive = (id: string) => props.selectedServices.includes(id);
  const isExpanded = (id: string) => expanded.has(id) || isActive(id);

  const TogglePill = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-colors whitespace-nowrap ${
        active ? 'border-[#0066CC] bg-[#0066CC] text-white' : 'border-gray-300 text-gray-700 hover:border-[#0066CC]'
      }`}
    >
      {active && <i className="ri-check-line mr-1" />}
      {label}
    </button>
  );

  const CardHeader = ({ svc }: { svc: typeof allServices[0] }) => (
    <div
      className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-colors ${
        isActive(svc.id) ? 'bg-[#0066CC]' : 'bg-gray-800'
      }`}
      onClick={() => toggleExpand(svc.id)}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive(svc.id) ? 'bg-white/20' : 'bg-white/10'}`}>
          <i className={`${svc.icon} text-white text-sm`} />
        </div>
        <span className="text-white font-bold text-sm uppercase tracking-wide">{svc.name}</span>
        {svc.id === 'emergency-water-damage' && (
          <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Emergency</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <label
          className="flex items-center gap-2 cursor-pointer"
          onClick={e => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isActive(svc.id)}
            onChange={() => toggleService(svc.id)}
            className="w-4 h-4 accent-[#0066CC] cursor-pointer"
          />
          <span className="text-white/80 text-xs font-semibold hidden sm:inline">Include</span>
        </label>
        <i className={`${isExpanded(svc.id) ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-white/60 text-lg`} />
      </div>
    </div>
  );

  const ConfigRow = ({ label, children, price }: { label: string; children: React.ReactNode; price?: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div>
        <span className="text-sm text-gray-800 font-medium">{label}</span>
        {price && <span className="text-[#0066CC] text-xs font-bold ml-2">{price}</span>}
      </div>
      <div>{children}</div>
    </div>
  );

  const Dropdown = ({ value, onChange, children, placeholder }: { value: string | number; onChange: (v: string) => void; children: React.ReactNode; placeholder?: string }) => (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0066CC] appearance-none cursor-pointer font-semibold text-gray-900 min-w-[180px]"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  const CompactStepper = ({ value, onChange, max = 50 }: { value: number; onChange: (v: number) => void; max?: number }) => (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        className="w-7 h-7 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs"
      >
        <i className="ri-subtract-line" />
      </button>
      <span className="w-7 text-center text-xs font-bold text-gray-900 tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors text-xs"
      >
        <i className="ri-add-line" />
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {allServices.map(svc => (
        <div key={svc.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
          <CardHeader svc={svc} />

          {isExpanded(svc.id) && (
            <div className="px-4 py-4">
              {/* Carpet Cleaning */}
              {svc.id === 'carpet-cleaning' && (
                <div className="space-y-1">
                  {/* Grid Header */}
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-gray-700 text-white items-center">
                    <div className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider" />
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center">Clean</div>
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-0.5">
                      Protect <i className="ri-information-line text-amber-400 text-xs cursor-help" title="Scotchgard protection per room" />
                    </div>
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-0.5">
                      Deodorize <i className="ri-information-line text-amber-400 text-xs cursor-help" title="Deodorizer treatment per room" />
                    </div>
                  </div>

                  {/* Grid Rows */}
                  {carpetRoomTypes.map(rt => {
                    const counts = props.carpetGrid[rt.id] || { clean: 0, protect: 0, deodorize: 0 };
                    const update = (field: keyof CarpetGridItem, val: number) => {
                      props.setCarpetGrid(prev => ({
                        ...prev,
                        [rt.id]: { ...(prev[rt.id] || { clean: 0, protect: 0, deodorize: 0 }), [field]: val },
                      }));
                    };
                    return (
                      <div key={rt.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b border-gray-100 last:border-b-0">
                        <div className="px-3 py-3 text-sm font-medium text-gray-800">{rt.name}</div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.clean} onChange={v => update('clean', v)} />
                        </div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.protect} onChange={v => update('protect', v)} />
                        </div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.deodorize} onChange={v => update('deodorize', v)} />
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-3">
                    <ConfigRow label="Extra steps (beyond 12)" price="$5/ea">
                      <Stepper
                        value={props.carpetExtras['additional-steps'] || 0}
                        onChange={v => props.setCarpetExtras(p => ({...p, 'additional-steps': v}))}
                        max={50}
                      />
                    </ConfigRow>
                  </div>
                </div>
              )}

              {/* Upholstery Cleaning */}
              {svc.id === 'upholstery-cleaning' && (
                <div className="space-y-1">
                  {/* Grid Header */}
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-gray-700 text-white items-center">
                    <div className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider" />
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center">Clean</div>
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-0.5">
                      Protect <i className="ri-information-line text-amber-400 text-xs cursor-help" title="Scotchgard protection per piece" />
                    </div>
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-0.5">
                      Deodorize <i className="ri-information-line text-amber-400 text-xs cursor-help" title="Deodorizer treatment per piece" />
                    </div>
                  </div>

                  {/* Grid Rows */}
                  {upholsteryPieceTypes.map(pt => {
                    const counts = props.upholsteryGrid[pt.id] || { clean: 0, protect: 0, deodorize: 0 };
                    const update = (field: keyof UpholsteryGridItem, val: number) => {
                      props.setUpholsteryGrid(prev => ({
                        ...prev,
                        [pt.id]: { ...(prev[pt.id] || { clean: 0, protect: 0, deodorize: 0 }), [field]: val },
                      }));
                    };
                    return (
                      <div key={pt.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b border-gray-100 last:border-b-0">
                        <div className="px-3 py-3 text-sm font-medium text-gray-800">{pt.name}</div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.clean} onChange={v => update('clean', v)} />
                        </div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.protect} onChange={v => update('protect', v)} />
                        </div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.deodorize} onChange={v => update('deodorize', v)} />
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-3">
                    <ConfigRow label="Sectional – Additional ft" price="$15/ft">
                      <Stepper
                        value={props.upholsteryExtras['sectional-additional-ft'] || 0}
                        onChange={v => props.setUpholsteryExtras(p => ({...p, 'sectional-additional-ft': v}))}
                        max={50}
                      />
                    </ConfigRow>
                  </div>
                </div>
              )}

              {/* Area Rug Cleaning */}
              {svc.id === 'area-rug-cleaning' && (
                <div className="space-y-1">
                  {/* Grid Header */}
                  <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-gray-700 text-white items-center">
                    <div className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider" />
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center">Clean</div>
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-0.5">
                      Protect <i className="ri-information-line text-amber-400 text-xs cursor-help" title="Scotchgard protection per rug" />
                    </div>
                    <div className="px-1 py-2.5 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-0.5">
                      Deodorize <i className="ri-information-line text-amber-400 text-xs cursor-help" title="Deodorizer treatment per rug" />
                    </div>
                  </div>

                  {/* Grid Rows */}
                  {rugTypes.map(rt => {
                    const counts = props.rugGrid[rt.id] || { clean: 0, protect: 0, deodorize: 0 };
                    const update = (field: keyof RugGridItem, val: number) => {
                      props.setRugGrid(prev => ({
                        ...prev,
                        [rt.id]: { ...(prev[rt.id] || { clean: 0, protect: 0, deodorize: 0 }), [field]: val },
                      }));
                    };
                    return (
                      <div key={rt.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b border-gray-100 last:border-b-0">
                        <div className="px-3 py-3 text-sm font-medium text-gray-800">{rt.name}</div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.clean} onChange={v => update('clean', v)} />
                        </div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.protect} onChange={v => update('protect', v)} />
                        </div>
                        <div className="px-1 py-3 flex justify-center">
                          <CompactStepper value={counts.deodorize} onChange={v => update('deodorize', v)} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tile & Grout Cleaning */}
              {svc.id === 'tile-grout-cleaning' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Service Type</label>
                    <Dropdown value={props.tileService} onChange={props.setTileService} placeholder="Select service...">
                      {tileServices.map(s => (
                        <option key={s.id} value={s.id}>{s.name} — ${s.pricePerSqFt.toFixed(2)}/sq ft</option>
                      ))}
                    </Dropdown>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Square Footage</label>
                    <input
                      type="number"
                      min={0}
                      value={props.tileSqFt || ''}
                      onChange={e => props.setTileSqFt(Number(e.target.value))}
                      placeholder="e.g. 250"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0066CC] font-semibold text-gray-900"
                    />
                    <p className="text-xs text-gray-900 mt-1 italic flex items-center gap-1"><i className="ri-information-line text-gray-500 text-xs" /> In-house estimate only</p>
                  </div>
                </div>
              )}

              {/* Hardwood Floor Cleaning */}
              {svc.id === 'hardwood-cleaning' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Service Type</label>
                    <Dropdown value={props.hardwoodService} onChange={props.setHardwoodService} placeholder="Select service...">
                      {hardwoodServices.map(s => (
                        <option key={s.id} value={s.id}>{s.name} — ${s.pricePerSqFt.toFixed(2)}/sq ft</option>
                      ))}
                    </Dropdown>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Square Footage</label>
                    <input
                      type="number"
                      min={0}
                      value={props.hardwoodSqFt || ''}
                      onChange={e => props.setHardwoodSqFt(Number(e.target.value))}
                      placeholder="e.g. 500"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0066CC] font-semibold text-gray-900"
                    />
                    <p className="text-xs text-gray-900 mt-1 italic flex items-center gap-1"><i className="ri-information-line text-gray-500 text-xs" /> In-house estimate only</p>
                  </div>
                </div>
              )}

              {/* Air Duct Cleaning */}
              {svc.id === 'air-duct-cleaning' && (
                <div className="space-y-1">
                  <ConfigRow label="HVAC Units">
                    <Dropdown value={props.airDuctUnits} onChange={v => props.setAirDuctUnits(Number(v))}>
                      <option value={1}>1 Unit (up to 10 vents) — $500</option>
                      <option value={2}>2 Units (up to 20 vents) — $950</option>
                    </Dropdown>
                  </ConfigRow>
                  <ConfigRow label="Additional vents" price="$40/ea">
                    <Stepper
                      value={props.additionalVents}
                      onChange={props.setAdditionalVents}
                      max={50}
                    />
                  </ConfigRow>
                </div>
              )}

              {/* Dryer Vent Cleaning */}
              {svc.id === 'dryer-vent-cleaning' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Vent Run Type</label>
                    <Dropdown value={props.dryerVentType} onChange={props.setDryerVentType} placeholder="Select type...">
                      {dryerVentOptions.map(o => (
                        <option key={o.id} value={o.id}>{o.name} — ${o.price}</option>
                      ))}
                    </Dropdown>
                  </div>
                </div>
              )}

              {/* Emergency Water Damage */}
              {svc.id === 'emergency-water-damage' && (
                <div className="py-2">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Emergency water damage restoration requires an on-site evaluation. Our 24-hour team will respond immediately to assess the damage and provide an estimate. There is no upfront charge for the evaluation.
                  </p>
                </div>
              )}

              {/* Collapsed description when not active */}
              {!isActive(svc.id) && svc.id !== 'emergency-water-damage' && (
                <p className="text-xs text-gray-400 mt-2 italic">Check "Include" to add this service to your quote.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;