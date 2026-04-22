"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Lock, User, Palette, Globe, Save, Shield, Smartphone } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        toast.promise(new Promise(resolve => setTimeout(resolve, 2000)), {
            loading: 'Saving configuration changes...',
            success: () => {
                setIsSaving(false);
                return 'Global settings updated successfully!';
            },
            error: 'Failed to save settings',
        });
    };

    return (
        <div className="space-y-6 text-left max-w-5xl">
            <div>
                <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">System Configuration</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Manage your account settings and organization preferences.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-6">
                <div className="md:col-span-2 space-y-2">
                    {[
                        { name: "My Profile", icon: User, active: true },
                        { name: "Notifications", icon: Bell, active: false },
                        { name: "Security & Privacy", icon: Shield, active: false },
                        { name: "Connectivity", icon: Globe, active: false },
                        { name: "Appearance", icon: Palette, active: false },
                        { name: "Mobile Access", icon: Smartphone, active: false },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </button>
                    ))}
                </div>

                <div className="md:col-span-4 space-y-6">
                    {/* Profile Section */}
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                            <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-500" /> Administrative Profile
                            </CardTitle>
                            <CardDescription>Update your personal information and public identity.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Name</Label>
                                    <Input id="name" defaultValue="Jane Doe" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Professional Email</Label>
                                    <Input id="email" defaultValue="jane.doe@superhr.ai" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 font-bold" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Professional Bio</Label>
                                <textarea
                                    id="bio"
                                    className="flex min-h-[100px] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Briefly describe your role and expertise..."
                                    defaultValue="Global HR Director at Super HR. Focused on scaling engineering teams and implementing AI-driven recruitment workflows."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                            <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                <Lock className="h-4 w-4 text-emerald-500" /> Authentication
                            </CardTitle>
                            <CardDescription>Advanced security protocols for your administrative account.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            {[
                                { title: "Multi-Factor Auth", status: "Enabled", desc: "Require an extra verification step for all logins." },
                                { title: "API Security Keys", status: "Configured", desc: "Manage tokens for external system integrations." },
                            ].map((sec, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 group hover:border-emerald-500/50 transition-all">
                                    <div>
                                        <p className="text-sm font-black text-black dark:text-zinc-50">{sec.title}</p>
                                        <p className="text-xs text-zinc-500">{sec.desc}</p>
                                    </div>
                                    <Badge variant="success" className="rounded-full px-3 font-bold uppercase text-[9px]">
                                        {sec.status}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-end bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-t border-zinc-200 dark:border-zinc-800">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-zinc-950 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs px-8 h-11 hover:opacity-90 transition-all active:scale-95 shadow-xl"
                            >
                                {isSaving ? "Synchronizing..." : <><Save size={16} className="mr-2" /> Sync Configuration</>}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
