"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, FileText, Upload, Plus, MoreHorizontal, Sparkles, Users, MessageSquare, Brain, Zap, Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
    const { userRole } = useAuth();
    const isAdmin = userRole === "admin" || userRole === "manager";
    
    const [tasks, setTasks] = useState([
        { id: 1, title: "Sign Employment Contract", completed: true, category: "Legal" },
        { id: 2, title: "Submit Identity Documents", completed: true, category: "Compliance" },
        { id: 3, title: "Setup Workstation & Email", completed: false, category: "IT" },
        { id: 4, title: "Complete Safety Training", completed: false, category: "Compliance" },
        { id: 5, title: "Meet the Team", completed: false, category: "Social" },
    ]);

    const [onboardingList, setOnboardingList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    // Simulate if user is "part of it" - Ahmed Amr (ID 4) joined in 2022, so he's not currently onboarding
    const isPartOfOnboarding = isAdmin || false; 

    useEffect(() => {
        if (isAdmin) {
            fetchOnboardingInstances();
        }
    }, [isAdmin]);

    const fetchOnboardingInstances = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/onboarding');
            if (res.ok) {
                const data = await res.json();
                setOnboardingList(data);
            }
        } catch (err) {
            console.error("Failed to fetch onboarding data:", err);
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

    const handleAction = (msg: string) => {
        toast.success(msg, { icon: <Sparkles className="h-4 w-4 text-blue-500" /> });
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progressValue = (completedCount / tasks.length) * 100;

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Onboarding</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Next-gen transition experience for new talent.</p>
                </div>
                {isAdmin && (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6" onClick={() => toast.info("New onboarding workflow creator opened.")}>
                        <Plus size={16} className="mr-2" /> New Workflow
                    </Button>
                )}
            </div>

            <Tabs defaultValue={isAdmin ? "management" : "personal"} className="w-full">
                <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <TabsTrigger value="personal" className="rounded-lg px-6 font-bold">My Onboarding</TabsTrigger>
                    {isAdmin && <TabsTrigger value="management" className="rounded-lg px-6 font-bold">Management</TabsTrigger>}
                    <TabsTrigger value="documents" className="rounded-lg px-6 font-bold">Document Vault</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6 space-y-6">
                    {isPartOfOnboarding ? (
                        <div className="grid gap-6 md:grid-cols-4">
                            <Card className="md:col-span-3 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                                <CardHeader className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl font-black">Pre-boarding Checklist</CardTitle>
                                            <CardDescription>Your personalized path to productivity.</CardDescription>
                                        </div>
                                        <Badge className="bg-blue-600/10 text-blue-600 border-none px-4 py-1 font-bold">
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
                                                        <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                        </div>
                                                    ) : (
                                                        <div className="h-6 w-6 rounded-full border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500 transition-colors" />
                                                    )}
                                                    <div>
                                                        <p className={`text-sm font-bold ${task.completed ? 'text-zinc-400 line-through' : 'text-black dark:text-zinc-50'}`}>
                                                            {task.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                                                                {task.category}
                                                            </Badge>
                                                            {!task.completed && <Badge className="text-[8px] bg-blue-500/10 text-blue-600 border-none h-4 font-black">AI PRIORITY</Badge>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-all">
                                                    <Plus size={14} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="md:col-span-1 space-y-6">
                                <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-500/20 shadow-xl overflow-hidden group">
                                    <CardHeader className="p-4 border-b border-blue-500/10">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-600">AI Buddy Match</CardTitle>
                                            <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 text-center">
                                        <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-white shadow-lg ring-4 ring-blue-500/10 group-hover:scale-110 transition-transform">
                                            <AvatarFallback className="bg-blue-600 text-white font-black">JD</AvatarFallback>
                                        </Avatar>
                                        <h4 className="text-sm font-black text-black dark:text-zinc-50">Jessica Day</h4>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter mb-4">Senior UX Designer • 3 Years</p>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest shadow-lg" onClick={() => handleAction("Introduction sent!")}>
                                            Say Hello
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-zinc-950 text-white shadow-2xl overflow-hidden">
                                    <CardHeader className="p-4">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare size={16} className="text-blue-500" />
                                            <CardTitle className="text-xs font-black uppercase tracking-tighter">Onboarding AI</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-[10px] text-zinc-400 mb-4">Ask about benefits or security.</p>
                                        <div className="relative">
                                            <input
                                                placeholder="When is payday?"
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-3 text-[10px] outline-none"
                                            />
                                            <Button size="icon" className="h-6 w-6 absolute right-1 top-1 bg-blue-600" onClick={() => handleAction("The 25th of every month.")}>
                                                <Zap size={12} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <Card className="bg-zinc-50/50 dark:bg-zinc-950/50 border-dashed border-2 border-zinc-200 dark:border-zinc-800 p-20 text-center">
                            <div className="max-w-md mx-auto space-y-4">
                                <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
                                <h3 className="text-2xl font-black tracking-tighter">You're all caught up!</h3>
                                <p className="text-sm text-zinc-500">You don't have any active onboarding tasks at the moment. Welcome to the team!</p>
                            </div>
                        </Card>
                    )}
                </TabsContent>

                {isAdmin && (
                    <TabsContent value="management" className="mt-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                <Input placeholder="Filter by name or department..." className="pl-9 bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <Button variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-800">
                                <Filter size={14} className="mr-2" /> Status
                            </Button>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                            <Table>
                                <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                        <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Employee</TableHead>
                                        <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Department</TableHead>
                                        <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Progress</TableHead>
                                        <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Started</TableHead>
                                        <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Status</TableHead>
                                        <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-10 text-zinc-500 italic">Compiling onboarding intelligence...</TableCell>
                                        </TableRow>
                                    ) : onboardingList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-10 text-zinc-500">No active onboarding processes detected.</TableCell>
                                        </TableRow>
                                    ) : onboardingList.map((item) => {
                                        const completed = item.tasks.filter((t: any) => t.isCompleted).length;
                                        const total = item.tasks.length;
                                        const progress = total > 0 ? (completed / total) * 100 : 0;
                                        
                                        return (
                                            <TableRow key={item.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-zinc-200 dark:border-zinc-800 transition-colors">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={item.employee.avatar || undefined} />
                                                            <AvatarFallback>{item.employee.firstName[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm font-bold">{item.employee.firstName} {item.employee.lastName}</div>
                                                            <div className="text-[10px] text-zinc-500">{item.employee.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-xs">{item.employee.department}</TableCell>
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
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-bold">
                                                        {item.status}
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

                <TabsContent value="documents" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                            <CardHeader>
                                <CardTitle className="font-bold flex items-center gap-2">
                                    ID Validation
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] h-4">REAL-TIME AI SCAN</Badge>
                                </CardTitle>
                                <CardDescription>Drop a scan of your Passport or National ID.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FileUpload
                                    label="Drop identity docs here"
                                    onUpload={() => toast.success("Verification complete!")}
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                            <CardHeader>
                                <CardTitle className="font-bold">Generative Contracts</CardTitle>
                                <CardDescription>Smart legal documents with e-signature.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button variant="outline" className="w-full border-dashed border-2 hover:border-blue-500 py-8">
                                    <Plus size={20} className="text-zinc-400 mr-2" /> Upload More
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
