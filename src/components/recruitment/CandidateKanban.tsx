"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star, ArrowRight, Sparkles, Brain, Search, Filter, Zap } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { AIRecommendationCard } from "./AIRecommendationCard";
import { Input } from "@/components/ui/input";
import { CandidateDetailView } from "./CandidateDetailView";

const STAGES = ["Applied", "Screening", "Interview", "Technical", "Offered"];

const INITIAL_CANDIDATES = [
    {
        id: "1", name: "Alex Rivera", stage: "Screening", role: "Frontend Dev", score: 85,
        skills: ["React", "TypeScript", "Tailwind"], gaps: ["GraphQL", "Next.js"],
        sentiment: "Highly Enthusiastic", aiSummary: "Strong match for React and TypeScript requirements.",
        isDuplicate: false, referral: null
    },
    {
        id: "2", name: "Samantha Lee", stage: "Interview", role: "Frontend Dev", score: 92,
        skills: ["React", "Node.js", "System Design"], gaps: ["Unit Testing"],
        sentiment: "Confident & Precise", aiSummary: "Perfect score on technical assessment.",
        isDuplicate: false, referral: "Sarah Smith"
    },
    {
        id: "3", name: "Jordan Smith", stage: "Screening", role: "Frontend Dev", score: 78,
        skills: ["JavaScript", "CSS", "Figma"], gaps: ["TypeScript", "Performance"],
        sentiment: "Curious learner", aiSummary: "Good culture fit, needs technical review.",
        isDuplicate: true, referral: null
    },
    {
        id: "4", name: "Maria Garcia", stage: "Technical", role: "Frontend Dev", score: 95,
        skills: ["Next.js", "Server Components", "Prisma"], gaps: ["Native Apps"],
        sentiment: "Expert level", aiSummary: "Exceptional portfolio projects.",
        isDuplicate: false, referral: "Chris Evans"
    },
    {
        id: "5", name: "John Doe", stage: "Applied", role: "Frontend Dev", score: 82,
        skills: ["React", "CSS", "TypeScript"], gaps: ["Testing"],
        sentiment: "Enthusiastic", aiSummary: "Recently applied via Career Portal. depth.",
        isDuplicate: false, referral: null
    },
];

