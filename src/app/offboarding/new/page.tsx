"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, UserMinus, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useEmployees } from "@/lib/employee-context";

export default function NewOffboardingPage() {
    const router = useRouter();
    const { employees: contextEmployees } = useEmployees();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [formData, setFormData] = useState({
        resignationDate: new Date().toISOString().split('T')[0],
        lastWorkingDay: "",
        reason: "",
        needBackfill: false,
        handoverToId: "",
    });

    const [workflows, setWorkflows] = useState<any[]>([]);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState("");
    const [workflowTasks, setWorkflowTasks] = useState<any[]>([]);
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

    const fetchWorkflows = useCallback(async () => {
        try {
            const res = await fetch('/api/workflows?type=OFFBOARDING');
            if (res.ok) {
                const data = await res.json();
                if (data.length > 0) {
                    setWorkflows(data);
                    setSelectedWorkflowId(data[0].id);
                    setWorkflowTasks(data[0].tasks || []);
                    setSelectedTaskIds((data[0].tasks || []).map((t: any) => t.id));
                    return;
                }
            }
            // Fallback to agreed tasks if API is empty or fails
            const mockWorkflow = {
                id: "mock-wf-1",
                name: "Standard Offboarding",
                tasks: [
                    { id: "t1", title: "Revoke System Access", description: "Disable Email, Slack, and VPN.", role: "IT" },
                    { id: "t2", title: "Asset Collection", description: "Laptop, badges, and company keys.", role: "IT" },
                    { id: "t3", title: "Exit Interview", description: "Feedback session with HR.", role: "HR" },
                    { id: "t4", title: "Experience Letter", description: "Issue final certificate.", role: "HR" },
                    { id: "t5", title: "Resignation Letter", description: "Signed formal document.", role: "Legal" },
                    { id: "t6", title: "Financial Settlement", description: "Salary, deductions, and payouts.", role: "Finance" },
                    { id: "t7", title: "Handover Completion", description: "Verify knowledge transfer.", role: "Operations" },
                    { id: "t8", title: "Backfill Request", description: "Initiate new recruitment.", role: "HR" },
                ]
            };
            setWorkflows([mockWorkflow]);
            setSelectedWorkflowId(mockWorkflow.id);
            setWorkflowTasks(mockWorkflow.tasks);
            setSelectedTaskIds(mockWorkflow.tasks.map(t => t.id));
        } catch (err) {
            console.error(err);
            toast.error("Using local workflow templates.");
        }
    }, []);

    useEffect(() => {
        fetchWorkflows();
    }, [fetchWorkflows]);

    useEffect(() => {
        // Sync context employees to state, filtering for active ones
        const activeOnes = contextEmployees.filter((e: any) => e.status === 'Active');
        setEmployees(activeOnes);
    }, [contextEmployees.length]); // Use length to avoid infinite reference loops

    const handleWorkflowChange = (wfId: string) => {
        const wf = workflows.find(w => w.id === wfId);
        setSelectedWorkflowId(wfId);
        if (wf) {
            setWorkflowTasks(wf.tasks || []);
            setSelectedTaskIds((wf.tasks || []).map((t: any) => t.id));
        }
    };

    const toggleTask = (taskId: string) => {
        setSelectedTaskIds(prev => 
            prev.includes(taskId) 
                ? prev.filter(id => id !== taskId) 
                : [...prev, taskId]
        );
    };

    const handleTaskClick = (e: React.MouseEvent, taskId: string) => {
        // Only toggle if they didn't click the actual checkbox (which has its own handler)
        if ((e.target as HTMLElement).closest('button')) return;
        toggleTask(taskId);
    };

    const toggleAllTasks = () => {
        if (selectedTaskIds.length === workflowTasks.length) {
            setSelectedTaskIds([]);
        } else {
            setSelectedTaskIds(workflowTasks.map(t => t.id));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmployee || !selectedWorkflowId || !formData.lastWorkingDay) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (selectedTaskIds.length === 0) {
            toast.error("Please select at least one task for the workflow.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/offboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId: selectedEmployee.id,
                    workflowId: selectedWorkflowId,
                    selectedTaskIds,
                    ...formData
                })
            });

            if (res.ok) {
                toast.success(`Offboarding initiated for ${selectedEmployee.firstName}`);
                router.push('/offboarding');
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to initiate offboarding.");
            }
        } catch (err) {
            toast.error("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => 
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [employees, searchQuery]);

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-10 px-4">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()} className="rounded-full h-12 w-12 p-0 border border-zinc-200 dark:border-zinc-800">
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-black dark:text-zinc-50">Initiate Departure</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">Standardize the offboarding process for a respectful exit.</p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 space-y-6">
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden h-[600px] flex flex-col">
                        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Select Employee</CardTitle>
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input 
                                    placeholder="Search active staff..." 
                                    className="pl-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 overflow-y-auto">
                            {fetching ? (
                                <div className="p-10 text-center space-y-3">
                                    <Loader2 className="mx-auto animate-spin text-rose-600" />
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Synchronizing Staff...</p>
                                </div>
                            ) : filteredEmployees.length === 0 ? (
                                <div className="p-10 text-center text-zinc-500 italic text-sm">No active employees found.</div>
                            ) : (
                                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {filteredEmployees.map(emp => (
                                        <div 
                                            key={emp.id} 
                                            className={`flex items-center gap-3 p-4 cursor-pointer transition-all hover:bg-rose-50/50 dark:hover:bg-rose-950/20 ${selectedEmployee?.id === emp.id ? 'bg-rose-50 dark:bg-rose-900/10 border-l-4 border-rose-600' : 'border-l-4 border-transparent'}`}
                                            onClick={() => setSelectedEmployee(emp)}
                                        >
                                            <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-800">
                                                <AvatarImage src={emp.avatar} />
                                                <AvatarFallback>{emp.firstName[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="text-sm font-black truncate">{emp.firstName} {emp.lastName}</div>
                                                <div className="text-[10px] text-zinc-500 font-bold uppercase truncate">{emp.role}</div>
                                            </div>
                                            {selectedEmployee?.id === emp.id && <CheckCircle2 size={16} className="text-rose-600 shrink-0" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <UserMinus size={120} />
                        </div>
                        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-xl font-black tracking-tight">Departure Details</CardTitle>
                            <CardDescription>Finalize the logistics and timeline for this exit.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            {!selectedEmployee ? (
                                <div className="py-20 text-center space-y-4">
                                    <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                                        <UserMinus size={32} />
                                    </div>
                                    <p className="text-zinc-500 font-bold">Select an employee from the left to continue.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="font-black text-[10px] uppercase tracking-widest text-zinc-500">Resignation Date</Label>
                                            <Input 
                                                type="date" 
                                                value={formData.resignationDate}
                                                onChange={(e) => setFormData({...formData, resignationDate: e.target.value})}
                                                className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-black text-[10px] uppercase tracking-widest text-zinc-500">Last Working Day *</Label>
                                            <Input 
                                                type="date" 
                                                required
                                                value={formData.lastWorkingDay}
                                                onChange={(e) => setFormData({...formData, lastWorkingDay: e.target.value})}
                                                className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-rose-200 dark:border-rose-900/30 font-bold text-rose-600"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="font-black text-[10px] uppercase tracking-widest text-zinc-500">Departure Workflow Checklist</Label>
                                            <div className="flex items-center gap-2">
                                                <select 
                                                    className="h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-none px-2 font-bold text-[10px] outline-none"
                                                    value={selectedWorkflowId}
                                                    onChange={(e) => handleWorkflowChange(e.target.value)}
                                                >
                                                    {workflows.map(w => (
                                                        <option key={w.id} value={w.id}>{w.name}</option>
                                                    ))}
                                                </select>
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    className="text-[10px] font-black uppercase text-blue-600 h-8"
                                                    onClick={toggleAllTasks}
                                                >
                                                    {selectedTaskIds.length === workflowTasks.length ? "Deselect All" : "Select All"}
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2">
                                            {workflowTasks.length === 0 ? (
                                                <p className="text-xs text-zinc-500 italic p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl">No tasks defined for this workflow.</p>
                                            ) : workflowTasks.map((task) => (
                                                <div 
                                                    key={task.id} 
                                                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${selectedTaskIds.includes(task.id) ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm' : 'bg-transparent border-zinc-100 dark:border-zinc-900 opacity-60'}`}
                                                    onClick={(e) => handleTaskClick(e, task.id)}
                                                >
                                                    <Checkbox 
                                                        checked={selectedTaskIds.includes(task.id)}
                                                        onCheckedChange={() => toggleTask(task.id)}
                                                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-black tracking-tight">{task.title}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-none text-[9px] font-black tracking-tighter px-2">
                                                                {task.role}
                                                            </Badge>
                                                            <span className="text-[10px] text-zinc-400 font-medium truncate">{task.description}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="font-black text-[10px] uppercase tracking-widest text-zinc-500">Reason for Departure</Label>
                                        <Textarea 
                                            placeholder="e.g. Better Opportunity, Personal Reasons..."
                                            value={formData.reason}
                                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                            className="min-h-[120px] rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 resize-none p-4"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 p-6 bg-rose-50/30 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                                        <Checkbox 
                                            id="backfill" 
                                            checked={formData.needBackfill}
                                            onCheckedChange={(checked) => setFormData({...formData, needBackfill: !!checked})}
                                            className="h-5 w-5 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <label htmlFor="backfill" className="text-sm font-black tracking-tight cursor-pointer">
                                                Needs Immediate Backfill
                                            </label>
                                            <p className="text-[10px] text-rose-600/70 font-bold uppercase tracking-widest">
                                                Alert Recruitment Team
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button 
                                            type="submit" 
                                            disabled={loading}
                                            className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black px-8 h-16 shadow-2xl shadow-rose-600/30 text-lg group"
                                        >
                                            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserMinus className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />}
                                            Finalize Exit Strategy
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
