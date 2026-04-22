"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
    className?: string
}

export function Dialog({ open, onOpenChange, children, className }: DialogProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className={cn(
                                "relative bg-white dark:bg-zinc-950 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-lg mt-auto sm:mt-0",
                                className
                            )}
                        >
                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

export function DialogContent({ children, className, p = true }: { children: React.ReactNode, className?: string, p?: boolean }) {
    return (
        <div className={cn(p && "p-6", className)}>
            {children}
        </div>
    )
}

export function DialogHeader({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("space-y-1.5 mb-4", className)}>
            {children}
        </div>
    )
}

export function DialogTitle({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
            {children}
        </h3>
    )
}

export function DialogDescription({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}>
            {children}
        </p>
    )
}

export function DialogFooter({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)}>
            {children}
        </div>
    )
}