export function CandidateKanban() {
    const [selectedCandidate, setSelectedCandidate] = useState<typeof INITIAL_CANDIDATES[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [booleanMode, setBooleanMode] = useState(false);

    const filteredCandidates = INITIAL_CANDIDATES.filter(c => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();

        if (booleanMode) {
            // Simplified Boolean Logic simulation: if query contains AND, check all parts
            if (query.includes(" and ")) {
                const parts = query.split(" and ");
                return parts.every(p =>
                    c.name.toLowerCase().includes(p.trim()) ||
                    c.skills.some(s => s.toLowerCase().includes(p.trim())) ||
                    c.aiSummary.toLowerCase().includes(p.trim())
                );
            }
            // If query contains OR, check any part
            if (query.includes(" or ")) {
                const parts = query.split(" or ");
                return parts.some(p =>
                    c.name.toLowerCase().includes(p.trim()) ||
                    c.skills.some(s => s.toLowerCase().includes(p.trim())) ||
                    c.aiSummary.toLowerCase().includes(p.trim())
                );
            }
        }

        return c.name.toLowerCase().includes(query) ||
            c.skills.some(s => s.toLowerCase().includes(query)) ||
            c.aiSummary.toLowerCase().includes(query);
    });

    return (
        <div className="space-y-4 h-full flex flex-col">
            {/* Search & Tooling Toolbar */}
            <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/30 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="relative flex-1">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${booleanMode ? 'text-blue-500' : 'text-zinc-400'}`} />
                    <Input
                        placeholder={booleanMode ? "Boolean Search: 'React AND (TypeScript OR Node)'" : "Search candidates..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`pl-10 h-10 bg-white/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 rounded-lg text-sm transition-all ${booleanMode ? 'ring-2 ring-blue-500/20 border-blue-500/50' : ''}`}
                    />
                    {booleanMode && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <Badge className="bg-blue-600 text-white border-none text-[8px] font-black uppercase tracking-widest px-1.5 h-4">Advanced Logic</Badge>
                        </div>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setBooleanMode(!booleanMode);
                        toast.info(booleanMode ? "Standard Search Enabled" : "Boolean Search Mode Activated (Phase 2 Filter)");
                    }}
                    className={`h-10 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2 transition-all ${booleanMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'}`}
                >
                    {booleanMode ? <Zap size={14} /> : <Filter size={14} />}
                    {booleanMode ? "Complex Logic" : "Boolean Search"}
                </Button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 flex-1 min-h-0">
                {STAGES.map((stage) => (
                    <div key={stage} className="flex-shrink-0 w-80 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col">
                        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{stage}</h3>
                            <Badge variant="secondary" className="font-mono text-[10px]">{filteredCandidates.filter(c => c.stage === stage).length}</Badge>
                        </div>
                        <div className="p-2 space-y-3 flex-1 overflow-y-auto">
                            {filteredCandidates.filter(c => c.stage === stage).map(candidate => (
                                <Card
                                    key={candidate.id}
                                    onClick={() => setSelectedCandidate(candidate)}
                                    className="cursor-pointer hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all bg-white dark:bg-black group shadow-sm hover:shadow-md border-zinc-200 dark:border-zinc-800"
                                >
                                    <CardContent className="p-3 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6 ring-2 ring-zinc-50 dark:ring-zinc-900">
                                                    <AvatarFallback className="text-[10px] font-bold">{candidate.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-black text-black dark:text-zinc-50 tracking-tight">{candidate.name}</span>
                                                        {candidate.isDuplicate && (
                                                            <Badge className="bg-rose-500/10 text-rose-600 border-none text-[8px] font-black uppercase px-1 h-3.5">DUPE</Badge>
                                                        )}
                                                        {candidate.referral && (
                                                            <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-black uppercase px-1 h-3.5">REF</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-zinc-500 font-medium lowercase tracking-widest italic">
                                                        {candidate.referral ? `via ${candidate.referral}` : candidate.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); /* Menu logic */ }}>
                                                <MoreHorizontal size={14} />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex -space-x-1.5 overflow-hidden">
                                                {candidate.skills.slice(0, 2).map((skill, i) => (
                                                    <div key={i} className="h-4 px-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-white dark:border-zinc-900 text-[8px] font-bold text-zinc-500 uppercase flex items-center">
                                                        {skill}
                                                    </div>
                                                ))}
                                                {candidate.skills.length > 2 && (
                                                    <div className="h-4 px-1 rounded-full bg-blue-500/10 border border-white dark:border-zinc-900 text-[8px] font-bold text-blue-600 flex items-center">
                                                        +{candidate.skills.length - 2}
                                                    </div>
                                                )}
                                            </div>

                                            {candidate.stage === 'Offered' ? (
                                                <Button
                                                    size="sm"
                                                    className="h-7 px-3 text-[10px] font-black bg-blue-600 hover:bg-blue-700 text-white gap-1 transition-all active:scale-95 uppercase tracking-widest"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
                                                            loading: `Hiring ${candidate.name}...`,
                                                            success: `${candidate.name} has been hired and moved to onboarding!`,
                                                            error: 'Failed to complete hiring'
                                                        });
                                                    }}
                                                >
                                                    Hire <ArrowRight size={10} />
                                                </Button>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 px-2 text-[8px] font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-1 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedCandidate(candidate);
                                                            // Logic to open feedback tab can be handled in the detail view via a prop if needed, 
                                                            // but for now we just open the profile.
                                                        }}
                                                    >
                                                        Complete Feedback
                                                    </Button>
                                                    <div
                                                        className="flex items-center gap-1.5 bg-blue-500/10 group-hover:bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/20 transition-all group/score"
                                                    >
                                                        <Sparkles size={10} className="text-blue-500 animate-pulse" />
                                                        <span className="text-[10px] font-black text-blue-600">{candidate.score}%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedCandidate && (
                <CandidateDetailView
                    candidate={selectedCandidate}
                    onClose={() => setSelectedCandidate(null)}
                />
            )}
        </div>
    );
}
