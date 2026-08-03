"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Briefcase, CreditCard, BarChart3, ClipboardList, Network, User, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["admin", "manager", "employee"] },
    { name: "Profile", href: "/profile", icon: User, roles: ["admin", "manager", "employee"] },
    { name: "Time Off", href: "/time-off", icon: Calendar, roles: ["admin", "manager", "employee"] },
    { name: "Employees", href: "/employees", icon: Users, roles: ["admin", "manager"] },
    { name: "Recruitment", href: "/recruitment", icon: Briefcase, roles: ["admin", "manager"] },
    { name: "Payroll", href: "/payroll", icon: CreditCard, roles: ["admin", "manager", "employee"] },
    { name: "Performance", href: "/performance", icon: BarChart3, roles: ["admin", "manager", "employee"] },
    { name: "Culture & Pulse", href: "/culture", icon: Heart, roles: ["admin", "manager", "employee"] },
    { name: "Onboarding", href: "/onboarding", icon: ClipboardList, roles: ["admin", "manager", "employee"] },
    { name: "Offboarding", href: "/offboarding", icon: LogOut, roles: ["admin", "manager", "employee"] },
    { name: "Assets", href: "/assets", icon: Briefcase, roles: ["admin"] },
    { name: "Org Chart", href: "/org-chart", icon: Network, roles: ["admin", "manager", "employee"] },
    { name: "Settings", href: "/settings", icon: Settings, roles: ["admin", "manager", "employee"] },
];

export function SidebarClient() {
    const pathname = usePathname();
    const { userRole, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const currentRole = userRole || "admin";

    const filteredNavigation = navigation.filter(item => item.roles.includes(currentRole));

    const SignOutWrapper = React.Fragment;

    return (
        <div className={cn("flex flex-col h-screen bg-zinc-950 text-white border-r border-zinc-800 transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
            <div className={cn("p-6 flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
                {!isCollapsed && (
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="text-blue-500">Super</span>HR
                    </h1>
                )}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto overflow-x-hidden">
                {filteredNavigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={isCollapsed ? item.name : undefined}
                            className={cn(
                                "flex items-center rounded-md transition-colors",
                                isCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2",
                                isActive
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                            )}
                        >
                            <Icon size={18} />
                            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <SignOutWrapper>
                    <button
                        title={isCollapsed ? "Sign Out" : undefined}
                        className={cn(
                            "flex items-center text-zinc-400 hover:text-white transition-colors",
                            isCollapsed ? "justify-center w-full p-3" : "gap-3 px-3 py-2 w-full text-sm font-medium"
                        )}
                        onClick={logout}
                    >
                        <LogOut size={18} />
                        {!isCollapsed && "Sign Out"}
                    </button>
                </SignOutWrapper>
            </div>
        </div>
    );
}
