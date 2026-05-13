"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, ChevronRight, CheckCircle2, Clock, Target, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
    role: string;
    timeframe: string;
    description: string;
    missingSkills: string[];
}

interface CareerPathData {
    milestones: Milestone[];
    summary: string;
}

interface CareerPathModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeeId: string;
    employeeName: string;
}

export default function CareerPathModal({ isOpen, onClose, employeeId, employeeName }: CareerPathModalProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CareerPathData | null>(null);

    useEffect(() => {
        if (isOpen && employeeId) {
            fetchData();
        }
    }, [isOpen, employeeId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/employees/${employeeId}/career-path`);
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error("Failed to fetch career path:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-3xl">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Brain size={120} />
                    </div>
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Sparkles size={20} className="text-white" />
                            </div>
                            <Badge className="bg-white/20 text-white border-none text-[10px] font-black uppercase tracking-widest">AI Intelligence</Badge>
                        </div>
                        <DialogTitle className="text-3xl font-black tracking-tighter text-white">
                            Career Trajectory: {employeeName}
                        </DialogTitle>
                        <DialogDescription className="text-blue-100 font-medium max-w-lg">
                            Predictive modeling based on current role, performance velocity, and technical stack.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-400">AI is analyzing potential career paths...</p>
                        </div>
                    ) : data ? (
                        <div className="space-y-10">
                            {/* Summary Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-6 rounded-3xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 italic text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed"
                            >
                                "{data.summary}"
                            </motion.div>

                            {/* Milestones Timeline */}
                            <div className="space-y-8 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-blue-600 before:via-indigo-500 before:to-purple-500/20">
                                {data.milestones.map((m, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative pl-14 group"
                                    >
                                        <div className="absolute left-0 top-0 h-12 w-12 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-blue-600 flex items-center justify-center z-10 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                            <span className="text-blue-600 font-black text-xs">{i + 1}</span>
                                        </div>
                                        
                                        <div className="p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl transition-all duration-300">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                <div>
                                                    <h4 className="text-xl font-black text-black dark:text-zinc-50">{m.role}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Clock size={12} className="text-zinc-400" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Target: {m.timeframe}</span>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="h-6 rounded-full border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest self-start md:self-center bg-zinc-50 dark:bg-zinc-800">
                                                    Phase {i === 0 ? "Evolution" : i === 1 ? "Expansion" : "Impact"}
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                                                {m.description}
                                            </p>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Target size={14} className="text-rose-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Required Skills to Bridge Gap:</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {m.missingSkills.map((skill, si) => (
                                                        <Badge key={si} className="bg-rose-500/10 text-rose-600 border-none text-[9px] font-bold px-3 py-1 rounded-full">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-zinc-500">Failed to generate insights. Please try again.</p>
                            <Button variant="ghost" onClick={fetchData} className="mt-4 text-blue-600 font-black uppercase text-[10px]">Retry Analysis</Button>
                        </div>
                    )}
                </div>

                <div className="p-8 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <p className="text-[10px] font-medium text-zinc-400 max-w-xs leading-tight">
                        Insights are generated by Super HR Intelligence Engine and should be used as a guide for career development discussions.
                    </p>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full font-bold text-xs px-6" onClick={onClose}>Close</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-xs px-8 shadow-xl shadow-blue-500/20">
                            Download Roadmap
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
