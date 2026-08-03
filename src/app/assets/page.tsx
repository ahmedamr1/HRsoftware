"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone, Key, CreditCard, Search, Plus, Filter, MoreHorizontal, User, Calendar, Trash2, Edit, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export default function AssetsPage() {
    const { userRole } = useAuth();
    const isAdmin = userRole === "admin";
    const currentUserId = userRole === 'manager' ? "2" : (userRole === 'employee' ? "4" : null);

    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const res = await fetch('/api/assets');
            if (res.ok) {
                const data = await res.json();
                if (isAdmin) {
                    setAssets(data);
                } else {
                    setAssets(data.filter((a: any) => a.employee?.id === currentUserId));
                }
            }
        } catch (err) {
            console.error("Failed to fetch assets:", err);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'laptop': return <Laptop size={16} className="text-blue-500" />;
            case 'phone': return <Smartphone size={16} className="text-emerald-500" />;
            case 'keys': return <Key size={16} className="text-amber-500" />;
            case 'badge': return <CreditCard size={16} className="text-purple-500" />;
            default: return <Laptop size={16} className="text-zinc-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Assigned': return <Badge className="bg-emerald-500/10 text-emerald-600 border-none">Assigned</Badge>;
            case 'In Inventory': return <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-none">In Inventory</Badge>;
            case 'Damaged': return <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 border-none">Damaged</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Asset Intelligence</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Inventory and equipment lifecycle management.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full border-zinc-200 dark:border-zinc-800">
                        <Filter size={14} className="mr-2" /> Filter
                    </Button>
                    {isAdmin && (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                            <Plus size={14} className="mr-2" /> Register Asset
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                {[
                    { label: "Total Assets", value: assets.length, icon: Laptop, color: "text-blue-600" },
                    { label: "Assigned", value: assets.filter(a => a.status === 'Assigned').length, icon: User, color: "text-emerald-600" },
                    { label: "In Stock", value: assets.filter(a => a.status === 'In Inventory').length, icon: CheckCircle2, color: "text-amber-600" },
                    { label: "Maintenance", value: assets.filter(a => a.status === 'Damaged').length, icon: Trash2, color: "text-rose-600" },
                ].map((stat, i) => (
                    <Card key={i} className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative group">
                        <div className={`absolute top-0 left-0 w-1 h-full bg-${stat.color.split('-')[1]}-600`} />
                        <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</CardTitle>
                            <stat.icon size={12} className={stat.color} />
                        </CardHeader>
                        <CardContent className="p-4 pt-1">
                            <div className="text-2xl font-black">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                        placeholder="Search by serial or name..."
                        className="pl-9 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                        <TableRow className="hover:bg-transparent border-zinc-200 dark:border-zinc-800">
                            <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Asset</TableHead>
                            <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Category</TableHead>
                            <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Assigned To</TableHead>
                            <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Date Assigned</TableHead>
                            <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Serial Number</TableHead>
                            <TableHead className="font-bold text-[11px] uppercase tracking-widest text-zinc-500">Status</TableHead>
                            <TableHead className="text-right font-bold text-[11px] uppercase tracking-widest text-zinc-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-zinc-500">Analyzing inventory...</TableCell>
                            </TableRow>
                        ) : assets.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-zinc-500">No assets registered in the system.</TableCell>
                            </TableRow>
                        ) : assets.map((asset) => (
                            <TableRow key={asset.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 border-zinc-200 dark:border-zinc-800 transition-colors">
                                <TableCell className="font-bold text-black dark:text-zinc-50">{asset.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getIcon(asset.category)}
                                        <span className="text-sm">{asset.category}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {asset.employee ? (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={asset.employee.avatar} />
                                                <AvatarFallback className="text-[10px] bg-zinc-100">{asset.employee.firstName[0]}{asset.employee.lastName[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{asset.employee.firstName} {asset.employee.lastName}</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-zinc-400">---</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-xs text-zinc-500 font-medium">
                                    {asset.assignedAt ? new Date(asset.assignedAt).toLocaleDateString() : '---'}
                                </TableCell>
                                <TableCell className="text-xs font-mono text-zinc-500">{asset.serialNumber}</TableCell>
                                <TableCell>{getStatusBadge(asset.status)}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-zinc-200 dark:border-zinc-800">
                                            <DropdownMenuItem className="gap-2 font-bold text-xs">
                                                <Edit size={14} /> Edit Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 font-bold text-xs" onClick={() => toast.info(`Asset maintenance log opened for ${asset.name}`)}>
                                                <Calendar size={14} /> Maintenance Log
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-rose-600 gap-2 font-bold text-xs">
                                                <Trash2 size={14} /> Decommission
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
