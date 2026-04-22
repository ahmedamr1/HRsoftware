"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Briefcase, Users, MapPin, MoreHorizontal, Calendar as CalendarIcon, Filter, ExternalLink, Sparkles, BarChart3, MessageSquare, Globe } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export default function RecruitmentPage() {
    const jobs = [
        { id: "1", title: "Senior Frontend Engineer", dept: "Engineering", location: "Remote", type: "Full-time", candidates: 12, status: "Open" },
        { id: "2", title: "Product Designer", dept: "Design", location: "New York", type: "Full-time", candidates: 8, status: "Open" },
        { id: "3", title: "HR Business Partner", dept: "HR", location: "London", type: "Contract", candidates: 4, status: "Closed" },
    ];

    const handleAction = (action: string, title: string) => {
        toast.info(`${action} initiated for ${title}`);
    };

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Recruitment</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage your job openings and candidate pipeline.</p>
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="border-zinc-200 dark:border-zinc-800 font-black uppercase tracking-widest text-[10px] h-12 px-6 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95 gap-2"
                        asChild
                    >
                        <Link href="/careers">
                            <Globe size={16} className="text-blue-500" />
                            Public Career Page
                        </Link>
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 border-none px-6 transition-all active:scale-95 h-12 font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center"
                        asChild
                    >
                        <Link href="/recruitment/jobs">
                            <Plus className="mr-2 h-4 w-4" /> Create Job Posting
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {[
                    { title: "Active Jobs", value: "5", icon: Briefcase, color: "blue" },
                    { title: "Total Applicants", value: "43", icon: Users, color: "emerald" },
                    { title: "Interviews Today", value: "3", icon: CalendarIcon, color: "orange" },
                ].map((stat, i) => (
                    <Card key={i} className="group relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold tracking-tight text-zinc-500 uppercase">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 text-zinc-400 group-hover:text-blue-500 transition-colors`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-black dark:text-zinc-50 tracking-tighter">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* AI Intelligence Hub - Sub-sections */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-500/20 shadow-xl group overflow-hidden">
                    <CardHeader className="p-4 pb-2 border-b border-blue-500/10">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-600">Proactive Talent Discovery</CardTitle>
                            <Sparkles className="h-3 w-3 text-blue-600 animate-pulse" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-black dark:text-zinc-50">AI Outreach Engine</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Personalized sequences for top talent</p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg text-[10px] font-black uppercase tracking-widest px-6" asChild>
                            <Link href="/recruitment/outreach">Enter Workspace</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-lg group">
                    <CardHeader className="p-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-zinc-500">Recruitment Analytics</CardTitle>
                            <BarChart3 className="h-3 w-3 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-black dark:text-zinc-50">Hiring Intelligence</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Predictive forecasting & metrics</p>
                        </div>
                        <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black shadow-lg text-[10px] font-black uppercase tracking-widest px-6" asChild>
                            <Link href="/recruitment/analytics">View Reports</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-lg group">
                    <CardHeader className="p-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-zinc-500">Live Evaluation</CardTitle>
                            <MessageSquare className="h-3 w-3 text-zinc-400 group-hover:text-purple-500 transition-colors" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-black dark:text-zinc-50">Interview Workspace</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Collaborative panel reviews</p>
                        </div>
                        <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black shadow-lg text-[10px] font-black uppercase tracking-widest px-6" asChild>
                            <Link href="/recruitment/interview">Enter Panel</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-lg group">
                    <CardHeader className="p-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-zinc-500">Talent Sourcing</CardTitle>
                            <Globe className="h-3 w-3 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-black dark:text-zinc-50">Sourcing Hub</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Passive talent discovery</p>
                        </div>
                        <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black shadow-lg text-[10px] font-black uppercase tracking-widest px-6" asChild>
                            <Link href="/recruitment/sourcing">Enter Hub</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-lg group">
                    <CardHeader className="p-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-zinc-500">Referral Program</CardTitle>
                            <Users className="h-3 w-3 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-black dark:text-zinc-50">Referral Hub</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Internal talent & bonuses</p>
                        </div>
                        <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black shadow-lg text-[10px] font-black uppercase tracking-widest px-6" asChild>
                            <Link href="/recruitment/referrals">View Hub</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold">Job Postings</CardTitle>
                            <CardDescription>Roles currently active in the market.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 border-zinc-200 dark:border-zinc-800">
                            <Filter className="mr-2 h-3 w-3" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Job Title</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Department</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Location</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Applicants</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Status</TableHead>
                                <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.map((job) => (
                                <TableRow key={job.id} className="group hover:bg-zinc-100/30 dark:hover:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800 transition-colors">
                                    <TableCell>
                                        <Link
                                            href={`/recruitment/jobs/${job.id}`}
                                            className="font-bold text-sm text-black dark:text-zinc-50 hover:text-blue-600 transition-colors inline-flex items-center gap-2"
                                        >
                                            {job.title}
                                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-[10px] font-medium bg-zinc-100/50 dark:bg-zinc-800/50">
                                            {job.dept}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-zinc-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} />
                                            {job.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                            <span className="text-sm font-medium">{job.candidates}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={job.status === 'Open' ? 'success' : 'secondary'} className="rounded-full px-2 py-0 border-none font-bold text-[10px]">
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-blue-600 transition-colors">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl">
                                                <DropdownMenuLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Management</DropdownMenuLabel>
                                                <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => handleAction("Editing", job.title)}>
                                                    Modify Post
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => handleAction("Sharing", job.title)}>
                                                    Share External
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                                                <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => handleAction("Closing", job.title)}>
                                                    Close Role
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Centralized Candidate Database */}
            <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold">Recent Candidates</CardTitle>
                            <CardDescription>Consolidated view of applicants across all open roles. depth.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 border-zinc-200 dark:border-zinc-800">
                            <Users className="mr-2 h-3 w-3" /> All Candidates
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Candidate</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Applied Role</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Stage</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Applied</TableHead>
                                <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">AI Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { name: "Samantha Lee", role: "Product Designer", stage: "Interview", date: "2d ago", score: 92 },
                                { name: "John Doe", role: "Frontend Dev", stage: "Applied", date: "1h ago", score: 82 },
                                { name: "Maria Garcia", role: "Frontend Dev", stage: "Technical", date: "5d ago", score: 95 },
                                { name: "James Wilson", role: "Backend Lead", stage: "Offered", date: "1w ago", score: 88 }
                            ].map((cand, i) => (
                                <TableRow key={i} className="group hover:bg-zinc-100/30 dark:hover:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black border border-zinc-200 dark:border-zinc-700">
                                                {cand.name[0]}
                                            </div>
                                            <span className="font-bold text-sm text-black dark:text-zinc-50">{cand.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{cand.role}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-none font-bold text-[9px] uppercase tracking-widest">
                                            {cand.stage}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">{cand.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={`bg-transparent border-none font-black text-sm tracking-tighter ${cand.score > 90 ? 'text-emerald-500' : 'text-blue-500'}`}>
                                            {cand.score}%
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
