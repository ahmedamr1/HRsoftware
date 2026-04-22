"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Brain, Target, Users, ArrowLeft, Sparkles,
    Zap, Activity, CheckCircle2, Star,
    TrendingUp, ShieldCheck, Microscope
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AssessmentsPage() {
    const skillsMapping = [
        { skill: "React / Next.js", existingTeam: 85, target: 95, status: "Critical Gap" },
        { skill: "System Design", existingTeam: 70, target: 80, status: "Moderate" },
        { skill: "AI Model Tuning", existingTeam: 20, target: 75, status: "Urgent Need" },
        { skill: "UI / UX Polish", existingTeam: 90, target: 90, status: "Maintained" },
    ];

    const candidates = [
        { name: "Emma Wilson", score: 94, fit: "Perfect", skills: ["React", "UI/UX", "Next.js"], synergy: "High" },
        { name: "Leo Das", score: 72, fit: "Growth", skills: ["JavaScript", "HTML/CSS"], synergy: "Moderate" },
        { name: "Maria Garcia", score: 89, fit: "Strategic", skills: ["Node.js", "PostgreSQL", "System-Design"], synergy: "Critical Match" },
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
                            Assessment Center
                            <Badge className="bg-blue-500/10 text-blue-600 border-none text-[10px] uppercase font-black px-2 mt-1">Intelligence</Badge>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Team gap analysis and candidate competency mapping.</p>
                    </div>
                </div>
                <Button className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black font-black uppercase tracking-widest text-[10px] px-6 h-12 shadow-xl">
                    <Microscope className="mr-2 h-4 w-4" /> Run Team Audit
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Team Gap Analysis */}
                <Card className="lg:col-span-1 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                    <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                        <CardTitle className="text-sm font-black uppercase tracking-tighter">Team Skill Gaps</CardTitle>
                        <CardDescription className="text-[10px]">Current vs. Desired competency levels.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        {skillsMapping.map((s, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-black text-black dark:text-zinc-50 uppercase tracking-tighter">{s.skill}</span>
                                    <Badge variant={s.status === 'Urgent Need' ? 'destructive' : 'outline'} className="text-[8px] font-black uppercase border-none">
                                        {s.status}
                                    </Badge>
                                </div>
                                <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                                    <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${s.existingTeam}%` }} />
                                    <div className="absolute top-0 h-full border-r-2 border-blue-600/50 border-dashed" style={{ left: `${s.target}%` }} />
                                </div>
                                <div className="flex justify-between text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                                    <span>Current: {s.existingTeam}%</span>
                                    <span>Target: {s.target}%</span>
                                </div>
                            </div>
                        ))}
                        <div className="p-3 rounded-xl bg-blue-600/5 border border-blue-500/10 flex items-start gap-3">
                            <Brain className="text-blue-600 shrink-0 mt-0.5" size={14} />
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-tight italic font-medium">
                                "Prioritizing candidates with **AI Model Tuning** expertise will bridge the largest gap in your engineering department."
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Candidate Fit Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-2xl p-4 flex flex-col justify-between group">
                            <div className="flex items-center justify-between mb-4">
                                <Users size={20} className="text-blue-100" />
                                <Badge className="bg-white/20 text-white border-none text-[8px] font-black uppercase">Active Analysis</Badge>
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-blue-100 mb-1">Synergy Match</h4>
                                <div className="text-3xl font-black tracking-tighter">92%</div>
                                <p className="text-[10px] text-blue-200 mt-2 font-medium">Optimal team blend achieved across open roles.</p>
                            </div>
                        </Card>
                        <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl p-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <Zap size={20} className="text-amber-500" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Audit Velocity</h4>
                                <div className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">High</div>
                                <p className="text-[10px] text-zinc-400 mt-2 font-medium italic">Scanning 45+ attributes per second.</p>
                            </div>
                        </Card>
                        <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl p-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <ShieldCheck size={20} className="text-emerald-500" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Verification Status</h4>
                                <div className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">100%</div>
                                <p className="text-[10px] text-zinc-400 mt-2 font-medium">AI-validated skill credentials active.</p>
                            </div>
                        </Card>
                    </div>

                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-black uppercase tracking-tighter">Candidate Competency Mapping</CardTitle>
                                <CardDescription className="text-xs">How applicants align with your team's specific needs.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">Deep Mapping →</Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {candidates.map((c, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center text-xs font-black shadow-sm group-hover:scale-110 transition-transform">
                                            {c.name[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-black text-black dark:text-zinc-50">{c.name}</p>
                                                <Badge className={`text-[8px] font-black uppercase ${c.synergy === 'Critical Match' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'} border-none`}>
                                                    {c.synergy}
                                                </Badge>
                                            </div>
                                            <div className="flex gap-1 mt-1">
                                                {c.skills.map((s, j) => (
                                                    <span key={j} className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">{s}{j < c.skills.length - 1 ? ' •' : ''}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Audit Score</p>
                                            <p className="text-xl font-black text-blue-600 tracking-tighter">{c.score}%</p>
                                        </div>
                                        <Button size="sm" className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black text-[9px] font-black uppercase tracking-widest h-8 px-4 rounded-lg">View Profile</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
