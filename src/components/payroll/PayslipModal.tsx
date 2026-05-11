"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, CreditCard, Landmark, Calendar, User, Briefcase, DollarSign, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PayslipModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeeName: string;
    amount: string;
    date: string;
}

export function PayslipModal({ isOpen, onClose, employeeName, amount, date }: PayslipModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white dark:bg-zinc-950 border-none shadow-2xl">
                {/* Header Section */}
                <div className="bg-zinc-900 dark:bg-black p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                        <Landmark size={200} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Wallet className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Super HR <span className="text-blue-500">Antigravity</span></h2>
                            </div>
                            <div className="flex items-center gap-4 text-zinc-400 font-bold text-xs">
                                <div className="flex items-center gap-1.5"><Calendar size={14} /> {date}</div>
                                <div className="h-4 w-[1px] bg-zinc-800" />
                                <div className="flex items-center gap-1.5 uppercase tracking-widest"><CreditCard size={14} /> Official Payslip</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge className="bg-emerald-500 text-white border-none font-black px-4 py-1.5 uppercase tracking-widest text-[10px]">TRANSFERRED SUCCESSFULLY</Badge>
                            <p className="mt-2 text-zinc-500 font-bold text-xs">Cycle: 2024-C02-JAN</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 grid md:grid-cols-2 gap-12 text-left">
                    {/* Left Column: Context & Earnings */}
                    <div className="space-y-8">
                        {/* Employee Details Box */}
                        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-blue-600">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Recipient</p>
                                <h4 className="text-lg font-black text-black dark:text-zinc-50">{employeeName}</h4>
                                <p className="text-xs font-bold text-zinc-500">ID: SHR-004-92 | Product Management</p>
                            </div>
                        </div>

                        {/* Earnings Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <DollarSign size={14} className="text-emerald-500" /> Earnings
                                </h3>
                                <span className="text-[10px] font-black text-zinc-400">AMOUNT</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: "Basic salary", val: amount },
                                    { label: "Housing", val: "$2,400.00" },
                                    { label: "Transportation", val: "$1,200.00" },
                                    { label: "Other", val: "$0.00" },
                                    { label: "Laptop Allowance", val: "$150.00" },
                                    { label: "Overtime", val: "$450.00" },
                                    { label: "Bonus", val: "$0.00" },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm font-bold group">
                                        <span className="text-zinc-500 group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">{item.label}</span>
                                        <span className="text-zinc-900 dark:text-zinc-50">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Deductions & Totals */}
                    <div className="space-y-8">
                        {/* Payroll Context Box */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Due Date</p>
                                <p className="text-sm font-black">{date}</p>
                            </div>
                            <div className="p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Month</p>
                                <p className="text-sm font-black">January 2024</p>
                            </div>
                        </div>

                        {/* Deductions Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <Briefcase size={14} className="text-rose-500" /> Deductions
                                </h3>
                                <span className="text-[10px] font-black text-zinc-400">AMOUNT</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: "Tax", val: "-$1,200.00" },
                                    { label: "Health insurance", val: "-$120.00" },
                                    { label: "GOSI deduction", val: "-$450.00" },
                                    { label: "Deductions", val: "-$0.00" },
                                    { label: "Other payment transictions", val: "-$0.00" },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm font-bold group">
                                        <span className="text-zinc-500 group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">{item.label}</span>
                                        <span className="text-rose-500">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Totals Section */}
                        <div className="p-8 rounded-[40px] bg-blue-600 text-white space-y-4 shadow-xl shadow-blue-500/20 relative overflow-hidden">
                            <div className="absolute -bottom-4 -right-4 text-white/5 rotate-12">
                                <Wallet size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Gross Salary</span>
                                    <span className="text-lg font-black">$12,000.00</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Net Payable Amount</p>
                                        <h2 className="text-4xl font-black tracking-tighter">{amount}</h2>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <CheckCircle size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-8 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 gap-3 sm:gap-0 flex-col md:flex-row">
                    <p className="text-[10px] font-bold text-zinc-400 max-w-xs text-left leading-relaxed">
                        This is a computer generated document. No signature is required. For any discrepancies, please contact the HR finance department within 48 hours.
                    </p>
                    <div className="flex gap-3 flex-1 justify-end w-full">
                        <Button variant="outline" className="rounded-2xl border-zinc-200 dark:border-zinc-800 font-bold px-6" onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                        <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] px-8 shadow-lg shadow-blue-500/20">
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function CheckCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
