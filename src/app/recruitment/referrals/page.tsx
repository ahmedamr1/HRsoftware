"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Gift, Users, TrendingUp, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ReferralsDashboard() {
    const referrals = [
        { id: "1", candidate: "Samantha Lee", referrer: "Sarah Smith", role: "Product Designer", status: "Interviewing", bonus: "$2,000", date: "2d ago" },
        { id: "2", candidate: "Maria Garcia", referrer: "Chris Evans", role: "Senior Frontend Engineer", status: "Technical", bonus: "$3,500", date: "5d ago" },
        { id: "3", candidate: "James Wilson", referrer: "Alex Riva", role: "Backend Lead", status: "Offered", bonus: "$5,000", date: "1w ago" },
    ];

    return (
        <div className="space-y-6 text-left pb-10">
            <div className="flex items-center gap-4">
                <Link href="/recruitment">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <ArrowLeft size={20} />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50 flex items-center gap-3">
                        Employee Referral Hub
                        <Badge className="bg-blue-500/10 text-blue-600 border-none text-[10px] uppercase font-black px-2 mt-1">Beta</Badge>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Track internal talent recommendations and bonus payouts. depth.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { title: "Total Referrals", value: "12", icon: Users, color: "blue", trend: "+3 this month" },
                    { title: "Successful Hires", value: "4", icon: TrendingUp, color: "emerald", trend: "33% conversion" },
                    { title: "Pending Bonuses", value: "$8,500", icon: Gift, color: "purple", trend: "Next payout: Feb 15" },
                ].map((stat, i) => (
                    <Card key={i} className="group relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold tracking-tight text-zinc-500 uppercase">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 text-zinc-400`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-black dark:text-zinc-50 tracking-tighter">{stat.value}</div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">{stat.trend}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold">Active Referrals</CardTitle>
                            <CardDescription>Review status of internal recommendations.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Candidate</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Referrer</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Role</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Status</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Est. Bonus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {referrals.map((ref) => (
                                <TableRow key={ref.id} className="group hover:bg-zinc-100/30 dark:hover:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-[10px] font-bold">{ref.candidate[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold text-sm text-black dark:text-zinc-50">{ref.candidate}</p>
                                                <p className="text-[10px] text-zinc-500 uppercase font-black">{ref.date}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{ref.referrer}</span>
                                            <Badge variant="outline" className="text-[8px] bg-blue-500/5 text-blue-600 border-none uppercase h-4 px-1">Internal</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-zinc-500">{ref.role}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-none font-bold text-[10px] uppercase">
                                            {ref.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-black text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                                        {ref.bonus}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-gradient-to-br from-blue-600/5 to-indigo-600/5 border-blue-500/20 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-blue-600">Referral Leaderboard</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "Sarah Smith", count: 5, earnings: "$12,000" },
                            { name: "Jessica T.", count: 3, earnings: "$7,500" },
                            { name: "Chris Evans", count: 2, earnings: "$5,000" },
                        ].map((leader, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-black text-zinc-300">#{i + 1}</span>
                                    <span className="text-sm font-bold">{leader.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-blue-600">{leader.count} Hires</p>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{leader.earnings} Earned</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl border-dashed">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Referral Program Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                        <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                            <Sparkles size={24} />
                        </div>
                        <div className="max-w-[200px]">
                            <p className="text-sm font-bold text-black dark:text-zinc-50">AI Boost Suggestions</p>
                            <p className="text-[10px] text-zinc-500 leading-tight mt-1">
                                Reach out to Sarah Smith—she has a 100% conversion rate on referrals and currently has 2 untapped candidates in her network. depth.
                            </p>
                        </div>
                        <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest h-9">Invite Referral Ambassadors</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
