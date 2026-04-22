"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, MoreVertical, Zap, Activity, Brain, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { timeOffRequests, TimeOffRequest } from "./data";
import { useState } from "react";

export default function TimeOffPage() {
    const [requests, setRequests] = useState<TimeOffRequest[]>(timeOffRequests);

    const handleAction = (action: string, user: string) => {
        const isSuccess = action === 'Approve';
        toast[isSuccess ? 'success' : 'error'](`Request for ${user} ${isSuccess ? 'approved' : 'rejected'}`);
    };

    const handleAIAnalysis = (analysis: string) => {
        toast.info(analysis, { icon: <Brain className="h-4 w-4 text-blue-500" /> });
    };

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Attendance Intelligence</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">AI-modeled capacity and leave management.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-blue-500/20 text-blue-600 rounded-xl" onClick={() => toast.info("AI modeling team capacity for Q4...")}>
                        <Activity size={14} className="mr-2" /> Scarcity Map
                    </Button>
                    <Button
                        className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black shadow-xl border-none"
                        asChild
                    >
                        <Link href="/time-off/new">
                            <Plus className="mr-2 h-4 w-4" /> Request Time Off
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                {[
                    { title: "Personal Balance", value: "12 Days", desc: "Available for you", icon: CalendarIcon, color: "blue" },
                    { title: "Team Capacity", value: "92%", desc: "Optimal efficiency", icon: Activity, color: "emerald" },
                    { title: "Scarcity Risk", value: "Low", desc: "Next 30 days", icon: Zap, color: "orange" },
                    { title: "Auto-Approvals", value: "1", desc: "AI pre-vetted", icon: Sparkles, color: "blue" },
                ].map((stat, i) => (
                    <Card key={i} className="group overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">{stat.title}</CardTitle>
                            <stat.icon className={`h-3 w-3 text-${stat.color}-500 group-hover:scale-110 transition-transform`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-black dark:text-zinc-50 tracking-tighter">{stat.value}</div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">{stat.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black tracking-tighter uppercase">Intelligent Leave Queue</CardTitle>
                            <CardDescription>AI-modeled impact for every application.</CardDescription>
                        </div>
                        <Sparkles className="text-blue-500" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Employee</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Dates & Type</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Impact Analysis</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Status</TableHead>
                                <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id} className="group hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border-2 border-white dark:border-zinc-900 shadow-sm">
                                                <AvatarFallback className="text-[10px] font-bold">{request.user[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-black text-sm text-black dark:text-zinc-50 tracking-tight">{request.user}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{request.dates}</span>
                                            <span className="text-[10px] font-bold uppercase text-zinc-400">{request.type} • {request.days} Days</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleAIAnalysis(request.aiAnalysis)}>
                                            <Badge variant="secondary" className={`rounded-full px-2 py-0 border-none shadow-sm text-[9px] font-black uppercase ${request.impact === 'Low' ? 'bg-emerald-500/10 text-emerald-600' : request.impact === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'}`}>
                                                {request.impact} Impact
                                            </Badge>
                                            <Brain size={12} className="text-blue-500/40 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            request.status === 'Approved' ? 'success' :
                                                request.status === 'Rejected' ? 'destructive' : 'secondary'
                                        } className="rounded-full shadow-sm border-none px-3 py-0.5 font-black text-[9px] uppercase tracking-widest">
                                            {request.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {request.status === 'Pending' ? (
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 px-3 text-[10px] font-black uppercase text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                                                    onClick={() => handleAction('Approve', request.user)}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 px-3 text-[10px] font-black uppercase text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    onClick={() => handleAction('Reject', request.user)}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 opacity-60 hover:opacity-100 transition-opacity">
                                                <MoreVertical size={14} />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
