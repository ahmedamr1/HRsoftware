"use client"

import { useState } from "react";
import { Upload, File, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    onUpload?: (file: File) => void;
    accept?: string;
    label?: string;
}

export function FileUpload({ onUpload, accept = ".pdf,.doc,.docx", label = "Upload Document" }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const removeFile = () => setFile(null);

    return (
        <div className="space-y-4 w-full">
            {!file ? (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors lg:min-h-[200px]",
                        dragActive ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10" : "border-zinc-200 dark:border-zinc-800"
                    )}
                >
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept={accept}
                        onChange={handleChange}
                    />
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full mb-4">
                        <Upload className="h-6 w-6 text-zinc-500" />
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
                    <p className="text-xs text-zinc-500 mt-1">Drag and drop or click to browse</p>
                </div>
            ) : (
                <div className="flex items-center justify-between p-4 border rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                            <File className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{file.name}</p>
                            <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {uploading ? (
                            <span className="text-xs text-zinc-400">Uploading...</span>
                        ) : (
                            <Button variant="ghost" size="icon" onClick={removeFile} className="text-zinc-400">
                                <X size={16} />
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
