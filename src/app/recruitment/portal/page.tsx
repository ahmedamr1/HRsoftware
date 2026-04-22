"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users, Globe, DollarSign, ArrowLeft,
    Sparkles, Zap, Building2, ExternalLink,
    PieChart, Clock, CheckCircle2, Plus,
    UserPlus, Heart, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function PortalPage() {
    const agencies = [
        { name: "TopTalent Global", candidates: 12, quality: "94%", active: 3, commission: "$18,400" },
        { name: "Elite Engineering", candidates: 8, quality: "82%", active: 1, commission: "$9,200" },
        { name: "DesignFirst Agcy", candidates: 5, quality: "91%", active: 2, commission: "$12,000" },
    ];

    const referrals = [
        { name: "Alex Rivera", role: "Frontend Lead", referrals: 4, success: 2, reward: "$4,000" },
        { name: "Maria Garcia", role: "Backend Lead", referrals: 2, success: 1, reward: "$2,000" },
        { name: "Sarah Smith", role: "CEO", referrals: 1, success: 0, reward: "$0" },
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
                            Agency & Referral Portal
                            <Badge className="bg-orange-500/10 text-orange-600 border-none text-[10px] uppercase font-black px-2 mt-1">External</Badge>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Gateway for external partners and employee referral tracking.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 font-bold text-xs h-12 px-6 rounded-xl">
                        <UserPlus className="mr-2 h-4 w-4" /> Invite Agency
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-500/20 px-6 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" /> New Referral
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Stats */}
                <Card className="lg:col-span-1 bg-zinc-950 dark:bg-white text-white dark:text-black shadow-2xl border-none p-6 flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform">
                        <DollarSign size={160} />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Total Commission Payout</h4>
                        <div className="text-5xl font-black tracking-tighter mb-4">$39,600</div>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                            <TrendingUp size={16} /> +15% from last quarter
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-800 dark:border-zinc-200 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-zinc-500 uppercase font-black">Active Partner Leads</p>
                            <p className="text-xl font-black">25</p>
                        </div>
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-white/10 dark:bg-zinc-100/10">
                            <ExternalLink size={16} />
                        </Button>
                    </div>
                </Card>

                {/* Agency Table */}
                <Card className="lg:col-span-2 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                    <CardHeader className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-tighter">Verified Agencies</CardTitle>
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-black uppercase">3 Tier-1 Partners</Badge>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-50/30 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                <tr>
                                    <th className="p-4 text-left">Agency Partner</th>
                                    <th className="p-4 text-center">Candidates</th>
                                    <th className="p-4 text-center">Quality</th>
                                    <th className="p-4 text-right">Pending Payout</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {agencies.map((a, i) => (
                                    <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                                                    <Building2 size={16} />
                                                </div>
                                                <span className="text-sm font-black text-black dark:text-zinc-50">{a.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center font-bold text-sm">{a.candidates}</td>
                                        <td className="p-4 text-center text-emerald-500 font-black text-xs">{a.quality}</td>
                                        <td className="p-4 text-right text-sm font-black text-zinc-900 dark:text-zinc-100">{a.commission}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Employee Referrals Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <Heart size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-black dark:text-zinc-50">Internal Referral Program</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Employee driven growth.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {referrals.map((r, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-pink-500/20 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black">
                                        {r.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-black dark:text-zinc-50">{r.name}</p>
                                        <p className="text-[10px] text-zinc-400 font-bold uppercase">{r.referrals} Referrals • {r.success} Hired</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Reward</p>
                                    <p className="text-lg font-black text-emerald-600 tracking-tighter">{r.reward}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white border-none shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
                        <Globe size={120} />
                    </div>
                    <div className="p-8 relative h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black tracking-tighter mb-2">Global Partner Network</h3>
                            <p className="text-xs text-indigo-300 font-medium leading-relaxed max-w-[280px]">
                                Expand your reach by enabling the agency gateway. Invite up to 5 external partners to submit candidates directly to your pipeline with AI validation.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <Button className="flex-1 bg-white text-indigo-950 hover:bg-zinc-100 text-[10px] font-black uppercase tracking-widest h-11 rounded-xl">
                                Enable Gateway
                            </Button>
                            <Button variant="ghost" className="flex-1 bg-white/10 text-white hover:bg-white/20 text-[10px] font-black uppercase tracking-widest h-11 rounded-xl border-none">
                                View Policy
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
