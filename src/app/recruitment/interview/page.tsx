"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    MessageSquare, Users, Star, ArrowLeft, Brain,
    Sparkles, Zap, ShieldAlert, CheckCircle2,
    MoreHorizontal, Plus, Clock, Video
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function InterviewWorkspacePage() {
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

    const interviewQueue = [
        { id: "1", name: "Emma Wilson", role: "Frontend Dev", time: "10:00 AM", status: "Joined", panel: ["Sarah S.", "Michael C."], sentiment: "Positive" },
        { id: "2", name: "Leo Das", role: "Junior Dev", time: "01:30 PM", status: "Upcoming", panel: ["Sarah S.", "Alex R."], sentiment: "Neutral" },
        { id: "3", name: "Maria Garcia", role: "Backend Lead", time: "04:00 PM", status: "Drafting", panel: ["Michael C.", "Alex R."], sentiment: "Very Positive" },
    ];

    const rubrics = [
        { category: "Technical Proficiency", score: 4.5, aiNote: "Excellent React patterns" },
        { category: "Cultural Synergy", score: 4.8, aiNote: "Strong alignment with openness" },
        { category: "Problem Solving", score: 4.2, aiNote: "Logical but slow on edge cases" },
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
                            Interview Workspace
                            <Badge className="bg-purple-500/10 text-purple-600 border-none text-[10px] uppercase font-black px-2 mt-1">Live Sync</Badge>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Bias-aware collaborative reviews and talent evaluation.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 font-bold text-xs">
                        <Video className="mr-2 h-3 w-3" /> Connect Zoom
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-500/20 px-6 font-bold uppercase tracking-widest text-xs h-12">
                        <Plus className="mr-2 h-4 w-4" /> Schedule Panel
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Interview Queue */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                        <CardHeader className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-sm font-black uppercase tracking-tighter uppercase">Today's Lineup</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {interviewQueue.map((interview) => (
                                    <div
                                        key={interview.id}
                                        onClick={() => setSelectedCandidate(interview)}
                                        className={`p-4 hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all cursor-pointer group ${selectedCandidate?.id === interview.id ? 'bg-purple-50/50 dark:bg-purple-900/10 border-l-4 border-purple-500' : ''}`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-black text-black dark:text-zinc-50">{interview.name}</p>
                                            <Badge variant={interview.status === 'Joined' ? 'success' : 'secondary'} className="text-[8px] font-black uppercase">
                                                {interview.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase">
                                                <Clock size={12} /> {interview.time}
                                            </div>
                                            <div className="flex -space-x-1">
                                                {interview.panel.map((p, i) => (
                                                    <div key={i} className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] font-black">{p[0]}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-none shadow-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 animate-pulse">
                            <Brain size={80} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-100 mb-2">Bias Detection Active</h4>
                        <p className="text-sm font-bold leading-relaxed mb-6">AI is monitoring feedback for objective alignment and diversity standards.</p>
                        <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest h-10 border-none">
                            Configure Parameters
                        </Button>
                    </Card>
                </div>

                {/* Live Workspace */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl min-h-[600px] flex flex-col relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {selectedCandidate ? (
                                <motion.div
                                    key={selectedCandidate.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col flex-1"
                                >
                                    <CardHeader className="border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
                                                    {selectedCandidate.name[0]}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl font-black tracking-tighter">{selectedCandidate.name}</CardTitle>
                                                    <div className="flex items-center gap-2">
                                                        <CardDescription className="text-xs font-bold uppercase">{selectedCandidate.role}</CardDescription>
                                                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-black uppercase">Sentiment: {selectedCandidate.sentiment}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="rounded-xl border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase">Scorecard</Button>
                                                <Button size="sm" className="rounded-xl bg-purple-600 text-white text-[10px] font-black uppercase px-6">Submit Review</Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <div className="flex-1 p-6 grid grid-cols-2 gap-6">
                                        {/* Discussion / Rubrics */}
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                                    <Star size={12} className="text-amber-500" /> Collaborative Rubrics
                                                </label>
                                                {rubrics.map((r, i) => (
                                                    <div key={i} className="p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-purple-500/30 transition-all group">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{r.category}</span>
                                                            <div className="flex items-center gap-1 text-amber-600 font-black text-xs">
                                                                <Star size={10} fill="currentColor" /> {r.score}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 dark:bg-zinc-950/80 border border-zinc-100 dark:border-zinc-800">
                                                            <Sparkles className="text-blue-500 shrink-0" size={10} />
                                                            <p className="text-[10px] text-zinc-500 font-medium italic">{r.aiNote}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Shared Notes Area */}
                                        <div className="space-y-4 flex flex-col">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                                <MessageSquare size={12} className="text-purple-500" /> Live Panel Notes
                                            </label>
                                            <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-4 relative">
                                                <div className="space-y-4 max-h-[300px] overflow-auto">
                                                    <div className="flex gap-2">
                                                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-black text-white">SS</div>
                                                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 p-2 rounded-xl rounded-tl-none shadow-sm">Asked about Redux vs. Context. Very articulate.</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-black text-white">MC</div>
                                                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-800 p-2 rounded-xl rounded-tl-none shadow-sm">Strong understanding of SSR and Next.js optimization.</p>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4 group">
                                                    {/* Alert: Potential Bias Detected Placeholder */}
                                                    <div className="mb-2 hidden group-focus-within:flex items-center gap-2 p-2 rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20 text-[9px] font-bold uppercase animate-bounce">
                                                        <ShieldAlert size={10} /> Potential affinity bias detected in MC's last comment.
                                                    </div>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="Type a collaborative note..."
                                                            className="w-full bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl py-2 px-4 text-xs outline-none focus:ring-2 focus:ring-purple-500/50 h-10"
                                                        />
                                                        <Button size="icon" className="h-6 w-6 absolute right-2 top-2 bg-purple-500 hover:bg-purple-600">
                                                            <Zap size={12} fill="white" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                                    <Video size={64} className="text-zinc-300 mb-4" />
                                    <p className="text-sm font-black uppercase tracking-widest text-zinc-400">Select a candidate to join workspace</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </Card>
                </div>
            </div>
        </div>
    );
}
