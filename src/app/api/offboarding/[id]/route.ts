import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const record = await prisma.offboardingRecord.findUnique({
            where: { id: params.id },
            include: {
                employee: true,
                workflowInstance: {
                    include: {
                        tasks: true
                    }
                }
            }
        });

        if (!record) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(record);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        
        // Update the record
        const record = await prisma.offboardingRecord.update({
            where: { id: params.id },
            data: {
                ...body,
                // Ensure dates are parsed correctly if provided
                resignationDate: body.resignationDate ? new Date(body.resignationDate) : undefined,
                lastWorkingDay: body.lastWorkingDay ? new Date(body.lastWorkingDay) : undefined,
            }
        });

        return NextResponse.json(record);
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
    }
}
