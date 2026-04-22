"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, CreditCard } from "lucide-react";

interface PayslipModalProps {
    isOpen: boolean;
    onClose: () => void;
    employeeName: string;
    amount: string;
    date: string;
}

export function PayslipModal({ isOpen, onClose, employeeName, amount, date }: PayslipModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent p={false} className="overflow-hidden">
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-50 text-left">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <DialogTitle>Employee Payslip</DialogTitle>
                        </div>
                        <DialogDescription className="dark:text-zinc-400">
                            Generated on {date} for {employeeName}.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 space-y-6 text-black dark:text-zinc-50">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Earnings</p>
                            <div className="flex justify-between text-sm">
                                <span>Base Salary</span>
                                <span className="font-medium">{amount}</span>
                            </div>
                            <div className="flex justify-between text-sm text-zinc-500">
                                <span>Bonus</span>
                                <span>$0.00</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Deductions</p>
                            <div className="flex justify-between text-sm">
                                <span>Tax (Est.)</span>
                                <span className="text-red-500">-$2,450.00</span>
                            </div>
                            <div className="flex justify-between text-sm text-zinc-500">
                                <span>Health Ins.</span>
                                <span>-$120.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Net Pay</span>
                            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{amount}</span>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 gap-2 sm:gap-0">
                    <div className="flex w-full gap-2">
                        <Button variant="outline" className="flex-1" onClick={() => { }}>
                            <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function CreditCardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}
