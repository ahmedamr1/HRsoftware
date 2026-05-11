"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    
    useEffect(() => {
        // Redirecting to mock logged in user's profile (Ahmed Amr - ID 4)
        router.replace("/employees/4");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );
}
