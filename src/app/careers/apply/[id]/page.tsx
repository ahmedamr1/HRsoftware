"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft,
    Upload,
    FileText,
    CheckCircle2,
    Loader2,
    Sparkles,
    Mail,
    Phone,
    Linkedin,
    Trash2,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const JOBS = [
    { id: "1", title: "Senior Frontend Engineer", dept: "Engineering" },
    { id: "2", title: "Product Designer", dept: "Design" },
    { id: "3", title: "Backend Lead (Node.js)", dept: "Engineering" },
    { id: "4", title: "HR Business Partner", dept: "People & Culture" },
];

export default function ApplyPage() {
    const { id } = useParams();
    const router = useRouter();
    const job = JOBS.find(j => j.id === id) || { title: "Open Position", dept: "General" };

    const [isParsing, setIsParsing] = useState(false);
    const [isParsed, setIsParsed] = useState(false);
    const [fileName, setFileName] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        notes: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setIsParsing(true);

            // Simulate AI Resume Parsing
            setTimeout(() => {
                setIsParsing(false);
                setIsParsed(true);
                setFormData({
                    ...formData,
                    name: "John Doe", // Mock parsed data
                    email: "john.doe@example.com",
                    linkedin: "linkedin.com/in/johndoe"
                });
                toast.success("AI parsed your resume! Fields have been pre-filled. depth.");
            }, 2500);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate application submission
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Application Submitted Successfully!", {
                description: "HR has been notified. We'll be in touch soon! depth."
            });
            // Redirect after delay
            setTimeout(() => router.push("/careers"), 3000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-left p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <Link href="/careers">
                    <Button variant="ghost" size="sm" className="gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-all">
                        <ArrowLeft size={16} /> Back to Careers
                    </Button>
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-black tracking-tighter text-black dark:text-zinc-50">Apply for Role</h1>
                            <Badge className="bg-blue-500/10 text-blue-600 border-none px-2 h-5 text-[9px] font-black uppercase tracking-widest">{job.dept}</Badge>
                        </div>
                        <p className="text-xl font-bold text-zinc-500 tracking-tight">{job.title}</p>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Sidebar / Info */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-2xl p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                                <Sparkles size={80} />
                            </div>
                            <div className="relative">
                                <h3 className="text-lg font-black tracking-tight mb-2">Save time with AI</h3>
                                <p className="text-xs text-blue-100 font-medium leading-relaxed">
                                    Upload your resume and our AI will instantly parse your work history, skills, and contact details. depth.
                                </p>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Application Process</h4>
                            {[
                                { step: 1, title: "Application Submission", desc: "You are here. depth." },
                                { step: 2, title: "Initial Screening", desc: "Our AI & HR team review your fit." },
                                { step: 3, title: "Technical Interview", desc: "Live coding or deep dive." },
                                { step: 4, title: "Culture & Value Fit", desc: "Meet the leadership team." },
                            ].map((s, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                                        {s.step}
                                    </div>
                                    <div>
                                        <p className={`text-xs font-black ${i === 0 ? 'text-black dark:text-white' : 'text-zinc-500'}`}>{s.title}</p>
                                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Form */}
                    <Card className="md:col-span-2 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-2xl">
                        <CardHeader className="p-8 border-b border-zinc-100 dark:border-zinc-900">
                            <CardTitle className="text-xl font-black tracking-tighter">Candidate Information</CardTitle>
                            <CardDescription className="text-xs font-medium">Please provide your details and upload your latest resume. depth.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            {/* Resume Upload Area */}
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">1. Resume Upload</Label>
                                <div className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center text-center gap-4 ${isParsed ? 'bg-emerald-500/5 border-emerald-500/50' : isParsing ? 'bg-blue-500/5 border-blue-500/50' : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50'}`}>
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                        onChange={handleFileUpload}
                                        disabled={isParsing}
                                    />

                                    <AnimatePresence mode="wait">
                                        {isParsing ? (
                                            <motion.div
                                                key="parsing"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="flex flex-col items-center gap-3"
                                            >
                                                <div className="relative">
                                                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                                                    <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-500 animate-pulse" />
                                                </div>
                                                <p className="text-sm font-black text-blue-600 animate-pulse tracking-tight uppercase">AI is parsing your history...</p>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">{fileName}</p>
                                            </motion.div>
                                        ) : isParsed ? (
                                            <motion.div
                                                key="parsed"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center gap-3"
                                            >
                                                <div className="h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                                    <CheckCircle2 size={24} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black text-emerald-600 tracking-tight uppercase">Resume Parsed Successfully!</p>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-[10px] text-zinc-500 font-bold uppercase">{fileName}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-rose-500 hover:bg-rose-50"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIsParsed(false);
                                                                setFileName("");
                                                            }}
                                                        >
                                                            <Trash2 size={12} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center gap-3"
                                            >
                                                <div className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-400 flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-700">
                                                    <Upload size={24} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black tracking-tight">Drop your resume here</p>
                                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">PDF, DOCX up to 10MB</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Details Area */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">2. Contact Details</Label>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Full Name</Label>
                                            <Input
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className={`h-12 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold rounded-xl transition-all ${isParsed ? 'border-emerald-500/20 ring-1 ring-emerald-500/10' : ''}`}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Email Address</Label>
                                            <div className="relative">
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={`h-12 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold rounded-xl pl-10 transition-all ${isParsed ? 'border-emerald-500/20 ring-1 ring-emerald-500/10' : ''}`}
                                                />
                                                <Mail size={14} className="absolute left-4 top-4 text-zinc-400" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Phone</Label>
                                            <div className="relative">
                                                <Input
                                                    id="phone"
                                                    placeholder="+1 (555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="h-12 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold rounded-xl pl-10"
                                                />
                                                <Phone size={14} className="absolute left-4 top-4 text-zinc-400" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="linkedin" className="text-[9px] font-black uppercase tracking-widest text-zinc-400">LinkedIn URL</Label>
                                            <div className="relative">
                                                <Input
                                                    id="linkedin"
                                                    placeholder="linkedin.com/in/..."
                                                    value={formData.linkedin}
                                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                                    className={`h-12 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold rounded-xl pl-10 transition-all ${isParsed ? 'border-emerald-500/20 ring-1 ring-emerald-500/10' : ''}`}
                                                />
                                                <Linkedin size={14} className="absolute left-4 top-4 text-zinc-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">3. Final Thoughts (Optional)</Label>
                                    <textarea
                                        className="w-full min-h-[100px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm font-bold text-black dark:text-zinc-50 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        placeholder="Anything else you'd like to share with us? depth."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>

                                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || isParsing}
                                        className="w-full h-14 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-2xl transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={16} className="animate-spin" />
                                                Processing Application...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={16} />
                                                Submit Application
                                            </div>
                                        )}
                                    </Button>
                                    <p className="text-[10px] text-center text-zinc-400 mt-4 font-bold uppercase tracking-widest">
                                        By submitting, you agree to our <Link href="#" className="underline">Privacy Policy</Link>. depth.
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
