"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart3, TrendingUp, Clock, DollarSign,
    ArrowLeft, Brain, Sparkles, Zap, Activity,
    Calendar, Users, Briefcase, Filter
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
    const metrics = [
        { title: "Avg. Time to Fill", value: "18 Days", change: "-4 days", icon: Clock, color: "blue", ai: "Optimizing" },
        { title: "Cost per Hire", value: "$2,450", change: "-12%", icon: DollarSign, color: "emerald", ai: "Predictive" },
        { title: "Offer Accept Rate", value: "88%", change: "+5%", icon: TrendingUp, color: "purple", ai: "High" },
        { title: "Diversity Index", value: "0.74", change: "+0.02", icon: Users, color: "orange", ai: "Target" },
    ];

    return (
        <div className="space-y-6 text-left pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/recruitment">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50 flex items-center gap-3">
                            Hiring Intelligence
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] uppercase font-black px-2 mt-1">Strategic</Badge>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Predictive forecasting and deep-funnel recruitment metrics.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 font-bold text-xs">
                        <Filter className="mr-2 h-3 w-3" /> Custom Range
                    </Button>
                    <Button className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black font-black uppercase tracking-widest text-[10px] px-6">
                        Export AI Report
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((m, i) => (
                    <Card key={i} className="group border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-lg relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                            <m.icon size={64} />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{m.title}</CardTitle>
                                <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-black">{m.ai}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-black dark:text-zinc-50 tracking-tighter">{m.value}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs font-bold ${m.change.startsWith('+') || m.title.includes('Time') ? (m.title.includes('Time') ? 'text-emerald-500' : 'text-emerald-500') : 'text-emerald-500'}`}>
                                    {m.change}
                                </span>
                                <span className="text-[10px] text-zinc-400 font-medium">vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Time to Fill Projections */}
                <Card className="lg:col-span-2 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toast.info("Refreshing AI modeling...")}><Activity size={12} /></Button>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                            <Brain className="text-blue-500" size={18} /> Time-to-Fill Projections
                        </CardTitle>
                        <CardDescription>AI modeling based on current hiring velocity and market demand.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex items-end gap-2 px-6 pb-6 mt-4">
                        {[40, 55, 30, 80, 45, 90, 60, 100, 75, 40].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className={`w-full rounded-t-xl transition-all duration-700 relative overflow-hidden ${i === 7 ? 'bg-gradient-to-t from-blue-600 to-indigo-400 shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'}`}
                                    style={{ height: `${h}%` }}
                                >
                                    {i === 7 && <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />}
                                </div>
                                <span className="text-[9px] font-black text-zinc-400">J{i + 1}</span>
                            </div>
                        ))}
                    </CardContent>
                    <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">"AI predicts a 14% decrease in hiring time for Q2 due to new outreach automation."</p>
                        <Button variant="ghost" className="text-[10px] font-black text-blue-600 uppercase tracking-tighter h-8" onClick={() => toast.success("Opening granular trend analysis...")}>Detailed Trends →</Button>
                    </div>
                </Card>

                {/* Sourcing Channel Efficiency */}
                <Card className="lg:col-span-1 bg-zinc-950 dark:bg-white text-white dark:text-black shadow-2xl border-none">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Source Efficiency</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { label: "LinkedIn", val: 82, color: "blue" },
                            { label: "Internal Referrals", val: 95, color: "emerald" },
                            { label: "External Agencies", val: 45, color: "rose" },
                            { label: "Direct Apply", val: 68, color: "purple" },
                        ].map((s, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-tighter">
                                    <span>{s.label}</span>
                                    <span className={`text-${s.color}-400 dark:text-${s.color}-600`}>{s.val}% Quality</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-800 dark:bg-zinc-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${s.val}%` }}
                                        className={`h-full bg-${s.color}-500`}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-zinc-800 dark:border-zinc-200">
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/50 dark:bg-zinc-50/50 border border-zinc-800 dark:border-zinc-200">
                                <Sparkles className="text-blue-500" size={16} />
                                <p className="text-[10px] leading-tight font-medium text-zinc-400 dark:text-zinc-500 italic">"Internal Referrals have the highest retention rate (92%) over 24 months."</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
