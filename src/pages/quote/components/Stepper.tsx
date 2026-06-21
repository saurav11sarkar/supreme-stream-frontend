import React from 'react';

interface StepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

const Stepper: React.FC<StepperProps> = ({ value, onChange, min = 0, max = 99 }) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="ri-subtract-line text-sm" />
      </button>
      <span className="w-8 text-center text-sm font-bold text-gray-900 tabular-nums">{value}</span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <i className="ri-add-line text-sm" />
      </button>
    </div>
  );
};

export default Stepper;