"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewJobPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/recruitment">
                        <ChevronLeft className="h-4 w-4 text-zinc-500" />
                    </Link>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">Create Job Posting</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-black dark:text-zinc-50">Role Details</CardTitle>
                    <CardDescription>
                        Specify the requirements and information for the new position.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-zinc-700 dark:text-zinc-300">Job Title</Label>
                        <Input id="title" placeholder="e.g. Senior Frontend Developer" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department" className="text-zinc-700 dark:text-zinc-300">Department</Label>
                            <Input id="department" placeholder="e.g. Engineering" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-zinc-700 dark:text-zinc-300">Location</Label>
                            <Input id="location" placeholder="e.g. Remote or New York" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-zinc-700 dark:text-zinc-300">Employment Type</Label>
                            <select
                                id="type"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-50"
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Freelance</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-zinc-700 dark:text-zinc-300">Status</Label>
                            <select
                                id="status"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-50"
                            >
                                <option>Open</option>
                                <option>Draft</option>
                                <option>Internal Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-700 dark:text-zinc-300">Job Description</Label>
                        <textarea
                            id="description"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-zinc-200 dark:border-zinc-800 text-black dark:text-zinc-50"
                            placeholder="Describe the responsibilities and requirements..."
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4 border-t p-4">
                    <Button variant="outline" asChild>
                        <Link href="/recruitment">Cancel</Link>
                    </Button>
                    <Button>Publish Job</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
