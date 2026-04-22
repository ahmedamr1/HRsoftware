"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Star,
    CheckCircle2,
    XCircle,
    MessageSquare,
    ShieldCheck,
    Brain,
    Users,
    ChevronRight,
    Loader2
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackFormProps {
    candidateName: string;
    roleName: string;
    onSuccess: () => void;
}

export function InterviewFeedbackForm({ candidateName, roleName, onSuccess }: FeedbackFormProps) {
    const [rating, setRating] = useState(0);
    const [technicalScore, setTechnicalScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Feedback Submitted!", {
                description: `Your evaluation for ${candidateName} has been recorded. depth.`
            });
            onSuccess();
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div>
                    <h3 className="text-lg font-black tracking-tight text-black dark:text-zinc-50">{candidateName}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{roleName} • Feedback Form</p>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${step >= i ? 'bg-blue-600' : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Overall Impression</Label>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all ${rating >= star ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-400 border border-zinc-200 dark:border-zinc-800'}`}
                                    >
                                        <Star size={20} fill={rating >= star ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Recommendation</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    className="h-14 rounded-2xl border-emerald-500/20 text-emerald-600 hover:bg-emerald-50 bg-emerald-500/5 font-black uppercase tracking-widest text-[10px] gap-2"
                                >
                                    <CheckCircle2 size={16} /> Strong Hire
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-14 rounded-2xl border-rose-500/20 text-rose-600 hover:bg-rose-50 bg-rose-500/5 font-black uppercase tracking-widest text-[10px] gap-2"
                                >
                                    <XCircle size={16} /> Decisive No
                                </Button>
                            </div>
                        </div>
                        <Button className="w-full h-12 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] rounded-xl" onClick={() => setStep(2)}>
                            Next Section <ChevronRight size={14} className="ml-2" />
                        </Button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Technical Depth (1-10)</Label>
                            <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl">
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    value={technicalScore}
                                    onChange={(e) => setTechnicalScore(parseInt(e.target.value))}
                                    className="flex-1 accent-blue-600 h-2 rounded-full cursor-pointer"
                                />
                                <span className="ml-6 text-2xl font-black tabular-nums">{technicalScore}/10</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Specific Skills Evaluated</Label>
                            <div className="flex flex-wrap gap-2">
                                {["Architecture", "Clean Code", "React Internals", "Testing"].map(skill => (
                                    <Badge key={skill} variant="secondary" className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-none text-[9px] font-black uppercase">{skill}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" className="flex-1 h-12 font-black uppercase tracking-widest text-[10px]" onClick={() => setStep(1)}>Back</Button>
                            <Button className="flex-[2] h-12 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] rounded-xl" onClick={() => setStep(3)}>Next: Notes</Button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Detailed Feedback</Label>
                            <Textarea
                                placeholder="What stood out during the conversation? Mention any red flags or areas of excellence. depth."
                                className="min-h-[160px] bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm font-bold"
                            />
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-start gap-3">
                            <ShieldCheck className="text-blue-600 mt-1" size={18} />
                            <p className="text-[10px] text-blue-600 font-bold leading-relaxed uppercase">
                                This feedback will be shared with the hiring panel but remains hidden from the candidate. depth.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="ghost" className="flex-1 h-12 font-black uppercase tracking-widest text-[10px]" onClick={() => setStep(2)}>Back</Button>
                            <Button
                                className="flex-[2] h-12 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] rounded-xl shadow-2xl transition-all active:scale-[0.98]"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Submit Evaluation"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
