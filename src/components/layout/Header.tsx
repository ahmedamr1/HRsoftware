"use client";

import { Bell, Search, Command, Sparkles, LogOut, User, FileWarning, Calendar, ArrowRight, ExternalLink } from "lucide-react";

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

export function Header() {
    const { userRole, logout } = useAuth();
    const router = useRouter();
    
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input
                            placeholder="Type to search (⌘K)"
                            className="pl-9 pr-12 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-full h-9 text-xs font-medium focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-[10px] text-zinc-400 font-black">
                            <Command size={10} />
                            <span>K</span>
                        </div>
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
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative text-zinc-500 hover:text-blue-600 transition-colors"
                        onClick={() => toast.info("No new notifications")}
                    >
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 border border-white dark:border-black" />
                    </Button>
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
