"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { timeOffRequests } from "../data";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NewTimeOffPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        type: string;
        startDate: Date | undefined;
        endDate: Date | undefined;
        reason: string;
    }>({
        type: "Vacation",
        startDate: undefined,
        endDate: undefined,
        reason: ""
    });

    const calculateDays = (start: Date | undefined, end: Date | undefined) => {
        if (!start || !end) return 0;
        const s = new Date(start);
        s.setHours(12, 0, 0, 0);
        const e = new Date(end);
        e.setHours(12, 0, 0, 0);

        if (e < s) return 0;

        let count = 0;
        let current = new Date(s);
        while (current <= e) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 5 && dayOfWeek !== 6) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        return count;
    };

    const daysCount = calculateDays(formData.startDate, formData.endDate);

    const handleSave = () => {
        if (!formData.startDate || !formData.endDate) {
            toast.error("Please select start and end dates.");
            return;
        }

        if (daysCount <= 0) {
            toast.error("Valid working days must be greater than 0.");
            return;
        }

        const formatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
        const formattedStart = formData.startDate.toLocaleDateString('en-US', formatOptions);
        const formattedEnd = formData.endDate.toLocaleDateString('en-US', formatOptions);
        const datesStr = `${formattedStart} - ${formattedEnd}`;

        const newRequest = {
            id: `req-${Date.now()}`,
            user: "Current User",
            type: formData.type,
            dates: datesStr,
            days: daysCount,
            status: "Pending",
            impact: "Low",
            aiAnalysis: "AI indicates ample capacity string for these dates."
        };

        timeOffRequests.unshift(newRequest);
        toast.success("Time off request submitted successfully!");
        router.push("/time-off");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 text-left">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/time-off">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Request Time Off</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Leave Details</CardTitle>
                    <CardDescription>
                        Submit your time off request for approval.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Leave Type</Label>
                        <select
                            id="type"
                            className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors border-zinc-200 dark:border-zinc-800"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option>Vacation</option>
                            <option>Sick Leave</option>
                            <option>Personal</option>
                            <option>Bereavement</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 flex flex-col">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal border-zinc-200 dark:border-zinc-800",
                                            !formData.startDate && "text-zinc-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 z-[100] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.startDate}
                                        onSelect={(d) => setFormData({...formData, startDate: d})}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <Label>End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal border-zinc-200 dark:border-zinc-800",
                                            !formData.endDate && "text-zinc-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 z-[100] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-xl" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.endDate}
                                        onSelect={(d) => setFormData({...formData, endDate: d})}
                                        initialFocus
                                        disabled={(date) => (formData.startDate ? date < formData.startDate : false)}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {formData.startDate && formData.endDate && (
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm">
                            <span className="text-sm font-medium text-zinc-500">Working Days (excludes Fri & Sat)</span>
                            <span className="text-xl font-black text-black dark:text-zinc-50">{daysCount} Days</span>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason (Optional)</Label>
                        <textarea
                            id="reason"
                            className="flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm border-zinc-200 dark:border-zinc-800"
                            placeholder="Brief description..."
                            value={formData.reason}
                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/time-off">Cancel</Link>
                    </Button>
                    <Button onClick={handleSave}>Submit Request</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
