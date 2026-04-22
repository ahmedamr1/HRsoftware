"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    X,
    MessageSquare,
    FileText,
    TrendingUp,
    Sparkles,
    Send,
    CheckCircle2,
    Clock,
    UserPlus,
    MoreHorizontal
} from "lucide-react";
import { InterviewFeedbackForm } from "./InterviewFeedbackForm";
import { motion, AnimatePresence } from "framer-motion";

interface CandidateDetailViewProps {
    candidate: any;
    onClose: () => void;
    initialTab?: string;
}

export function CandidateDetailView({ candidate, onClose, initialTab = "overview" }: CandidateDetailViewProps) {
    const [comments, setComments] = useState([
        { id: 1, user: "Sarah Smith", text: "Strong match for the lead role. I like the system design approach.", time: "2h ago" },
        { id: 2, user: "Alex Rivera", text: "Agreed. @ recruiter let's expedite the technical interview.", time: "1h ago" },
    ]);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        setComments([...comments, { id: Date.now(), user: "Admin", text: newComment, time: "Just now" }]);
        setNewComment("");
    };

    const mockExperience = [
        { company: "TechFlow Systems", role: "Senior Frontend Engineer", period: "2021 - Present", desc: "Led the migration to Next.js 14 and implemented a design system used by 50+ developers. focus on performance and accessibility." },
        { company: "Innovate AI", role: "UI Engineer", period: "2018 - 2021", desc: "Developed complex data visualization dashboards for ML model monitoring. Optimized render cycles by 40%." },
    ];

    const mockEducation = [
        { school: "Stanford University", degree: "M.S. in Computer Science", year: "2018" },
        { school: "MIT", degree: "B.S. in Software Engineering", year: "2016" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed inset-y-0 right-0 w-full md:w-[520px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[100] flex flex-col"
        >
            {/* Header */}
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Avatar className="h-14 w-14 border-2 border-white dark:border-black shadow-xl">
                            <AvatarFallback className="font-black text-xl">{candidate.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950 flex items-center justify-center">
                            <CheckCircle2 size={12} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tighter tabular-nums text-black dark:text-zinc-50">{candidate.name}</h2>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] font-black uppercase text-zinc-500 border-zinc-200 dark:border-zinc-800">{candidate.role}</Badge>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                <Clock size={10} /> Active 2d
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-zinc-200 dark:border-zinc-800">
                        <MoreHorizontal size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-10 w-10 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <X size={20} />
                    </Button>
                </div>
            </div>

            {/* Quick Insights Bar */}
            <div className="p-4 px-6 bg-zinc-900 dark:bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">AI Fit</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-lg font-black text-blue-500">{candidate.score}%</span>
                            <Sparkles size={12} className="text-blue-500 animate-pulse" />
                        </div>
                    </div>
                    <div className="h-8 w-px bg-zinc-800" />
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Sentiment</span>
                        <span className="text-sm font-black text-emerald-500">{candidate.sentiment}</span>
                    </div>
                </div>
                <Button className="h-8 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-blue-500/20">
                    <Sparkles size={12} className="mr-2" /> AI Summary
                </Button>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue={initialTab} className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
                    <TabsList className="bg-transparent h-14 w-full justify-start gap-8 p-0">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest text-zinc-400 data-[state=active]:text-black dark:data-[state=active]:text-white">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="experience" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest text-zinc-400 data-[state=active]:text-black dark:data-[state=active]:text-white">
                            Experience
                        </TabsTrigger>
                        <TabsTrigger value="feedback" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest text-zinc-400 data-[state=active]:text-black dark:data-[state=active]:text-white">
                            Evaluation
                        </TabsTrigger>
                        <TabsTrigger value="journey" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest text-zinc-400 data-[state=active]:text-black dark:data-[state=active]:text-white">
                            Journey
                        </TabsTrigger>
                        <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none h-full px-0 text-[10px] font-black uppercase tracking-widest text-zinc-400 data-[state=active]:text-black dark:data-[state=active]:text-white">
                            Collab
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <TabsContent value="overview" className="mt-0 space-y-8 p-6">
                        {/* Summary & Tags */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Executive Summary</h4>
                            <p className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Exceptional candidate with strong architectural patterns. {candidate.aiSummary}
                                Demonstrates deep understanding of React internals and scalable frontend systems.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {candidate.skills.map((skill: string) => (
                                    <Badge key={skill} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-none px-3 py-1 text-[10px] font-bold">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* AI Insights Panel */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                                <h5 className="text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1">
                                    <Sparkles size={10} /> Strength
                                </h5>
                                <p className="text-[11px] font-bold leading-tight">Expert React/Next.js Architecture knowledge.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-2">
                                <h5 className="text-[9px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1">
                                    <Clock size={10} /> Retention
                                </h5>
                                <p className="text-[11px] font-bold leading-tight">Average tenure of 3.2 years in previous roles.</p>
                            </div>
                        </div>

                        {/* Culture Fit Gauge */}
                        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Culture Compatibility</h4>
                                <p className="text-lg font-black tracking-tight">Highly Collaborative</p>
                            </div>
                            <div className="h-12 w-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center">
                                <span className="text-xs font-black">9.2</span>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="experience" className="mt-0 space-y-8 p-6">
                        {/* Resume Preview Simulation */}
                        <div className="p-4 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between group hover:border-blue-500/50 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-10 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex flex-col items-center justify-center p-1 border border-zinc-200 dark:border-zinc-800">
                                    <FileText size={16} className="text-zinc-400" />
                                    <span className="text-[6px] font-black font-mono mt-1 uppercase">PDF</span>
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tight">Full_Resume_2026.pdf</p>
                                    <p className="text-[10px] text-zinc-400 font-bold">2.4 MB • Uploaded 2d ago</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="group-hover:text-blue-600">
                                <FileText size={18} />
                            </Button>
                        </div>

                        {/* Experience Timeline */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Work History</h4>
                            {mockExperience.map((exp, i) => (
                                <div key={i} className="relative pl-6 space-y-2">
                                    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-sm font-black tracking-tight">{exp.role}</h5>
                                        <Badge variant="outline" className="text-[8px] font-black tabular-nums border-zinc-100 dark:border-zinc-800">{exp.period}</Badge>
                                    </div>
                                    <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest">{exp.company}</p>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{exp.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Education</h4>
                            {mockEducation.map((edu, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                                    <Avatar className="h-8 w-8 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                                        <AvatarFallback className="text-[10px] font-black">{edu.school[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-[11px] font-black tracking-tight">{edu.degree}</p>
                                        <p className="text-[9px] text-zinc-400 font-bold uppercase">{edu.school} • {edu.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="feedback" className="mt-0 p-6">
                        <InterviewFeedbackForm
                            candidateName={candidate.name}
                            roleName={candidate.role}
                            onSuccess={() => { }}
                        />
                    </TabsContent>

                    <TabsContent value="journey" className="mt-0 space-y-8 p-6">
                        <div className="space-y-12 relative ml-4 pt-4">
                            <div className="absolute left-[-16px] top-6 bottom-6 w-[2px] bg-zinc-100 dark:bg-zinc-800" />
                            {[
                                { stage: "Sourcing & Initial Scan", date: "Feb 07, 2026", status: "completed", details: "Candidate was sourced via LinkedIn. AI matched at 92%." },
                                { stage: "Recruiter Screen", date: "Feb 08, 2026", status: "completed", details: "Initial call with Sarah Smith. Confirmed interest and salary expectations." },
                                { stage: "Internal Review", date: "Feb 09, 2026", status: "active", details: "Current stage. Evaluating against team requirements." },
                                { stage: "Technical Interview", date: "Pending", status: "upcoming", details: "Not started." },
                            ].map((step, i) => (
                                <div key={i} className="relative group">
                                    <div className={`absolute left-[-22px] top-1.5 h-3.5 w-3.5 rounded-full z-10 border-4 border-white dark:border-zinc-950 ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'active' ? 'bg-blue-600 animate-pulse' : 'bg-zinc-200'}`} />
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm font-black tracking-tight ${step.status === 'active' ? 'text-blue-600' : 'text-zinc-900 dark:text-zinc-100'}`}>{step.stage}</p>
                                            <Badge variant="outline" className="text-[8px] font-black uppercase border-zinc-100 dark:border-zinc-800">{step.date}</Badge>
                                        </div>
                                        <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-[90%]">{step.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-0 h-full flex flex-col p-6">
                        <div className="flex-1 space-y-6 mb-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black border border-zinc-200 dark:border-zinc-700">
                                        {comment.user[0]}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black">{comment.user}</span>
                                            <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{comment.time}</span>
                                        </div>
                                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl rounded-tl-none border border-zinc-100 dark:border-zinc-800">
                                            <p className="text-sm font-medium leading-relaxed">{comment.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative group mt-auto">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a collaborative note... (@mention team members)"
                                className="w-full min-h-[100px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 text-sm font-bold text-black dark:text-zinc-50 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none pr-14"
                            />
                            <Button
                                onClick={handleAddComment}
                                className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-blue-600 text-white p-0 shadow-lg shadow-blue-500/20"
                            >
                                <Send size={14} />
                            </Button>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>

            {/* Footer Actions */}
            <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 grid grid-cols-2 gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
                <Button variant="outline" className="h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest border-zinc-200 dark:border-zinc-800 shadow-sm hover:bg-white dark:hover:bg-zinc-800">
                    <UserPlus size={14} className="mr-2" /> Share Panel
                </Button>
                <Button className="h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-xl">
                    <CheckCircle2 size={14} className="mr-2" /> Advance Stage
                </Button>
            </div>
        </motion.div>
    );
}
