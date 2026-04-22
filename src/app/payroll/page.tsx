"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, TrendingUp, DollarSign, Users, Eye, Play, CheckCircle } from "lucide-react";
import { PayslipModal } from "@/components/payroll/PayslipModal";
import { toast } from "sonner";

export default function PayrollPage() {
    const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
    const [isRunningPayroll, setIsRunningPayroll] = useState(false);

    const payrollData = [
        { id: "1", employee: "Alex Rivera", role: "Frontend Dev", salary: "$85,000", status: "Paid", date: "Jan 31, 2024" },
        { id: "2", employee: "Samantha Lee", role: "Product Designer", salary: "$92,000", status: "Paid", date: "Jan 31, 2024" },
        { id: "3", employee: "Jordan Smith", role: "HR Manager", salary: "$78,000", status: "Pending", date: "Feb 28, 2024" },
        { id: "4", employee: "Maria Garcia", role: "Backend Dev", salary: "$95,000", status: "Pending", date: "Feb 28, 2024" },
    ];

    const handleRunPayroll = () => {
        setIsRunningPayroll(true);
        toast.promise(new Promise(resolve => setTimeout(resolve, 3000)), {
            loading: 'Calculating salaries and tax withholdings...',
            success: () => {
                setIsRunningPayroll(false);
                return 'Payroll successfully processed for February!';
            },
            error: 'Failed to process payroll',
        });
    };

    return (
        <div className="space-y-6 text-left">
            <PayslipModal
                isOpen={!!selectedPayslip}
                onClose={() => setSelectedPayslip(null)}
                employeeName={selectedPayslip?.employee || ""}
                amount={selectedPayslip?.salary || ""}
                date={selectedPayslip?.date || ""}
            />

            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Finances & Payroll</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage salary distribution and employee compensation.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800" onClick={() => toast.info("Exporting CSV...")}>
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button
                        disabled={isRunningPayroll}
                        onClick={handleRunPayroll}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 border-none px-6"
                    >
                        {isRunningPayroll ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                        Run Payroll
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { title: "Total Liability", value: "$350,000", desc: "+4% from last month", icon: DollarSign, color: "blue" },
                    { title: "Tax Withholdings", value: "$42,500", desc: "Estimated current month", icon: TrendingUp, color: "emerald" },
                    { title: "Active Accounts", value: "124", desc: "100% of workforce", icon: Users, color: "purple" },
                ].map((stat, i) => (
                    <Card key={i} className="group relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold tracking-tight text-zinc-500 uppercase">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-black dark:text-zinc-50 tracking-tighter">{stat.value}</div>
                            <p className="text-xs text-zinc-400 font-medium mt-1">{stat.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <CardTitle className="text-lg font-bold uppercase tracking-tighter">Salary Disbursements</CardTitle>
                    <CardDescription>Review and verify the latest cycle.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Employee</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Role</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Amount</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Cycle Date</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Status</TableHead>
                                <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payrollData.map((payroll) => (
                                <TableRow key={payroll.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-zinc-200 dark:border-zinc-800 transition-colors">
                                    <TableCell className="font-bold text-sm text-black dark:text-zinc-50">{payroll.employee}</TableCell>
                                    <TableCell className="text-sm text-zinc-500">{payroll.role}</TableCell>
                                    <TableCell className="font-black text-sm text-emerald-600 dark:text-emerald-400">{payroll.salary}</TableCell>
                                    <TableCell className="text-xs font-medium text-zinc-400 uppercase tracking-widest">{payroll.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={payroll.status === 'Paid' ? 'success' : 'secondary'} className="rounded-full shadow-sm border-none font-bold text-[10px]">
                                            {payroll.status === 'Paid' && <CheckCircle size={10} className="mr-1" />}
                                            {payroll.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-zinc-400 hover:text-blue-500 transition-colors"
                                            onClick={() => setSelectedPayslip(payroll)}
                                        >
                                            <Eye size={14} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

function RefreshCw(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
    )
}
