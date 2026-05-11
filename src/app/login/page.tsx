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

    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!email.endsWith("@waffyapp.com")) {
            setError("Unauthorized domain. Please use your @waffyapp.com email.");
            return;
        }

        const role = email.toLowerCase() === "admin@waffyapp.com" ? "admin" : "employee";
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

                <Card className="bg-zinc-900/50 backdrop-blur-3xl border-zinc-800 p-8 max-w-md mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldAlert className="h-24 w-24 text-blue-500 -mr-8 -mt-8 rotate-12" />
                    </div>
                    <CardHeader className="p-0 mb-6 text-center">
                        <CardTitle className="text-2xl font-black tracking-tighter text-white">Enter Workspace</CardTitle>
                        <CardDescription className="text-zinc-500 font-medium uppercase text-[10px] tracking-widest mt-2">
                            Secure access for WaffyApp employees
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Company Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@waffyapp.com"
                                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {error && <p className="text-rose-500 text-xs font-medium">{error}</p>}
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs h-12 flex items-center justify-center gap-2 group mt-4">
                                Secure Login
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-12 text-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
                    Powered by SuperHR Engine v2.0 // AI-First Infrastructure
                </p>
            </motion.div>
        </div>
    );
}
