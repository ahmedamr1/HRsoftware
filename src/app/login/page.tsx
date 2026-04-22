"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (role: "admin" | "employee") => {
        login(role);
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl z-10"
            >
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-4 flex items-center justify-center gap-4">
                        <span className="text-blue-500">Super</span>HR
                        <Sparkles className="h-8 w-8 text-blue-500 animate-bounce" />
                    </h1>
                    <p className="text-zinc-400 font-bold uppercase tracking-[0.3em] text-xs">AI-Native Transformation Gateway</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Admin Access Card */}
                    <Card
                        className="group bg-zinc-900/50 backdrop-blur-3xl border-zinc-800 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden p-8"
                        onClick={() => handleLogin("admin")}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <ShieldAlert className="h-24 w-24 text-blue-500 -mr-8 -mt-8 rotate-12" />
                        </div>
                        <CardHeader className="p-0 mb-6">
                            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ShieldAlert className="h-6 w-6 text-blue-500" />
                            </div>
                            <CardTitle className="text-2xl font-black tracking-tighter text-white">Strategic Leader</CardTitle>
                            <CardDescription className="text-zinc-500 font-medium uppercase text-[10px] tracking-widest mt-2">Executive Admin Access</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Full Org-Chart Intelligence",
                                    "AI Recruitment & Hiring Hub",
                                    "Executive Performance Oversight",
                                    "Global Settings & Integration"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs h-12 flex items-center gap-2 group">
                                Enter Workspace
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Employee Access Card */}
                    <Card
                        className="group bg-zinc-900/50 backdrop-blur-3xl border-zinc-800 hover:border-emerald-500/50 transition-all cursor-pointer overflow-hidden p-8"
                        onClick={() => handleLogin("employee")}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Users className="h-24 w-24 text-emerald-500 -mr-8 -mt-8 -rotate-12" />
                        </div>
                        <CardHeader className="p-0 mb-6">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Users className="h-6 w-6 text-emerald-500" />
                            </div>
                            <CardTitle className="text-2xl font-black tracking-tighter text-white">Talent Member</CardTitle>
                            <CardDescription className="text-zinc-500 font-medium uppercase text-[10px] tracking-widest mt-2">Standard Employee View</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Personal Performance HUD",
                                    "Time-Off & Leave Management",
                                    "Payroll & Compensation Flow",
                                    "Onboarding & Career Growth"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs h-12 flex items-center gap-2 group">
                                Enter Dashboard
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <p className="mt-12 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
                    Powered by SuperHR Engine v2.0 // AI-First Infrastructure
                </p>
            </motion.div>
        </div>
    );
}
