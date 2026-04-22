"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Send } from "lucide-react";

interface PerformanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeeName: string;
    role: string;
}

export function PerformanceModal({ isOpen, onClose, employeeName, role }: PerformanceModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent p={false} className="overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">Performance Review</DialogTitle>
                        <DialogDescription className="text-blue-100">
                            Evaluating {employeeName} ({role}) for Q1 2024.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6 text-black dark:text-zinc-50">
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Core Competencies</h4>
                        {[
                            { label: "Technical Proficiency", rating: 5 },
                            { label: "Communication", rating: 4 },
                            { label: "Leadership", rating: 4 },
                            { label: "Problem Solving", rating: 5 },
                        ].map((skill, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-sm">{skill.label}</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            size={14}
                                            fill={s <= skill.rating ? "#EAB308" : "none"}
                                            className={s <= skill.rating ? "text-yellow-500" : "text-zinc-300 dark:text-zinc-700"}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Feedback</h4>
                        <textarea
                            className="w-full min-h-[100px] p-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Provide detailed feedback on performance, strengths, and areas for improvement..."
                        />
                    </div>
                </div>

                <DialogFooter className="p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex w-full gap-2">
                        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            <Send className="mr-2 h-4 w-4" /> Submit Review
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
