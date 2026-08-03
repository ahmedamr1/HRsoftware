"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Search, UserMinus, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface OffboardingFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    employee?: any; // If starting from a specific employee profile
}

export function OffboardingForm({ isOpen, onClose, onSuccess, employee: initialEmployee }: OffboardingFormProps) {
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(initialEmployee || null);
    
    const [formData, setFormData] = useState({
        resignationDate: new Date().toISOString().split('T')[0],
        lastWorkingDay: "",
        reason: "",
        needBackfill: false,
        handoverToId: "",
    });

    const [workflows, setWorkflows] = useState<any[]>([]);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchWorkflows();
            fetchAllEmployees();
        }
    }, [isOpen]);

    const fetchWorkflows = async () => {
        try {
            const res = await fetch('/api/workflows?type=OFFBOARDING');
            if (res.ok) {
                const data = await res.json();
                setWorkflows(data);
                if (data.length > 0) setSelectedWorkflowId(data[0].id);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAllEmployees = async () => {
        setSearching(true);
        try {
            const res = await fetch('/api/employees');
            if (res.ok) {
                const data = await res.json();
                // Show all active employees initially
                setEmployees(data.filter((e: any) => e.status === 'Active'));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    const searchEmployees = async (query: string) => {
        if (query.length === 0) {
            fetchAllEmployees();
            return;
        }
        if (query.length < 2) return;
        setSearching(true);
        try {
            const res = await fetch(`/api/employees?search=${query}`);
            if (res.ok) {
                const data = await res.json();
                // Filter for Active or those currently not Terminated/Offboarding
                setEmployees(data.filter((e: any) => e.status === 'Active'));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmployee || !selectedWorkflowId || !formData.lastWorkingDay) {
            toast.error("Please fill in all required fields.");
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
                    ...formData
                })
            });

            if (res.ok) {
                toast.success(`Offboarding initiated for ${selectedEmployee.firstName}`);
                onSuccess();
                onClose();
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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black tracking-tighter flex items-center gap-2">
                        <UserMinus className="text-rose-600" /> Initiate Offboarding
                    </DialogTitle>
                    <DialogDescription className="font-medium">
                        Standardize the departure process with security and respect.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {!initialEmployee && !selectedEmployee ? (
                        <div className="space-y-2">
                            <Label className="font-bold text-xs uppercase tracking-widest opacity-70">Search Employee</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input 
                                    placeholder="Name or email..." 
                                    className="pl-9 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        searchEmployees(e.target.value);
                                    }}
                                />
                            </div>
                            {searching && <div className="text-[10px] text-zinc-500 italic px-2">Searching intelligence...</div>}
                            <div className="max-h-40 overflow-y-auto space-y-1 mt-2">
                                {employees.map(emp => (
                                    <div 
                                        key={emp.id} 
                                        className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                                        onClick={() => setSelectedEmployee(emp)}
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={emp.avatar || undefined} />
                                            <AvatarFallback>{emp.firstName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-sm font-bold">{emp.firstName} {emp.lastName}</div>
                                            <div className="text-[10px] text-zinc-500">{emp.role} • {emp.department}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border-2 border-white dark:border-zinc-800 shadow-sm">
                                    <AvatarImage src={selectedEmployee.avatar || undefined} />
                                    <AvatarFallback>{selectedEmployee.firstName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-lg font-black tracking-tight">{selectedEmployee.firstName} {selectedEmployee.lastName}</div>
                                    <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{selectedEmployee.role}</div>
                                </div>
                            </div>
                            {!initialEmployee && (
                                <Button variant="ghost" size="sm" onClick={() => setSelectedEmployee(null)} className="text-rose-600 hover:text-rose-700 hover:bg-rose-100/50">Change</Button>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-xs uppercase tracking-widest opacity-70">Resignation Date</Label>
                            <Input 
                                type="date" 
                                value={formData.resignationDate}
                                onChange={(e) => setFormData({...formData, resignationDate: e.target.value})}
                                className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-xs uppercase tracking-widest opacity-70">Last Working Day *</Label>
                            <Input 
                                type="date" 
                                required
                                value={formData.lastWorkingDay}
                                onChange={(e) => setFormData({...formData, lastWorkingDay: e.target.value})}
                                className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-rose-200 dark:border-rose-900/30 font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase tracking-widest opacity-70">Departure Workflow</Label>
                        <select 
                            className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 px-3 font-bold text-sm outline-none focus:ring-2 focus:ring-rose-500/20"
                            value={selectedWorkflowId}
                            onChange={(e) => setSelectedWorkflowId(e.target.value)}
                        >
                            {workflows.map(w => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-bold text-xs uppercase tracking-widest opacity-70">Reason for Departure</Label>
                        <Textarea 
                            placeholder="e.g. Better Opportunity, Personal Reasons..."
                            value={formData.reason}
                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                            className="min-h-[80px] rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 resize-none"
                        />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <Checkbox 
                            id="backfill" 
                            checked={formData.needBackfill}
                            onCheckedChange={(checked) => setFormData({...formData, needBackfill: !!checked})}
                            className="data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label htmlFor="backfill" className="text-sm font-black tracking-tight cursor-pointer">
                                Needs Immediate Backfill
                            </label>
                            <p className="text-[10px] text-zinc-500 font-medium">
                                Mark this if recruitment needs to start immediately.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={onClose} className="rounded-xl font-bold">Cancel</Button>
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black px-8 h-12 shadow-lg shadow-rose-600/20"
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserMinus className="mr-2 h-4 w-4" />}
                            Start Exit Workflow
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
