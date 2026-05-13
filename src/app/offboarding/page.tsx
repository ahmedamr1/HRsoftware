"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MoreHorizontal, Sparkles, LogOut, Search, Filter, ShieldAlert, History, Laptop } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FinancialSettlement } from "@/components/offboarding/FinancialSettlement";
import { ChevronRight, FileText, UserMinus } from "lucide-react";
import Link from "next/link";

export default function OffboardingPage() {
    const { userRole } = useAuth();
    const isAdmin = userRole === "admin";
    
    const [tasks, setTasks] = useState([
        { id: 1, title: "Submit Formal Resignation", completed: true, category: "Legal" },
        { id: 2, title: "Asset Return (Laptop, Badge)", completed: false, category: "IT" },
        { id: 3, title: "Handover Documentation", completed: false, category: "Operations" },
        { id: 4, title: "Exit Interview", completed: false, category: "HR" },
        { id: 5, title: "Revoke System Access", completed: false, category: "IT" },
    ]);

    const [offboardingList, setOffboardingList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    
    // Simulate if user is "part of it" - Ahmed Amr (ID 4) is an active employee, so he's not currently offboarding
    const isPartOfOffboarding = isAdmin || false; 

    useEffect(() => {
        setMounted(true);
        if (isAdmin) {
            fetchOffboardingInstances();
        }
    }, [isAdmin]);

    if (!mounted) return null; // Prevent hydration mismatch

    const fetchOffboardingInstances = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/offboarding');
            if (res.ok) {
                const data = await res.json();
                setOffboardingList(data);
            }
        } catch (err) {
            console.error("Failed to fetch offboarding data:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(t => {
            if (t.id === id) {
                const newState = !t.completed;
                toast[newState ? 'success' : 'info'](`Task "${t.title}" marked as ${newState ? 'complete' : 'incomplete'}`);
                return { ...t, completed: newState };
            }
            return t;
        }));
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Offboarding Intelligence</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Respectful and secure departure workflows.</p>
                </div>
                {isAdmin && (
                    <Link href="/offboarding/new">
                        <Button 
                            className="bg-rose-600 hover:bg-rose-700 text-white rounded-full font-black px-6 shadow-lg shadow-rose-600/20"
                        >
                            <UserMinus className="mr-2 h-4 w-4" /> Start Offboarding
                        </Button>
                    </Link>
                )}
            </div>

            <Tabs defaultValue={isAdmin ? "management" : "personal"} className="w-full">
                <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <TabsTrigger value="personal" className="rounded-lg px-6 font-bold">My Exit Path</TabsTrigger>
                    {isAdmin && <TabsTrigger value="management" className="rounded-lg px-6 font-bold">Management</TabsTrigger>}
                    <TabsTrigger value="assets" className="rounded-lg px-6 font-bold">Return Center</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6 space-y-6">
                    {/* ... personal content same as before ... */}
                    {isPartOfOffboarding ? (
                        <div className="grid gap-6 md:grid-cols-4">
                            <Card className="md:col-span-3 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-rose-600" />
                                <CardHeader className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-black">Departure Checklist</CardTitle>
                                            <CardDescription>Final steps for a smooth transition.</CardDescription>
                                        </div>
                                        <Badge className="bg-rose-600/10 text-rose-600 border-none px-4 py-1 font-bold">
                                            {completedCount}/{tasks.length} Completed
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        {tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="flex items-center justify-between p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group"
                                                onClick={() => toggleTask(task.id)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {task.completed ? (
                                                        <div className="h-6 w-6 rounded-full bg-rose-500/10 flex items-center justify-center">
                                                            <CheckCircle2 className="h-4 w-4 text-rose-500" />
                                                        </div>
                                                    ) : (
                                                        <div className="h-6 w-6 rounded-full border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-rose-500 transition-colors" />
                                                    )}
                                                    <div>
                                                        <p className={`text-sm font-bold ${task.completed ? 'text-zinc-400 line-through' : 'text-black dark:text-zinc-50'}`}>
                                                            {task.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                                                                {task.category}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="md:col-span-1 space-y-6">
                                <Card className="bg-gradient-to-br from-rose-600/10 to-orange-600/10 border-rose-500/20 shadow-xl overflow-hidden group">
                                    <CardHeader className="p-4 border-b border-rose-500/10">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xs font-black uppercase tracking-widest text-rose-600">Security Alert</CardTitle>
                                            <ShieldAlert className="h-3 w-3 text-rose-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 text-center">
                                        <p className="text-[10px] text-rose-600 font-bold mb-4">"Ensure all company data is migrated to shared drives by your last day."</p>
                                        <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                                            Data Handover Complete
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-zinc-950 text-white shadow-2xl overflow-hidden">
                                    <CardHeader className="p-4">
                                        <div className="flex items-center gap-2">
                                            <History size={16} className="text-blue-500" />
                                            <CardTitle className="text-xs font-black uppercase tracking-tighter">Exit Interview AI</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-[10px] text-zinc-400 mb-4">Share your feedback to help us improve.</p>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black" onClick={() => toast.success("AI Exit Interview session started.")}>
                                            Start Session
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <Card className="bg-zinc-50/50 dark:bg-zinc-950/50 border-dashed border-2 border-zinc-200 dark:border-zinc-800 p-20 text-center">
                            <div className="max-w-md mx-auto space-y-4">
                                <LogOut size={48} className="mx-auto text-zinc-400" />
                                <h3 className="text-2xl font-black tracking-tighter">Active Employment</h3>
                                <p className="text-sm text-zinc-500">You do not have any active offboarding requests. We're glad you're here!</p>
                            </div>
                        </Card>
                    )}
                </TabsContent>

                {isAdmin && (
                    <TabsContent value="management" className="mt-6 space-y-6">
                        {selectedRecord ? (
                            <div className="space-y-6">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setSelectedRecord(null)}
                                    className="mb-2 font-bold text-zinc-500"
                                >
                                    <ChevronRight className="rotate-180 mr-2 h-4 w-4" /> Back to List
                                </Button>

                                <div className="grid gap-6 md:grid-cols-3">
                                    <Card className="md:col-span-2 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800">
                                        <CardHeader>
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-16 w-16 border-4 border-white dark:border-zinc-800 shadow-xl">
                                                    <AvatarImage src={selectedRecord.employee.avatar} />
                                                    <AvatarFallback>{selectedRecord.employee.firstName[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-3xl font-black tracking-tighter">
                                                        {selectedRecord.employee.firstName} {selectedRecord.employee.lastName}
                                                    </CardTitle>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-none font-bold text-[10px]">
                                                            {selectedRecord.employee.role}
                                                        </Badge>
                                                        <Badge className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 border-none font-bold text-[10px]">
                                                            Last Day: {new Date(selectedRecord.offboardingRecord?.lastWorkingDay).toLocaleDateString()}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                                    <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Reason</p>
                                                    <p className="text-sm font-bold">{selectedRecord.offboardingRecord?.reason || "N/A"}</p>
                                                </div>
                                                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                                    <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Backfill Required</p>
                                                    <p className="text-sm font-bold">{selectedRecord.offboardingRecord?.needBackfill ? "Yes" : "No"}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Legal & Documents</h4>
                                                <div className="grid gap-2">
                                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 group hover:border-blue-500 transition-colors cursor-pointer">
                                                        <div className="flex items-center gap-3">
                                                            <FileText size={16} className="text-zinc-400 group-hover:text-blue-500" />
                                                            <span className="text-sm font-bold">Resignation Letter</span>
                                                        </div>
                                                        <Badge variant="outline" className="text-[9px] font-black text-zinc-400">PENDING</Badge>
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 group hover:border-blue-500 transition-colors cursor-pointer">
                                                        <div className="flex items-center gap-3">
                                                            <FileText size={16} className="text-zinc-400 group-hover:text-blue-500" />
                                                            <span className="text-sm font-bold">Experience Certificate</span>
                                                        </div>
                                                        <Badge variant="outline" className="text-[9px] font-black text-emerald-500 border-emerald-500/20 bg-emerald-500/5">READY</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="space-y-6">
                                        <Card className="bg-zinc-950 text-white border-none shadow-2xl">
                                            <CardHeader>
                                                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Task Momentum</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between text-xs font-bold">
                                                        <span>Progress</span>
                                                        <span>{Math.round((selectedRecord.tasks.filter((t: any) => t.isCompleted).length / selectedRecord.tasks.length) * 100)}%</span>
                                                    </div>
                                                    <Progress value={(selectedRecord.tasks.filter((t: any) => t.isCompleted).length / selectedRecord.tasks.length) * 100} className="h-1 bg-zinc-800" />
                                                    <div className="pt-4 space-y-2">
                                                        {selectedRecord.tasks.map((task: any) => (
                                                            <div key={task.id} className="flex items-center gap-3 text-xs">
                                                                <div className={`h-2 w-2 rounded-full ${task.isCompleted ? 'bg-emerald-500' : 'bg-zinc-700'}`} />
                                                                <span className={task.isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-300 font-medium'}>{task.title}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                <FinancialSettlement 
                                    record={selectedRecord} 
                                    onUpdate={(updated) => {
                                        setSelectedRecord({...selectedRecord, offboardingRecord: updated});
                                        fetchOffboardingInstances();
                                    }} 
                                />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative flex-1 max-w-sm">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <Input placeholder="Search departures..." className="pl-9 bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800" />
                                    </div>
                                    <Button variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-800">
                                        <Filter size={14} className="mr-2" /> Risk Audit
                                    </Button>
                                </div>

                                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                                    <Table>
                                        <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                                            <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Employee</TableHead>
                                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Reason</TableHead>
                                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Progress</TableHead>
                                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Last Day</TableHead>
                                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Settlement</TableHead>
                                                <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {loading ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-10 text-zinc-500 italic">Auditing departure security...</TableCell>
                                                </TableRow>
                                            ) : offboardingList.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-10 text-zinc-500">No active offboarding processes.</TableCell>
                                                </TableRow>
                                            ) : offboardingList.map((item) => {
                                                const completed = item.tasks.filter((t: any) => t.isCompleted).length;
                                                const total = item.tasks.length;
                                                const progress = total > 0 ? (completed / total) * 100 : 0;
                                                
                                                return (
                                                    <TableRow 
                                                        key={item.id} 
                                                        className="group hover:bg-rose-50/30 dark:hover:bg-rose-900/10 border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
                                                        onClick={() => setSelectedRecord(item)}
                                                    >
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={item.employee.avatar} />
                                                                    <AvatarFallback>{item.employee.firstName[0]}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="text-sm font-bold">{item.employee.firstName} {item.employee.lastName}</div>
                                                                    <div className="text-[10px] text-zinc-500">{item.employee.email}</div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-xs font-medium">
                                                            {item.offboardingRecord?.reason || "Resignation"}
                                                        </TableCell>
                                                        <TableCell className="w-48">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-between text-[9px] font-black uppercase">
                                                                    <span>{Math.round(progress)}%</span>
                                                                    <span className="text-zinc-400">{completed}/{total} Tasks</span>
                                                                </div>
                                                                <Progress value={progress} className="h-1 bg-zinc-100 dark:bg-zinc-800" />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-[10px] font-bold text-zinc-500">
                                                            {item.offboardingRecord?.lastWorkingDay ? new Date(item.offboardingRecord.lastWorkingDay).toLocaleDateString() : "TBD"}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge className={item.offboardingRecord?.totalSettlement ? "bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-bold" : "bg-zinc-500/10 text-zinc-500 border-none text-[10px] font-bold"}>
                                                                {item.offboardingRecord?.totalSettlement ? `$${item.offboardingRecord.totalSettlement.toLocaleString()}` : "PENDING"}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <ChevronRight className="h-4 w-4" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </>
                        )}
                    </TabsContent>
                )}

                <TabsContent value="assets" className="mt-6">
                    <Card className="bg-zinc-50/50 dark:bg-zinc-950/50 border-dashed border-2 border-zinc-200 dark:border-zinc-800 p-12 text-center">
                        <div className="max-w-md mx-auto space-y-4">
                            <Laptop size={48} className="mx-auto text-zinc-400" />
                            <h3 className="text-lg font-black tracking-tighter">Equipment Return Portal</h3>
                            <p className="text-sm text-zinc-500">Please schedule a courier or drop off your equipment at the main office by your final day.</p>
                            <Button className="bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-xs px-8 h-12">
                                Schedule Pickup
                            </Button>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
