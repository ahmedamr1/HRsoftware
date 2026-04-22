"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquare, Target, ArrowUpRight, TrendingUp, Award, Sparkles, Brain, Zap, Activity } from "lucide-react";
import { PerformanceModal } from "@/components/performance/PerformanceModal";
import { toast } from "sonner";

export default function PerformancePage() {
    const [selectedReview, setSelectedReview] = useState<any>(null);

    const reviews = [
        { id: "1", name: "Alex Rivera", role: "Frontend Dev", rating: 4.8, status: "Completed", date: "Jan 2024", aiSummary: "Exceptional architecture skills, potential for Tech Lead role." },
        { id: "2", name: "Samantha Lee", role: "Designer", rating: 4.9, status: "In Progress", date: "Feb 2024", aiSummary: "High visual fidelity, needs stronger documentation habits." },
        { id: "3", name: "Jordan Smith", role: "HR Manager", rating: 4.5, status: "Pending", date: "Feb 2024", aiSummary: "Strong people skills, focus on scaling recruitment workflows." },
    ];

    const handleAction = (msg: string) => {
        toast.info(msg);
    };

    const handleAISummary = (summary: string) => {
        toast.success(summary, {
            icon: <Brain className="h-4 w-4 text-blue-500" />,
            duration: 5000
        });
    };

    return (
        <div className="space-y-6 text-left">
            <PerformanceModal
                isOpen={!!selectedReview}
                onClose={() => setSelectedReview(null)}
                employeeName={selectedReview?.name || ""}
                role={selectedReview?.role || ""}
            />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Performance Intelligence</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">AI-driven growth tracking and strategic talent alignment.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 rounded-full" onClick={() => toast.info("AI harmonizing company culture feedback...")}>
                        <Activity size={14} className="mr-2" /> Culture Audit
                    </Button>
                    <Button
                        className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black shadow-xl"
                        onClick={() => handleAction("AI drafting Q2 objectives based on current trajectory...")}
                    >
                        <Zap className="mr-2 h-4 w-4" /> AI Goal Generator
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                        <Award size={120} />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-indigo-100">Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-black tracking-tighter">4.7</span>
                            <span className="text-indigo-200 font-bold mb-1">/ 5.0</span>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={14} fill={s <= 4 ? "white" : "none"} className={s <= 4 ? "text-white" : "text-indigo-400"} />
                            ))}
                        </div>
                        <p className="text-xs text-indigo-100 mt-4 leading-relaxed opacity-80 font-medium italic">"Exceptional performance across the engineering and design teams."</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold tracking-tight text-zinc-500 uppercase">Strategic Alignment</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end gap-2 text-3xl font-black text-black dark:text-zinc-50 tracking-tighter">
                            84%
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] mb-1">OPTIMAL</Badge>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-4 overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '84%' }} />
                        </div>
                        <p className="text-[10px] text-zinc-500 font-bold mt-2 uppercase tracking-widest">Team goals matching CEO vision</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold tracking-tight text-zinc-500 uppercase">Recognition Sentiment</CardTitle>
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-black dark:text-zinc-50 tracking-tighter">Positive</div>
                        <p className="text-xs text-zinc-500 font-medium mt-1 italic">"Collaborative and growth-oriented."</p>
                        <Button variant="ghost" className="text-[10px] p-0 h-auto font-black uppercase text-blue-600 dark:text-blue-400 mt-4 tracking-tighter" onClick={() => handleAction("Opening collective recognition audit...")}>
                            AI Sentiment Audit →
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 text-left">
                <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter">Evolving Talent</CardTitle>
                                <CardDescription>Reviews with AI match analysis.</CardDescription>
                            </div>
                            <Sparkles className="text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex flex-col p-4 border rounded-2xl border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:border-blue-500/30 transition-all cursor-pointer group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-900 shadow-sm transition-transform group-hover:scale-110">
                                            <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-xs font-bold">{review.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className="text-sm font-black text-black dark:text-zinc-50">{review.name}</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-[10px] text-zinc-500 uppercase font-medium tracking-widest">{review.role}</p>
                                                <Badge variant="outline" className="text-[8px] h-4 font-black border-blue-500/20 text-blue-500">AI SCORED</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right hidden sm:block">
                                            <div className="flex items-center gap-1 text-yellow-600 font-black text-sm justify-end">
                                                <Star size={12} fill="currentColor" />
                                                {review.rating}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 text-[9px] font-black uppercase"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAISummary(review.aiSummary);
                                            }}
                                        >
                                            <Brain size={12} className="mr-1" /> AI Explain
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black tracking-tighter">Impact Roadmap</CardTitle>
                                <CardDescription>Key initiatives with AI risk/reward modeling.</CardDescription>
                            </div>
                            <Target className="text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { goal: "Infrastructure Optimization", progress: 65, color: "blue", impact: "High" },
                            { goal: "AI Talent Screening Engine", progress: 100, color: "emerald", impact: "Critical" },
                            { goal: "Talent Mobility Program", progress: 40, color: "purple", impact: "Medium" },
                        ].map((g, i) => (
                            <div key={i} className="space-y-3 text-left">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{g.goal}</span>
                                        <Badge className={`text-[8px] font-black uppercase h-4 ${g.impact === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'} border-none`}>
                                            {g.impact} Impact
                                        </Badge>
                                    </div>
                                    <span className={`text-${g.color}-600 dark:text-${g.color}-400 font-black text-xs`}>{g.progress}%</span>
                                </div>
                                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className={`bg-${g.color}-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                                        style={{ width: `${g.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] py-6 shadow-xl" onClick={() => handleAction("Opening AI-modeled multi-year strategy...")}>
                            View Generative Roadmap
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
