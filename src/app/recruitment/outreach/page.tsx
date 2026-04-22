"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Send, Sparkles, Mail, Target, BarChart3, Users,
    ArrowLeft, Brain, Zap, MessageSquare, Plus, Search
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function OutreachPage() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [draft, setDraft] = useState("");

    const campaigns = [
        { id: 1, name: "Senior Frontend React", recipients: 45, openRate: "82%", replies: 12, status: "Active" },
        { id: 2, name: "Backend Node.js Leads", recipients: 28, openRate: "75%", replies: 5, status: "Draft" },
        { id: 3, name: "UX/UI Design Masters", recipients: 15, openRate: "90%", replies: 8, status: "Completed" },
    ];

    const generateOutreach = () => {
        if (!prompt) {
            toast.error("Please enter a prompt for the AI.");
            return;
        }
        setIsGenerating(true);
        setTimeout(() => {
            setDraft(`Subject: Exploring a new horizon at Super HR! 🚀\n\nHi [Candidate Name],\n\nI was just analyzing your background in ${prompt.toLowerCase()} and was incredibly impressed by your trajectory at [Current Company].\n\nAt Super HR, we're building an AI-Native ecosystem and your expertise aligns perfectly with our vision for 2024. Would you be open to a 15-min sync next Tuesday?\n\nBest,\nSarah Smith\nCEO, Super HR`);
            setIsGenerating(false);
            toast.success("AI Outreach sequence generated!", {
                icon: <Brain className="h-4 w-4 text-blue-500" />
            });
        }, 1500);
    };

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
                            Outreach Engine
                            <Badge className="bg-blue-600 text-white border-none text-[10px] uppercase font-black px-2 mt-1">AI-Powered</Badge>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Hyper-personalized engagement campaigns for passive talent.</p>
                    </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 px-6 font-bold uppercase tracking-widest text-xs h-12">
                    <Plus className="mr-2 h-4 w-4" /> New Campaign
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Campaigns List */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                        <CardHeader className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-sm font-black uppercase tracking-tighter">Active Campaigns</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {campaigns.map((c) => (
                                    <div key={c.id} className="p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-black text-black dark:text-zinc-50 group-hover:text-blue-600 transition-colors">{c.name}</p>
                                            <Badge variant={c.status === 'Active' ? 'success' : c.status === 'Draft' ? 'secondary' : 'outline'} className="text-[8px] font-black uppercase border-none">
                                                {c.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                            <div className="flex items-center gap-1"><Users size={12} /> {c.recipients}</div>
                                            <div className="flex items-center gap-1 text-emerald-500"><BarChart3 size={12} /> {c.openRate}</div>
                                            <div className="flex items-center gap-1 text-blue-500"><MessageSquare size={12} /> {c.replies}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white border-none shadow-2xl p-6 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Target size={120} />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Outreach Health</h4>
                        <div className="text-4xl font-black tracking-tighter mb-4">92%</div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase tracking-widest truncate">AI-Optimized deliverability active</p>
                        <div className="mt-6 flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-6 w-6 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-black">AI</div>
                                ))}
                            </div>
                            <span className="text-[9px] font-bold text-zinc-400">+12 agents verifying</span>
                        </div>
                    </Card>
                </div>

                {/* AI Workspace */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <Sparkles className="text-blue-500 animate-pulse" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl font-black uppercase tracking-tighter">AI Outreach Composer</CardTitle>
                            <CardDescription>Draft sequences based on roles, skills, or specific candidate URLs.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">What are we looking for?</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="e.g. Senior Product Designer with FinTech experience..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 h-12 text-sm"
                                    />
                                    <Button
                                        onClick={generateOutreach}
                                        disabled={isGenerating}
                                        className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black h-12 px-6 font-black uppercase tracking-widest text-[10px]"
                                    >
                                        {isGenerating ? <Zap size={16} className="animate-spin" /> : "Generate"}
                                    </Button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {draft && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                                    <Brain size={12} className="text-blue-500" /> AI Draft Proposal
                                                </label>
                                                <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-black uppercase">Personalization: 98%</Badge>
                                            </div>
                                            <Textarea
                                                value={draft}
                                                onChange={(e) => setDraft(e.target.value)}
                                                className="min-h-[300px] bg-white/50 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 p-6 text-sm leading-relaxed"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex gap-2">
                                                <Button variant="outline" className="text-xs font-bold rounded-xl border-zinc-200 dark:border-zinc-800 px-6">
                                                    Save Template
                                                </Button>
                                                <Button variant="outline" className="text-xs font-bold rounded-xl border-zinc-200 dark:border-zinc-800 px-6">
                                                    Preview Mobile
                                                </Button>
                                            </div>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 px-10 font-black uppercase tracking-widest text-[10px] rounded-xl h-11">
                                                <Send size={14} className="mr-2" /> Launch Campaign
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!draft && !isGenerating && (
                                <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl opacity-40">
                                    <Brain size={48} className="text-zinc-300 mb-4" />
                                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Enter a prompt to start AI composition</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
