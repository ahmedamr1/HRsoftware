"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SidebarClient } from "@/components/layout/SidebarClient";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { useAuth } from "@/lib/auth-context";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userRole, isLoading } = useAuth();
  const isLoginPage = pathname === "/login";

  if (isLoginPage || (!userRole && !isLoading)) {
    return (
      <main className="h-screen w-full overflow-auto">
        <PageTransition>{children}</PageTransition>
      </main>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <aside className="hidden md:block">
        <SidebarClient />
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
