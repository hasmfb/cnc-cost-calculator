import { CalculatorInputs, CalculationResults } from '../types';

export const calculateCosts = (inputs: CalculatorInputs): CalculationResults => {
  const {
    powerConsumption,
    hoursPerDay,
    daysPerMonth,
    electricityCost,
    monthlyMaintenance,
    monthlyConsumables
  } = inputs;

  const monthlyElectricityCost =
    (powerConsumption || 0) *
    (hoursPerDay || 0) *
    (daysPerMonth || 0) *
    (electricityCost || 0);

  const totalMonthlyCost =
    monthlyElectricityCost +
    (monthlyMaintenance || 0) +
    (monthlyConsumables || 0);

  const totalAnnualCost = totalMonthlyCost * 12;

  return {
    monthlyElectricityCost,
    totalMonthlyCost,
    totalAnnualCost,
  };
};