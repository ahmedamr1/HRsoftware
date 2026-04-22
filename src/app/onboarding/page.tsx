"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Clock, FileText, Upload, Plus, MoreHorizontal, Sparkles, Users, MessageSquare, Brain, Zap } from "lucide-react";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OnboardingPage() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Sign Employment Contract", completed: true, category: "Legal" },
        { id: 2, title: "Submit Identity Documents", completed: true, category: "Compliance" },
        { id: 3, title: "Setup Workstation & Email", completed: false, category: "IT" },
        { id: 4, title: "Complete Safety Training", completed: false, category: "Compliance" },
        { id: 5, title: "Meet the Team", completed: false, category: "Social" },
    ]);

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
    const progress = (completedCount / tasks.length) * 100;

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Onboarding Intelligence</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Personalized transition powered by AI-Native guidance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-full border-blue-500/20 text-blue-600 font-bold" onClick={() => handleAction("AI Assistant is indexing your signed documents...")}>
                        <Brain size={14} className="mr-2" /> Policy Assistant
                    </Button>
                    <Badge className="bg-blue-600/10 text-blue-600 border-none px-4 py-1 font-bold">
                        {completedCount}/{tasks.length} {Math.round(progress)}% Progress
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="md:col-span-3 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                    <CardHeader className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black">Pre-boarding Checklist</CardTitle>
                                <CardDescription>Personalized path to productivity.</CardDescription>
                            </div>
                            <Badge variant="outline" className="text-[10px] font-black tracking-widest bg-zinc-50 dark:bg-zinc-900 border-none uppercase">Week 1 Focus</Badge>
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
                    {/* AI Buddy Match */}
                    <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-500/20 dark:border-blue-500/10 shadow-xl overflow-hidden group">
                        <CardHeader className="p-4 border-b border-blue-500/10">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-600">AI Buddy Match</CardTitle>
                                <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-white dark:border-zinc-800 shadow-lg ring-4 ring-blue-500/10 group-hover:scale-110 transition-transform">
                                <AvatarFallback className="bg-blue-600 text-white font-black">JD</AvatarFallback>
                            </Avatar>
                            <h4 className="text-sm font-black text-black dark:text-zinc-50">Jessica Day</h4>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter mb-4">Senior UX Designer • 3 Years</p>
                            <div className="p-2 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-blue-500/10 mb-4">
                                <p className="text-[9px] text-blue-600 dark:text-blue-400 leading-tight italic font-medium">"Jessica was matched based on your mutual expertise in Design Systems."</p>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest shadow-lg" onClick={() => handleAction("Introduction sent! Jessica will reach out shortly.")}>
                                Say Hello
                            </Button>
                        </CardContent>
                    </Card>

                    {/* AI Knowledge Assistant */}
                    <Card className="bg-zinc-950 dark:bg-white text-white dark:text-black shadow-2xl overflow-hidden relative">
                        <CardHeader className="p-4">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={16} className="text-blue-500" />
                                <CardTitle className="text-xs font-black uppercase tracking-tighter">AI Assistant</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mb-4 font-bold">Ask me anything about company benefits, holidays, or security.</p>
                            <div className="relative">
                                <input
                                    placeholder="When is payday?"
                                    className="w-full bg-zinc-900 dark:bg-zinc-100 border border-zinc-800 dark:border-zinc-200 rounded-lg py-2 px-3 text-[10px] outline-none"
                                />
                                <Button size="icon" className="h-6 w-6 absolute right-1 top-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleAction("According to the Payroll Policy, team members are paid on the 25th of every month.")}>
                                    <Zap size={12} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Tabs defaultValue="documents" className="w-full">
                <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-md p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <TabsTrigger value="documents" className="rounded-lg px-6 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm">
                        Verification Vault
                    </TabsTrigger>
                    <TabsTrigger value="benefits" className="rounded-lg px-6 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm">
                        Benefit Modeling
                    </TabsTrigger>
                </TabsList>

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
                                    onUpload={() => toast.success("AI scanning document... Verification complete! Authentic ID detected.")}
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                            <CardHeader>
                                <CardTitle className="font-bold">Generative Contracts</CardTitle>
                                <CardDescription>Smart legal documents with e-signature.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { name: "Employment_Contract.pdf", size: "2.4 MB", status: "Verified" },
                                    { name: "NDA_Signed.pdf", size: "1.1 MB", status: "Pending" },
                                ].map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:border-blue-500/50 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700">
                                                <FileText className="h-4 w-4 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-black dark:text-zinc-50">{doc.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[10px] text-zinc-500">{doc.size} • {doc.status}</p>
                                                    {doc.status === 'Pending' && <Badge className="bg-amber-500/10 text-amber-600 border-none text-[8px] h-3 uppercase font-black">AI AUDIT NEEDED</Badge>}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant={doc.status === 'Verified' ? 'success' : 'secondary'} className="text-[10px] uppercase font-black tracking-widest border-none">
                                            {doc.status}
                                        </Badge>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full border-dashed border-2 hover:border-blue-500 hover:text-blue-500 transition-all group py-8">
                                    <div className="flex flex-col items-center gap-2">
                                        <Plus size={20} className="text-zinc-400 group-hover:text-blue-500" />
                                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-blue-500">Upload More</span>
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="benefits" className="mt-6">
                    <Card className="bg-blue-600/5 border-blue-500/20 p-8 text-center">
                        <Brain size={40} className="mx-auto text-blue-600 mb-4" />
                        <h3 className="text-xl font-black tracking-tighter mb-2">Benefit Modeling Engine</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto italic">"AI is analyzing your profile to simulate the best healthcare and pension plans based on your demographic data."</p>
                        <Button className="bg-blue-600 text-white font-black uppercase tracking-widest text-xs px-8 h-12">Run AI Simulation</Button>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
