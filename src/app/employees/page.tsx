"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Trash2, ShieldCheck, Mail, Sparkles, TrendingUp, Brain, FileWarning, ArrowRight, Calendar, X, FileText, CheckCircle, ChevronRight, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import * as XLSX from "xlsx";
import { useEmployees } from "@/lib/employee-context";
import Link from "next/link";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import CareerPathModal from "@/components/employees/CareerPathModal";

function EmployeesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view');
    const { userRole } = useAuth();
    
    const [selectedEmployeeForCareer, setSelectedEmployeeForCareer] = useState<{ id: string, name: string } | null>(null);
    
    const { employees: employeeList } = useEmployees();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Simulate current user ID - in a real app this would come from AuthContext
    // We simulate user ID "2" (CTO) for the manager, and "4" for the employee.
    const currentUserId = userRole === 'manager' ? "2" : (userRole === 'employee' ? "4" : null);

    const filteredEmployeeList = employeeList.filter(e => {
        if (userRole === 'admin') return true;
        if (userRole === 'manager') {
            // Managers only see their direct reports. Mocking this by department since DB lacks strict hierarchy yet.
            return e.directManagerId === currentUserId || e.department === "Engineering"; 
        }
        if (userRole === 'employee') {
            return e.id === currentUserId || 
                   e.directManagerId === currentUserId || 
                   e.indirectManagerId === currentUserId;
        }
        return false;
    });

    const adminRenewals = filteredEmployeeList.filter(e => {
        if (!e.contractRenewalDate) return false;
        const monthsDiff = (new Date(e.contractRenewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.5);
        return monthsDiff > 0 && monthsDiff <= 2;
    });

    const closeRenewalView = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('view');
        router.push(`/employees?${params.toString()}`);
    };

    // Removed local fetch to rely on global EmployeeContext which handles persistence
    /*
    useEffect(() => {
        ...
    }, []);
    */

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target?.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws) as any[];

                const newEmployees = data.map((row, index) => ({
                    id: `bulk-${Date.now()}-${index}`,
                    firstName: row.firstName || row["First Name"] || (row.name ? row.name.split(' ')[0] : "New"),
                    lastName: row.lastName || row["Last Name"] || (row.name ? row.name.split(' ').slice(1).join(' ') : "Employee"),
                    email: row.email || row.Email || "",
                    role: row.role || row.Role || "Employee",
                    department: row.department || row.Department || "General",
                    status: "Active",
                    joinedDate: new Date().toISOString(),
                }));

                // Upload to DB
                const response = await fetch('/api/employees/bulk', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEmployees)
                });

                if (!response.ok) {
                    throw new Error("Failed to save bulk data to database.");
                }

                // Fetch latest from DB to ensure IDs are correct
                const res = await fetch('/api/employees');
                if (res.ok) {
                    const dbData = await res.json();
                    setEmployeeList(dbData.length > 0 ? dbData : newEmployees);
                } else {
                    setEmployeeList(prev => [...newEmployees, ...prev]);
                }

                toast.success(`Successfully imported employees into the database.`);
            } catch (error) {
                console.error("Error parsing/uploading file:", error);
                toast.error("Failed to import file. Please check format and try again.");
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleAction = (action: string, employee: any) => {
        if (action === "Career Path") {
            setSelectedEmployeeForCareer({ id: employee.id, name: `${employee.firstName} ${employee.lastName}` });
            return;
        }
        toast.info(`${action} initiated for ${employee.firstName}`);
    };
    return (
        <div className="space-y-6 text-left">
            <CareerPathModal 
                isOpen={!!selectedEmployeeForCareer}
                onClose={() => setSelectedEmployeeForCareer(null)}
                employeeId={selectedEmployeeForCareer?.id || ""}
                employeeName={selectedEmployeeForCareer?.name || ""}
            />
            {!currentView && (
                <>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Workforce Intelligence</h2>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                {userRole === 'admin' ? `Total talent managed: ${filteredEmployeeList.length}` : `Team members: ${filteredEmployeeList.length}`}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {userRole === 'admin' && (
                                <>
                                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 rounded-full" onClick={() => toast.info("AI generating talent diversity report...")}>
                                        <TrendingUp size={14} className="mr-2" /> Talent Reports
                                    </Button>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleFileUpload} 
                                        accept=".xlsx, .xls, .csv" 
                                        className="hidden" 
                                    />
                                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 rounded-full" onClick={() => fileInputRef.current?.click()}>
                                        <Plus size={14} className="mr-2" /> Bulk Upload
                                    </Button>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20" asChild>
                                        <Link href="/employees/new">
                                            <Plus className="mr-2 h-4 w-4" /> Add Member
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                placeholder="Ask AI: 'Who is at risk of leaving?'"
                                className="pl-9 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 focus:ring-blue-500/50"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                        <Table>
                            <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                                <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                    <TableHead className="w-[80px] font-bold text-[11px] uppercase tracking-widest text-zinc-500">Member</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Contact</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Role</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Department</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Retention Risk</TableHead>
                                    <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployeeList.map((employee, i) => (
                                    <TableRow key={employee.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer" onClick={() => router.push(`/employees/${employee.id}`)}>
                                        <TableCell>
                                            <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-900 shadow-sm transition-transform group-hover:scale-110">
                                                <AvatarImage src={employee.avatar} alt={employee.firstName} />
                                                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                                                    {employee.firstName[0]}{employee.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-bold text-black dark:text-zinc-50">{employee.firstName} {employee.lastName}</div>
                                            <div className="text-xs text-zinc-500 group-hover:text-blue-500 transition-colors">{employee.email}</div>
                                        </TableCell>
                                        <TableCell className="text-sm">{employee.role}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-[10px] font-medium bg-zinc-100/50 dark:bg-zinc-800/50 border-none">
                                                {employee.department}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className={`rounded-full px-2 py-0 border-none shadow-sm text-[9px] font-black uppercase ${i % 3 === 0 ? 'bg-emerald-500/10 text-emerald-600' : i % 3 === 1 ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'}`}>
                                                    {i % 3 === 0 ? 'Low Risk' : i % 3 === 1 ? 'Moderate' : 'High Risk'}
                                                </Badge>
                                                <Sparkles size={10} className="text-blue-500/40" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-blue-600 transition-colors">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl">
                                                    <DropdownMenuLabel className="text-xs font-black uppercase tracking-widest text-zinc-500 p-3">Intelligence Hub</DropdownMenuLabel>
                                                    <DropdownMenuItem className="cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Career Path", employee)}>
                                                        <Brain className="h-4 w-4 text-blue-500" /> AI Career Pathing
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Security Check", employee)}>
                                                        <ShieldCheck className="h-4 w-4 text-emerald-500" /> Security Audit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Email", employee)}>
                                                        <Mail className="h-4 w-4 text-zinc-400" /> Send Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                                                    <DropdownMenuItem className="text-rose-600 dark:text-rose-400 cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Termination", employee)}>
                                                        <Trash2 className="h-4 w-4" /> Terminate
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}

            {/* Integrated Renewal Intelligence View */}
            {currentView === 'renewals' && (
                <div className="rounded-[40px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
                    {/* Header */}
                    <div className="h-20 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-8 shrink-0">
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                onClick={closeRenewalView}
                            >
                                <X size={20} />
                            </Button>
                            <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-2" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-black tracking-tight">Contract Lifecycle Intelligence</h2>
                                    <Badge className="bg-rose-500/10 text-rose-600 border-none text-[10px] font-black tracking-widest px-3">ADMIN AUDIT</Badge>
                                </div>
                                <p className="text-xs text-zinc-500 font-medium">Monitoring {adminRenewals.length} upcoming talent contract extensions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-800 font-bold text-xs" onClick={() => toast.info("Exporting audit log...")}>
                                <TrendingUp size={14} className="mr-2" /> Export Audit
                            </Button>
                            <Button className="bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-xs px-8" onClick={closeRenewalView}>
                                Done
                            </Button>
                        </div>
                    </div>

                    <div className="flex min-h-[600px]">
                        {/* Sidebar Stats */}
                        <div className="w-80 border-r border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 p-8 space-y-8 overflow-y-auto">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Risk Assessment</h3>
                                <div className="grid gap-3">
                                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                                        <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-1">Critical Renewals</p>
                                        <p className="text-3xl font-black text-rose-700">{adminRenewals.filter(e => {
                                            const diff = (new Date(e.contractRenewalDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.5);
                                            return diff <= 1;
                                        }).length}</p>
                                        <p className="text-[10px] text-rose-600/70 font-medium mt-1">Expiring within 30 days</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Standard Renewals</p>
                                        <p className="text-3xl font-black text-amber-700">{adminRenewals.filter(e => {
                                            const diff = (new Date(e.contractRenewalDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.5);
                                            return diff > 1;
                                        }).length}</p>
                                        <p className="text-[10px] text-amber-600/70 font-medium mt-1">Expiring within 60 days</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Automation Mode</h3>
                                <div className="p-5 rounded-3xl bg-zinc-900 dark:bg-zinc-900 text-white space-y-4 relative overflow-hidden">
                                    <Sparkles className="absolute top-2 right-2 text-white/10" size={40} />
                                    <p className="text-xs font-medium leading-relaxed opacity-80">AI is currently drafting extension offers for all low-risk employees.</p>
                                    <Button className="w-full bg-white text-black hover:bg-zinc-100 rounded-xl font-black text-[10px] uppercase tracking-widest">
                                        Review Drafts
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 bg-white dark:bg-black overflow-y-auto p-12">
                            <div className="max-w-4xl mx-auto space-y-12">
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black tracking-tight">Active Audit Queue</h3>
                                    <p className="text-lg text-zinc-500">System generated list of talent contracts requiring manual validation.</p>
                                </div>

                                <div className="grid gap-6">
                                    {adminRenewals.map((emp) => (
                                        <div key={emp.id} className="p-8 rounded-[40px] border border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div className="relative">
                                                        <Avatar className="h-20 w-20 border-4 border-white dark:border-zinc-800 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                            <AvatarImage src={emp.avatar} alt={emp.firstName} />
                                                            <AvatarFallback className="bg-zinc-100 text-zinc-600 font-black text-xl">
                                                                {emp.firstName[0]}{emp.lastName[0]}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-rose-600 border-4 border-white dark:border-zinc-900 flex items-center justify-center text-white shadow-lg">
                                                            <AlertTriangle size={12} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-2xl font-black text-black dark:text-zinc-50 mb-1">{emp.firstName} {emp.lastName}</h4>
                                                        <div className="flex items-center gap-3">
                                                            <Badge variant="outline" className="rounded-full bg-zinc-100/50 dark:bg-zinc-800/50 border-none font-bold text-[10px] uppercase tracking-widest text-zinc-500 px-3 py-1">
                                                                {emp.role}
                                                            </Badge>
                                                            <span className="h-1 w-1 rounded-full bg-zinc-300" />
                                                            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">{emp.department}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right space-y-2">
                                                    <div className="inline-block px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 shadow-sm">
                                                        <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Contract Deadline</p>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-rose-600" />
                                                            <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">
                                                                {new Date(emp.contractRenewalDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                                        <CheckCircle size={14} /> Documentation Ready
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600">
                                                        <FileText size={14} /> Performance Sync Complete
                                                    </div>
                                                </div>
                                                <Button 
                                                    className="bg-black dark:bg-white text-white dark:text-black rounded-full font-black text-[10px] uppercase tracking-widest px-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl"
                                                    onClick={() => router.push(`/employees/${emp.id}`)}
                                                >
                                                    Process Renewal <ChevronRight size={14} className="ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function EmployeesPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Workforce Intelligence...</div>}>
            <EmployeesContent />
        </Suspense>
    );
}
