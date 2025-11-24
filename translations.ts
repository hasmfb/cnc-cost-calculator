
import type { Currency } from './types';

export const currencies: Record<Currency, { name: string }> = {
  USD: { name: 'US Dollar' },
  SAR: { name: 'Saudi Riyal' },
  EGP: { name: 'Egyptian Pound' },
};

export const translations = {
  en: {
    headerTitle: 'SIMPLEX',
    pageTitle: 'CNC Machine Operating Cost Calculator',
    pageSubtitle: 'Estimate your monthly and annual expenses to determine operational viability and profitability.',
    footerCopyright: `© ${new Date().getFullYear()} SIMPLEX. All rights reserved.`,
    footerDisclaimer: 'This tool provides an estimate for informational purposes only.',
    language: 'Language',
    currency: 'Currency',

    electricityCosts: 'Electricity Costs',
    powerConsumption: 'Machine Power Consumption',
    hoursPerDay: 'Hours of Operation / Day',
    daysPerMonth: 'Days of Operation / Month',
    electricityCost: 'Cost of Electricity',
    otherMonthlyCosts: 'Other Monthly Costs',
    maintenanceEstimate: 'Maintenance Estimate',
    consumablesAndParts: 'Consumables & Spare Parts',
    calculateButton: 'Calculate Costs',
    
    unitKw: 'kW',
    unitHours: 'hours',
    unitDays: 'days',
    unitPerKwh: 'per kWh',
    unitPerMonth: 'per month',

    resultsInitialPrompt: 'Enter your machine\'s details and click "Calculate Costs" to see the results.',
    costAnalysis: 'Cost Analysis',
    monthlyBreakdown: 'Monthly Breakdown',
    monthlyElectricityCost: 'Electricity Cost',
    maintenance: 'Maintenance',
    consumables: 'Consumables & Parts',
    totalMonthlyCost: 'Total Monthly Cost',
    annualProjection: 'Annual Projection',
    totalAnnualCost: 'Total Annual Operating Cost',
    annualCostDisclaimer: 'This is the minimum revenue required to cover operating costs.',
  },
  ar: {
    headerTitle: 'سيمبلكس',
    pageTitle: 'حاسبة تكلفة تشغيل ماكينة CNC',
    pageSubtitle: 'قم بتقدير نفقاتك الشهرية والسنوية لتحديد الجدوى التشغيلية والربحية.',
    footerCopyright: `© ${new Date().getFullYear()} سيمبلكس. جميع الحقوق محفوظة.`,
    footerDisclaimer: 'هذه الأداة تقدم تقديرًا لأغراض إعلامية فقط.',
    language: 'اللغة',
    currency: 'العملة',

    electricityCosts: 'تكاليف الكهرباء',
    powerConsumption: 'استهلاك طاقة الماكينة',
    hoursPerDay: 'ساعات التشغيل / اليوم',
    daysPerMonth: 'أيام التشغيل / الشهر',
    electricityCost: 'تكلفة الكهرباء',
    otherMonthlyCosts: 'التكاليف الشهرية الأخرى',
    maintenanceEstimate: 'تقدير الصيانة',
    consumablesAndParts: 'المستهلكات وقطع الغيار',
    calculateButton: 'احسب التكاليف',

    unitKw: 'كيلوواط',
    unitHours: 'ساعة',
    unitDays: 'يوم',
    unitPerKwh: 'لكل كيلوواط/ساعة',
    unitPerMonth: 'شهريًا',
    
    resultsInitialPrompt: 'أدخل تفاصيل ماكينتك واضغط على "احسب التكاليف" لرؤية النتائج.',
    costAnalysis: 'تحليل التكاليف',
    monthlyBreakdown: 'التفاصيل الشهرية',
    monthlyElectricityCost: 'تكلفة الكهرباء',
    maintenance: 'الصيانة',
    consumables: 'المستهلكات وقطع الغيار',
    totalMonthlyCost: 'إجمالي التكلفة الشهرية',
    annualProjection: 'التوقع السنوي',
    totalAnnualCost: 'إجمالي تكلفة التشغيل السنوية',
    annualCostDisclaimer: 'هذا هو الحد الأدنى من الإيرادات المطلوبة لتغطية تكاليف التشغيل.',
  }
};
