"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search,
    MapPin,
    Briefcase,
    Clock,
    ChevronRight,
    Sparkles,
    Activity,
    Building2,
    Users,
    Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const JOBS = [
    {
        id: "1",
        title: "Senior Frontend Engineer",
        dept: "Engineering",
        location: "Remote / Dubai",
        type: "Full-time",
        salary: "$120k - $160k",
        description: "Join our core team building the next generation of AI-powered HR tools. depth."
    },
    {
        id: "2",
        title: "Product Designer",
        dept: "Design",
        location: "New York",
        type: "Full-time",
        salary: "$100k - $140k",
        description: "Focus on creating seamless, high-performance interfaces for global enterprises. depth."
    },
    {
        id: "3",
        title: "Backend Lead (Node.js)",
        dept: "Engineering",
        location: "London / Remote",
        type: "Full-time",
        salary: "$130k - $180k",
        description: "Architect scalable microservices and lead our data engineering efforts. depth."
    },
    {
        id: "4",
        title: "HR Business Partner",
        dept: "People & Culture",
        location: "Riyadh",
        type: "Full-time",
        salary: "$80k - $110k",
        description: "Shape the culture and operational excellence of our growing MENA team. depth."
    },
];

export default function CareersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDept, setFilterDept] = useState("All");

    const filteredJobs = JOBS.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.dept.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = filterDept === "All" || job.dept === filterDept;
        return matchesSearch && matchesDept;
    });

    const depts = ["All", ...Array.from(new Set(JOBS.map(j => j.dept)))];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-left selection:bg-blue-500 selection:text-white">
            {/* Nav */}
            <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                            <Zap className="text-white dark:text-black h-5 w-5" fill="currentColor" />
                        </div>
                        <span className="font-black tracking-tighter text-xl">Super HR</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Internal Dashboard</Link>
                        <Button className="h-9 px-4 rounded-lg bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[9px]">Apply Now</Button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="py-24 border-b border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                    <Sparkles size={400} className="text-blue-500" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl"
                    >
                        <Badge className="bg-blue-500/10 text-blue-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6">Open Roles</Badge>
                        <h1 className="text-6xl font-black tracking-tighter leading-[0.9] mb-6">
                            Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future of Work</span>.
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                            Join a team of visionaries, engineers, and designers building the software that powers the world's most innovative companies. depth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-20 bg-zinc-50 dark:bg-black">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                            placeholder="Search for roles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-14 pl-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-bold"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {depts.map(dept => (
                            <Button
                                key={dept}
                                variant={filterDept === dept ? "default" : "outline"}
                                onClick={() => setFilterDept(dept)}
                                className={`h-10 px-6 rounded-xl border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest transition-all ${filterDept === dept ? 'bg-black dark:bg-white' : ''}`}
                            >
                                {dept}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="group hover:border-blue-500/50 dark:hover:border-blue-500/30 transition-all bg-white dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row items-stretch md:items-center p-8 gap-8">
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className="text-[9px] font-black uppercase leading-none border-zinc-200 dark:border-zinc-800 text-zinc-500">{job.dept}</Badge>
                                                <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                                    <MapPin size={12} /> {job.location}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-black tracking-tight text-black dark:text-zinc-50 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                            <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-2xl">{job.description}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-6 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-900 pt-6 md:pt-0 md:pl-12 min-w-[200px]">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Package</p>
                                                <p className="text-lg font-black text-black dark:text-zinc-50 tabular-nums">{job.salary}</p>
                                            </div>
                                            <Button
                                                className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black group-hover:bg-blue-600 group-hover:text-white transition-all h-12 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 shadow-xl shadow-zinc-500/10"
                                                asChild
                                            >
                                                <Link href={`/careers/apply/${job.id}`}>
                                                    Apply Now <ChevronRight size={14} />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )) : (
                        <div className="py-20 text-center space-y-4 opacity-50">
                            <Activity className="mx-auto h-12 w-12 text-zinc-300" />
                            <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">No matching roles found.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200 dark:border-zinc-800 py-20 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
                    <div className="space-y-6 max-w-sm">
                        <div className="flex items-center gap-2">
                            <Zap className="h-6 w-6" fill="currentColor" />
                            <span className="font-black tracking-tighter text-xl">Super HR</span>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                            Empowering the next generation of digital-first organizations through intelligent human capital management. depth.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Platform</h4>
                            <ul className="space-y-2 text-xs font-bold text-zinc-400">
                                <li><Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Internal Dashboard</Link></li>
                                <li><Link href="/recruitment" className="hover:text-black dark:hover:text-white transition-colors">Recruitment Hub</Link></li>
                                <li><Link href="/performance" className="hover:text-black dark:hover:text-white transition-colors">Performance</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Legal</h4>
                            <ul className="space-y-2 text-xs font-bold text-zinc-400">
                                <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-zinc-100 dark:border-zinc-900">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">© 2026 Super HR Cloud Services. Built for Agents. depth.</p>
                </div>
            </footer>
        </div>
    );
}
