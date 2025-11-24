import React, { useState, useCallback, useEffect } from 'react';
import type { CalculatorInputs, CalculationResults, Language, Currency } from './types';
import { translations, currencies } from './translations';
import { calculateCosts } from './utils/calculations';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';

const SimplexLogo: React.FC = () => (
  <div className="flex items-center space-x-2 rtl:space-x-reverse">
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0L0 29V87L50 116L100 87V29L50 0ZM50 101.4L12.5 79.9V36.1L50 57.6V101.4Z" fill="#0077C8"/>
      <path d="M50 57.6L87.5 36.1V79.9L50 101.4V57.6Z" fill="#005A9C"/>
      <path d="M50 10.4L87.5 31.9L50 53.4L12.5 31.9L50 10.4Z" fill="#00AEEF"/>
    </svg>
    <span className="text-2xl font-bold text-slate-100">SIMPLEX</span>
  </div>
);

const App: React.FC = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [currentInputs, setCurrentInputs] = useState<CalculatorInputs | null>(null);
  const [language, setLanguage] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('EGP');

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('font-arabic', language === 'ar');
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    if (localStorage.getItem('theme')) {
        localStorage.removeItem('theme');
    }
  }, []);

  const handleCalculate = useCallback((inputs: CalculatorInputs) => {
    const calculated = calculateCosts(inputs);
    setResults(calculated);
    setCurrentInputs(inputs);
  }, []);
  
  useEffect(() => {
    const initialInputs: CalculatorInputs = {
        powerConsumption: 15,
        hoursPerDay: 8,
        daysPerMonth: 22,
        electricityCost: 0.15,
        monthlyMaintenance: 200,
        monthlyConsumables: 500,
    };
    handleCalculate(initialInputs);
  }, [handleCalculate]);

  return (
    <div id="simplex-calculator" className="w-full min-h-[800px] font-sans text-slate-200 bg-slate-900 selection:bg-blue-500 selection:text-white pb-8">
      <div className="relative isolate overflow-hidden h-full">
        <div className="absolute inset-0 -z-10 bg-slate-800" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}></div>
        <header className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
            <SimplexLogo />
            <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                    <label htmlFor="language-select" className="text-sm font-medium text-slate-300">{t.language}:</label>
                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 bg-slate-700 border-slate-600 text-white"
                    >
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="currency-select" className="text-sm font-medium text-slate-300">{t.currency}:</label>
                    <select
                        id="currency-select"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 bg-slate-700 border-slate-600 text-white"
                    >
                        {(Object.keys(currencies) as Currency[]).map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                </div>
            </div>
          </div>
        </header>

        <main className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {t.pageTitle}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                {t.pageSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="lg:sticky lg:top-8">
                 <CalculatorForm onCalculate={handleCalculate} language={language} currency={currency} />
              </div>
              <div>
                <ResultsDisplay results={results} inputs={currentInputs} language={language} currency={currency} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-black text-slate-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>{t.footerCopyright}</p>
          <p className="mt-1">{t.footerDisclaimer}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;