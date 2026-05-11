"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calculator, DollarSign, Wallet, ArrowRight, Loader2, Save } from "lucide-react";

interface FinancialSettlementProps {
    record: any;
    onUpdate: (updatedRecord: any) => void;
}

export function FinancialSettlement({ record, onUpdate }: FinancialSettlementProps) {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        salaryAtExit: record.salaryAtExit || record.employee?.salary || 0,
        deductions: record.deductions || 0,
        leavePayout: record.leavePayout || 0,
        eosBenefits: record.eosBenefits || 0,
    });

    const total = Number(values.salaryAtExit) + Number(values.leavePayout) + Number(values.eosBenefits) - Number(values.deductions);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/offboarding/${record.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    totalSettlement: total
                })
            });

            if (res.ok) {
                const updated = await res.json();
                toast.success("Financial settlement updated.");
                onUpdate(updated);
            } else {
                toast.error("Failed to update settlement.");
            }
        } catch (err) {
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const suggestCalculations = () => {
        // Simple logic for the demo
        const baseSalary = record.employee?.salary || 5000;
        const leaveDays = 15; // Mock data
        const leavePayout = (baseSalary / 30) * leaveDays;
        
        // Mock EOS: 15 days for every year (simplified)
        const years = 2; // Mock data
        const eosBenefits = (baseSalary / 2) * years;

        setValues({
            ...values,
            salaryAtExit: baseSalary,
            leavePayout: Math.round(leavePayout),
            eosBenefits: Math.round(eosBenefits)
        });
        toast.info("AI suggested values based on employment history.");
    };

    return (
        <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <DollarSign size={80} />
            </div>
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-black tracking-tight">Final Settlement Intelligence</CardTitle>
                        <CardDescription>Verify and authorize the end-of-service financial package.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={suggestCalculations} className="rounded-full border-zinc-200 dark:border-zinc-800 font-bold text-xs uppercase tracking-widest bg-white dark:bg-zinc-950">
                        <Calculator className="mr-2 h-3 w-3" /> Auto-Calculate
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Base Salary at Exit</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                <Input 
                                    type="number" 
                                    className="pl-8 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold" 
                                    value={values.salaryAtExit}
                                    onChange={(e) => setValues({...values, salaryAtExit: Number(e.target.value)})}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Leave Balance Payout</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                <Input 
                                    type="number" 
                                    className="pl-8 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold text-blue-600" 
                                    value={values.leavePayout}
                                    onChange={(e) => setValues({...values, leavePayout: Number(e.target.value)})}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">End of Service Benefits</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                <Input 
                                    type="number" 
                                    className="pl-8 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold text-emerald-600" 
                                    value={values.eosBenefits}
                                    onChange={(e) => setValues({...values, eosBenefits: Number(e.target.value)})}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Deductions (Loans, Assets, etc.)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                <Input 
                                    type="number" 
                                    className="pl-8 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold text-rose-600" 
                                    value={values.deductions}
                                    onChange={(e) => setValues({...values, deductions: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 dark:bg-black rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Wallet size={200} />
                        </div>
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Total Net Settlement</p>
                            <h3 className="text-5xl font-black tracking-tighter tabular-nums">
                                ${total.toLocaleString()}
                            </h3>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                                <span className="text-xs font-bold text-zinc-400">Currency</span>
                                <span className="text-xs font-black">USD</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                                <span className="text-xs font-bold text-zinc-400">Payment Status</span>
                                <span className="text-[10px] font-black px-2 py-0.5 bg-zinc-800 rounded-full text-zinc-300 uppercase">Awaiting Approval</span>
                            </div>
                            <Button 
                                className="w-full bg-white text-black hover:bg-zinc-200 font-black rounded-xl h-12 shadow-xl"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Authorize & Save
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
