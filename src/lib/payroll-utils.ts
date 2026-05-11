/**
 * Payroll Localization Intelligence Engine
 * Handles Statutory Calculations for GCC (Saudi) and Egypt regions.
 */

export interface PayrollCalculation {
    basicSalary: number;
    housingAllowance: number;
    transportationAllowance: number;
    otherAllowances: number;
    laptopAllowance: number;
    overtime: number;
    bonus: number;
    
    // Calculated Statutories
    gosiEmployee: number;
    gosiEmployer: number;
    incomeTax: number;
    healthInsurance: number;
    otherDeductions: number;
    
    // Totals
    grossSalary: number;
    netSalary: number;
}

export function calculateLocalizedPayroll(
    baseSalary: number, 
    nationality: 'Saudi' | 'Egyptian' | 'Other' = 'Other',
    isGosiApplicable: boolean = true,
    isTaxApplicable: boolean = true,
    allowances: {
        housing?: number;
        transportation?: number;
        other?: number;
        laptop?: number;
        overtime?: number;
        bonus?: number;
    } = {}
): PayrollCalculation {
    // 1. Initial Allowances (Literal Values)
    const housingAllowance = allowances.housing ?? 0;
    const transportationAllowance = allowances.transportation ?? 0;
    const otherAllowances = allowances.other ?? 0;
    const laptopAllowance = allowances.laptop ?? 0;
    const overtime = allowances.overtime ?? 0;
    const bonus = allowances.bonus ?? 0;

    const grossSalary = baseSalary + housingAllowance + transportationAllowance + otherAllowances + laptopAllowance + overtime + bonus;

    let gosiEmployee = 0;
    let gosiEmployer = 0;
    let incomeTax = 0;
    let healthInsurance = 0; // Removed as per user request
    let otherDeductions = 0;

    // 2. GOSI Intelligence (Saudi Rules)
    // GOSI is calculated on (Basic + Housing)
    const gosiBase = baseSalary + housingAllowance;
    const gosiCap = 45000;
    const effectiveGosiBase = Math.min(gosiBase, gosiCap);

    if (nationality === 'Saudi' && isGosiApplicable) {
        gosiEmployee = effectiveGosiBase * 0.0975; // 9.75% Saudi GOSI
        gosiEmployer = effectiveGosiBase * 0.12; // 12% Employer GOSI
        incomeTax = 0; // No income tax for Saudis in KSA
    } else if (nationality === 'Egyptian') {
        // Expats in KSA pay 0% GOSI, Employer pays 2% (Hazard)
        gosiEmployee = 0;
        gosiEmployer = effectiveGosiBase * 0.02;
        
        // 3. Progressive Tax Intelligence (Egyptian Framework)
        // Only apply if explicitly marked as applicable
        if (isTaxApplicable) {
            incomeTax = calculateEgyptianTax(grossSalary);
        }
    } else {
        gosiEmployee = 0;
        gosiEmployer = effectiveGosiBase * 0.02;
        if (isTaxApplicable) {
            incomeTax = grossSalary * 0.10; // Flat 10% for others
        }
    }

    const netSalary = grossSalary - (gosiEmployee + incomeTax + healthInsurance + otherDeductions);

    return {
        basicSalary: baseSalary,
        housingAllowance,
        transportationAllowance,
        otherAllowances,
        laptopAllowance,
        overtime,
        bonus,
        gosiEmployee,
        gosiEmployer,
        incomeTax,
        healthInsurance,
        otherDeductions,
        grossSalary,
        netSalary
    };
}

/**
 * Calculates Egyptian Progressive Income Tax (Monthly)
 * Based on latest tax brackets (simplified for simulation)
 */
function calculateEgyptianTax(monthlyGross: number): number {
    const annualTaxable = monthlyGross * 12;
    let tax = 0;

    // Brackets (Annual)
    const brackets = [
        { limit: 30000, rate: 0 },
        { limit: 45000, rate: 0.10 },
        { limit: 60000, rate: 0.15 },
        { limit: 200000, rate: 0.20 },
        { limit: 400000, rate: 0.225 },
        { limit: Infinity, rate: 0.25 }
    ];

    let remaining = annualTaxable;
    let previousLimit = 0;

    for (const bracket of brackets) {
        const taxableInThisBracket = Math.min(Math.max(remaining, 0), bracket.limit - previousLimit);
        tax += taxableInThisBracket * bracket.rate;
        remaining -= taxableInThisBracket;
        previousLimit = bracket.limit;
        if (remaining <= 0) break;
    }

    return tax / 12; // Return monthly tax
}
