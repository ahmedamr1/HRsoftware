"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, TrendingUp, DollarSign, Users, Eye, Play, CheckCircle, RefreshCw, Search } from "lucide-react";
import { PayslipModal } from "@/components/payroll/PayslipModal";
import { useAuth } from "@/lib/auth-context";
import { useEmployees } from "@/lib/employee-context";
import { calculateLocalizedPayroll } from "@/lib/payroll-utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PayrollPage() {
    const { userRole } = useAuth();
    const { employees } = useEmployees();
    const router = useRouter();
    const isAdmin = userRole === "admin";
    const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
    const [isRunningPayroll, setIsRunningPayroll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Simulate current user ID - in a real app this would come from AuthContext
    const currentUserId = userRole === 'manager' ? "2" : (userRole === 'employee' ? "4" : null);

    // Helper to format salary with correct currency
    const formatSalary = (emp: any) => {
        const calc = calculateLocalizedPayroll(
            emp.salary || 0, 
            emp.nationality, 
            emp.isGosiApplicable, 
            emp.isTaxApplicable,
            {
                housing: emp.housingAllowance,
                transportation: emp.transportationAllowance,
                other: emp.otherAllowance,
                laptop: emp.laptopAllowance,
                overtime: emp.overtime,
                bonus: emp.bonus
            }
        );
        const currency = emp.currency || (emp.nationality === 'Saudi' ? 'SAR' : 'USD');
        const symbol = currency === 'SAR' ? 'SAR ' : (currency === 'EGP' ? 'EGP ' : '$');
        
        return {
            amount: `${symbol}${calc.netSalary.toLocaleString()}`,
            currency
        };
    };

    // Dynamically generate payroll data from current employees
    const allPayrollData = employees.flatMap(emp => {
        const salaryInfo = formatSalary(emp);
        return [
            { 
                id: `${emp.id}-feb`, 
                employeeId: emp.id,
                employee: `${emp.firstName} ${emp.lastName}`, 
                role: emp.role, 
                salary: salaryInfo.amount, 
                currency: salaryInfo.currency,
                status: "Pending", 
                date: "Feb 28, 2024", 
                cycle: "2024-C02-FEB" 
            },
            { 
                id: `${emp.id}-jan`, 
                employeeId: emp.id,
                employee: `${emp.firstName} ${emp.lastName}`, 
                role: emp.role, 
                salary: salaryInfo.amount, 
                currency: salaryInfo.currency,
                status: "Paid", 
                date: "Jan 31, 2024", 
                cycle: "2024-C01-JAN" 
            },
        ];
    });

    const filteredPayrollData = allPayrollData.filter(p => {
        const matchesRole = isAdmin ? true : p.employeeId === currentUserId;
        const matchesSearch = p.employee.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    const relevantEmployees = isAdmin ? employees : employees.filter(e => e.id === currentUserId);
    const totals = relevantEmployees.reduce((acc, emp) => {
        const calc = calculateLocalizedPayroll(
            emp.salary || 0, 
            emp.nationality, 
            emp.isGosiApplicable, 
            emp.isTaxApplicable,
            {
                housing: emp.housingAllowance,
                transportation: emp.transportationAllowance,
                other: emp.otherAllowance,
                laptop: emp.laptopAllowance,
                overtime: emp.overtime,
                bonus: emp.bonus
            }
        );
        return {
            gross: acc.gross + calc.grossSalary,
            tax: acc.tax + calc.incomeTax,
            net: acc.net + calc.netSalary
        };
    }, { gross: 0, tax: 0, net: 0 });

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

            <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Finances & Payroll</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        {isAdmin ? "Manage salary distribution and employee compensation." : "Your personal compensation and payslip history."}
                    </p>
                </div>
                {isAdmin && (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 rounded-full" onClick={() => toast.info("Exporting CSV...")}>
                            <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                        <Button
                            disabled={isRunningPayroll}
                            onClick={handleRunPayroll}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20 border-none px-6"
                        >
                            {isRunningPayroll ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                            Run Payroll
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { 
                        title: "Total Liability", 
                        value: `SAR ${totals.gross.toLocaleString()}`, 
                        desc: "Total gross compensation", 
                        icon: DollarSign, 
                        color: "blue" 
                    },
                    { 
                        title: "Tax Withholdings", 
                        value: `SAR ${totals.tax.toLocaleString()}`, 
                        desc: "Estimated current month", 
                        icon: TrendingUp, 
                        color: "emerald" 
                    },
                    { 
                        title: "Net Disbursement", 
                        value: `SAR ${totals.net.toLocaleString()}`, 
                        desc: "Total amount to be paid", 
                        icon: Users, 
                        color: "purple" 
                    },
                ].map((stat, i) => (
                    <Card key={i} className="group relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all rounded-3xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-black dark:text-zinc-50 tracking-tighter">{stat.value}</div>
                            <p className="text-xs text-zinc-400 font-medium mt-1">{stat.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Payroll List */}
            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden rounded-[32px]">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 flex flex-row items-center justify-between p-8">
                    <div>
                        <CardTitle className="text-lg font-black uppercase tracking-tighter">Salary Disbursements</CardTitle>
                        <CardDescription className="text-xs font-medium">Review and verify the longitudinal compensation history.</CardDescription>
                    </div>
                    <div className="relative w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input
                            placeholder="Search member history..."
                            className="pl-9 h-10 rounded-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-xs font-bold shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-zinc-500 p-6">Employee</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-zinc-500">Role</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-zinc-500">Amount</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-zinc-500">Cycle Date</TableHead>
                                <TableHead className="font-black text-[11px] uppercase tracking-widest text-zinc-500">Status</TableHead>
                                <TableHead className="text-right font-black text-[11px] uppercase tracking-widest text-zinc-500 p-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayrollData.map((payroll) => (
                                <TableRow key={payroll.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer" onClick={() => router.push(`/payroll/${payroll.id}`)}>
                                    <TableCell className="font-bold text-sm text-black dark:text-zinc-50 p-6">{payroll.employee}</TableCell>
                                    <TableCell className="text-sm text-zinc-500 font-medium">{payroll.role}</TableCell>
                                    <TableCell className="font-black text-sm text-emerald-600 dark:text-emerald-400">{payroll.salary}</TableCell>
                                    <TableCell className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{payroll.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={payroll.status === 'Paid' ? 'success' : 'secondary'} className={`rounded-full shadow-sm border-none font-black text-[9px] uppercase tracking-widest px-3 ${payroll.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-zinc-100 text-zinc-500'}`}>
                                            {payroll.status === 'Paid' && <CheckCircle size={10} className="mr-1" />}
                                            {payroll.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right p-6">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-zinc-400 hover:text-blue-500 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(`/payroll/${payroll.id}`);
                                            }}
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
