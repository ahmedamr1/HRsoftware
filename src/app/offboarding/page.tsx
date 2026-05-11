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
    // Simulate if user is "part of it" - Ahmed Amr (ID 4) is an active employee, so he's not currently offboarding
    const isPartOfOffboarding = isAdmin || false; 

    useEffect(() => {
        if (isAdmin) {
            fetchOffboardingInstances();
        }
    }, [isAdmin]);

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
            </div>

            <Tabs defaultValue={isAdmin ? "management" : "personal"} className="w-full">
                <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <TabsTrigger value="personal" className="rounded-lg px-6 font-bold">My Exit Path</TabsTrigger>
                    {isAdmin && <TabsTrigger value="management" className="rounded-lg px-6 font-bold">Management</TabsTrigger>}
                    <TabsTrigger value="assets" className="rounded-lg px-6 font-bold">Return Center</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6 space-y-6">
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
                    <TabsContent value="management" className="mt-6">
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
                                        <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Risk Level</TableHead>
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
                                            <TableRow key={item.id} className="group hover:bg-rose-50/30 dark:hover:bg-rose-900/10 border-zinc-200 dark:border-zinc-800 transition-colors">
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
                                                <TableCell className="text-xs">Resignation</TableCell>
                                                <TableCell className="w-48">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between text-[9px] font-black uppercase">
                                                            <span>{Math.round(progress)}%</span>
                                                            <span className="text-zinc-400">{completed}/{total} Tasks</span>
                                                        </div>
                                                        <Progress value={progress} className="h-1 bg-zinc-100 dark:bg-zinc-800" />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-[10px] text-zinc-500">
                                                    {new Date().toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-amber-500/10 text-amber-600 border-none text-[10px] font-bold">
                                                        Moderate
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
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
