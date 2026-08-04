import { Employee } from "@/app/employees/data";

export type RiskLevel = "Low Risk" | "Moderate" | "High Risk";

export function calculateRetentionRisk(employee: Employee): { score: number; level: RiskLevel; primaryReason: string } {
    let riskScore = 10; // Base baseline risk
    let reasons: { reason: string; weight: number }[] = [];

    // 1. Tenure Factor
    if (employee.joinedDate) {
        const joinDate = new Date(employee.joinedDate);
        const now = new Date();
        const yearsTenure = (now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

        if (yearsTenure < 1) {
            riskScore += 5;
            reasons.push({ reason: "New Hire", weight: 5 });
        } else if (yearsTenure >= 2 && yearsTenure < 3.5) {
            riskScore += 25; // 2-3 year mark is highest flight risk usually
            reasons.push({ reason: "2-3 Year Flight Risk Mark", weight: 25 });
        } else if (yearsTenure >= 3.5 && yearsTenure < 5) {
            riskScore += 15;
            reasons.push({ reason: "Mid-level Tenure", weight: 15 });
        } else if (yearsTenure >= 5) {
            riskScore += 5;
            reasons.push({ reason: "Long Tenure", weight: 5 });
        }
    }

    // 2. Contract Renewal
    if (employee.contractRenewalDate) {
        const renewalDate = new Date(employee.contractRenewalDate);
        const now = new Date();
        const daysToRenewal = (renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        if (daysToRenewal > 0 && daysToRenewal <= 30) {
            riskScore += 40;
            reasons.push({ reason: "Contract Expires in < 30 Days", weight: 40 });
        } else if (daysToRenewal > 30 && daysToRenewal <= 90) {
            riskScore += 20;
            reasons.push({ reason: "Contract Expires within 90 Days", weight: 20 });
        }
    }

    // 3. Salary Competitiveness (Mock logic based on absolute numbers)
    if (employee.salary) {
        if (employee.salary < 15000) {
            riskScore += 20;
            reasons.push({ reason: "Compensation Below Average", weight: 20 });
        } else if (employee.salary < 25000) {
            riskScore += 10;
            reasons.push({ reason: "Compensation Mediocre", weight: 10 });
        } else if (employee.salary > 45000) {
            riskScore -= 10; // High salary reduces risk
            reasons.push({ reason: "Highly Compensated", weight: -10 });
        }
    }

    // 4. Department Flight Risk Averages
    if (["Engineering", "Product", "Design"].includes(employee.department)) {
        riskScore += 15;
        reasons.push({ reason: "High Demand Tech Role", weight: 15 });
    } else if (employee.department === "Sales") {
        riskScore += 10;
        reasons.push({ reason: "Sales Burnout Risk", weight: 10 });
    }

    // Cap the score between 0 and 100
    riskScore = Math.max(0, Math.min(100, riskScore));

    // Determine Level
    let level: RiskLevel = "Low Risk";
    if (riskScore >= 60) level = "High Risk";
    else if (riskScore >= 35) level = "Moderate";

    // Primary Reason
    reasons.sort((a, b) => b.weight - a.weight);
    const primaryReason = reasons.length > 0 ? reasons[0].reason : "Stable Baseline";

    return { score: riskScore, level, primaryReason };
}
