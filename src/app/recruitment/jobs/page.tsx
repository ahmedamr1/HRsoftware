"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Plus, Briefcase, Sparkles, Brain, Zap,
    ArrowLeft, Search, Filter, MoreHorizontal,
    Globe, ShieldAlert, BarChart3, Target,
    Languages, CheckCircle2, TrendingUp, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function JobsArchitecturePage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [jdDraft, setJdDraft] = useState("");
    const [roleTitle, setRoleTitle] = useState("");
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const activeJobs = [
        { id: 1, title: "Senior Frontend Engineer", dept: "Engineering", applicants: 24, status: "Active", match: "High" },
        { id: 2, title: "Product Designer", dept: "Design", applicants: 12, status: "Draft", match: "Searching" },
        { id: 3, title: "Backend Lead (Node.js)", dept: "Engineering", applicants: 8, status: "Active", match: "Critical" },
    ];

    const JOB_TEMPLATES = [
        { title: "Senior Frontend Engineer", dept: "Engineering", level: "L6", skills: ["React", "TypeScript", "Next.js"] },
        { title: "Product Manager", dept: "Product", level: "L5", skills: ["Product Strategy", "User Research", "Agile"] },
        { title: "HR Business Partner", dept: "HR", level: "L4", skills: ["Employee Relations", "HR Policy", "Performance"] },
    ];

    const generateJD = () => {
        if (!roleTitle) {
            toast.error("Please enter a role title first.");
            return;
        }
        setIsGenerating(true);
        setTimeout(() => {
            setJdDraft(`# ${roleTitle}\n\n## About the Role\nWe are looking for a visionary ${roleTitle} to join our AI-Native HR transformation team. You will be responsible for building high-performance, intelligent interfaces...\n\n## Key Responsibilities\n- Design and implement scalable architecture.\n- Collaborate with AI agents to optimize throughput.\n- Mentor junior developers on clean code and design patterns.\n\n## Required Skills\n- 5+ years of experience in relevant technologies.\n- Strong understanding of AI/ML integration.\n- Excellent communication and leadership skills.`);
            setIsGenerating(false);
            toast.success("AI JD Draft Generated!", {
                icon: <Sparkles className="h-4 w-4 text-amber-500" />
            });
        }, 2000);
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
                            Job Architecture
                            <Badge className="bg-amber-500/10 text-amber-600 border-none text-[10px] uppercase font-black px-2 mt-1">AI-Powered</Badge>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Manage postings and architect roles with market intelligence.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="h-12 border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest px-6 rounded-xl gap-2"
                        onClick={() => setShowAnalytics(true)}
                    >
                        <BarChart3 className="h-4 w-4" /> Analytics
                    </Button>
                    <Button
                        variant="outline"
                        className="h-12 border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest px-6 rounded-xl gap-2"
                        onClick={() => setShowSettings(true)}
                    >
                        <Target className="h-4 w-4" /> Settings
                    </Button>
                    <Button className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black font-black uppercase tracking-widest text-[10px] px-6 h-12 shadow-xl rounded-xl">
                        <Briefcase className="mr-2 h-4 w-4" /> Global Job Library
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Job List */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                        <CardHeader className="p-4 bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-100 dark:border-zinc-800 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-black uppercase tracking-tighter text-zinc-500">Active Roles</CardTitle>
                            <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-black uppercase">3 Positions</Badge>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {activeJobs.map((job) => (
                                    <div key={job.id} className="p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer group">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-black text-black dark:text-zinc-50 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{job.title}</p>
                                            <Badge variant={job.status === 'Active' ? 'success' : 'secondary'} className="text-[8px] font-black uppercase border-none">
                                                {job.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{job.dept}</p>
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{job.applicants} Applicants</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:rotate-12 transition-transform">
                            <BarChart3 size={80} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-100 mb-2">Market Benchmarking</h4>
                        <div className="text-3xl font-black tracking-tighter mb-4">$145k - $180k</div>
                        <p className="text-[10px] text-indigo-200 leading-relaxed font-medium uppercase tracking-widest italic">AI suggests +5% increase based on recent competitive hiring trends in remote tech.</p>
                        <Button variant="ghost" className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest h-10 border-none">
                            Deep Market Audit
                        </Button>
                    </Card>
                </div>

                {/* Right Column: AI Architect Workspace */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl min-h-[600px] flex flex-col">
                        <CardHeader className="bg-zinc-50/30 dark:bg-zinc-900/10 border-b border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl font-black uppercase tracking-tighter">AI Job Architect</CardTitle>
                                    <CardDescription className="text-xs">Forge the perfect role with AI-optimized descriptions and requirements.</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-black uppercase tracking-widest">D&I Safe</Badge>
                                    <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-black uppercase tracking-widest">SEO Optimized</Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8 flex-1">
                            {/* Template Phase */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Quick Templates (Phase 1)</label>
                                <div className="flex flex-wrap gap-3">
                                    {JOB_TEMPLATES.map((template) => (
                                        <Button
                                            key={template.title}
                                            variant="outline"
                                            onClick={() => {
                                                setRoleTitle(template.title);
                                                setJdDraft(`# ${template.title}\n\n## Department: ${template.dept}\n## Level: ${template.level}\n\n## Overview\nWe are seeking a ${template.title} to join our ${template.dept} team. depth.\n\n## Recommended Skills\n${template.skills.map(s => `- ${s}`).join('\n')}`);
                                                toast.success(`${template.title} template applied!`);
                                            }}
                                            className="h-auto py-2 px-4 flex flex-col items-start gap-1 border-zinc-100 dark:border-zinc-800 hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left group"
                                        >
                                            <span className="text-[11px] font-black text-black dark:text-zinc-50 group-hover:text-blue-600">{template.title}</span>
                                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{template.dept} • {template.level}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Input Phase */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Position Title</label>
                                    <div className="relative">
                                        <Input
                                            placeholder="e.g. Staff Software Engineer"
                                            value={roleTitle}
                                            onChange={(e) => setRoleTitle(e.target.value)}
                                            className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 px-4 font-bold"
                                        />
                                        <Sparkles className="absolute right-3 top-3.5 h-4 w-4 text-amber-500 animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Seniority & Level</label>
                                    <div className="flex gap-2">
                                        {['L4', 'L5', 'L6', 'Lead'].map((level) => (
                                            <Button key={level} variant="outline" className="flex-1 h-12 text-[10px] font-black uppercase tracking-widest border-zinc-100 dark:border-zinc-800">{level}</Button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Skills Tagging */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center justify-between">
                                    Automated Competency Mapping
                                    <Button variant="ghost" size="sm" className="h-4 text-[8px] text-blue-600 hover:text-blue-700 p-0">Customize Weights →</Button>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['System Design', 'React / Next.js', 'AI Integration', 'Team Mentorship', 'Scalability', 'TypeScript'].map((skill) => (
                                        <Badge key={skill} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-none px-3 py-1 text-[10px] font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                                            {skill}
                                        </Badge>
                                    ))}
                                    <Button size="sm" variant="outline" className="h-7 w-7 rounded-lg border-dashed border-zinc-300 dark:border-zinc-700">+</Button>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 h-full flex flex-col">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">JD Composition Workspace</label>
                                    <Button
                                        onClick={generateJD}
                                        disabled={isGenerating}
                                        className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-6 font-black uppercase tracking-widest text-[9px] rounded-lg shadow-lg shadow-blue-500/10"
                                    >
                                        {isGenerating ? <Zap size={14} className="animate-spin mr-2" /> : <Brain size={14} className="mr-2" />}
                                        Forge JD
                                    </Button>
                                </div>
                                <div className="flex-1 relative min-h-[400px]">
                                    <Textarea
                                        placeholder="Start typing or use AI to forge the perfect JD..."
                                        value={jdDraft}
                                        onChange={(e) => setJdDraft(e.target.value)}
                                        className="h-full min-h-[400px] w-full bg-zinc-50/30 dark:bg-zinc-900/30 border-zinc-100 dark:border-zinc-800 p-6 rounded-2xl text-sm leading-relaxed outline-none"
                                    />

                                    {/* Real-time D&I Scan Pop-up */}
                                    <div className="absolute bottom-4 right-4 max-w-[240px]">
                                        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[8px] font-black uppercase">D&I Analysis</Badge>
                                                <ShieldAlert size={12} className="text-emerald-500" />
                                            </div>
                                            <p className="text-[10px] font-medium leading-tight text-zinc-500 italic">
                                                "Language analysis shows neutral gender coding. Tone is highly inclusive."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-6 bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                    <Languages size={14} className="text-zinc-400" /> Multi-Language
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-l border-zinc-200 dark:border-zinc-800 pl-4">
                                    <Globe size={14} className="text-zinc-400" /> Remote First
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="rounded-xl px-6 text-[10px] font-black uppercase tracking-widest h-10 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={() => {
                                        toast.info("Draft Saved", {
                                            description: `Requirement for ${roleTitle || 'New Role'} has been archived. depth.`
                                        });
                                    }}
                                >
                                    Save Draft
                                </Button>
                                <Button
                                    className="rounded-xl bg-amber-600 text-white hover:bg-amber-700 px-10 text-[10px] font-black uppercase tracking-widest h-10 shadow-xl shadow-amber-500/20"
                                    onClick={() => {
                                        toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
                                            loading: 'Sending to HRPB for approval...',
                                            success: 'Requisition sent for approval! Admin will review within 24h. depth.',
                                            error: 'Failed to send requisition'
                                        });
                                    }}
                                >
                                    Request Approval
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Reporting Preview - Phase 2 */}
                    <div className="grid grid-cols-2 gap-6">
                        <Card className="bg-white/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                                    <Clock size={12} className="text-blue-500" /> Time to Hire
                                </h4>
                                <div className="text-4xl font-black tracking-tighter">18.4 <span className="text-sm text-zinc-400 font-bold uppercase">Days</span></div>
                            </div>
                            <p className="text-[9px] font-medium text-emerald-500 uppercase tracking-widest mt-4">↓ 12% from last quarter</p>
                        </Card>
                        <Card className="bg-white/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                                    <Target size={12} className="text-purple-500" /> Source ROI
                                </h4>
                                <div className="text-4xl font-black tracking-tighter">92% <span className="text-sm text-zinc-400 font-bold uppercase">Fit</span></div>
                            </div>
                            <p className="text-[9px] font-medium text-blue-500 uppercase tracking-widest mt-4">Top Source: LinkedIn (Outreach)</p>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Analytics Modal */}
            <AnimatePresence>
                {showAnalytics && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setShowAnalytics(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-950 z-10">
                                <div>
                                    <h3 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50 flex items-center gap-3">
                                        <BarChart3 className="h-8 w-8 text-blue-600" />
                                        Job Analytics Dashboard
                                    </h3>
                                    <p className="text-sm text-zinc-500 mt-1">Real-time insights for Senior Frontend Engineer</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setShowAnalytics(false)} className="rounded-full">
                                    <Plus className="rotate-45 h-6 w-6" />
                                </Button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 space-y-8">
                                {/* Application Funnel */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Application Funnel</h4>
                                    <div className="space-y-3">
                                        {[
                                            { stage: "Job Views", count: 1240, percent: 100, color: "bg-blue-500" },
                                            { stage: "Applications", count: 186, percent: 15, color: "bg-purple-500" },
                                            { stage: "Screened", count: 48, percent: 26, color: "bg-amber-500" },
                                            { stage: "Interviewed", count: 12, percent: 25, color: "bg-emerald-500" },
                                            { stage: "Offers", count: 3, percent: 25, color: "bg-rose-500" },
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-black">{item.stage}</span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-bold text-zinc-400">{item.count} candidates</span>
                                                        <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-none text-[10px] font-black">
                                                            {item.percent}%
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="h-3 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                                    <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${item.percent}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Metrics Grid */}
                                <div className="grid grid-cols-3 gap-6">
                                    <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
                                        <CardContent className="p-6 space-y-2">
                                            <h5 className="text-[9px] font-black uppercase tracking-widest text-blue-600">Time to Fill</h5>
                                            <p className="text-4xl font-black tracking-tighter">18.4 <span className="text-sm text-zinc-400">days</span></p>
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase">↓ 12% vs avg</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
                                        <CardContent className="p-6 space-y-2">
                                            <h5 className="text-[9px] font-black uppercase tracking-widest text-purple-600">Quality Score</h5>
                                            <p className="text-4xl font-black tracking-tighter">92 <span className="text-sm text-zinc-400">/ 100</span></p>
                                            <p className="text-[10px] font-bold text-blue-500 uppercase">AI-Matched Fit</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
                                        <CardContent className="p-6 space-y-2">
                                            <h5 className="text-[9px] font-black uppercase tracking-widest text-amber-600">Cost per Hire</h5>
                                            <p className="text-4xl font-black tracking-tighter">$2.4 <span className="text-sm text-zinc-400">K</span></p>
                                            <p className="text-[10px] font-bold text-emerald-500 uppercase">↓ 8% vs budget</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Source Performance */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Top Performing Sources</h4>
                                    <div className="space-y-3">
                                        {[
                                            { source: "LinkedIn (Outreach)", apps: 78, quality: 94, color: "text-blue-600" },
                                            { source: "Company Website", apps: 52, quality: 88, color: "text-purple-600" },
                                            { source: "Employee Referrals", apps: 31, quality: 96, color: "text-emerald-600" },
                                            { source: "Indeed", apps: 25, quality: 72, color: "text-amber-600" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                                                <div className="flex items-center gap-4">
                                                    <div className={`h-10 w-10 rounded-full ${item.color.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                                                        <Globe className={`h-5 w-5 ${item.color}`} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black">{item.source}</p>
                                                        <p className="text-[10px] text-zinc-400 font-bold uppercase">{item.apps} applications</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black">{item.quality}%</p>
                                                    <p className="text-[9px] text-zinc-400 font-bold uppercase">Quality</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Diversity Insights */}
                                <div className="grid grid-cols-2 gap-6">
                                    <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Diversity Breakdown</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {[
                                                { label: "Women", percent: 42 },
                                                { label: "Underrepresented", percent: 28 },
                                                { label: "Veterans", percent: 8 },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <span className="text-xs font-bold">{item.label}</span>
                                                    <span className="text-sm font-black">{item.percent}%</span>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Salary Benchmarking</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold">Your Range</span>
                                                <span className="text-sm font-black">$120K - $160K</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold">Market Avg</span>
                                                <span className="text-sm font-black text-blue-600">$135K</span>
                                            </div>
                                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-black w-full justify-center">
                                                Competitive Range
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setShowSettings(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-950 z-10">
                                <div>
                                    <h3 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50 flex items-center gap-3">
                                        <Target className="h-8 w-8 text-purple-600" />
                                        Job Settings
                                    </h3>
                                    <p className="text-sm text-zinc-500 mt-1">Configure posting preferences and automation</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} className="rounded-full">
                                    <Plus className="rotate-45 h-6 w-6" />
                                </Button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 space-y-8">
                                {/* Visibility Settings */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Posting Visibility</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {["Public", "Private", "Internal Only"].map((option) => (
                                            <button
                                                key={option}
                                                className="p-4 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
                                            >
                                                <p className="text-sm font-black group-hover:text-blue-600">{option}</p>
                                                <p className="text-[9px] text-zinc-400 font-bold uppercase mt-1">
                                                    {option === "Public" ? "All platforms" : option === "Private" ? "Link only" : "Employees"}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Screening Questions */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Custom Screening Questions</h4>
                                    <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-bold">Years of React experience?</p>
                                                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase">Edit</Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-bold">Portfolio or GitHub link?</p>
                                                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase">Edit</Button>
                                            </div>
                                            <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest">
                                                <Plus size={14} className="mr-2" /> Add Question
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Auto-Rejection Rules */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">AI Auto-Rejection Rules</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                    <Brain className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black">Minimum 3 years experience</p>
                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Active</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-black">ON</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                                    <Sparkles className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black">Must have React + TypeScript</p>
                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Active</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px] font-black">ON</Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Job Board Syndication */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Job Board Syndication</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["LinkedIn", "Indeed", "Glassdoor", "AngelList"].map((board) => (
                                            <div key={board} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                                <span className="text-sm font-black">{board}</span>
                                                <div className="h-6 w-11 rounded-full bg-blue-600 flex items-center justify-end px-1">
                                                    <div className="h-4 w-4 rounded-full bg-white" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="flex gap-3 pt-4">
                                    <Button variant="outline" className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest" onClick={() => setShowSettings(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-zinc-950 dark:bg-white text-white dark:text-black shadow-xl" onClick={() => {
                                        toast.success("Settings saved successfully!");
                                        setShowSettings(false);
                                    }}>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
