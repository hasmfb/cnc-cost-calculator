
import React from 'react';
import type { CalculationResults, CalculatorInputs, Language, Currency } from '../types';
import { translations } from '../translations';
import { Card } from './ui/Card';
import { DonutChart } from './ui/DonutChart';

interface ResultsDisplayProps {
  results: CalculationResults | null;
  inputs: CalculatorInputs | null;
  language: Language;
  currency: Currency;
}

const formatCurrency = (value: number, currency: Currency, language: Language) => {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0, 
    }).format(value);
};

const ResultRow: React.FC<{ label: string; value: string, isTotal?: boolean }> = ({ label, value, isTotal = false }) => (
    <div className={`flex justify-between items-center py-3 ${isTotal ? 'border-t-2 border-slate-700 mt-2 pt-3 font-bold text-slate-100' : 'text-slate-300'}`}>
        <span>{label}</span>
        <span className={isTotal ? 'text-lg text-blue-400' : ''}>{value}</span>
    </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputs, language, currency }) => {
    const t = translations[language];

    if (!results || !inputs) {
        return (
            <Card className="text-center">
                <p className="text-slate-400">{t.resultsInitialPrompt}</p>
            </Card>
        );
    }

    const chartData = [
        {
            name: t.monthlyElectricityCost,
            value: results.monthlyElectricityCost,
            color: '#3b82f6', // blue-500
        },
        {
            name: t.maintenance,
            value: inputs.monthlyMaintenance,
            color: '#8b5cf6', // violet-500
        },
        {
            name: t.consumables,
            value: inputs.monthlyConsumables,
            color: '#10b981', // emerald-500
        }
    ];

    return (
        <Card>
            <h2 className="text-2xl font-bold text-slate-100 mb-6 text-center">{t.costAnalysis}</h2>
            
            <div className="mb-8 border-b border-slate-700 pb-8">
                <DonutChart 
                    data={chartData} 
                    centerLabel={t.totalMonthlyCost}
                    centerValue={formatCurrency(results.totalMonthlyCost, currency, language)}
                />
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">{t.monthlyBreakdown}</h3>
                    <div className="divide-y divide-slate-700">
                        <ResultRow label={t.monthlyElectricityCost} value={formatCurrency(results.monthlyElectricityCost, currency, language)} />
                        <ResultRow label={t.maintenance} value={formatCurrency(inputs.monthlyMaintenance, currency, language)} />
                        <ResultRow label={t.consumables} value={formatCurrency(inputs.monthlyConsumables, currency, language)} />
                        <ResultRow label={t.totalMonthlyCost} value={formatCurrency(results.totalMonthlyCost, currency, language)} isTotal={true}/>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">{t.annualProjection}</h3>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                        <ResultRow label={t.totalAnnualCost} value={formatCurrency(results.totalAnnualCost, currency, language)} isTotal={true}/>
                        <p className="text-xs text-slate-400 text-center mt-2">{t.annualCostDisclaimer}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};
