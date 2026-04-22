import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { SidebarClient } from "@/components/layout/SidebarClient";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/layout/PageTransition";
import { Toaster } from "sonner";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super HR - AI-Native Transformation",
  description: "Next-generation AI-powered HR management suite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900">
              {/* Sidebar */}
              <aside className="hidden md:block">
                <SidebarClient />
              </aside>

              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto p-6">
                  <PageTransition>
                    {children}
                  </PageTransition>
                  <Toaster richColors position="top-right" />
                </main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
