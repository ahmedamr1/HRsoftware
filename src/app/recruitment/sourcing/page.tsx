"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search,
    Link as LinkIcon,
    Linkedin,
    Globe,
    ExternalLink,
    Plus,
    Filter,
    Zap,
    ArrowLeft,
    Chrome,
    Github,
    Users,
    TrendingUp,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SourcingDashboard() {
    const passiveCandidates = [
        { name: "Michael Chen", role: "Sr. Backend Engineer", source: "LinkedIn", status: "Outreached", match: "94%" },
        { name: "Sarah Connor", role: "DevOps Architect", source: "GitHub", status: "Talent Pool", match: "89%" },
        { name: "David Miller", role: "Principal Frontend", source: "Indeed", status: "Passive", match: "91%" },
    ];

    const integrations = [
        { name: "LinkedIn Recruiter", status: "Connected", icon: Linkedin, color: "text-blue-600" },
        { name: "GitHub Talents", status: "Connected", icon: Github, color: "text-black dark:text-white" },
        { name: "Indeed API", status: "Configure", icon: Globe, color: "text-blue-800" },
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
                            Passive Sourcing Hub
                            <Badge className="bg-blue-500/10 text-blue-600 border-none text-[10px] uppercase font-black px-2 mt-1">Intelligence</Badge>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Discover and manage talent beyond active applicants. depth.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest px-6 rounded-xl gap-2">
                        <Chrome size={16} className="text-orange-500" /> Install Extension
                    </Button>
                    <Button className="bg-black dark:bg-white text-white dark:text-black h-12 shadow-xl px-6 font-black uppercase tracking-widest text-[10px] rounded-xl">
                        <Plus size={16} className="mr-2" /> Source Candidate
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Integrations */}
                <Card className="lg:col-span-1 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl self-start">
                    <CardHeader className="p-6 border-b border-zinc-100 dark:border-zinc-900">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Global Integrations</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {integrations.map((int, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 group hover:border-blue-500/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm ${int.color}`}>
                                        <int.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-black dark:text-zinc-50">{int.name}</p>
                                        <p className={`text-[10px] font-bold uppercase ${int.status === 'Connected' ? 'text-emerald-500' : 'text-zinc-400'}`}>{int.status}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 group-hover:text-blue-500">
                                    <ExternalLink size={14} />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Sourced Talent pool */}
                <Card className="lg:col-span-2 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                    <CardHeader className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-900 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Passive Talent Pool</CardTitle>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                                <Input placeholder="Filter talent..." className="pl-9 h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-[10px] w-48 font-bold" />
                            </div>
                        </div>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50/30 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                <tr>
                                    <th className="p-4 text-left">Candidate</th>
                                    <th className="p-4 text-center">Source</th>
                                    <th className="p-4 text-center">Stage</th>
                                    <th className="p-4 text-right">AI Match</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {passiveCandidates.map((cand, i) => (
                                    <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-all group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-black border border-zinc-200 dark:border-zinc-700">
                                                    {cand.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-black dark:text-zinc-50">{cand.name}</p>
                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">{cand.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <Badge variant="outline" className="text-[9px] font-black uppercase border-zinc-200 dark:border-zinc-800 text-zinc-500">{cand.source}</Badge>
                                        </td>
                                        <td className="p-4 text-center">
                                            <Badge className="bg-blue-500/10 text-blue-600 border-none text-[9px] font-black uppercase">{cand.status}</Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-lg font-black tracking-tighter tabular-nums">{cand.match}</span>
                                                <TrendingUp size={14} className="text-emerald-500" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* AI Insights Bar */}
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles size={120} />
                </div>
                <div className="p-8 relative flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h3 className="text-2xl font-black tracking-tighter mb-2">Automated Talent Discovery</h3>
                        <p className="text-sm text-blue-100 font-medium leading-relaxed">
                            Our AI is currently monitoring 12 LinkedIn roles and 5 GitHub repositories matching your "Sr. Frontend" criteria. 3 priority matches found in the last 24h. depth.
                        </p>
                    </div>
                    <Button className="bg-white text-blue-700 hover:bg-zinc-100 h-12 px-8 font-black uppercase tracking-widest text-[10px] rounded-xl whitespace-nowrap">
                        Review Insights
                    </Button>
                </div>
            </Card>
        </div>
    );
}
