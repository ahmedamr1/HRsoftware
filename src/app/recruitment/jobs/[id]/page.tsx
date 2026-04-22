import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CandidateKanban } from "@/components/recruitment/CandidateKanban";
import Link from "next/link";
import { ChevronLeft, Share2, MoreVertical, Edit } from "lucide-react";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/recruitment">
                            <ChevronLeft size={18} />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-black dark:text-zinc-50 text-black dark:text-zinc-50">Senior Frontend Engineer</h1>
                            <Badge variant="success">Open</Badge>
                        </div>
                        <p className="text-sm text-zinc-500">Engineering • Remote • Posted 2 days ago</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 size={16} className="mr-2" /> Share
                    </Button>
                    <Button variant="outline" size="sm">
                        <Edit size={16} className="mr-2" /> Edit
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical size={18} />
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 space-y-6">
                <div className="border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex gap-8">
                        <button className="px-1 py-4 text-sm font-medium border-b-2 border-blue-500 text-blue-600">Pipeline</button>
                        <button className="px-1 py-4 text-sm font-medium text-zinc-500 hover:text-zinc-700">Analytics</button>
                        <button className="px-1 py-4 text-sm font-medium text-zinc-500 hover:text-zinc-700">Settings</button>
                    </div>
                </div>
                <CandidateKanban />
            </div>
        </div>
    );
}
