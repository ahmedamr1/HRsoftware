"use client";

import { Bell, Search, Command, Sparkles, LogOut, User, FileWarning, Calendar, ArrowRight, ExternalLink, Laptop } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { employees } from "@/app/employees/data";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export function Header() {
    const { userRole, logout } = useAuth();
    const router = useRouter();
    const isAdmin = userRole === "admin";

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [globalAssets, setGlobalAssets] = useState<any[]>([]);

    useEffect(() => {
        if (isAdmin) {
            fetch('/api/assets')
                .then(res => res.json())
                .then(data => setGlobalAssets(data))
                .catch(() => {});
        }
    }, [isAdmin]);

    const searchValues = (obj: any, query: string): boolean => {
        if (!query) return false;
        const q = query.toLowerCase();
        for (const key in obj) {
            const val = obj[key];
            if (typeof val === 'string' && val.toLowerCase().includes(q)) return true;
            if (typeof val === 'number' && val.toString().includes(q)) return true;
            if (Array.isArray(val) && val.some(v => typeof v === 'string' && v.toLowerCase().includes(q))) return true;
        }
        return false;
    };

    const systemPages = [
        { label: "Dashboard", href: "/", type: "Page" },
        { label: "Profile", href: "/profile", type: "Page" },
        { label: "Time Off", href: "/time-off", type: "Page" },
        { label: "Employees", href: "/employees", type: "Page" },
        { label: "Recruitment", href: "/recruitment", type: "Page" },
        { label: "Payroll", href: "/payroll", type: "Page" },
        { label: "Performance", href: "/performance", type: "Page" },
        { label: "Culture & Pulse", href: "/culture", type: "Page" },
        { label: "Onboarding", href: "/onboarding", type: "Page" },
        { label: "Offboarding", href: "/offboarding", type: "Page" },
        { label: "Assets", href: "/assets", type: "Page" },
        { label: "Org Chart", href: "/org-chart", type: "Page" },
        { label: "Settings", href: "/settings", type: "Page" }
    ];

    const notifications = [
        { id: 1, title: "System Update: Omni-Search", desc: "Global advanced search is now live. Try searching for any route or data.", time: "10m ago", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-500/10" },
        { id: 2, title: "Q3 Pulse Survey", desc: "The new quarterly culture pulse survey is ready to take.", time: "2h ago", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10" },
        { id: 3, title: "Policy Update", desc: "Remote work guidelines have been updated for 2026.", time: "1d ago", icon: FileWarning, color: "text-amber-500", bg: "bg-amber-500/10" }
    ];

    const filteredPages = systemPages.filter(p => 
        p.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredEmployees = employees.filter(e => searchValues(e, searchQuery));
    const filteredAssets = globalAssets.filter(a => searchValues(a, searchQuery));
    
    // Simulate finding the current employee if role is employee
    // In a real app, this would come from the auth context
    const currentEmployee = employees.find(e => e.id === "4"); 
    
    const adminRenewals = employees.filter(e => {
        if (!e.contractRenewalDate) return false;
        const monthsDiff = (new Date(e.contractRenewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.5);
        return monthsDiff > 0 && monthsDiff <= 2;
    });

    const userRenewalSoon = userRole === 'employee' && currentEmployee?.contractRenewalDate ? (
        ((new Date(currentEmployee.contractRenewalDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30.5)) <= 2
    ) : false;

    return (
        <>
            <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="w-96 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors z-10" />
                        <Input
                            placeholder={isAdmin ? "Search employees, assets... (⌘K)" : "Type to search (⌘K)"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                            className={`pl-9 pr-12 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-full h-9 text-xs font-medium focus-visible:ring-2 focus-visible:ring-blue-500 transition-all relative z-10 ${isAdmin && isSearchFocused ? 'bg-white dark:bg-zinc-950 shadow-sm' : ''}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-[10px] text-zinc-400 font-black z-10">
                            <Command size={10} />
                            <span>K</span>
                        </div>

                        {/* Global Search Autocomplete Dropdown */}
                        <AnimatePresence>
                            {isAdmin && isSearchFocused && searchQuery.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50"
                                >
                                    <div className="p-2 overflow-y-auto max-h-[300px]">
                                        {filteredPages.length > 0 && (
                                            <div className="mb-2">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2 mb-1">System Navigation</p>
                                                {filteredPages.map(page => (
                                                    <div 
                                                        key={page.href} 
                                                        onClick={() => router.push(page.href)}
                                                        className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <div className="h-8 w-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                                            <ExternalLink size={14} />
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <p className="text-sm font-bold text-black dark:text-zinc-50 truncate">{page.label}</p>
                                                            <p className="text-[10px] text-zinc-500 truncate">{page.type} Route</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {filteredEmployees.length > 0 && (
                                            <div className="mb-2">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2 mb-1">Employees</p>
                                                {filteredEmployees.map(emp => (
                                                    <div 
                                                        key={emp.id} 
                                                        onClick={() => router.push(`/employees/${emp.id}`)}
                                                        className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs shrink-0">
                                                            {emp.firstName[0]}{emp.lastName[0]}
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <p className="text-sm font-bold text-black dark:text-zinc-50 truncate">{emp.firstName} {emp.lastName}</p>
                                                            <p className="text-[10px] text-zinc-500 truncate">{emp.role} • {emp.department}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {filteredAssets.length > 0 && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2 mb-1">Assets</p>
                                                {filteredAssets.map(asset => (
                                                    <div 
                                                        key={asset.id} 
                                                        onClick={() => router.push(`/assets`)}
                                                        className="flex items-center gap-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                                            <Laptop size={14} />
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <p className="text-sm font-bold text-black dark:text-zinc-50 truncate">{asset.name || asset.category}</p>
                                                            <p className="text-[10px] text-zinc-500 truncate">S/N: {asset.serialNumber} • {asset.status}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {filteredPages.length === 0 && filteredEmployees.length === 0 && filteredAssets.length === 0 && (
                                            <div className="p-4 text-center">
                                                <p className="text-xs text-zinc-500">No results found for "{searchQuery}"</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-600 border-none text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 animate-pulse hidden lg:flex items-center gap-2">
                        <Sparkles size={10} />
                        AI-Native Mode
                    </Badge>
                    {userRole === 'admin' && adminRenewals.length > 0 && (
                        <Badge 
                            className="bg-rose-500/10 text-rose-600 border-rose-200 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 animate-pulse flex items-center gap-2 cursor-pointer hover:bg-rose-500/20 transition-all"
                            onClick={() => router.push('/employees?view=renewals')}
                        >
                            <FileWarning size={10} />
                            {adminRenewals.length} CONTRACT RENEWALS SOON
                        </Badge>
                    )}
                    {userRole === 'employee' && userRenewalSoon && (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 animate-pulse flex items-center gap-2">
                            <Calendar size={10} />
                            CONTRACT RENEWAL SOON
                        </Badge>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-zinc-500 hover:text-blue-600 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <Bell size={18} />
                                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 border border-white dark:border-black" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-80 p-0 border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-xl">
                            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <h4 className="font-black tracking-tighter text-sm">Notifications</h4>
                                <Badge className="bg-blue-500/10 text-blue-600 border-none font-bold text-[10px]">3 New</Badge>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="p-4 border-b border-zinc-50 dark:border-zinc-900 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer flex gap-4 items-start">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                                            <notif.icon size={14} />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{notif.title}</p>
                                                <span className="text-[10px] font-bold text-zinc-400 whitespace-nowrap ml-2">{notif.time}</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-500 leading-relaxed">{notif.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                                <Button variant="ghost" className="w-full text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                                    Mark all as read
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <div className="flex items-center gap-3 pl-3 border-l border-zinc-200 dark:border-zinc-800">
                        {userRole ? (
                            <div className="flex items-center gap-3">
                                <Link href="/profile" className="text-right hidden sm:block cursor-pointer hover:opacity-80 transition-opacity">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50 leading-none mb-1">{userRole === 'admin' ? 'Strategic Leader' : 'Talent Member'}</p>
                                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500 leading-none">Simulation Mode</p>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <Link href="/profile" className={`h-8 w-8 rounded-full bg-gradient-to-tr ${userRole === 'admin' ? 'from-blue-500 to-indigo-600' : 'from-emerald-500 to-teal-600'} p-[2px] cursor-pointer hover:scale-110 transition-transform group relative block`}>
                                        <div className="h-full w-full rounded-full bg-white dark:bg-zinc-900 border-2 border-white dark:border-black overflow-hidden flex items-center justify-center font-black text-[10px] text-zinc-600 dark:text-zinc-400">
                                            {userRole === 'admin' ? 'AD' : 'EM'}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                logout();
                                            }}
                                        >
                                            <LogOut size={8} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <Button className="bg-zinc-950 dark:bg-zinc-50 text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-6 h-9" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
