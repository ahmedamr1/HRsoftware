"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
    Download, Printer, ChevronLeft, CreditCard, Landmark, 
    Calendar, User, Briefcase, DollarSign, Wallet, CheckCircle, 
    ShieldCheck, AlertCircle, FileText
} from "lucide-react";
import { toast } from "sonner";
import { useEmployees } from "@/lib/employee-context";
import { calculateLocalizedPayroll } from "@/lib/payroll-utils";

export default function PayslipDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(true);

    const { employees } = useEmployees();
    
    // The ID in the URL is composite (e.g., "1-feb"), so we extract the real employee ID
    const realEmployeeId = id.split('-')[0];
    const employee = employees.find(e => e.id === realEmployeeId) || employees[3]; // Fallback if not found
    
    // Calculate dynamic localized payroll
    const calc = calculateLocalizedPayroll(
        employee.salary || 5000, 
        employee.nationality,
        employee.isGosiApplicable,
        employee.isTaxApplicable,
        {
            housing: employee.housingAllowance,
            transportation: employee.transportationAllowance,
            other: employee.otherAllowance,
            laptop: employee.laptopAllowance,
            overtime: employee.overtime,
            bonus: employee.bonus
        }
    );

    const currency = employee.currency || (employee.nationality === 'Saudi' ? 'SAR' : 'USD');
    const locale = currency === 'SAR' ? 'en-SA' : (currency === 'EGP' ? 'en-EG' : 'en-US');

    const payslipData = {
        id: id,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        role: employee.role,
        department: employee.department,
        salary: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.netSalary),
        date: "Jan 31, 2024",
        cycle: "2024-C02-JAN",
        status: "Paid",
        nationality: employee.nationality
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="h-12 w-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Retrieving Financial Record...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-black tracking-tight uppercase">Payslip Detail</h2>
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase tracking-widest">Official Record</Badge>
                        </div>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">ID: SHR-PY-{id}-2024</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-800 font-bold text-xs" onClick={() => window.print()}>
                        <Printer size={14} className="mr-2" /> Print
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-xs px-8 shadow-lg shadow-blue-500/20">
                        <Download size={14} className="mr-2" /> Download PDF
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Payslip Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-zinc-950 rounded-[48px] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                        {/* Internal Header */}
                        <div className="bg-zinc-900 p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12">
                                <Landmark size={240} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                                            <Wallet className="h-7 w-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Super HR <span className="text-blue-500">Antigravity</span></h2>
                                    </div>
                                    <div className="flex items-center gap-4 text-zinc-400 font-bold text-xs">
                                        <div className="flex items-center gap-1.5"><Calendar size={14} /> {payslipData.date}</div>
                                        <div className="h-4 w-[1px] bg-zinc-800" />
                                        <div className="flex items-center gap-1.5 uppercase tracking-widest"><CreditCard size={14} /> Salary Statement</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-emerald-500 text-white border-none font-black px-4 py-1.5 uppercase tracking-widest text-[10px]">TRANSFERRED SUCCESSFULLY</Badge>
                                    <p className="mt-2 text-zinc-500 font-bold text-xs">Cycle: {payslipData.cycle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-12 grid md:grid-cols-2 gap-16 text-left">
                            {/* Earnings */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                        <DollarSign size={14} className="text-emerald-500" /> Earnings breakdown
                                    </h3>
                                    <span className="text-[9px] font-black text-zinc-400">{currency}</span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: "Basic salary", val: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.basicSalary) },
                                        { label: "Housing", val: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.housingAllowance) },
                                        { label: "Transportation", val: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.transportationAllowance) },
                                        { label: "Other", val: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.otherAllowances) },
                                        { label: "Laptop Allowance", val: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.laptopAllowance) },
                                        { label: "Overtime", val: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.overtime) },
                                        { label: "Bonus", val: new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.bonus) },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm font-bold group">
                                            <span className="text-zinc-500 group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">{item.label}</span>
                                            <span className="text-zinc-900 dark:text-zinc-50">{item.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Deductions */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                    <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                        <Briefcase size={14} className="text-rose-500" /> Deductions breakdown
                                    </h3>
                                    <span className="text-[9px] font-black text-zinc-400">{currency}</span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { label: "Tax Intelligence", val: `-${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.incomeTax)}` },
                                        { label: "Health insurance", val: `-${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.healthInsurance)}` },
                                        { label: `${payslipData.nationality} GOSI Contribution`, val: `-${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.gosiEmployee)}` },
                                        { label: "Deductions", val: `-${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(0)}` },
                                        { label: "Other payment transictions", val: `-${new Intl.NumberFormat(locale, { style: 'currency', currency }).format(0)}` },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm font-bold group">
                                            <span className="text-zinc-500 group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">{item.label}</span>
                                            <span className="text-rose-500">{item.val}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Net Box */}
                                <div className="mt-12 p-8 rounded-[40px] bg-blue-600 text-white space-y-4 shadow-2xl shadow-blue-500/20">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Net Payable Amount</p>
                                    <div className="flex justify-between items-end">
                                        <h2 className="text-4xl font-black tracking-tighter">{payslipData.salary}</h2>
                                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                            <CheckCircle size={24} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Footer */}
                        <div className="p-10 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Security Verification</p>
                                        <p className="text-xs font-bold">This document is digitally signed and encrypted.</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Gross salary</p>
                                    <p className="text-xl font-black text-black dark:text-zinc-50">{new Intl.NumberFormat(locale, { style: 'currency', currency }).format(calc.grossSalary)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="rounded-[40px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden shadow-xl">
                        <div className="p-8 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Recipient Details</h3>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-3xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black text-xl">
                                    {payslipData.employeeName[0]}
                                </div>
                                <div>
                                    <Link href={`/employees/${employee.id}?tab=financial`} className="hover:text-blue-600 transition-colors cursor-pointer">
                                        <h4 className="text-lg font-black">{payslipData.employeeName}</h4>
                                    </Link>
                                    <p className="text-xs font-bold text-zinc-500">{payslipData.role}</p>
                                </div>
                            </div>
                            <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-400 font-bold uppercase tracking-widest">Department</span>
                                    <span className="font-black text-right">{payslipData.department}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-400 font-bold uppercase tracking-widest">Status</span>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] uppercase">Active Employee</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-[40px] border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white overflow-hidden shadow-xl relative">
                        <FileText className="absolute -top-4 -right-4 text-white/5 rotate-12" size={140} />
                        <div className="p-8 space-y-4 relative z-10">
                            <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                <AlertCircle size={20} className="text-blue-400" />
                            </div>
                            <h4 className="text-lg font-black tracking-tight">Need Assistance?</h4>
                            <p className="text-xs font-medium opacity-60 leading-relaxed">
                                If you notice any discrepancies in your earnings or deductions, please open a financial inquiry.
                            </p>
                            <Button className="w-full bg-white text-black hover:bg-zinc-100 rounded-2xl font-black text-[10px] uppercase tracking-widest h-12">
                                Open Inquiry
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
