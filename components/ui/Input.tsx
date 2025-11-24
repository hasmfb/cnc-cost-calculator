import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, unit, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          {...props}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto pr-3 rtl:pl-3 rtl:pr-0 flex items-center pointer-events-none">
            <span className="text-slate-400 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};
