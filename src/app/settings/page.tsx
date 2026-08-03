"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Lock, User, Palette, Globe, Save, Shield, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/lib/auth-context";
import { Checkbox } from "@/components/ui/checkbox";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreHorizontal, CheckCircle2, UserPlus, Users as UsersIcon, ChevronDown } from "lucide-react";
import { employees } from "@/app/employees/data";

export default function SettingsPage() {
    const { userRole } = useAuth();
    const isAdmin = userRole === "admin";
    const [isSaving, setIsSaving] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeUserForPerms, setActiveUserForPerms] = useState<any>(null);

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
                <h2 className="text-3xl font-black tracking-tighter text-black dark:text-zinc-50">Settings</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Manage your account settings and organization preferences.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-6">
                <div className="md:col-span-2 space-y-2">
                    {[
                        { name: "My Profile", icon: User, active: false, id: "profile" },
                        { name: "Access Control", icon: Shield, active: true, id: "rbac", adminOnly: true },
                        { name: "Notifications", icon: Bell, active: false, id: "notifications" },
                        { name: "Security & Privacy", icon: Lock, active: false, id: "security" },
                        { name: "Connectivity", icon: Globe, active: false, id: "connectivity" },
                        { name: "Appearance", icon: Palette, active: false, id: "appearance" },
                        { name: "Mobile Access", icon: Smartphone, active: false, id: "mobile" },
                    ].filter(item => !item.adminOnly || isAdmin).map((item, i) => (
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
                    {/* RBAC Management Section - Admin Only */}
                    {isAdmin && (
                        <div className="space-y-6">
                            {activeUserForPerms ? (
                                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                                        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setActiveUserForPerms(null)}>
                                                        <ChevronDown className="rotate-90" size={16} />
                                                    </Button>
                                                    <div className="flex items-center gap-3">
                                                        {activeUserForPerms.multiple ? (
                                                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                                                                <UsersIcon size={20} />
                                                            </div>
                                                        ) : (
                                                            <Avatar className="h-10 w-10 border-2 border-blue-500/20">
                                                                <AvatarImage src={activeUserForPerms.avatar || undefined} />
                                                                <AvatarFallback className="font-bold">{activeUserForPerms.firstName[0]}</AvatarFallback>
                                                            </Avatar>
                                                        )}
                                                        <div>
                                                            <CardTitle className="text-lg font-black uppercase tracking-widest">
                                                                {activeUserForPerms.multiple 
                                                                    ? `Bulk Access Definition (${activeUserForPerms.count} Members)` 
                                                                    : `Custom Access: ${activeUserForPerms.firstName} ${activeUserForPerms.lastName}`}
                                                            </CardTitle>
                                                            <CardDescription>
                                                                {activeUserForPerms.multiple 
                                                                    ? "Set a shared permission matrix for all selected members." 
                                                                    : "Configure specific module permissions for this user."}
                                                            </CardDescription>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge className="bg-blue-600 text-white border-none font-bold">
                                                    {activeUserForPerms.multiple ? "BULK ASSIGNMENT" : "USER-SPECIFIC"}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-zinc-50/30 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800">
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Module / Part</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">No Access</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">View</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Edit</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Access</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                                        {[
                                                            { section: "Dashboard", sub: "Global Analytics" },
                                                            { section: "Employees", sub: "Personnel Files" },
                                                            { section: "Employees", sub: "Contract Vault" },
                                                            { section: "Culture & Pulse", sub: "Engagement Data" },
                                                            { section: "Culture & Pulse", sub: "Survey Creation" },
                                                            { section: "Time Off", sub: "Approval Engine" },
                                                            { section: "Recruitment", sub: "Pipeline Intelligence" },
                                                            { section: "Payroll", sub: "Disbursement Logic" },
                                                            { section: "Performance", sub: "Review Moderation" },
                                                            { section: "Assets", sub: "Hardware Inventory" },
                                                            { section: "Settings", sub: "Global Config" },
                                                        ].map((item, i) => (
                                                            <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                                                <td className="p-4">
                                                                    <div className="text-xs font-black text-black dark:text-zinc-50 uppercase tracking-tighter">{item.section}</div>
                                                                    <div className="text-[10px] text-zinc-500 font-bold">{item.sub}</div>
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`u-perm-${i}`} className="accent-rose-600 h-4 w-4" />
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`u-perm-${i}`} className="accent-blue-600 h-4 w-4" defaultChecked={item.section === "Dashboard"} />
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`u-perm-${i}`} className="accent-amber-600 h-4 w-4" />
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`u-perm-${i}`} className="accent-emerald-600 h-4 w-4" />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="justify-between bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-t border-zinc-200 dark:border-zinc-800">
                                            <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 font-bold" onClick={() => setActiveUserForPerms(null)}>
                                                Cancel
                                            </Button>
                                            <Button 
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs px-8 shadow-lg shadow-blue-500/20"
                                                onClick={() => {
                                                    const name = activeUserForPerms.multiple ? `${activeUserForPerms.count} members` : activeUserForPerms.firstName;
                                                    toast.success(`Access permissions applied to ${name}.`);
                                                    setActiveUserForPerms(null);
                                                    setSelectedUsers([]);
                                                }}
                                            >
                                                Apply to {activeUserForPerms.multiple ? `${activeUserForPerms.count} Members` : activeUserForPerms.firstName}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                            ) : (
                                <>
                                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                                        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                                        <Shield className="h-4 w-4 text-rose-600" /> Access Control Intelligence
                                                    </CardTitle>
                                                    <CardDescription>Configure granular permissions for different organizational roles.</CardDescription>
                                                </div>
                                                <Badge className="bg-rose-600 text-white border-none font-bold">ADMIN MODE</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-zinc-50/30 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800">
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Module / Section</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">No Access</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">View</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Edit</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Access</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                                        {[
                                                            { section: "Dashboard", sub: "Global Analytics", roles: "All" },
                                                            { section: "Employees", sub: "Personnel Files", roles: "Admin/Manager" },
                                                            { section: "Employees", sub: "Contract Vault", roles: "Admin" },
                                                            { section: "Culture & Pulse", sub: "Engagement Data", roles: "Admin" },
                                                            { section: "Culture & Pulse", sub: "Survey Creation", roles: "Admin" },
                                                            { section: "Time Off", sub: "Approval Engine", roles: "Admin/Manager" },
                                                            { section: "Recruitment", sub: "Pipeline Intelligence", roles: "Admin/HR" },
                                                            { section: "Payroll", sub: "Disbursement Logic", roles: "Admin/Finance" },
                                                            { section: "Performance", sub: "Review Moderation", roles: "Admin/Manager" },
                                                            { section: "Settings", sub: "Global Config", roles: "Admin" },
                                                        ].map((item, i) => (
                                                            <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                                                <td className="p-4">
                                                                    <div className="text-xs font-black text-black dark:text-zinc-50 uppercase tracking-tighter">{item.section}</div>
                                                                    <div className="text-[10px] text-zinc-500 font-bold">{item.sub}</div>
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`perm-${i}`} className="accent-rose-600 h-4 w-4" />
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`perm-${i}`} className="accent-blue-600 h-4 w-4" defaultChecked={item.section === "Dashboard"} />
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`perm-${i}`} className="accent-amber-600 h-4 w-4" />
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <input type="radio" name={`perm-${i}`} className="accent-emerald-600 h-4 w-4" defaultChecked={item.roles.includes("Admin")} />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="justify-end bg-zinc-50/50 dark:bg-zinc-900/50 p-6 border-t border-zinc-200 dark:border-zinc-800">
                                            <Button 
                                                className="bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-xs px-8"
                                                onClick={() => toast.success("Global role matrix updated.")}
                                            >
                                                Save Role Matrix
                                            </Button>
                                        </CardFooter>
                                    </Card>

                                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                                        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                                        <UsersIcon className="h-4 w-4 text-blue-600" /> Member Access Assignments
                                                    </CardTitle>
                                                    <CardDescription>Select one or more users to define their individual access level for every part of the system.</CardDescription>
                                                </div>
                                                {selectedUsers.length > 0 && (
                                                    <Button 
                                                        className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] px-8 h-10 rounded-full shadow-lg shadow-blue-500/20 animate-in zoom-in-95 duration-200"
                                                        onClick={() => setActiveUserForPerms({ multiple: true, count: selectedUsers.length })}
                                                    >
                                                        Define Bulk Access ({selectedUsers.length}) <ChevronDown size={14} className="-rotate-90 ml-2" />
                                                    </Button>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 flex items-center gap-4">
                                                <div className="relative flex-1">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                                    <Input 
                                                        placeholder="Search members to define access..." 
                                                        className="pl-9 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 font-bold"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-zinc-50/30 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800">
                                                            <th className="p-4 w-12 text-center">
                                                                <Checkbox 
                                                                    checked={selectedUsers.length === employees.length}
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) setSelectedUsers(employees.map(e => e.id));
                                                                        else setSelectedUsers([]);
                                                                    }}
                                                                />
                                                            </th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Member</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Department</th>
                                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Access Status</th>
                                                            <th className="p-4 text-right text-[10px] font-black uppercase tracking-widest text-zinc-500">Assignment</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                                        {employees.filter(e => 
                                                            `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                            e.department.toLowerCase().includes(searchQuery.toLowerCase())
                                                        ).map((employee) => (
                                                            <tr key={employee.id} className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors group ${selectedUsers.includes(employee.id) ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
                                                                <td className="p-4 text-center">
                                                                    <Checkbox 
                                                                        checked={selectedUsers.includes(employee.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) setSelectedUsers(prev => [...prev, employee.id]);
                                                                            else setSelectedUsers(prev => prev.filter(id => id !== employee.id));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td className="p-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <Avatar className="h-8 w-8">
                                                                            <AvatarImage src={employee.avatar || undefined} />
                                                                            <AvatarFallback className="font-bold text-[10px]">{employee.firstName[0]}</AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                            <div className="text-sm font-black text-black dark:text-zinc-50">{employee.firstName} {employee.lastName}</div>
                                                                            <div className="text-[10px] text-zinc-500 font-bold">{employee.role}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="p-4">
                                                                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                                                        {employee.department}
                                                                    </Badge>
                                                                </td>
                                                                <td className="p-4">
                                                                    <Badge className={employee.id === 4 ? "bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black uppercase" : "bg-blue-500/10 text-blue-600 border-none text-[9px] font-black uppercase"}>
                                                                        {employee.id === 4 ? "Customized" : "Inherited"}
                                                                    </Badge>
                                                                </td>
                                                                <td className="p-4 text-right">
                                                                    {!selectedUsers.length && (
                                                                        <Button 
                                                                            className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] px-6 h-9 rounded-full shadow-lg shadow-blue-500/20 opacity-0 group-hover:opacity-100 transition-all"
                                                                            onClick={() => setActiveUserForPerms(employee)}
                                                                        >
                                                                            Define Access <ChevronDown size={14} className="-rotate-90 ml-1" />
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )}
                        </div>
                    )}

                    {/* Profile Section */}
                    <Card className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                        <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                            <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-500" /> {isAdmin ? "Administrative Profile" : "Personal Profile"}
                            </CardTitle>
                            <CardDescription>{isAdmin ? "Update your personal information and public identity." : "Manage your personal information and contact details."}</CardDescription>
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
                            <CardDescription>{isAdmin ? "Advanced security protocols for your administrative account." : "Manage your login security and account protection."}</CardDescription>
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
