import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CandidateDocuments() {
    const documents = [
        { name: "Resume_Alex_Rivera.pdf", size: "1.2 MB", type: "Resume", date: "2024-02-08" },
        { name: "Portfolio_Link.pdf", size: "450 KB", type: "Portfolio", date: "2024-02-08" },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-black dark:text-zinc-50">Upload New Document</CardTitle>
                    <CardDescription>Upload resumes, portfolios, or interview notes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FileUpload label="Drop documents here" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-black dark:text-zinc-50">Stored Documents</CardTitle>
                    <CardDescription>All files uploaded for this candidate.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg border-zinc-100 dark:border-zinc-800 text-black dark:text-zinc-50">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-zinc-400" />
                                <div>
                                    <p className="text-sm font-medium">{doc.name}</p>
                                    <p className="text-[10px] text-zinc-500">{doc.type} • {doc.size} • Uploaded {doc.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                    <Download size={14} />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
