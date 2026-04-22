"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, UserEdit, Trash2, ShieldCheck, Mail, Sparkles, TrendingUp, Brain } from "lucide-react";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { employees, Employee } from "./data";
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

export default function EmployeesPage() {
    const [employeeList, setEmployeeList] = useState<Employee[]>(employees);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
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
                    status: "Active" as const,
                    joinedDate: new Date().toISOString().split('T')[0],
                }));

                setEmployeeList(prev => [...prev, ...newEmployees]);
                toast.success(`Successfully imported ${newEmployees.length} employees`);
            } catch (error) {
                console.error("Error parsing file:", error);
                toast.error("Failed to parse file. Please upload a valid Excel or CSV file.");
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleAction = (action: string, name: string) => {
        if (action === "Career Path") {
            toast.success(`AI modeling ${name}'s career trajectory: Next potential role: Senior Specialist.`, {
                icon: <Brain className="h-4 w-4 text-blue-500" />
            });
            return;
        }
        toast.info(`${action} initiated for ${name}`);
    };

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Workforce Intelligence</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Total talent managed: {employeeList.length}</p>
                </div>
                <div className="flex gap-3">
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
                        {employeeList.map((employee, i) => (
                            <TableRow key={employee.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-zinc-200 dark:border-zinc-800 transition-colors">
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
                                            <DropdownMenuItem className="cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Career Path", employee.firstName)}>
                                                <Brain className="h-4 w-4 text-blue-500" /> AI Career Pathing
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Security Check", employee.firstName)}>
                                                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Security Audit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Email", employee.firstName)}>
                                                <Mail className="h-4 w-4 text-zinc-400" /> Send Email
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                                            <DropdownMenuItem className="text-rose-600 dark:text-rose-400 cursor-pointer gap-3 p-3 font-bold text-xs" onClick={() => handleAction("Termination", employee.firstName)}>
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
        </div>
    );
}
