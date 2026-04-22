"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Briefcase, CreditCard, BarChart3, ClipboardList, Network } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["admin", "employee"] },
    { name: "Employees", href: "/employees", icon: Users, roles: ["admin"] },
    { name: "Time Off", href: "/time-off", icon: Calendar, roles: ["admin", "employee"] },
    { name: "Recruitment", href: "/recruitment", icon: Briefcase, roles: ["admin"] },
    { name: "Onboarding", href: "/onboarding", icon: ClipboardList, roles: ["admin", "employee"] },
    { name: "Org Chart", href: "/org-chart", icon: Network, roles: ["admin"] },
    { name: "Payroll", href: "/payroll", icon: CreditCard, roles: ["admin", "employee"] },
    { name: "Performance", href: "/performance", icon: BarChart3, roles: ["admin", "employee"] },
    { name: "Settings", href: "/settings", icon: Settings, roles: ["admin", "employee"] },
];

export function SidebarClient() {
    const pathname = usePathname();
    const { userRole, logout } = useAuth();

    const currentRole = userRole || "admin";

    const filteredNavigation = navigation.filter(item => item.roles.includes(currentRole));

    const SignOutWrapper = React.Fragment;

    return (
        <div className="flex flex-col h-screen w-64 bg-zinc-950 text-white border-r border-zinc-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="text-blue-500">Super</span>HR
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {filteredNavigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                            )}
                        >
                            <Icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <SignOutWrapper>
                    <button
                        className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        onClick={logout}
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </SignOutWrapper>
            </div>
        </div>
    );
}
