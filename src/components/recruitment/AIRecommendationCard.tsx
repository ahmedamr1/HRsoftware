"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, CheckCircle2, AlertCircle, MessageSquare, Code, Users } from "lucide-react";
import { motion } from "framer-motion";

interface AIRecommendationCardProps {
    candidateName: string;
    score: number;
    skills: string[];
    gaps: string[];
    sentiment: string;
    onClose: () => void;
}

export function AIRecommendationCard({ candidateName, score, skills, gaps, sentiment, onClose }: AIRecommendationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <Card
                className="w-full max-w-lg bg-white dark:bg-zinc-950 border-blue-500/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <CardHeader className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                                <Brain size={20} />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-black tracking-tighter uppercase">{candidateName}</CardTitle>
                                <CardDescription className="text-[10px] font-bold text-blue-600 dark:text-blue-400">AI DEEP ANALYSIS REPORT</CardDescription>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-blue-600">{score}%</div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Match Score</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500">
                                <CheckCircle2 size={14} /> Core Strengths
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-bold">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500">
                                <AlertCircle size={14} /> Potential Gaps
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {gaps.map(gap => (
                                    <Badge key={gap} variant="secondary" className="bg-amber-500/10 text-amber-600 border-none text-[9px] font-bold">
                                        {gap}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare size={14} className="text-blue-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest">AI Generated Interview Script</h4>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                            "Focus on their experience with {skills[0]} and ask how they handle {gaps[0]}. They seem strong in collaborative environments but may need guidance on large-scale architecture."
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <div className="text-xs font-black text-black dark:text-zinc-50">92%</div>
                                <div className="text-[8px] font-bold text-zinc-400 uppercase">Coding</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-xs font-black text-black dark:text-zinc-50">88%</div>
                                <div className="text-[8px] font-bold text-zinc-400 uppercase">Soft Skills</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-xs font-black text-black dark:text-zinc-50">75%</div>
                                <div className="text-[8px] font-bold text-zinc-400 uppercase">Leadership</div>
                            </div>
                        </div>
                        <Badge className="bg-blue-600 text-white border-none text-[10px] font-black">HIGHLY RECOMMENDED</Badge>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
