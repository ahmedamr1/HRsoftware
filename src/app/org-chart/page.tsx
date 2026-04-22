"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, User, Users, Info, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ORG_DATA = {
    id: "1",
    name: "Sarah Smith",
    role: "CEO",
    department: "Executive",
    avatar: "",
    email: "sarah@superhr.ai",
    children: [
        {
            id: "2",
            name: "Michael Chen",
            role: "CTO",
            department: "Engineering",
            avatar: "",
            email: "michael@superhr.ai",
            children: [
                {
                    id: "3",
                    name: "Alex Rivera",
                    role: "Frontend Lead",
                    department: "Engineering",
                    avatar: "",
                    email: "alex@superhr.ai",
                    children: [
                        { id: "4", name: "Emma Wilson", role: "Frontend Dev", department: "Engineering", avatar: "", email: "emma@superhr.ai" },
                        { id: "5", name: "Leo Das", role: "Junior Dev", department: "Engineering", avatar: "", email: "leo@superhr.ai" },
                    ]
                },
                {
                    id: "6",
                    name: "Maria Garcia",
                    role: "Backend Lead",
                    department: "Engineering",
                    avatar: "",
                    email: "maria@superhr.ai",
                    children: []
                }
            ]
        },
        {
            id: "7",
            name: "Jessica Taylor",
            role: "CHRO",
            department: "People",
            avatar: "",
            email: "jessica@superhr.ai",
            children: [
                {
                    id: "8",
                    name: "Jordan Smith",
                    role: "HR Manager",
                    department: "People",
                    avatar: "",
                    email: "jordan@superhr.ai",
                    children: []
                }
            ]
        }
    ]
};

function OrgNode({ node, level = 0 }: { node: any, level?: number }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const showDetails = (name: string) => {
        toast.info(`Profile view for ${name} coming soon!`);
    };

    return (
        <div className="space-y-2">
            <div
                className="flex items-center gap-4 group"
                style={{ paddingLeft: `${level * 40}px` }}
            >
                {hasChildren && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-zinc-400 hover:text-blue-500 transition-colors"
                    >
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                )}
                {!hasChildren && <div className="w-[18px]" />}

                <Card
                    onClick={() => showDetails(node.name)}
                    className={`flex-1 border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group/card ${isExpanded && hasChildren ? 'bg-zinc-50/50 dark:bg-zinc-900/50' : 'bg-white dark:bg-zinc-950/50'}`}
                >
                    <CardContent className="p-4 flex items-center justify-between backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-800 shadow-sm transition-transform group-hover/card:scale-110">
                                <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">{node.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">{node.name}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{node.role}</p>
                                    <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                    <p className="text-[10px] text-zinc-400 font-medium">{node.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest opacity-70 bg-zinc-100 dark:bg-zinc-800 border-none">
                                {node.department}
                            </Badge>
                            {hasChildren && (
                                <div className="hidden md:flex items-center gap-1 text-zinc-400 text-[10px] font-black">
                                    <Users size={12} />
                                    {node.children.length}
                                </div>
                            )}
                            <Info size={14} className="text-zinc-300 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isExpanded && hasChildren && (
                <div className="relative">
                    {/* Vertical threading line with gradient */}
                    <div
                        className="absolute left-[9px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/20 via-zinc-200/50 to-transparent dark:from-blue-500/20 dark:via-zinc-800/50 dark:to-transparent"
                        style={{ left: `${level * 40 + 9}px` }}
                    />
                    <div className="space-y-2 pt-2">
                        {node.children.map((child: any) => (
                            <OrgNode key={child.id} node={child} level={level + 1} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function OrgChartPage() {
    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Org Chart</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Explore reporting lines and team distribution.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full border-zinc-200 dark:border-zinc-800">
                        <Mail size={14} className="mr-2" /> Broadcast
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-8 bg-zinc-50/30 dark:bg-zinc-900/10 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 shadow-inner">
                <OrgNode node={ORG_DATA} />
            </div>
        </div>
    );
}
