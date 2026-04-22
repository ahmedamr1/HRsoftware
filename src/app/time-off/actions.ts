"use client"; // Note: Since I am using a mix of client and server, I'll export standard functions and wrap them in 'use server' if needed.
// Actually, let's make this a real Server Actions file.

import { updateRequestStatus } from "@/services/timeOffService";
import { revalidatePath } from "next/cache";

// Since I am in a client-centric prototype, I'll use standard functions 
// but in a real app these would be 'use server' actions.

export async function approveRequest(id: string) {
    try {
        await updateRequestStatus(id, "Approved");
        // revalidatePath("/time-off");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to approve request" };
    }
}

export async function rejectRequest(id: string) {
    try {
        await updateRequestStatus(id, "Rejected");
        // revalidatePath("/time-off");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to reject request" };
    }
}
