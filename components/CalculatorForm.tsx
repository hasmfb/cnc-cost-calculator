import React, { useState } from 'react';
import type { CalculatorInputs, Language, Currency } from '../types';
import { translations } from '../translations';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs) => void;
  language: Language;
  currency: Currency;
}

const initialFormState: CalculatorInputs = {
  powerConsumption: 15,
  hoursPerDay: 8,
  daysPerMonth: 22,
  electricityCost: 0.15,
  monthlyMaintenance: 200,
  monthlyConsumables: 500,
};

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, language, currency }) => {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialFormState);
  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow empty input without parsing to NaN
    const parsedValue = value === '' ? '' : parseFloat(value);
    setInputs((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure all values are numbers before calculating
    const numericInputs = Object.fromEntries(
        Object.entries(inputs).map(([key, value]) => [key, Number(value) || 0])
    ) as unknown as CalculatorInputs;
    onCalculate(numericInputs);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2 mb-4">{t.electricityCosts}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t.powerConsumption}
              id="powerConsumption"
              name="powerConsumption"
              value={inputs.powerConsumption}
              onChange={handleChange}
              unit={t.unitKw}
              placeholder="e.g., 15"
            />
            <Input
              label={t.hoursPerDay}
              id="hoursPerDay"
              name="hoursPerDay"
              value={inputs.hoursPerDay}
              onChange={handleChange}
              unit={t.unitHours}
              placeholder="e.g., 8"
            />
            <Input
              label={t.daysPerMonth}
              id="daysPerMonth"
              name="daysPerMonth"
              value={inputs.daysPerMonth}
              onChange={handleChange}
              unit={t.unitDays}
              placeholder="e.g., 22"
            />
            <Input
              label={t.electricityCost}
              id="electricityCost"
              name="electricityCost"
              value={inputs.electricityCost}
              onChange={handleChange}
              unit={`${currency} ${t.unitPerKwh}`}
              placeholder="e.g., 0.15"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-2 mb-4">{t.otherMonthlyCosts}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label={t.maintenanceEstimate}
              id="monthlyMaintenance"
              name="monthlyMaintenance"
              value={inputs.monthlyMaintenance}
              onChange={handleChange}
              unit={`${currency} ${t.unitPerMonth}`}
              placeholder="e.g., 200"
            />
            <Input
              label={t.consumablesAndParts}
              id="monthlyConsumables"
              name="monthlyConsumables"
              value={inputs.monthlyConsumables}
              onChange={handleChange}
              unit={`${currency} ${t.unitPerMonth}`}
              placeholder="e.g., 500"
            />
          </div>
        </div>

        <Button type="submit">{t.calculateButton}</Button>
      </form>
    </Card>
  );
};
