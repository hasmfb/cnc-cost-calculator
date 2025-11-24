
export type Language = 'en' | 'ar';
export type Currency = 'USD' | 'SAR' | 'EGP';

export interface CalculatorInputs {
  powerConsumption: number;
  hoursPerDay: number;
  daysPerMonth: number;
  electricityCost: number;
  monthlyMaintenance: number;
  monthlyConsumables: number;
}

export interface CalculationResults {
  monthlyElectricityCost: number;
  totalMonthlyCost: number;
  totalAnnualCost: number;
}
